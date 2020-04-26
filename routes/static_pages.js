//Get about us page
exports.about = function(req, res){
	let user = req.session.user;
    if(user) {
        res.render('about_us', {opp:req.session.opp, name:user.fullname, data:user.id});
        return;
	}
	res.render('/', {title: "About Us" });
};

//Get contact us page
exports.contact = function(req, res){
	res.render('contact_us', {title: "Contact Us" });
};

//Get cookies policy page
exports.cpolicy = function(req, res){
	res.render('cookie_policy', {title: "Cookies Policy page" });
};

//Get faq page
exports.faq = function(req, res){
	res.render('faq', {title: "FAQ page" });
};