import ElectronStore from './ElectronStore.js'
import disableNewRowButton from './disableAddNewRow.js'


export default function TimeSlice() {
    // 启动软件时，从store读取数据，写入timeSlice，并依次创建DOM
    // 私有变量: electronStore, timeSlice
    const electronStore = new ElectronStore()
    let timeSlice = []

    // 公有方法: get(), addNewSlice(), changeNote(), getLastRow()

    this.get = function () {
        return timeSlice
    }

    this.addNewSlice = function (slice) {
        let self = this
        if (slice == undefined) {
            slice = {
                start: null,
                end: null,
                note: null
            }
        }
        let newSlice = new Proxy({ ...slice }, {
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
                disableNewRowButton(self.getLastSlice())
                return true;
            }
        });
        timeSlice.push(newSlice);
    }

    this.changeNote = function (index, note) {
        timeSlice[index].note = note;
    }

    this.getLastSlice = function () {
        let length = timeSlice.length
        return timeSlice[length - 1]
    }

    // 私有函数：init(), 从electron store中读取数据
    function init(that)
    {
        let self = that
        let storeData = electronStore.get();
        storeData.forEach(function(element) {
            // 将每个对象都转成Proxy，从而监听更改事件
            // 保存到store、以及控制new row button的有效与否
            // 这一行需要放在 this.addNewSlice() 函数定义后面
            self.addNewSlice(element)
        })
    }
    init(this)
}
