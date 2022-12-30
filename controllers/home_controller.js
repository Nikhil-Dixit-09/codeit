const { populate } = require('../models/post');
var Post=require('../models/post');
var User=require('../models/user');
// const { post } = require('../routes');
module.exports.home=async function(req,res){
    try{
        let posts=await Post.find({}).sort('-createdAt')
        .populate('user').
    populate({path: 'comments',
        populate:{
            path: 'likes'
        }
    })
.populate({path: 'likes'});
    let users=await User.find({});
    // console.log(req.user.id);
    // for(var j=0;j<posts[0].comments.length;j++){
    //     console.log(posts[0].comments[j]);
    // }
    for(var j=0;j<posts[0].comments.length;j++){
        for(var z=0;z<posts[0].comments[j].likes.length;z++){
            console.log(posts[0].comments[j].likes[z]);
        }
    }
    
    return res.render('home',{
        title: "Codeit | Home",
        Posts: posts,
        users:users
    });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
    Post.find({}).populate('user').
    populate({path: 'comments',
    populate:{
        path: 'user'
    }
}).
    exec(function(err,posts){
        
        User.find({},function(err,users){
            if(err){
                console.log('error');
                return;
            }
            return res.render('home',{
                title: "Codeit | Home",
                Posts: posts,
                users:users
            });
        });
        
    });
}
// .home=// console.log("hi");
// console.log(req.user.id);
// var arr=[];
// if(req.user){
//     Post.find({},function(err,posts){
//         if(err){
//             console.log('error');
//             return;
//         }
//         console.log(posts);
//         var a=0;
//         for(var i=0;i<posts.length;i++){
//             var id_user=posts[i].user;
//             User.findById(id_user,function(err,user){
//                 if(err){
//                     console.log('error in');
//                     return;
//                 }
//                 console.log(user);
//                 console.log(user.email);
//                 arr.push(user.email);
//                 a++;
//                 if(a==posts.length){
//                     for(var i=0;i<arr.length;i++){
//                         console.log(arr[i]);
//                     }
                    
//                     return res.render('home',{
//                         title: "Home",
//                         Posts: posts,
//                         arr: arr
//                     });
//                 }
//             });

//         }
//         console.log('hiiiiiiii');
        
//     });
// }else{
//     var posts=[];
//     return res.render('home',{
//         title: "Home",
//         Posts: posts,
//         arr: arr
//     })
// }
//populate the user of each post
// console.log(posts);
    // // console.log(posts.comments);
    // for(var i=0;i<posts.length;i++){
    //     console.log(posts[i].comments);
    // }
