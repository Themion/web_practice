const useNotification = (title: string, options?: NotificationOptions) => {
    if (!("Notification" in window)) return
    Notification.requestPermission()
    return () => new Notification(title, options)
}

export default useNotification
