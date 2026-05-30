# 2026-05-22 工作日志

## 锻件算重报价系统 - 导出修复 + 差额显示修复

### 问题1：导出Excel - 火耗重量/单重/总重/总价列数据异常

**根因**：导出 getter 对旧记录字段缺失无防御，fireLoss 的 `.replace()` 可能抛出异常。

**修复**：
- 火耗重量 getter：`String(r.fireLoss||'').replace(' KG','')` → `var v=r.fireLoss; return v!=null?String(v).replace(/\s*KG\s*/g,'').trim():''`（兼容含空格、大小写写法）
- 单重/总重/总价 getter：`||''` → `var v=r.xxx; return v!=null?v:''`（区分 null 和合法 0 值）
- saveRecord 中新增 `unitWeightN:f(v('top_unitWt'),1)` 字段备用

### 问题2：橙色差额显示 - 正数无"+"号 + 胶囊溢出

**根因**：
- `f(diff,1)` 对正数不输出"+"号，用户难以识别正负
- diff-highlight CSS 字号 20px + padding 20px，数值长时溢出 120px 列宽

**修复**：
- `setText('r_fangdun', (diff>=0?'+':'')+f(diff,1)+' KG')` — 正数显式加"+"
- `.diff-highlight`：字号 20→17px，padding 20→14px，border-radius 20→16px，新增 `max-width:100%; white-space:nowrap`

### 问题3：历史记录表格列宽微调（前次未完成）

**补充**：`.rec-actions` 的 `white-space:nowrap` 内联样式改为 CSS 类控制，彻底移除所有 `style=` 内联属性。

---

## 文件变更

`C:\Users\Administrator\.qclaw\workspace\forging-calculator-template.html`

| 修改 | 位置 |
|------|------|
| 差额正数加"+" | JS calcResults setText r_fangdun |
| diff-highlight CSS 缩小 | `<style>` .diff-highlight |
| 导出 getter 防御性修复 | JS EXPORT_HEADERS 6个getter |
| saveRecord 新增 unitWeightN | JS saveRecord() |
| 历史记录td样式类化 | renderRecords() 行模板 |
