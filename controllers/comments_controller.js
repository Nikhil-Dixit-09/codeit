var Post=require('../models/post')
var Comment=require('../models/comment')
var commentMailer=require('../mailers/comments');
var Like=require('../models/like');
module.exports.create=async function(req,res){
    // console.log(req.body);
    // console.log(req.body);
    // console.log(comment);
    // console.log(comment.id);
    // var pus={comment.id};
    // Post.findOneAndUpdate({id: req.body.pid},{
    //     $push: {comments: comment.id}
    // },{new: true},function(err,post){
    //     if(err){
    //         console.log('error');
    //         return;
    //     }
    // console.log(req.body.pid);
    // console.log(post);
    // console.log(post);
    // console.log(post.comments);
    // console.log('breakkkkkkkkkkkkkkkkk**************************************');
    if(!req.user){
        return res.redirect('back');
    }
    try{
        let comment=await Comment.create({
            content: req.body.content,
            user: req.user,
            post: req.body.pid
        });
        let post=await Post.findOne({_id: req.body.pid});
        post.comments.push(comment.id);
        post.save();  
        // comment=await comment.populate('user','name').execPopulate();   
        commentMailer.newComment(comment,req.user);
        if(req.xhr){
            return res.status(200).json({
                data: comment,
                name: req.user.name
            });  
        }
             
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return;
    }
    
    Comment.create({
        content: req.body.content,
        user: req.user,
        post: req.body.pid
    },function(err,comment){
        if(err){
            console.log('error');
            return;
        }
        
            Post.findOne({_id: req.body.pid},function(err,post){
                if(err){
                    console.log('error');
                }
                
                post.comments.push(comment.id);
                post.save();
                
                return res.redirect('back');
            }); 
        });
}
module.exports.destroy=async function(req,res){
    console.log('hi');
    console.log(req.query);
    await Like.deleteMany({likeable: req.query.cid,onModel: 'Comment'});
    Comment.findById(req.query.cid,function(err,comment){
        if(err){
            console.log('error');
            return;
        }
        if(comment.user==req.user.id||req.query.check==1){
            Comment.findByIdAndDelete(req.query.cid,function(err,del){
                if(err){
                    console.log('error');
                    return;
                }
                console.log('deleted successfully');
                // Post.findOne({_id: req.query.pid},function(err,post){
                //     if(err){
                //         console.log('error');
                //         return;
                //     }
                //     var index=-1;
                //     for(var i=0;i<post.comments.length;i++){
                //         if(req.query.cid==post.comments[i]){
                //             index=i;
                //             break;
                //         }
                //     }
                //     post.comments.splice(index,1);
                //     post.save();
                Post.findByIdAndUpdate(req.query.pid,{
                    $pull:{comments:req.query.cid}
                },function(err,post){
                    if(err){
                        console.log('error in updating');
                        return;
                    }
                    if(req.xhr){
                        return res.status(200).json({
                            data: req.query.cid
                        });
                    }
                //    return res.redirect('back');
                });  
                });
        }else{
            return res.redirect('back');
        }
    });
    
}
module.exports.createLike=async function(req,res){
    try{
        var lik=await Like.create({
            user: req.user.id,
            likeable: req.query.cid,
            onModel: 'Comment'
        });
        Comment.findById(req.query.cid,function(err,comment){
            if(err){
                console.log('err',err);
                return;
            }
            comment.likes.push(lik.id);
            comment.save();
        });
        Like.find({likeable: req.query.cid,onModel:'Comment'},function(err,likes){
            if(err){
                console.log('err',err);
                return;
            }
            if(req.xhr){
                return res.status(200).json({
                    data: likes.length,
                    message: 'like for comment added'
                });
            }
        });
    }catch(err){
        console.log('err2',err);
    }
   
}
module.exports.deleteLike=async function(req,res){
    console.log('hii here');
    var like=await Like.findOne({user: req.user.id,likeable:req.query.cid,onModel: 'Comment'});
    await Like.findOneAndDelete({user: req.user.id,likeable:req.query.cid,onModel: 'Comment'});
    // var comment=await Comment.findOne({id: req.query.cid}
    // });
    // var comment=await Comment.findById(req.query.cid);
    var comment=await Comment.findById(req.query.cid);
    var index=-1;
    for(var i=0;i<comment.likes.length;i++){
        if(comment.likes[i]==like.id){
            index=i;
            break;
        }
    }
    comment.likes.splice(index,1);
    comment.save();
    if(req.xhr){
        return res.status(200).json({
            data: comment.likes.length,
            message: 'like deleted'
        });
    }
}