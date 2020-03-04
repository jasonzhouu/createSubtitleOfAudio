export default function ElectronStore(audioName) {
    // 私有变量: store
    const store = new Store()

    // 公有方法: get(), save()
    this.get = function() {
        let storeData = []
        storeData = store.get(audioName)
        // 如果store为空，或者没有获取到，则返回空数组
        if(storeData == undefined) {
            return []
        }
    
        return storeData
    }

    this.save = function(timeSlice) {
        // @todo: 将audioName取出文件名后缀。不去除也可以。
        store.set(audioName, timeSlice)
    }
}
