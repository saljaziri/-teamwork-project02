const mongoose = require('mongoose');
const nationalities = require('../helper/countriesConfig');
const popularites = require('../helper/popularityConfig');
const clubSchema = mongoose.Schema({
    clubImage: {
        type: String,
        default: ''
      },

    name: String,
    popularity: 
    {
      type: String,
      required: true,
      enum : popularites,
    },
    nationality: {
        type: String,
        required: true,
        enum : nationalities,
      },

     
user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
}},

    {timestamps: true

    })


const Club = mongoose.model('Club', clubSchema);
module.exports = Club;