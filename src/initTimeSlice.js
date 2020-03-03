import ElectronStore from './ElectronStore.js'
import disableNewRowButton from './disableAddNewRow.js'

export default function initTimeSlice() {
    let timeSlice = []
    timeSlice.newSlice = function (slice) {
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
                // 监听更改事件，实时保存至 electron-store
                electronStore.save(timeSlice)
                disableNewRowButton(timeSlice)
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
        // 将每个对象都转成Proxy，从而监听更改事件
        // 保存到store、以及控制new row button的有效与否
        timeSlice.newSlice(element)
    })
    return timeSlice;
}
