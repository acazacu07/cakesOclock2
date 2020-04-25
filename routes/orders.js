exports.orders = function(req, res){
    req.getConnection(function(err,connection){
         
          var queryString = 'SELECT ord_id created_at status customer_id FROM orders WHERE customer_id=[?]';
          var query = connection.query(queryString, function(err,rows)
          {
              if(err)
              console.log("Error Selecting : %s ",err );
  
              var displayOrders = [];
    
          
              res.orders('orders',{page_title:"orders - Node.js", data: [], displayOrders});
          });
           //console.log(query.sql);
      });
  };

  exports.orders = function(req, res){
    res.render('orders', { title: 'Cakes OClock' });
  };


  