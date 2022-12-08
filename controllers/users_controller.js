module.exports.home=function(req,res){
    console.log('hi');
    return res.render('users',{
        title: "User"
    });
}