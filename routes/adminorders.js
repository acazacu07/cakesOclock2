/*
 * GET admin orders listing.
 */
exports.list = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM orders',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('adminorders',{page_title:"AdminOrders- Node.js",data:rows});
                  
             
           });

    });
};
 /* exports.orders = function(req, res){
    res.render('orders', { title: 'Cakes OClock' });
  };*/


  