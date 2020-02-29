import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'

var timeSlice = initTimeSlice()

var table = new Table(timeSlice.data)
table.initTable()