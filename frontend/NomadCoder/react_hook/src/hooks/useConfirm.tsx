const useConfirm = (
    message: string = "", 
    callback: Function, 
    fallback: Function
) => {
    const confirmAction = () => {
        if (window.confirm(message)) callback()
        else fallback()
    }

    return confirmAction  
}

export default useConfirm
