import sys, os, time

# 强制使用 Python 3.12
_PYTHON_312 = r"C:\Users\Administrator\AppData\Local\Programs\Python\Python312\python.exe"
if os.path.isfile(_PYTHON_312) and sys.executable.lower() != _PYTHON_312.lower():
    os.execv(_PYTHON_312, [sys.executable] + sys.argv)

# 显示帮助
print("提取图片或PDF中的轮廓并导出为DXF")
print()
print("用法: CAD.py <输入文件> [输出.dxf] [选项]")
print()
print("选项:")
print("  --scale      缩放倍数")
print("  --blur       高斯模糊核 (奇数, 默认5)")
print("  --canny-low  Canny 低阈值 (默认50)")
print("  --canny-high Canny 高阈值 (默认150)")
print("  --min-area   最小轮廓面积 (默认50)")
print("  --dpi        PDF转图片DPI (默认300)")
print("  --page       PDF页码 (从1开始)")
print()
print("直接双击或拖放文件到本脚本上运行")
print()
print("提示: 可以把图片/PDF直接拖到本脚本图标上自动处理")
print()
print("正在等待 10 秒后退出...")
sys.stdout.flush()
time.sleep(10)