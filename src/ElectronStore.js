export default function ElectronStore() {
    // 私有变量: store
    const store = new Store()

    // 公有方法: get(), save()
    this.get = function() {
        let storeData = []
        storeData = store.get('xwz')
        // 如果store为空，或者没有获取到，则返回空数组
        if(storeData == undefined) {
            return []
        }
    
        return storeData
    }

    this.save = function(timeSlice) {
        store.set('xwz', timeSlice)
    }
}
