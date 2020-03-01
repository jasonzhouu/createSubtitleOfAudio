export default function ElectronStore() {
    this.store = new Store()
}


ElectronStore.prototype.get = function() {
    let timeSlice = []
    const store = new Store()
    
    timeSlice = store.get('xwz')
    if(timeSlice == undefined) {
        return []
    }

    return timeSlice
}

ElectronStore.prototype.save = function(timeSlice) {
    this.store.set('xwz', timeSlice)
}