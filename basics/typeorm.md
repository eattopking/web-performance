typeorm 使用流程

1. 定义实体(就是定义表的定义项), 
```
// 定义实体和设置自定义表名
import { Entity, Column } from 'typeorm';

@Entity({ name: 'test' })
```

2. 引入typerorm 中的getConnectionManager方法, 创建一个管理器实例, 用来创建一个新的数据库连接

```
import { Connection, getConnectionManager } from 'typeorm';
```

3. 使用getConnectionManager 创建一个管理器实例, 然后创建一个数据库连接实例, 并将连接注册到管理器

```
const manager = getConnectionManager();

// 创建数据库连接实例
const connection = manager.create({
    // 数据库类型
    type: 'better-sqlite3',
    // 数据库名
    name: 'eattopking',
    logging: ['error'],
    // 数据库文件名称和存放路径
    database: '/user/index.db',
    synchronize: true,
    // 数据库实体的引入
    entities: ['实体1', TEST, USER, NAME],
  }
})
```

4. 使用数据库连接实例进行数据库操作

// 首先连接数据库
connection.connect();

然后就可以用然后就可以用connection去操作数据库啦去操作数据库啦

5. 然后获取对应实体的储存库对特定的表进行操作
```
import { EntityRepository } from 'typeorm';
import { Test } from '../model/test';
import { Repository } from './base/repository';

// 创建自定义储存库, 对表进行自定义操作, 自定义的储存库是一个类, 实例化后可以对表进行操作
@EntityRepository(Test)
export class TestRepository extends CommonRepository<Test> {
//获得实体对应的自定义储存库实例对表进行自定义操作
const repository = connection.getCustomRepository(TestRepository);
```

6. typeorm的api 主要分为 manager(管理器api), connection(数据库连接实例api), 还有就是储存库的操作的api(就是操作表的api)