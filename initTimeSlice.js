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
                electronStore.save(timeSlice)
                return true;
            }
        });
        this.push(newSlice);
        return true;
    };
    // todo: 从timeslice.data创建 proxy，监听set事件
    const electronStore = new ElectronStore()
    let storeData = electronStore.get();
    storeData.forEach(element => {
        timeSlice.createNewSlice(element)
    })
    return timeSlice;
}

