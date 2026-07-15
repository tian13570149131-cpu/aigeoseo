# AGENTS.md

## 项目概述
将「添廣网络运营」WordPress 主题（tianguang-wordpress-theme-5）的 `front-page.php` + `header.php` + `footer.php` 合并为一个纯静态 HTML 单页，直接部署到 GitHub Pages。

## 目录结构
```
.
├── index.html            # 单页入口（Header + 首页板块 + Footer 合并）
├── assets/
│   ├── css/style.css     # 从主题原样拷贝的样式
│   └── js/main.js        # 从主题原样拷贝的交互脚本
├── images/               # 主题原始素材（Hero 幻灯片 + 案例图）
├── DESIGN.md
├── AGENTS.md
└── .coze                 # 本地/线上预览：python -m http.server
```

## 板块索引（index.html）
1. `#hero` Hero 英雄区（含 5 张幻灯片，自动播放/点/箭头/触摸）
2. `#pain` 4 个痛点卡片
3. `#solutions` AI 建站 / Google SEO / AI GEO 三大方案
4. `#target-clients` 4 类目标企业
5. `#advantages` 6 项品牌优势
6. `#data` 4 项核心数据
7. `#process` 6 步服务流程
8. `#cases` 3 个客户案例
9. `#faq` 8 条常见问题（手风琴）
10. `#cta` 联系号召
11. `footer` 页脚 & 悬浮电话按钮

## 已剥离的 WordPress 动态板块
- `featured-category-posts`（分类文章卡片）
- `latest-news-ticker`（滚动条）
- `blog-archive`（博客列表）
- 微信二维码弹窗、社交链接（缺素材）

## 部署到 GitHub Pages
1. 将本目录内容推到 GitHub 仓库（保留 `index.html`、`assets/`、`images/`）
2. Settings → Pages → Source 选择 `main` 分支 `/root`
3. 访问 `https://<user>.github.io/<repo>/` 即可

## 本地预览
- 沙箱内已由 `.coze` 配置，使用 `python -m http.server ${DEPLOY_RUN_PORT}` 拉起。
- 本地也可 `cd project && python3 -m http.server 8080`。

## 修改要点
- 联系电话、邮箱：在 `index.html` 中直接搜索 `400-888-8888` / `contact@tianguangnet.com` 全局替换。
- Hero 幻灯片：修改 `.hero-slide` 里的 `img src` 与 `hero-slide-caption`，同步增减 `.hero-slider-dot`。
- 案例、FAQ、服务流程：直接改 HTML，无需重新构建。
