// public/electron.js
const {app, BrowserWindow, ipcMain, Tray, Menu, Notification, nativeImage} = require('electron');
const path = require('path');
// https://www.electronjs.org/zh/docs/latest/api/frameless-window#%E7%82%B9%E5%87%BB%E7%A9%BF%E9%80%8F%E7%AA%97%E5%8F%A3
// https://www.electronjs.org/zh/docs/latest/api/tray
let tray = null

function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 280,
        height: 499,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        backgroundColor:'darkgray',
        icon: './public/icon.jpeg'
    });
    // 加载应用的主页面
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // 打开开发者工具
    win.webContents.openDevTools();

    // setInterval(()=>{
    //     win.webContents.send('message',{msg:'服务端推送消息'})
    // },2000)
    const icon = nativeImage.createFromPath('/public/icon.jpeg')
    tray = new Tray(icon)
    tray.setToolTip('测试应用')
    const contextMenu = Menu.buildFromTemplate([
        {label: '测试', type: 'radio'},
        {label: '推出', type: 'radio'}
    ])
    contextMenu.items[1].checked = false
    tray.setContextMenu(contextMenu)
    let clickCallBack = () => {
        win.show()
    }
    if (process.platform === `darwin`) {
        tray.on('mouse-up', clickCallBack)
    } else {
        tray.on('click', clickCallBack)
    }

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

ipcMain.on('quit', (e, msg) => {
    app.quit();
})
