const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup"); 
};

module.exports.signup = async(req, res, next)=>{
    try{
        let{username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "User registered successfully!");
            res.redirect("/listings");
        })
        
    }catch(e){
         req.flash("error", e.message);
         res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login"); 
};

// module.exports.login = async(req, res)=>{
//     req.flash("success", "Wellcome to Wandarlust, you're logged in!");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };
module.exports.login = (req, res)=>{
    console.log("REQ.USER after login:", req.user);
    req.flash("success", "Welcome to Wandarlust, you're logged in!");
    const redirectUrl = req.session.redirectUrl || "/listings";
    delete req.session.redirectUrl; // clear after use
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};