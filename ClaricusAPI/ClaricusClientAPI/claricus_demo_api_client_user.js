
// main author :- Rohit
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads_balestiar/' })
var request = require('request');

var app = express();

var db = require('./claricus_demo_balestiar.njs');
var hbs = require('express-handlebars');
var fs = require('fs');

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout_demo',helpers: {
        formatDate: function (date, format) {
            return moment(date).format(format);
        }}, layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))

var Handlebars = require("handlebars");

// Helpers for template
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('notequal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue==rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport_selfie_upload = upload.fields([{ name: 'id_photo_front_name', maxCount: 1 }, { name: 'id_photo_selfie_name', maxCount: 1 },{ name: 'id_photo_utility_name', maxCount: 1 }])
 
 
app.get('/claricus_demo_form', function (req, res) {
	
var sql = "SELECT code, name, contact_number_ISD_Code from country";
db.query(sql, function (err, country, fields) {
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1001,1002,1003)";
db.query(sql, function (err, lkp_master_gender, fields) { ;
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1101,1102,1103)";
db.query(sql, function (err, lkp_master_id_type, fields) { ;
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1201,1202,1203)";
db.query(sql, function (err, lkp_master_purpose, fields) { ;
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1301,1302,1303)";
db.query(sql, function (err, lkp_master_planned_investment, fields) { ;
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1401,1402)";
db.query(sql, function (err, lkp_master_channel, fields) { ;
if (err) throw err;
var sql = "SELECT code, description from lkp_master where code in (1501,1502,1503,1504,1505,1506,1507)";
db.query(sql, function (err, lkp_master_product, fields) { ;
if (err) throw err;
var sql = "SELECT id, name from work_type";
db.query(sql, function (err, work_type, fields) {
if (err) throw err;
var sql = "SELECT id, name from work_industry";
db.query(sql, function (err, work_industry, fields) {
if (err) throw err;
		
  res.render('claricus_demo_form',
  { title : 'Claricus Demo Form', message : 'Claricus input form',country : country,lkp_master_gender : lkp_master_gender,lkp_master_id_type : lkp_master_id_type,
  lkp_master_purpose : lkp_master_purpose,  lkp_master_planned_investment : lkp_master_planned_investment,lkp_master_channel : lkp_master_channel,
  lkp_master_product : lkp_master_product,work_type : work_type,work_industry : work_industry }
  )
})})})})})})})})})})
 

