# ParticleGS 源码阅读器

用于非商业学习和研究的中文交互阅读器，内含源码浏览、代码讲解、术语悬停及可点击的 SVG 图示。论文作者、官方仓库、源码提交和许可证见[源码署名与许可](credits.html)。

## 本地预览

双击 `index.html`。从上方的「可视化」进入图示，点击左上角的「源码署名与许可」查看来源和许可证。

## GitHub Pages 发布

1. 在 GitHub 建立用于此站点的仓库。GitHub Free 可使用公开仓库，发布后的站点可供任何知道网址的人访问。
2. 将**本目录内的文件和 `licenses/` 子目录**上传到仓库的 `main` 分支根目录，包含点开头的空文件 `.nojekyll`。入口 `index.html` 应位于仓库根目录。
3. 在 **Settings → Pages** 选择 **Deploy from a branch**，再选择 **main / (root)** 并保存。部署完成后，在同一页点击 **Visit site** 获取网址。

仓库名可以用 `particlegs-reader`。源码、讲解和 SVG 图示由浏览器加载，无需安装 Python 或 CUDA。

[GitHub Pages 发布文档](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
