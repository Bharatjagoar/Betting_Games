const mongoose = require('mongoose');

const AdminLogin = new mongoose.Schema({ 
   userID:{
        type:  mongoose.Types,
        required: true
   },
   token: {
        type: String
   }    
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminLogin', AdminLogin);
