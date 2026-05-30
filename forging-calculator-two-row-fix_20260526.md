# 锻件报价计算器 - 手机竖屏 理论毛坯/理论重 两行布局

## 需求
手机竖屏下，段区内"理论毛坯"和"理论重"横排挤在一行看不清楚。
要求：改成两行竖排，理论毛坯输入框拉最长。

## 修改
`forging-calculator-template.html` 内 `@media(max-width:600px)` 断点：

| 属性 | 原来 | 现在 |
|------|------|------|
| `.result-wrap` | `flex-wrap:wrap` | `flex-direction:column`（竖排两行） |
| `.result-box` | 无 | `width:100%`（每行撑满） |
| `.result-input` | `width:70px;max-width:70px` | `flex:1;max-width:none`（填满行宽） |

## 验证
JS 语法通过