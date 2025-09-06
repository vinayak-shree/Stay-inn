const User = require("../models/user.js");
module.exports.create = async(req,res,next)=>{
    try{
               let {username,password,email} = req.body;
    const newUser = new User({email , username});
    const registerdUser = await User.register(newUser , password);
    console.log(registerdUser);
 
    //automatic Login
   req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Stay-inn!");
            return res.redirect("/listings");
        });
    }
    catch(e)
    {
        console.log("Error : " , e.message);
        req.flash("error",e.message);
        res.redirect("/signup");
        
    }
};

module.exports.renderSignUpForm = (req , res)=>{
    res.render("users/signup.ejs")
};

module.exports.renderLogin= (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back To Stay-inn ! ");
    // session will automatically ovveride the redirecting request
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out");
        res.redirect("/listings");
    });
};

