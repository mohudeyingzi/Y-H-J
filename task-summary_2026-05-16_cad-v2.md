# CAD图纸矢量化工具优化 - 2026-05-16

## Objective
优化 CAD.py 图纸矢量化工具，从 v1(轮廓检测) 升级到 v2(HoughLinesP直线+HoughCircles圆检测+线段合并)

## Key Changes
1. **直线检测**: Canny+findContours → HoughLinesP，保留线条连续性
2. **圆检测**: 新增 HoughCircles，带去重逻辑(dp=2.0, minDist=50, param2>=120)
3. **线段合并**: 共线线段合并算法，2988条原始线段→680条合并后线段
4. **二值化**: 新增 adaptive/otsu/canny 三种方法可选
5. **OCR**: 预留 Tesseract OCR 支持（需安装Tesseract）
6. **GBK兼容**: safe_print 函数避免 Windows 控制台 UnicodeEncodeError

## Results (FLS3F-G-阀盖A2.pdf)
- v1: 1244 轮廓（线条断裂、文字丢失、圆弧变折线）
- v2: 680 直线段 + 111 圆（线条更连续，圆更准确）

## Pending
- Tesseract OCR 安装失败（网络问题），待重试
- 可调整参数进一步优化（--hough-threshold, --circle-threshold等）

## Files Modified
- D:\CS\CAD.py (rewritten v2.0)
- D:\CS\CAD.bat (unchanged, still works)
