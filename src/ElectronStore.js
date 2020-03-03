export default function ElectronStore() {
    // 私有变量，store只在这里可以访问
    const store = new Store()

    // 公有方法：get, save
    this.get = function() {
        let timeSlice = []
        timeSlice = store.get('xwz')
        if(timeSlice == undefined) {
            return []
        }
    
        return timeSlice
    }

    this.save = function() {
        store.set('xwz', timeSlice)
    }
}
