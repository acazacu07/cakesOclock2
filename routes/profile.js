//Get Profile page
exports.profile = function(req, res){
    let user = req.session.user;
    if(user) {
        res.render('profile', {opp:req.session.opp, name:user.fullname, data:user.id});
        return;
    }
    res.redirect('/');
    //res.render('profile',  { name:user.fullname});
    //res.send('this is the profile');
};

//Connect Users database
exports.list = function(req, res){
    req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM users',function(err,rows)
        { 
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('profile',{page_title:"users - Node.js",data:rows});
        });
        //console.log(query.sql);
    });
};


exports.edit = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {   
        username   : input.username,
        fullname : input.fullname,
        email   : input.email,
        phone   : input.phone,
        };
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/users');
        });
    });
};


//Save user data edited
exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {   
        username   : input.username,
        fullname : input.fullname,
        email   : input.email,
        phone   : input.phone,
        };
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/users');
        });
    });
};
