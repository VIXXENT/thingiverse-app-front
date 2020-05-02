export const timeString: () => void = ()=>{
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
}