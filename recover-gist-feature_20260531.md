# 云同步「找回 Gist」功能实现

## 目标
用户换设备或清浏览器缓存后，忘记 Gist ID 时可一键恢复，无需手动访问 gist.github.com（国内打不开）

## 实现内容

### UI 变更
- 同步面板新增 `🔍 找回 Gist` 按钮（有 Token 但无 Gist ID 时显示）
- 新增 `.gist-list` 面板，展示匹配的 Gist 列表
- 提示文案增加换设备恢复说明

### 核心逻辑（3个新函数）
1. **`findUserGists()`**：调用 `GET /api.github.com/gists` 拉取用户所有 Gist，过滤包含 `forging` 或 `锻件` 关键字的
2. **`renderGistList(gists)`**：渲染 Gist 卡片列表，显示名称、创建日期、文件数
3. **`recoverGistByIndex(idx)`** / **`recoverGist(gistId, rawUrl)`**：从全局数组按索引取数据，写入 localStorage 保存 config，更新 UI

### 技术细节
- 用全局数组 `_foundGists` 暂存 Gist 列表，避免内联 onclick 中 URL 转义问题
- `toggleSyncPanel()` 和 `saveSyncSettings()` 同步更新按钮显示逻辑

## 部署
- Vercel ✅ Ready in 10s
- GitHub ✅ commit 36049f9
- 文件：`workspace/forging-calculator-template.html`