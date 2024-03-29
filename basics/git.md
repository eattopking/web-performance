git 中两个分支的比较， 都是后面文件和前面文件的比较， 如果只输入一个分支， 那么输入的分支是被放在前面的分支




####  合并代码

1. 将主分支的更新代码合到开发分支, 需要使用git rebase [主分支名], 这样可以少一个提交记录和merge比,
  ```
  1. git rebase [主分支名]    将主分支更新合到开发分支

  2.如果出现冲突,解决冲突 git add . ,然后执行git rebase --continue, 继续将patch文件中主分支的修改合到开发分支中

  3. 最后在开发分支中将合并过来的更新, git push --force 提交到远端, 直接git push 不能推上去会报错

  4. 我们在开发分支中rebase了主分支的代码, 然后可以直接在主分支merge这个开发分支代码, 但是这个时候也是会回产生一个merge 提交的, 但是之前开发分支rebase的时候没有额外的提交记录, 这样保证提交记录的整洁

  5. 使用git rebase —-abort 将合并到开发分支的内容回退, 将开发分支回退到没有合并之前的状态

  6. git rebase 就是将开发分支的提交拼在主分支的新提交之前, 永远在主分支的新提交之前
  ```

2. 在我们将开发分支的内容合并到主分支的时候使用git merge

#### 将本地多个请求合并成一个

git rebase 将本地的多个commit合并成一个请求, 这种场景只能在本地使用

git rebase -i的文档：https://juejin.cn/post/7035512330662182920

#### git commit --amend

1. 在创建一个commit之后， 再修改内容提交的时候不想创建新的commit，只想作为上次commit的追加内容就是用git commit --amend，如果这个commit没有push，追加之后直接git push 就可以提交到远端了
2. 如果这个commit已经push到远端了，这个时候也可以通过git commit --amend追加，但是推送到远端的时候需要使用git push --force


#### 如果想将一个分支上的几个提交，合并到另一个分支可以使用git cherry-pick

1. git cherry-pick <commitHash>
2. git cherry-pick 分支名，表示这个分支最新的提交
3. 当git cherry-pick发生冲突的时候，用户解决完冲突后，git add . 之后，然后接着执行git cherry-pick --continue，继续合并
4. 在发生冲突的时候 git cherry-pick --abort，表示放弃合并，回到操作前的样子。
5. git cherry-pick --quit，发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子



#### git push -u 的含义

```
git push -u 就是在第一个见本地分支push到远端的时候, 将本地分支和远端的这个分支做了关联

在本地的.git/config文件中创建

[branch "test"]
	remote = origin
	merge = refs/heads/test

用于将本地test分支和远程test分支做关联

这样像git pull 和git push这些操作就不需要加参数了, 直接默认指向远程test分支

```

#### git reset --hard 

```
1. 不但可以回退merge之后的版本
2. 还可以回退rebase之后的提交, 回退到rebase之前的提交
```

#### git revert commitid

```
1. git revert 是回退指定commit的更改并产生一个新的提交
```

### git bisect 二分查找分支

```
1. git bisect good commitId 先标记好的commitId

2. 然后标记当前的有问题的commitId git bisect bad

3. 然后会分析出一个commitId， 我们验证后标记git bisect bad 或者git bisect good，标记good
就跳转到下一个可能bad的commit, 验证为bad就是找到了

4. 等找到之后git bisect reset，就回到一开始的commitId
```

### git log 用法

https://www.cnblogs.com/EnSnail/p/6772454.html