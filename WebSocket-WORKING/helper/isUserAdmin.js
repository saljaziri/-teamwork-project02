module.exports=(req, res, next)=>{
    if(req.user.role!="admin"){
        res.redirect('/')
    }else{
        next();
    }
}