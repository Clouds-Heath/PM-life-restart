@echo off
chcp 65001 >nul
title 人生重开模拟器 - 运行游戏

echo =======================================================
echo               人生重开模拟器 - 运行游戏
echo =======================================================
echo.


if not exist "node_modules\" (
    echo [错误] 找不到 node_modules 文件夹！
    echo 请先双击运行【1-准备环境.bat】来安装必要的依赖文件。
    pause
    exit
)


call pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    set PKG_MANAGER=npm
) else (
    set PKG_MANAGER=pnpm
)

echo 正在使用 %PKG_MANAGER% 运行...
echo.


if not exist "public\data\" (
    echo [1/2] 初次运行，正在将 excel 转化成数据，请稍候...
    call %PKG_MANAGER% run xlsx2json
) else (
    echo [1/2] 检测到已有数据，已跳过 excel 转换。直接启动！
    echo （提示：如果你手动修改了 excel 里的数据，请删除 public\data 文件夹再运行此脚本，就会重新转换了）
)

echo.
echo [2/2] 正在开启本地服务器并自动打开浏览器...
echo （按 Ctrl + C 可以随时中断游戏服务器并关闭黑框）
echo.


call %PKG_MANAGER% run dev -- --open

pause
