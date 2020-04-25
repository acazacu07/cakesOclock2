  
  exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM products',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('adminproducts',{page_title:"AdminProducts - Node.js",data:rows});
                  
             
           });

    });
};

exports.add = function(req, res){
    res.render('add_product',{page_title:"Add products - Node.js"});
  };
  
  exports.edit = function(req, res){
      
      var id = req.params.id;
      
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM products WHERE id = ?',[id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('edit_product',{page_title:"Edit products - Node.js",data:rows});
                  
             
           });
           
           //console.log(query.sql);
      }); 
  };
  
  /*Save the product*/
  exports.save = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
              name    : input.name,
              description : input.description,
              from_price   : input.price,
              allergen_info   : input.allergen_info,
              prd_img   : input.prd_img
 
          };
          
          var query = connection.query("INSERT INTO products set ? ",data, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
            res.redirect('/adminproducts');
            
          });
          
         // console.log(query.sql); get raw query
      
      });
  };
  
  exports.save_edit = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
            name    : input.name,
            description : input.description,
            from_price   : input.price,
            allergen_info   : input.allergen_info,
            prd_img   : input.prd_img
          
          };
          
          connection.query("UPDATE product set ? WHERE id = ? ",[data,id], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           
            res.redirect('/adminproducts');
            
          });
      
      });
  };
  
  
  exports.delete_product = function(req,res){
            
       var id = req.params.id;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM products  WHERE id = ? ",[id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
               res.redirect('/adminproducts');
               
          });
          
       });
  };
  
  