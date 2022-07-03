---
title: 使用 GitHub Actions 自动化构建/部署 GitHub Page
date: 2021-11-24
---

```yml
# .github/workflows/deploy.yml
name: Deploy Blog
on:
  push:
    branches:
      - master # 当有 commit 被 push 到 master 分支时，执行下面的 jobs
jobs:
  deploy: # job name
    runs-on: macos-latest # jobs 运行在 macos 上
    steps:
      - name: Check out Git repository
        uses: actions/checkout@v2 # 拉取当前最新代码

      - name: Install Node.js, NPM and Yarn
        uses: actions/setup-node@v2 # 初始化 node 环境
        with:
          node-version: '12'

      - name: Cache NPM dependencies
        uses: actions/cache@v2 # 缓存 ~/.npm 内的 npm 包，以免每次执行 jobs 的时候都需要重新下载
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-cache
          restore-keys: |
            ${{ runner.os }}-npm-cache

      - name: Build # 安装 npm 包 & 执行 hexo 的打包命令（不使用 hexo 的 deploy 命令，而是通过下一个 step 来部署）
        run: |
          npm install
          npm run build-only
        env:
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          GH_TOKEN: ${{ secrets.ACCESS_TOKEN }}

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3 # hexo 构建后的文件在 public 目录下，将该目录下的文件推送到另一个仓库
        with:
          personal_token: ${{ secrets.ACCESS_TOKEN }} # 由于推送到另一个仓库需要权限，所以需要创建/配置一个 personal access token
          external_repository: FredZeng/FredZeng.github.io # 如果是推送到同一个仓库，就可以不用写这个
          publish_dir: ./public
          publish_branch: master
```

### 配置
1. [Creating a personal access token](https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 创建自己的 access token，一般勾选上 `repo` 就可以了；请务必复制，保存好生成的 `token`。
2. [Encrypted secrets](https://docs.github.com/cn/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) 将创建好的 `token` 添加到项目的 **Actions secrets** 中，这样你才能在 action 里面用到上述的 `secrets.ACCESS_TOKEN`。
3. 🎉🎉🎉 你已经完成了所有前置步骤，可以享受自动化部署了

### 其他

其他方案可参考官方文档 [将 Hexo 部署到 GitHub Pages](https://hexo.io/zh-cn/docs/github-pages) 实现自动化部署。
