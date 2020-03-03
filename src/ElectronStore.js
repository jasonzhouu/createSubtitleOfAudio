export default class ElectronStore {
    constructor() {
        this.store = new Store()
    }
    get() {
        let timeSlice = []
        const store = new Store()
        
        timeSlice = store.get('xwz')
        if(timeSlice == undefined) {
            return []
        }
    
        return timeSlice
    }

    save(timeSlice) {
        this.store.set('xwz', timeSlice)
    }
}