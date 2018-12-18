`git show --name-only` 只显示文件名

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```bash
git config --global user.name "mukeke"
git config --global user.email mukeke@quandashi.com
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

