# 锻件计算器 GitHub Gist 云同步功能实现

## 目标
实现跨设备（电脑↔手机）记录自动同步，打开页面即可获取最新数据。

## 方案
GitHub Gist Raw URL 天然支持 CORS，浏览器可直接 fetch。
- 读取：fetch raw.githubusercontent.com → 合并记录
- 写入：GitHub API PATCH → 需要 Token

## 完成内容
1. 工具栏新增「☁️ 云同步」按钮 + 设置面板
2. 页面加载时自动从 Gist 拉取并合并记录（仅当有变化时更新）
3. 手动拉取/推送按钮
4. 保存记录时自动推送（如配置了 Token）
5. 同步时间状态显示

## 用户 Gist
- Raw URL: `https://gist.githubusercontent.com/mohudeyingzi/e043c5a6fad1698b9c67508f3316ad16/raw/forging_sync_records.json`
- Gist 内容当前为 `[]`（空数组），首次计算保存后会自动填充

## 文件
- `C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html`（已修改，3 处 edit + JS 语法验证通过）