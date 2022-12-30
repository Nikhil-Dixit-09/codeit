var Post=require('../models/post')
var Comment=require('../models/comment')
var Like=require('../models/like');
module.exports.create=async function(req,res){
    // console.log(req.body);
    // console.log(req.cookies);
    // console.log(req.user);
    // console.log(req.user.id);
    res.locals.user=req.user;
    console.log(req.body);
    // console.log(req.data);
    // console.log(req.query);
    if(req.user){
        console.log('user');
        try{
            let post=await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            // console.log('hiii');
            if(req.xhr){
                console.log('hiiii');
                return res.status(200).json({
                    data:{
                        posts: post,
                        name: req.user.name
                    },
                    message: "post created",
                   
                });
            }
            // return res.redirect('back');
        }catch(err){
            console.log('Error',err);
            return res.redirect('back');
        }
    }else{
            return res.redirect('/');
    }
}
module.exports.destroy=async function(req,res){
    console.log('in req.query');
    console.log(req.query);
    //post.user==req.user.id

    try{
        await Like.deleteMany({likeable: req.query.pid,onModel: 'Post'});
        // await Comment.find({},function(err,comments){
        //     if(err){
        //         console.log('in erri',err);
        //         return;
        //     }
        //     //  for(var i=0;i<comments.length;i++){
        //     //     Like.deleteMany({likeable: comments[i].id,onModel: 'Comment'});
        //     // }
        //     console.log(comments);
        // });
        let  comments=await Comment.find({post: req.query.pid});
        console.log('hey');
        console.log(comments);
        for(comment of comments){
            await Like.deleteMany({likeable: comment.id,onModel: 'Comment'});
        }
        let output= await Comment.deleteMany({post: req.query.pid});
        let output2=await Post.findByIdAndDelete(req.query.pid);
        if(req.xhr){
            console.log('in xhr!!!!!!');
            return res.status(200).json({
                data: {
                    post_id: req.query.pid
                },
                message: "Post deleted"
            });
        }
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return;
    }
    
    // Comment.deleteMany({post: req.query.pid},function(err,output){
    //     if(err){
    //         console.log('error');
    //         return;
    //     }
    //     console.log('hi');
    //     console.log(output);
    //     Post.findByIdAndDelete(req.query.pid,function(err,output2){
    //         if(err){
    //             console.log('error');
    //             return;
    //         }
    //         console.log('bye');
    //         console.log(output2);
    //         return res.redirect('back');
    //     });
    // });
    
    
}
module.exports.createLike=async function(req,res){
    try{
        var like=await Like.create({
            user: req.user.id,
            likeable: req.query.pid,
            onModel: "Post"
        });
        var post=await Post.findById(req.query.pid);
        post.likes.push(like.id);
        post.save();
        console.log(post);
        console.log(req.query);
        if(req.xhr){
            return res.status(200).json({
                data: post.likes.length,
                message: "like added"
            }); 
        }
    }catch(err){
        console.log('err',err);
        return;
    }
}
module.exports.deleteLike=async function(req,res){
    var like=await Like.findOne({user:req.user.id,likeable: req.query.pid,onModel: 'Post'});
    console.log(like);
    var likeid=like.id;
    await Like.findOneAndDelete({user:req.user.id,likeable: req.query.pid,onModel: 'Post'});
    Post.findById(req.query.pid,function(err,post){
        var index=-1;
        for(var i=0;i<post.likes.length;i++){
            if(post.likes[i]==likeid){
                index=i;
                break;
            }
        }
        post.likes.splice(index,1);
        post.save();
        if(req.xhr){
            return res.status(200).json({
                data: post.likes.length,
                message: "like deleted"
            }); 
        }
    });
}