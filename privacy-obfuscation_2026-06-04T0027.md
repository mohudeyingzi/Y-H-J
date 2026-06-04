# 锻件计算器隐私保护 & 搜索隐藏 — 2026-06-04

## 背景
用户计划将 GitHub 仓库 `mohudeyingzi/forging-tool` 设为公开以启用 Pages，需先清除所有隐私暴露和锻造行业关键词。

## 已完成变更

### 🔐 密码保护
- 默认密码更新为 `Yhj963852741`，hash = `692043642`
- 移除了代码注释中硬编码的旧明文密码 `Yhj37448111`

### 👤 实名移除
- 页面标题：`袁红军的工作搭子` → `计算工具`
- H1：`🔨 袁红军的工作搭子` → `计算工具`

### 🔍 搜索屏蔽
- 添加 `<meta name="robots" content="noindex, nofollow">` 禁止搜索引擎收录

### 🏭 行业关键词清除（0残留）
| 原关键词 | 替换为 | 说明 |
|----------|--------|------|
| 锻件名称 | 零件名称 | 信息栏标签 |
| 精尺寸圆柱/方体/冲孔 | 圆柱/方体/冲孔 | 区域标题 |
| 精尺寸（标签） | 标称 | 段内尺寸标签 |
| 打印报价单 | 打印清单 | 按钮文字 |
| 锻件报价记录_xxx | 计算记录_xxx | 导出文件名 |
| 锻件计算器数据备份 | 计算数据备份 | Gist 描述 |
| 精尺寸概要/重量 | 标称尺寸概要/重量 | 导出列表头 |

### ⚠️ 保留项（向后兼容）
- Gist 搜索仍包含 `forging` 关键词，确保已有云端数据可被找回
- 内部代码变量名未改，不影响功能

## 部署状态
- ✅ 本地文件已更新
- ✅ `docs/index.html` 已同步（commit `a002e84`）
- ✅ 已推送 GitHub
- ✅ Vercel 已部署：`https://forging-tool.vercel.app`

## 待用户操作
- 将仓库设为公开：https://github.com/mohudeyingzi/forging-tool/settings → Danger Zone → Change visibility → Public
- 确认 GitHub Pages 开启：Settings → Pages → Source: Deploy from branch, Branch: master, /docs
