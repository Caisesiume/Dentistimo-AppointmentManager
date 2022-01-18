const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    clinic: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "Clinics"
    },
    // reserved: {
    //     type: Boolean,
    //     default: false,
    // },
    patient: {
        email: { type: String },
        name: { 
            first: { type: String },
            last: { type: String }
         },
        personalNumber: { type: String },
        phone: { type: Number },
    },
    time: { // 30 minute fika break & 1 hour lunch break
        start: {
            hour: { type: Number },
            minute: { type: Number, default: 00 }
        } // ends 30 minutes later aka 8:00 -> 8:30
    },
    date: {
        day: { 
            type: Number,
            min: 1,
            max: 31
            // range 1-31
        },
        month: {
            type: Number, 
            min: 1,  
            max: 12
            // range 1-12
        },
        year: {
            type: Number,
            min: new Date().getFullYear(),
            max: new Date().getFullYear() + 1
            // after now
        }
    },
    issuance: { 
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Bookings', schema)
