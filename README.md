# VM Brands 官网

一个基于 `Next.js 16 + TypeScript` 的前后台品牌官网项目，面向：

- 姜生品牌咨询（深圳）有限公司
- 域名：`vmbrands.com`
- 业务范围：品牌出海咨询、品牌体系建立、品牌 VI 设计、品牌官网建设、品牌内容制作、品牌视频制作、平台代运营、海外社媒运营、全球展会服务

## 已实现内容

- 高端全宽首页视觉，主色为紫色 + 绿色，带动态渐变、浮层、滚动平台带与滚动显现动画
- 首页首屏接入并压缩 `images/jiangsheng.png`，输出为 `public/images/jiangsheng-hero.webp`
- 前台咨询表单，可将线索写入本地数据文件
- 后台登录页与后台内容管理页
- 后台可编辑首页主要文案、指标、服务矩阵、优势、流程、平台与 CTA
- 后台可查看前台提交的咨询线索
- `robots.txt` 与 `sitemap.xml`

## 数据存储

当前版本使用本地 JSON 文件存储：

- `content/site-content.json`：官网内容
- `content/leads.json`：咨询线索

这适合当前快速上线和本地部署。如果后续要做多人协作、云端持久化或更高安全性，建议升级到数据库或 CMS。

## 启动方式

1. 安装依赖

```bash
npm install
```

2. 复制环境变量

```bash
copy .env.example .env.local
```

For production deployments, set `VMBRAND_CONTENT_DIR` to a persistent writable directory so booking leads and CMS edits can be saved reliably.

```bash
VMBRAND_CONTENT_DIR=/var/www/vmbrand-data
```

For Vercel deployments, prefer `BLOB_READ_WRITE_TOKEN` instead of filesystem storage. When this env var is present, the booking leads and CMS content will be stored in Vercel Blob automatically.

3. 启动开发环境

```bash
npm run dev
```

4. 生产构建

```bash
npm run build
npm run start
```

## 后台默认信息

- 后台地址：`/admin/login`
- 默认账号：`admin`
- 默认密码：`Vmbrands2026!`

上线前请务必修改：

- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

## 构建验证

已通过：

```bash
npm run lint
npm run build
```
