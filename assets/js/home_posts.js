{
   let createPost=function(){
    let newPostForm=$('#new-post-form');
    console.log(newPostForm);
    newPostForm.submit(function(e){
          console.log('hii');
          e.preventDefault();
          $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){   
                console.log(data);
                let newPost=newPostDom(data.data.posts,data.data.name);
                $('#postsLi').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                createComment($(' .createComment',newPost));
                addLike($(' .ajax',newPost));
                // background();
            },
            error: function(error){
                console.log('error!!',error.responseText);
            }
        });
        });
   } 
   let newPostDom=function(post,name){
    return $(`<li id="post-${post._id}">
        <p>
        <span>
            ${post.content}
        </span> 
        <br>
        <small>
                ${name}
        </small>
        <br>
                <button value="${post._id}" class="like ajax post">${post.likes.length} likes</button>
        <br>  
        <a href="/posts/delete?pid=${post._id}" class="delete-post-button"><button>X</button></a>
        <form action="/comments/create" method="post" class="createComment">
            <textarea name="content" id="" cols="30" rows="2" placeholder="Type Here..."></textarea>
            <input type="hidden" name="pid" value="${post._id}">
            <!-- <input type="hidden" name="uid" value="${post.user}"> -->
            <input type="submit" value="Comment">
        </form>
        <div class="post-comment-list">
                <ul id="comment-${post._id}">
                   
                </ul>

               </div>
       `);
   }
   let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        console.log('in delete func');
        e.preventDefault();
        console.log($(deleteLink).prop('href'));
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                console.log('hi in success');
                console.log(data.data.post_id);
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error){
                console.log('in error');
                console.log(error.responseText);
            }
        });
    });
   }
   function forAll(){
    console.log('hiii in for all');
    $('.delete-post-button').each(function(i,obj){
        deletePost($(this));
    });
   }
   let addLike=function(button){
        $(button).click(function(e){
            e.preventDefault();
            // if($(button).prop('user')){
                if($(button).prop('class')=="like ajax post"){
                    if($(button).css("background-color")=="rgb(76, 175, 80)"){
                        $.ajax({
                            type: 'get',
                            url: '/posts/deleteLike',
                            data: {pid: $(button).prop('value')},
                            success: function(data){
                                console.log(data);
                                $(button).html(`${data.data} likes`);
                                $(button).css("background","white");
                            },
                            error: function(error){
                                console.log('in error');
                                console.log(error.responseText);
                            }
                        });
                    }else{
                        console.log('post clicked');
                        console.log($(button).prop('value'));
                        $.ajax({
                        type: 'get',
                        url: '/posts/like',
                        data: {pid: $(button).prop('value')},
                        success: function(data){
                            console.log(data);
                            $(button).html(`${data.data} likes`);
                            $(button).css("background","#4CAF50");
                        },  
                        error: function(error){
                            console.log('in error');
                            console.log(error.responseText);
                        }
                    });
                    }
                    
                }else{
                    if($(button).css("background-color")=="rgb(76, 175, 80)"){
                        console.log('hiii');
                        $.ajax({
                        type: "get",
                        url: "/comments/deleteLike",
                        data: {cid: $(button).prop('value')} ,
                        success: function(data){
                             console.log(data);
                             $(button).html(`${data.data} Likes`);
                             $(button).css("background","white");
                        },
                        error: function(error){
                            console.log('in error');
                            console.log(error.responseText);
                        }
                        });
                    }else{
                        $.ajax({
                            type: "get",
                            url: "/comments/like",
                            data: { cid: $(button).prop('value')},
                            success: function(data){
                                console.log(data);
                                $(button).html(`${data.data} likes`);
                                $(button).css("background","#4CAF50");
                            },
                            error: function(error){
                                console.log('in error');
                                console.log(error.responseText);
                            }
                        });
                    }
                }
            // }
            
           
        });
   }
   function forAllLike(){
    console.log('hiii in ajax');
    $('.ajax').each(function(i,obj){
        addLike($(this));
        });
   }
   
forAllLike();
   forAll();
   createPost();
//    let background=function(){
//     $(".like").click(function(){
//         console.log($(this).css("background-color"));
//         if($(this).css("background-color")=="rgb(76, 175, 80)"){
//             $(this).css("background","white");
//         }else{
//             $(this).css("background","#4CAF50");
//         }
        
//        });
//    }
//    background();
   
}