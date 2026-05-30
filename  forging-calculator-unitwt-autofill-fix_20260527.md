# 任务：修复锻件计算器单重自动填充问题

## 目标
当用户未手动填写"单重(KG)"字段时，自动填充"实际下料重量"。

## 问题分析
- **原逻辑:** `if(manualUnitWt===null)setVal('top_unitWt',f(actualCutWt,1));`
- **Bug:** 用户先输入直径（高度为空）→ `calcAll()` 把 `top_unitWt` 设为 `"0.0"` → 用户输入高度后再次 `calcAll()` → `v('top_unitWt')` 返回 `0`（不是 `null`）→ 自动填充不触发
- **结果:** 单重字段卡在 `"0.0"`，不会更新为正确的实际下料重量

## 修复内容

### 1. 自动填充条件扩展
**文件:** `forging-calculator-template.html` (字符位置 39980)
**修改:** `if(manualUnitWt===null)` → `if(manualUnitWt===null||manualUnitWt===0)`
**效果:** 当值为空或零时都会自动更新

### 2. 页面加载初始化
**文件:** `forging-calculator-template.html` (字符位置 67054)
**修改:** `window.onload=function(){addSeg('cyl');};` → `window.onload=function(){addSeg('cyl');calcAll();};`
**效果:** 页面加载后立即计算，确保初始状态一致

### 3. 重置后初始化
**文件:** `forging-calculator-template.html` (字符位置 42891)
**修改:** `resetAll` 函数末尾添加 `calcAll();`
**效果:** 重置后自动计算，单重字段显示初始值

## 验证
- `if(manualUnitWt===null||manualUnitWt===0)` ✅ 已替换
- `window.onload` 包含 `calcAll()` ✅ 已添加
- `resetAll` 包含 `calcAll()` ✅ 已添加

## 文件
- `C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html`
