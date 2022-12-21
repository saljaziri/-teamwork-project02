const mongoose = require('mongoose');
const nationalities = require('../helper/countriesConfig');
const ClubSchema = mongoose.Schema({
    name: String,
    
    nationality: {
        type: String,
        required: true,
        enum : nationalities,
      },
    image: String,
    
    popularity: Number,
    user: Object,

},
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }]},
    {timestamp: true

})

const Club = mongoose.model('Club', ClubSchema);
module.exports = Club;