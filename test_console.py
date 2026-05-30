import sys, os, time, ctypes

# 检测是否在控制台中运行
is_tty = sys.stdin.isatty()

print(f"Python: {sys.executable}")
print(f"stdin isatty: {is_tty}")
print(f"stdout: {sys.stdout}")

if not is_tty:
    # 非交互：分配控制台并等待
    kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
    kernel32.AllocConsole()
    print("控制台已分配（双击场景）")
else:
    print("在控制台中运行")

# 显示帮助文本
print("\n提取图片或PDF中的轮廓并导出为DXF")
print("用法: CAD.py <输入文件> [输出.dxf] [选项]")
print("\n直接双击会显示此帮助。")
print("\n窗口将在 8 秒后自动关闭...")
sys.stdout.flush()
time.sleep(8)
print("退出。")