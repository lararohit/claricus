
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads_claricus/' })
var fs = require('fs');

var app = express();

var db = require('./claricus_demo.njs');

var passport_selfie_upload = upload.fields([{ name: 'id_photo_front_name', maxCount: 1 }, { name: 'id_photo_selfie_name', maxCount: 1 },{ name: 'id_photo_utility_name', maxCount: 1 }])

app.post('/claricus_demo_submit_to_external',passport_selfie_upload, function (req, res) {						 
					   
					 body_final = req.body;
					 var user_id = body_final.user_id;
					 var id_photo_front_name = req.files['id_photo_front_name'][0] ;
					 var id_photo_selfie_name = req.files['id_photo_selfie_name'][0] ;
					 var id_photo_utility_name = req.files['id_photo_utility_name'][0] ;
					 var passport_photo_new = 'uploads_claricus\\' + user_id + 'passport.jpg'; 
					 var selfie_photo_new = 'uploads_claricus\\' + user_id + 'selfie.jpg';
                     var utility_photo_new = 'uploads_claricus\\' + user_id + 'utility.jpg';					 
					 var passport_photo_new1 = 'uploads_claricus\\\\' + user_id + 'passport.jpg'; 
					 var selfie_photo_new1 = 'uploads_claricus\\\\' + user_id + 'selfie.jpg';
					 var utility_photo_new1 = 'uploads_claricus\\\\' + user_id + 'utility.jpg';					 
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
					  //var date_of_birth = '1971-12-09';
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
				      var sql = "INSERT INTO kyc_user_details (user_id,first_name,middle_name,last_name,ol_first_name,ol_last_name,date_of_birth,nationality,gender,country_of_residence,id_type,id_number,id_expiry_date,img_id_Photo,img_utility_bill,img_selfie,work_type,industry,contact_number_code,contact_number,email,address_1,address_2,city,state,postal_code,tax_id_number,purpose_of_action,planned_investment_per_month,wallet_id,system_holdings,account_open_date,channel_mode,product_type,datetime_created,datetime_updated) values ('" + user_id + "','" + first_name + "','" + middle_name + "','" + last_name + "','" + ol_first_name + "','" + ol_last_name + "','" + date_of_birth + "','" + nationality + "','" + gender + "','" + country_of_residence + "','" + id_type + "','" + id_number + "','" + id_expiry_date + "','" + img_id_Photo + "','" + img_utility_bill + "','" + img_selfie + "','" + work_type + "','" + industry + "','" + contact_number_code + "','" + contact_number + "','" + email + "','" + address_1 + "','" + address_2 + "','" + city + "','" + state + "','" + postal_code + "','" + tax_id_number + "','" + purpose_of_action + "','" + planned_investment_per_month + "','" + wallet_id + "','" + system_holdings + "','" + account_open_date + "','" + channel_mode + "','" + product_type + "','" + datetime_created + "','" + datetime_updated + "')";				
                     db.query(sql, function (err, result, fields) {if (err) throw err;});
					 
});
app.listen(4000);