module.exports.home=function(req,res){
    console.log("hi");
    return res.render('home',{
        title: "Home"
    });
}