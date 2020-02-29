import ElectronStore from './ElectronStore.js'

export default function initTimeSlice() {
    let timeSlice = []
    timeSlice.createNewSlice = function (slice) {
        if(slice == undefined) {
            slice = {
                start: null,
                end: null,
                note: null
            }
        }
        var newSlice = new Proxy({...slice}, {
            set: function (obj, prop, value) {
                if (prop == "start" || prop == "end") {
                    if (typeof (value) == 'number') {
                        obj[prop] = value;
                    }
                }
                else if (prop == "note") {
                    obj[prop] = value;
                }
                // 监听set事件，实时保存至 electron-store
                electronStore.save(timeSlice)
                return true;
            }
        });
        this.push(newSlice);
        return true;
    };
    // 启动软件时，从store读取数据，写入timeSlice，并依次创建DOM
    const electronStore = new ElectronStore()
    let storeData = electronStore.get();
    storeData.forEach(element => {
        timeSlice.createNewSlice(element)
    })
    return timeSlice;
}

