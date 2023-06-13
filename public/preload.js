// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
    ipcRenderer: ipcRenderer,
    sendNotification:(message)=>ipcRenderer.send('notification', message),
    sendMessage:(path,data)=>ipcRenderer.send(path, data),
    postMessage:(path,data)=>ipcRenderer.sendSync(path, data),
    onMessage:(path,callback)=>ipcRenderer.on(path,callback)
});
