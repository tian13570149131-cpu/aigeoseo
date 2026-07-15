# DESIGN.md

本项目沿用「添廣网络运营」WordPress 主题原有的视觉语言，将首页转换为可直接部署到 GitHub Pages 的静态单页。

## 气质与意象
- 面向外贸出海企业的 B2B 营销型落地页，专业、可信、结果导向。
- 视觉锚点：深海军蓝 + 高纯度橙 + 提示绿，传达「传统搜索 + AI 搜索双引擎」的稳健与创新并存。

## Design Tokens（沿用主题 CSS 变量）
### 色彩
- `--brand: #15314B`（深海军蓝，品牌主色）
- `--brand-light: #1B4D7C`
- `--teal: #0D9488`
- `--orange: #F97316`（强调 / SEO 板块）
- `--green: #22C55E`（AI GEO 板块 / 成功指标）
- `--soft-blue: #F0F7FF`（浅背景）
- `--dark-footer: #0A1A2E`（页脚深色）

### 字体
- 系统字体栈：`'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', -apple-system, 'Segoe UI', Roboto, sans-serif`

### 圆角与阴影
- `--radius: 12px` / `--radius-lg: 16px`
- 卡片浅阴影 `0 4px 12px rgba(0,0,0,0.08)`；悬停加深至 `0 12px 32px rgba(0,0,0,0.12)`。

## 布局
- 桌面：`--container: 1200px` 居中，`section` 上下 padding 112px。
- 移动：`section` padding 80px，网格自适应为 1~2 列。

## 交互
- 首屏 Hero 幻灯片：自动播放 4s、支持点、箭头、触摸滑动。
- 数据数字：进入视口后 easeOut 递增动画。
- 元素淡入：`.fade-in-up` 结合 IntersectionObserver。
- FAQ 手风琴：同一时刻只展开一条。
- 平滑锚点滚动 + 顶栏滚动态样式切换。

## 静态化改造
- 移除 WordPress 动态板块：`featured-category-posts`、`latest-news-ticker`、`blog-archive`。
- Hero 幻灯片改为使用主题内置 `images/*.jpg` 静态素材。
- 页脚微信二维码弹窗、社交链接因缺素材而移除。
