/*
 * GET products listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
        var queryString = 'SELECT p.*, c.cat_name cat_name, MIN(ps.price) min_price FROM products p INNER JOIN categories c USING (cat_id) INNER JOIN product_size ps ON ps.product_id = p.id GROUP BY ps.product_id';
        var query = connection.query(queryString, function(err,rows)
        {
            if(err)
            console.log("Error Selecting : %s ",err );

            var categoriesWithProducts = [];
            var categories = {};
            var categoryId, ucCategoryName;
            for (var i = 0; i < rows.length; i++) {
            categoryId = rows[i].cat_id;

            if (!categories[categoryId]) {
                ucCategoryName = rows[i].cat_name[0].toUpperCase() + rows[i].cat_name.slice(1);
                //slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.
                categories[categoryId] = {
                    id: rows[i].cat_id,
                    name: ucCategoryName,
                    products: []
                };
                //array with push method adds one or more elements to the end of an array and returns the new length of the array.
                categoriesWithProducts.push(categories[categoryId]);
            }
            categories[categoryId].products.push(rows[i]);
        }
            res.render('products',{page_title:"Customers - Node.js", data: [], categories: categoriesWithProducts,});
        });
         //console.log(query.sql);
    });
};
//page not added yet
exports.add = function(req, res){
  res.render('add_admin_products',{page_title:"Add Product Item - Node.js"});
};
//page not added yet
exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM products WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_products',{page_title:"Edit Product Item - Node.js",data:rows});
         });
         //console.log(query.sql);
    }); 
};

/*Save the customer
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
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
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};
exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};
*/

