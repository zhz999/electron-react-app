// public/electron.js
const {app, BrowserWindow, ipcMain, Tray, Menu, Notification, nativeImage} = require('electron');
const path = require('path');

let tray = null

function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: './public/icon.jpeg'
    });
    // 加载应用的主页面
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // 打开开发者工具
    // win.webContents.openDevTools();

    // setInterval(()=>{
    //     win.webContents.send('message',{msg:'服务端推送消息'})
    // },2000)
    win.on('ready-to-show', () => {
        const icon = nativeImage.createFromPath('./public/icon.jpeg')
        tray = new Tray(icon)
        tray.setToolTip('This is my application.')
    })

    win.on('close', () => {
        if (app) app.quit()
    })
}

// 当应用程序准备就绪时，创建浏览器窗口
app.whenReady().then(() => {
    createWindow()
});


// 当所有窗口都关闭时退出应用程序
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// 在 macOS 上，单击 Dock 图标时重新创建一个窗口
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// 在主进程中监听渲染进程发来的消息
ipcMain.on('message', (e, msg) => {
    console.log(msg)
    e.returnValue = msg
})

ipcMain.on('notification', (e, message) => {
    const NOTIFICATION_TITLE = '消息提醒'
    new Notification({
        icon: './public/icon.jpeg',
        title: NOTIFICATION_TITLE,
        body: message
    }).show()
})
