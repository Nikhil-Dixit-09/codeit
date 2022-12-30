const mongoose=require('mongoose');
const resetSchema=new mongoose.Schema({
    //comment done by user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    //comment is done on a post
    token: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
},{
    //created at updated at
    timestamps: true
});
const Reset=mongoose.model('Reset',resetSchema);
module.exports=Reset;