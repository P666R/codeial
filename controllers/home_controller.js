module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial</h1>');

    console.log(req.cookies);

    // change the value of cookie in the response
    res.cookie('user_id', 25);

    return res.render('home',{
        title: 'Home'
    });
}

