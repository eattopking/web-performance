第一部分：Node.js 底层与 NestJS 架构 (1-5)
1. 为什么在企业级复杂项目中，倾向于选择 NestJS 而不是 Express 或 Koa？

答案要点： Express/Koa 是轻量级中间件框架，高度自由但容易导致团队代码风格碎片化（“意大利面条代码”）。NestJS 提供了开箱即用的企业级架构，底层基于 IoC（控制反转）和 DI（依赖注入），完美支持 TypeScript 和 OOP 面向对象编程。它强制规范了 Module、Service、Controller 的边界，非常适合维护复杂的业务逻辑（如你的四级活动层级）。

2. 请说一下 NestJS 的请求生命周期，Middleware、Guard、Interceptor、Pipe、Filter 的执行顺序是怎样的？

答案要点： 顺序为：客户端请求 -> Middleware (中间件) -> Guard (守卫，做权限拦截) -> Interceptor (拦截器，进入路由前) -> Pipe (管道，做参数校验与转换) -> Controller (控制器) -> Service (业务逻辑) -> Interceptor (拦截器，响应后数据转换) -> Exception Filter (异常过滤器，如果有报错) -> 响应客户端。

3. 在你的活动平台中，RBAC（基于角色的权限控制）是如何结合 NestJS 实现的？

答案要点： 通常通过自定义装饰器（如 @Roles('ADMIN')）将所需角色元数据注入路由。然后编写全局或控制器级别的 Guard（守卫）。在 Guard 中，通过 ExecutionContext 获取当前请求的用户信息（通常解析自 JWT），再使用 Reflector 获取该路由需要的角色列表，进行比对拦截。

4. 你的项目中提到了活动数据管控，Node.js 是单线程的，如果遇到大批量数据的报表导出（CPU密集型任务），如何避免主线程阻塞？

答案要点： 1. 异步队列：使用 Redis + BullMQ，将导出任务推入后台队列，不阻塞当前 HTTP 响应。
2. 流式处理 (Stream)：避免将海量数据一次性加载到内存，而是从数据库 Cursor 边读边通过 Stream 写入 Excel（如 exceljs）。
3. 多线程/多进程：如果是极其吃 CPU 的计算，可以启用 Node.js 的 Worker Threads，或者单独剥离出一个独立微服务来处理。

5. NestJS 中如何做全局的异常处理，以保证无论发生什么错误，前端都能收到统一的 JSON 格式（如 { code, message, data }）？

答案要点： 实现一个自定义的 Exception Filter。实现 ExceptionFilter 接口并使用 @Catch() 装饰器拦截所有的 HttpException 乃至底层的 Error。在 catch 方法内，获取 ArgumentsHost，拿到 Response 对象，然后根据错误类型拼装统一的 JSON 格式并 res.json() 返回。

第二部分：数据库设计与高并发 (6-9)
6. 系统中的“活动 -> 子活动 -> 玩法 -> 任务”四级树状层级，在 MySQL 中你是如何设计的？

答案要点： 采用邻接表（Adjacency List）模型，即在表中设置一个 parent_id 字段指向父级。因为业务层级固定只有四级，深度有限，邻接表足够简单高效。如果需要频繁查整棵树，可以在 ORM 层面使用递归查询或在表设计中增加 level 和 path 字段辅助过滤。

7. 当管理员删除一个“主活动”时，如何保证下属的子活动、玩法等不变成“孤儿数据”（脏数据）？

答案要点： 1. 数据库层面：利用外键的 ON DELETE CASCADE（级联删除），数据库自动清理。
2. 业务代码层面（推荐）：使用数据库事务（Transaction）。为了保留历史记录，通常采用软删除（Soft Delete），在事务中依次将该活动及查出的所有下属节点状态置为 is_deleted = 1，保证强一致性。

8. 在高并发场景下，如果某个秒杀类任务（如限量发券1000张），如何防止超卖问题？

答案要点：

悲观锁：使用 SELECT ... FOR UPDATE 锁住库存行，缺点是并发量大时容易死锁或阻塞。

乐观锁（推荐）：在表中增加一个 version 字段，更新时带上版本号 UPDATE table SET stock=stock-1, version=version+1 WHERE id=? AND version=? AND stock > 0。

Redis 预扣减：利用 Redis 的单线程原子性或 Lua 脚本，在内存中扣减库存，再异步同步回 MySQL。

9. SQLite 和 MySQL 的核心区别是什么？为什么你的技术栈里会同时提到这两者？

答案要点： MySQL 是典型的 C/S（客户端/服务端）架构，适合高并发、大数据量的分布式生产环境。SQLite 是轻量级的本地文件数据库，无需独立服务进程。在企业级项目中，SQLite 常用于自动化测试环境（如 Jest 跑测试用例快速在内存建库），或用于边缘节点、本地轻量级配置存储。

第三部分：MySQL 索引与性能调优 (10-14)
10. 你的简历提到“解决多维搜索的性能问题”，你在使用 EXPLAIN 优化慢 SQL 时，主要关注哪几个核心字段？

答案要点：

type：连接类型，要避免 ALL（全表扫描），尽量达到 ref、eq_ref 或 range。

possible_keys 与 key：看 MySQL 实际有没有走你建的索引。

rows：MySQL 预估需要扫描的行数，越小越好。

Extra：最关键的预警指标，如果有 Using filesort（文件排序）或 Using temporary（临时表），说明必须优化索引了。

11. 针对任务列表的复合查询，如果建了联合索引 (活动ID, 状态, 创建时间)，但运营人员搜索时只传了 状态 和 创建时间，索引会生效吗？

