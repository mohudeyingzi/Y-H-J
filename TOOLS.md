# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 🔗 计算工具 - 全部关键地址

### 在线访问
| 名称 | 地址 | 备注 |
|------|------|------|
| GitHub Pages | https://mohudeyingzi.github.io/Y-H-J/ | ✅ 仓库已公开，master/docs 自动部署 |
| Vercel | https://forging-tool.vercel.app | 🚫 国内被墙，国外可用（需在 Vercel 控制台改名） |
| 本地文件 | C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html | ✅ 双击即可用 |

### GitHub 相关
| 名称 | 地址 | 备注 |
|------|------|------|
| Token 创建 | https://github.com/settings/tokens | 生成 classic token → 勾选 `gist` 权限 |
| Token 查看/管理 | https://github.com/settings/tokens | 只在创建时显示一次 |
| 仓库主页 | https://github.com/mohudeyingzi/Y-H-J | master 分支 |
| Pages 开启设置 | https://github.com/mohudeyingzi/Y-H-J/settings/pages | Source: master + /docs folder |
| SSH 公钥管理 | https://github.com/settings/keys | | |

### 本地文件路径
| 名称 | 路径 | 用途 |
|------|------|------|
| 主文件 | C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html | 源文件，所有功能都在这 |
| GitHub Pages 副本 | C:\Users\Administrator\.qclaw\workspace\docs\index.html | 推到 GitHub 的 Pages |
| Vercel 部署目录 | C:\Users\Administrator\.qclaw\deploy\forging-tool\index.html | vercel --prod 部署源 |

### Vercel 管理
| 名称 | 地址 | 备注 |
|------|------|------|
| Vercel 控制台 | https://vercel.com/dashboard | 查看/管理部署 |
| 项目详情 | https://vercel.com/yhj-s-projects/forging-tool | 需重命名项目 |
