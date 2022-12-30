const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment done by user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //comment is done on a post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    //created at updated at
    timestamps: true
});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;