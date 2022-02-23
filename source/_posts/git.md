---
title: Git 速记
date: 2021-11-19
---

## Git 速记

1. 批量重置 commit author

```bash
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

2. 创建一个全新的分支，没有历史记录

```bash
git checkout --orphan <branch>
```

3. 添加/修改远程仓库地址

```bash
# 添加仓库地址
git remote add [shortname] [url]

# 修改仓库地址
git remote set-url [shortname] [url]
```
