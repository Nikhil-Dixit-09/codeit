var Post=require('../../../models/post');
var Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    
    let posts=await Post.find({}).sort('-createdAt')
    .populate('user').
    populate({path: 'comments',
    populate:{
        path: 'user'
        }
    });

    return res.json(200,{
         message: "List of posts",
         posts: posts
    });
}
module.exports.destroy=async function(req,res){
    console.log('in req.query');
    console.log(req.query);
    //post.user==req.user.id
    try{
        let output= await Comment.deleteMany({post: req.query.pid});
        
        let output2=await Post.findByIdAndDelete(req.query.pid);
        // if(req.xhr){
        //     console.log('in xhr!!!!!!');
        //     // return res.status(200).json({
        //     //     data: {
        //     //         post_id: req.query.pid
        //     //     },
        //     //     message: "Post deleted"
        //     // });

        // }
        // return res.redirect('back');
        return res.status(200).json({
            message: "Post and associated content deleted successfully!!"
        });
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error!!"
        });
        return;
    }   
}