app.post('/claricus_demo_submit',passport_selfie_upload, function (req, res) {	
var sql = "SELECT MAX(user_id) + 1 user_id FROM kyc_user_details_balestiar";
db.query(sql, function (err, user_id, fields) {
	                 // first insert local at customer system
					 var user_id = user_id[0].user_id;  
					 body_final = req.body;
					 var id_photo_front_name = req.files['id_photo_front_name'][0] ;
					 var id_photo_selfie_name = req.files['id_photo_selfie_name'][0] ;
					 var id_photo_utility_name = req.files['id_photo_utility_name'][0] ;
					 var passport_photo_new = 'uploads_balestiar\\' + user_id + 'passport.jpg'; 
					 var selfie_photo_new = 'uploads_balestiar\\' + user_id + 'selfie.jpg';
                     var utility_photo_new = 'uploads_balestiar\\' + user_id + 'utility.jpg';					 
					 var passport_photo_new1 = 'uploads_balestiar\\\\' + user_id + 'passport.jpg'; 
					 var selfie_photo_new1 = 'uploads_balestiar\\\\' + user_id + 'selfie.jpg';
					 var utility_photo_new1 = 'uploads_balestiar\\\\' + user_id + 'utility.jpg';					 
					 fs.renameSync( id_photo_front_name.path,passport_photo_new);
					 fs.renameSync( id_photo_selfie_name.path,selfie_photo_new);
					 fs.renameSync( id_photo_utility_name.path,utility_photo_new);
					 //var datetime = new Date(Date.now()).toLocaleString();
					 //var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
					 var date = new Date().getTime();
					 date += (8 * 60 * 60 * 1000);
					 var datetime = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
		
		              var first_name = body_final.first_name;
					  var middle_name = body_final.middle_name;
					  var last_name = body_final.last_name;
					  var ol_first_name = body_final.ol_first_name;
					  var ol_last_name = body_final.ol_last_name;
					  var date_of_birth = body_final.date_of_birth;
					  //console.log(date_of_birth1);
					 // var date_of_birth = '1971-12-09';
					  var nationality = body_final.nationality;
					  console.log(nationality);
					  var gender = body_final.gender;
					  var country_of_residence = body_final.country_of_residence;					  
					  var id_type = body_final.id_type;
					  var id_number = body_final.id_number;
					  var id_expiry_date = body_final.id_expiry_date;
					  var img_id_Photo = passport_photo_new1;  
					  var img_utility_bill = utility_photo_new1; 
					  var img_selfie = selfie_photo_new1; 
					  var work_type = body_final.work_type;
					  var industry = body_final.industry;					 
					  var contact_number_code = body_final.contact_number_code;
					  var contact_number = body_final.contact_number;
					  var email = body_final.email;
					  var address_1 = body_final.address_1;
					  var address_2 = body_final.address_2;
					  var city = body_final.city;
					  var state = body_final.state;					  
					  var postal_code = body_final.postal_code;
					  var tax_id_number = body_final.tax_id_number; // hard code tax_id_number
					  var purpose_of_action = body_final.purpose_of_action;
					  var planned_investment_per_month = body_final.planned_investment_per_month;
					  var wallet_id = 123;  // hard code
					  var system_holdings = 123; // hard code
					  var account_open_date = datetime; // today date
					  var channel_mode = body_final.channel_mode;
					  var product_type = body_final.product_type;					  
					  var datetime_created = datetime;
					  var datetime_updated = datetime;						  
				      
					  var sql = "INSERT INTO kyc_user_details_balestiar (user_id,first_name,middle_name,last_name,ol_first_name,ol_last_name,date_of_birth,nationality,gender,country_of_residence,id_type,id_number,id_expiry_date,img_id_Photo,img_utility_bill,img_selfie,work_type,industry,contact_number_code,contact_number,email,address_1,address_2,city,state,postal_code,tax_id_number,purpose_of_action,planned_investment_per_month,wallet_id,system_holdings,account_open_date,channel_mode,product_type,datetime_created,datetime_updated) values ('" + user_id + "','" + first_name + "','" + middle_name + "','" + last_name + "','" + ol_first_name + "','" + ol_last_name + "','" + date_of_birth + "','" + nationality + "','" + gender + "','" + country_of_residence + "','" + id_type + "','" + id_number + "','" + id_expiry_date + "','" + img_id_Photo + "','" + img_utility_bill + "','" + img_selfie + "','" + work_type + "','" + industry + "','" + contact_number_code + "','" + contact_number + "','" + email + "','" + address_1 + "','" + address_2 + "','" + city + "','" + state + "','" + postal_code + "','" + tax_id_number + "','" + purpose_of_action + "','" + planned_investment_per_month + "','" + wallet_id + "','" + system_holdings + "','" + account_open_date + "','" + channel_mode + "','" + product_type + "','" + datetime_created + "','" + datetime_updated + "')";				
                      db.query(sql, function (err, result, fields) {if (err) throw err;});
					  
					  
					  
					  // second call claricus API to send this data to claricus system
					  
					  var formData = {
						       user_id : user_id,
							   first_name : first_name,
							   middle_name : middle_name,
							   last_name : last_name,
							   ol_first_name : ol_first_name,
						       ol_last_name : ol_last_name,							   
							   date_of_birth : date_of_birth,
							   nationality : nationality,					  
							   gender : gender,
							   country_of_residence : country_of_residence,					  
							   id_type : id_type,
							   id_number : id_number,
							   id_expiry_date : id_expiry_date,
							   id_photo_front_name : fs.createReadStream(passport_photo_new), 
							   id_photo_utility_name : fs.createReadStream(utility_photo_new), 
							   id_photo_selfie_name : fs.createReadStream(selfie_photo_new),
							   work_type : work_type,
							   industry : industry,
							   contact_number_code : contact_number_code,
							   contact_number : contact_number,
							   email : email,
							   address_1 : address_1,
							   address_2 : address_2,
							   city : city,
							   state : state,					  
							   postal_code : postal_code,
							   tax_id_number : tax_id_number, 
							   purpose_of_action : purpose_of_action,
							   planned_investment_per_month : planned_investment_per_month,
							   wallet_id : 123,  
							   system_holdings : 123, 
							   account_open_date : datetime, 
							   channel_mode : channel_mode,
							   product_type : product_type,					  
							   datetime_created : datetime,
							   datetime_updated : datetime							  
							};
							 
							//request.post({url:'http://localhost:4000/claricus_demo_submit_to_external', formData: formData}, function(err, httpResponse, body) {
								// muru
								//request.post({url:'http://192.168.86.51:4000/claricus_demo_submit_to_external', formData: formData}, function(err, httpResponse, body) {
									// waran
									request.post({url:'http://192.168.86.59:4000/claricus_demo_submit_to_external', formData: formData}, function(err, httpResponse, body) {
									
									
									
							  if (err) {
								return console.error('upload failed:', err);
							  }
							  console.log('Upload successful!  Server responded with:', body);
							});
							
							
							
					  
					// Finally Render  
					  res.render('claricus_demo_submission',{ title : 'Claricus Demo Form', message : 'Form Successfully Submitted'});  	
   
})})

app.get('/user_list', function (req, res) {
	
var sql = "SELECT * from claricus_status_balestiar";
db.query(sql, function (err, user_list, fields) {
		
  res.render('user_list',{user_list : user_list})  
  
})})

app.listen(3000)
