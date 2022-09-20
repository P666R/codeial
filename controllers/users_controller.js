const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    // return res.end('<h1>user profile</h1>');

    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     } else {
//         req.flash('error', 'Unauthorized!!');
//         return res.status(401).send('Unauthorized');
//     }
// }

module.exports.update = async function(req, res){
    if (req.user.id == req.params.id) {
        
        try {
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('***Multer error: ', err); }

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
       
    } else {
        req.flash('error', 'Unauthorized!!');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | sign up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | sign in"
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match')
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            // console.log('error in finding user in signing up');
            req.flash('error', err);
            return;
        }

        // sir code
        /*
        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }*/

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    // console.log('error in creating user while signing up');
                    req.flash('error', err);
                    return;
                }
                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('/users/sign-in');
            });
        } else {
            req.flash('success', 'You have already signed up, login to continue!');
            // return res.redirect('back');
            return res.redirect('/users/sign-in');
        }
    });
}

// sign in and create a session for the user 
module.exports.createSession = function (req, res) {

    req.flash('success', 'logged in successfully');
    
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}