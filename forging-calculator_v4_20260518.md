# 锻件算重报价系统 v4.0 - UI优化与冲孔高度自动填充

**任务时间**: 2026-05-18 15:04 - 15:47

**目标**: 修复表格显示问题并实现冲孔高度自动填充功能

---

## 用户反馈问题

1. **精尺寸输入框太宽** → 缩短为56px（2-4位数字够用）
2. **自动生成列太窄** → 加宽到220px
3. **冲孔高度不填时** → 自动取圆柱/方体的理论毛坯高度

---

## 核心修改

### 1. CSS表格布局优化

```css
/* 精尺寸输入组 (短) */
.dim-main{width:56px; padding:5px 3px; flex:none}
.dim-allow{width:42px; padding:5px 3px; flex:none}

/* 自动生成结果列 (宽) */
.size-col{width:220px}
```

### 2. 冲孔高度自动填充逻辑

```javascript
// 计算时先找出圆柱/方体的最大理论高度
var baseH = 0;
cyls.forEach(function(c){
  if(c.td!==null && c.th!==null){
    var h = c.th + c.tha;  // 理论高度 = 精高度 + 余量
    if(h > baseH) baseH = h;
  }
});
rects.forEach(function(r){...});

// 冲孔高度未填时用baseH
var useH = (h.th !== null) ? h.th : baseH;
```

### 3. HTML结构修正

- 移除 `colspan="2"`：表头已拆分为独立列，body也用单个 `<td>`
- 表头宽度统一：`size-col:220px` / `dim-cell:115px` / `wt-col:68px`

---

## 关键设计决策

| 项目 | 原设计 | 新设计 |
|------|--------|--------|
| 精尺寸输入宽度 | 自动撑满 | **固定56px** |
| 余量输入宽度 | 自动撑满 | **固定42px** |
| 理论毛坯列 | 200px | **220px** |
| 冲孔高度未填 | 报错跳过 | **自动取圆柱/方体高度** |
| 表格布局 | colspan=2 | **独立列，无colspan** |

---

## 使用示例

**冲孔高度自动取值场景**：
1. 圆柱1：直径600mm，高度400mm，余量5mm → 理论高度405mm
2. 冲孔1：孔径180mm，高度留空 → 自动取405mm
3. 计算结果：冲孔体积 = π × (90mm)² × 405mm

---

## 输出文件

`C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html` (25339字节)

---

## 后续建议

1. 可加"导出Excel"功能
2. 可增加材料库选择（不同密度）
3. 可加历史记录保存