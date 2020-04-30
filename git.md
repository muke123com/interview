[TOC]

### git笔记

`git show --name-only` 只显示文件名

`git diff commit1 commit2 --stat `查看两个commit文件差异



```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 保存账号密码

```bash
git config --global user.name "mukeke"
git config --global user.email mukeke@quandashi.com

# 方法2
git config --global credential.helper store #再输入一次就保存了
```

* 在错误的分支修改代码
  `git log`找到`commit`  (当前分支)
  `git cherry-pick 79715e3a5`（commit提交时的编码）(要合并的分支)
* 清除缓存，使ignore起作用
```bash
git rm -r --cached .
git add .
git commit -m ""
```

* 删除远程分支
```bash
git branch -r -d origin/branch-name  
git push origin :branch-name  
```

连接远程
```bash
git remote add origin [git-url]
git pull --rebase origin master
git push --set-upstream origin master
```

多个远程分支

`.git/config`  中添加远程地址

```bash
[remote "origin"]
	url = https://github.com/muke123com/learn_node.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[remote "mirror"]
	url = http://git.quandashi.cn:3000/mukeke/qds-node.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	remote = mirror
	merge = refs/heads/master
[branch "test"]
	remote = origin
	remote = mirror
	merge = refs/heads/test
```

```bash
git pull origin master
git pull mirror master
```

```bash
git push origin master
git push mirror master
```

合并commit

```bash
git rebase
```



#### [搭建git服务器](https://www.jianshu.com/p/ade38a53b1ac)

gitlab

```bash
# gitlab 安装脚本
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh > rpm.sh
chmod +x rpm.sh  # 给了执行权限  -x去除执行权限
./rpm.sh

# 使用yum安装gitlab
yum install -y gitlab-ee
# 可以看下gitlab-ee包的内容，看到gitlab安装在/opt/gitlab目录下
rpm -ql gitlab-ee | less
```