// console.log('in comments');

    let createComment=function(form){
        form.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: form.serialize(),
                success: function(data){
                    console.log('in success');
                    console.log(data);
                    let newComment=newCommentDom(data.data,data.name);
                    $(`#comment-${data.data.post}`).prepend(newComment);
                    deleteComment($(` .commentDel`,newComment));
                    // backgroundc();
                    addLike($(` .like`,newComment));
                    console.log('hii');
                    console.log($(` .like`,newComment));
                },
                error: function(error){
                    console.log('error!!',error.responseText);
                }
            });
        });
    }
    let deleteComment=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log($(deleteLink).prop('href'));
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log('in comment delete');
                    console.log(data);
                    console.log(data.data);
                    $(`#comment-${data.data}`).remove();
                },
                error: function(error){
                    console.lof('error!!',error.responseText);
                }
            });
        });
    }
    let newCommentDom=function(comment,name){
        return $(`<li id="comment-${comment._id}">
        ${comment.content}
        <br>
        <small>
            ${name}
        </small>
        <br>
        <button class="like ajax comment" value="${comment._id}">0 Likes</button>
            <a class="commentDel" href="/comments/delete?cid=${comment._id}&pid=${comment.post}&check=${1}">
                <button>Delete</button>
            </a>
    </li>`);
    }
    function forAllCommentDelete(){
        $('.commentDel').each(function(i,obj){
            deleteComment($(this));
        });
    }
    function forAll(){
        console.log('for all');
        $('.createComment').each(function(i,obj){
            createComment($(this));
        });
    }
    forAll();
    forAllCommentDelete();
    // let backgroundc=function(){
    //     $(".like").click(function(){
    //         console.log($(this).css("background-color"));
    //         if($(this).css("background-color")=="rgb(76, 175, 80)"){
    //             $(this).css("background","white");
    //         }else{
    //             $(this).css("background","#4CAF50");
    //         }
            
    //        });
    // }
    let addLike=function(button){
        console.log('hii in button');
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