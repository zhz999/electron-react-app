export const sendNotification = (message:"消息提示") => {
    window.ipc.sendNotification(message)
}
