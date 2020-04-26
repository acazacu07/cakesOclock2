
/*
 * GET users listing.
 */


// Connect Users database
exports.list = function(req, res){
    req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM users',function(err,rows)
        { 
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('users',{page_title:"users - Node.js",data:rows});
        });
        //console.log(query.sql);
    });
};
  

//Add new User
exports.add = function(req, res){
    res.render('add_users',{page_title:"Add Users - Node.js"});
};

//Edit user data  
exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_user',{page_title:"Edit User - Node.js",data:rows});
        });
        //console.log(query.sql);
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
  
  
//Save the user data
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    var data = {
        username   : input.username,
        fullname : input.fullname,
        email   : input.email,
        phone   : input.phone,
    };
    var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
    {
        if (err)
            console.log("Error inserting : %s ",err );
        res.redirect('/users');
    });
        // console.log(query.sql); get raw query
    });
};
  

  
//Save delete user
exports.delete_user = function(req,res){
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM users WHERE id = ? ",[id], function(err, rows)
        {
        if(err)
            console.log("Error deleting : %s ",err );
        res.redirect('/users'); 
        });
    });
};
  
  
  