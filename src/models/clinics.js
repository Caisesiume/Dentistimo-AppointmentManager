const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { 
      type: String,
      unique: true 
    },
    owner: { 
      first: { type: String },
      last: { type: String }
    },
    dentists: { type: Number },
    address: { type: String },
    city: { 
      type: String,
      default: "Gothenburg"
    },
    coordinate: {
      longitude: { type: Number },
      latitude: { type: Number }
    },
    openinghours: {
      monday: {
        start: { 
          hour: { type: Number },
          minute: { type: Number, default: 00 }
        },
        end: { 
          hour: { type: Number},
          minute: { type: Number, default: 00 }
        }
      },
      tuesday: {
        start: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          },
          end: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          }
      },
      wednesday: {
        start: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          },
          end: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          }
      },
      thursday:{
        start: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          },
          end: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          }
      },
      friday:{
        start: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          },
          end: { 
            hour: { type: Number},
            minute: { type: Number, default: 00 }
          }
      }
    }
})

module.exports = mongoose.model('Clinics', schema)