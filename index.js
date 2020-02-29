import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'

var timeSlice = initTimeSlice()

new Table(timeSlice)

// todo: add new row
$('#addSlice').click(function() {
    timeSlice.newSlice()
    new Table(timeSlice)
})