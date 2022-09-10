const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function (req, res) {
//     // return res.end('<h1>Express is up for codeial</h1>');
//     // console.log(req.cookies);
//     // change the value of cookie in the response
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err, posts){
//     // return res.render('home',{
//     //     title: "Codeial | Home",
//     //     posts: posts
//     // });
//     // });

//     // populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function (err, posts) {
//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });     
//     });
// }

module.exports.home = async function (req, res) {

    try {

        // populate the user of each post
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }

}

