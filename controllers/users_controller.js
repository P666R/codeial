module.exports.profile = function(req, res){
    // return res.end('<h1>user profile</h1>');

    return res.render('user_profile',{
        title: 'User Profile'
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | sign up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | sign in"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    // todo later
}

// sign in and create a session for the user 
module.exports.createSession = function(req, res){
    // todo later
}