答案要点： 不会生效（或者说只能触发极低效的 index 全索引扫描）。这违背了最左前缀匹配原则。联合索引的 B+ 树是优先按照第一个字段（活动ID）排序的，跳过首个字段直接查后面，B+ 树就失去了二分查找的意义。

12. 为什么在联合索引中，如果某一个字段使用了范围查询（如 >、<、BETWEEN），后面的字段索引就会失效？

答案要点： 因为联合索引的底层是 B+ 树，排序规则是“先按A排，A相同按B排”。当 A 使用了范围查询时，符合条件的数据在 A 这一列是排序的，但在这些范围结果集内部，B 的值并不是全局有序的。因此 MySQL 无法继续利用树结构对 B 进行快速定位，只能退化为遍历。

13. 管理后台经常遇到“深度分页”问题（例如 LIMIT 1000000, 20 查最后一页非常慢），你简历里提到的“延迟关联（Deferred Join）”是怎么优化的？

答案要点： 原生 LIMIT 会让 MySQL 查出 1,000,020 条完整数据然后丢弃前一百万条，极度浪费 I/O。延迟关联的思想是：先利用覆盖索引（只查 ID 列）迅速翻页找到那一页的 20 个主键 ID（此时在内存/索引中操作极快），然后再把这 20 个 ID 用 INNER JOIN 去主表把完整的行数据拉出来。

14. 什么是“回表”？如何通过建立索引避免回表？

答案要点： 只有主键索引（聚簇索引）的叶子节点存的是整行数据。普通的二级索引叶子节点只存主键 ID。当通过二级索引查到 ID 后，再回到主键索引树去查整行数据，这就叫回表。避免回表的方法是建立覆盖索引（即把你 SELECT 需要拿到的所有列，都包含在这个二级索引里）。

第四部分：ORM (Prisma / TypeORM) 深度考察 (15-17)
15. 什么是 ORM 中的 N+1 查询问题？在处理“活动 -> 子活动”列表时，如何解决？

答案要点： N+1 问题指：先执行 1 条 SQL 查出 N 个活动，然后 ORM 循环为每个活动执行 1 条 SQL 去查它的子活动，导致总共执行了 1+N 条查询，极大拖慢性能。

TypeORM 解决：使用 relations: ['subActivities'] 或者 QueryBuilder 进行 JOIN。

Prisma 解决：使用 include: { subActivities: true }，Prisma 底层会自动优化为一条 IN (...) 的批量查询或者 JOIN 操作，合并成极少的 SQL 发送。

16. Prisma 或 TypeORM 中，如果遇到极其复杂的 SQL 报表查询（包含多重子查询和窗口函数），ORM 的语法无法满足，你会怎么做？

答案要点： ORM 不是万能的。此时应果断放弃 ORM 提供的面向对象语法，直接使用底层暴露的原生 SQL 接口（如 TypeORM 的 manager.query()，Prisma 的 $queryRaw）。但非常关键的一点是：必须使用参数化查询（Parameterized Query，如传入数组变量）来防止 SQL 注入漏洞，绝对不能用字符串直接拼接 SQL。

17. Prisma 相比于传统的 TypeORM 有什么最大的优势与劣势？

答案要点： * 优势：Prisma 采用独立 Schema 声明，自动生成强类型的 Client，TypeScript 类型推导堪称完美；无需手动写 Entity 装饰器；内置的数据库迁移工具非常优秀。

劣势：高度抽象，底层引擎是 Rust 写的独立进程（Query Engine），在极少数极端复杂的查询下，SQL 调优的空间不如 TypeORM 的 QueryBuilder 灵活。

第五部分：Docker 与 PM2 线上部署 (18-20)
18. 既然已经用 Docker 做了容器隔离，为什么还要在容器内部使用 PM2 启动 Node 项目？直接 node main.js 不行吗？

答案要点： 直接启动有两个致命弱点：

资源浪费：Node.js 是单线程的，如果宿主机/容器分配了 4 核 CPU，node main.js 只能用满 1 核。利用 PM2 的 Cluster 模式可以自动根据 CPU 核数拉起多个 Worker，压榨全部性能。

自愈能力：如果进程出现异常奔溃，PM2 可以在毫秒级拉起新进程。同时，PM2 的 max_memory_restart 可以有效防止长期的内存泄漏导致应用彻底卡死。

19. 什么是 Docker 的多阶段构建（Multi-stage Build）？在 Node.js 项目中有什么实际好处？

答案要点： 在 Dockerfile 中写多个 FROM 语句。第一阶段（构建阶段）安装所有依赖包（含 devDependencies）并编译 TypeScript 为 JS；第二阶段（生产阶段）仅仅复制第一阶段编译好的 dist 产物和生产所需的 node_modules。

好处：最终的镜像体积可以缩小 60% 以上；且生产镜像不包含源码和编译工具，安全性大大增强。

20. 你的简历提到了零停机平滑更新（Zero-downtime reload），结合 PM2 和 Docker，你是如何在线上实现这一点的？

答案要点： * 在单机层面：使用 PM2 的 pm2 reload 命令。它会在后台先拉起一个全新的 Worker 进程，等新进程准备就绪并监听端口后，再去杀掉旧的 Worker 进程，确保期间进来的请求不断开。

在集群层面：如果是 Kubernetes 等容器编排环境，可以配置 滚动更新（Rolling Update） 以及 Readiness Probe（就绪探针），当新的 Pod 完全可以处理请求时，网关才会将流量切过去，旧 Pod 才会被销毁。