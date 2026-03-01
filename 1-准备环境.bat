@echo off
chcp 65001 >nul
title 人生重开模拟器 - 准备环境

echo =======================================================
echo               人生重开模拟器 - 准备环境
echo =======================================================
echo.


echo 正在检查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js！
    echo 请前往 https://nodejs.org/ 下载并安装 Node.js（推荐长期维护版 LTS）。
    echo 安装完成后，请重新打开此文件。
    pause
    exit
)
echo Node.js 已安装，版本为：
node --version
echo.


echo 正在检查 Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] 未检测到 Git！
    echo 建议前往 https://git-scm.com/ 下载并安装 Git（如果你不需要用到 git 可以忽略此警告）。
) else (
    echo Git 已安装，版本为：
    git --version
)
echo.


call pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 未检测到 pnpm，将使用系统自带的 npm。
    echo pnpm 和 npm 都是包管理工具，作用相同。
    echo.
    echo 正在安装项目依赖，请耐心等待（这可能需要几分钟）...
    call npm install
) else (
    echo 检测到 pnpm，版本为：
    call pnpm --version
    echo.
    echo 正在安装项目依赖，请耐心等待（这可能需要几分钟）...
    call pnpm install
)

echo.
echo =======================================================
echo 环境准备已完成！如果没有报错，现在你可以双击运行【2-运行游戏.bat】了！
echo =======================================================
pause
