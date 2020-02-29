export default function restoreFromElectronStore() {
    let timeSlice = []
    const store = new Store()
    
    timeSlice = store.get('xwz')
    if(timeSlice == undefined) {
        return []
    }

    return timeSlice
}
