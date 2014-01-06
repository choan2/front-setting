
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();


// =========================================================================================
// ================================ all environments =======================================
// =========================================================================================

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/dist/html'));
app.use(express.static(__dirname + '/dist/'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// =========================================================================================
// ===================================== Router ============================================
// =========================================================================================
/* res.render('index', { title: 'Express' });
 * res.sendfile(__dirname + '/dist/html/index.html');
 * res.send(JSON);
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// Todo schema 선언 - create collection : users
var User = mongoose.model('user', new mongoose.Schema({
	'name' : String
}));

// read - list
app.get('/user', function(req, res){
	User.find(function(err, users){
		return res.send(users);
	});
});

// read - list:single
app.get('/user/:id', function(req, res){
	User.findById(req.params.id, function(err, user) {
		if(!err){
			return res.send(user);
		}
	});
});

// create
app.post('/user', function(req, res){
	var user;
 	
 	user = new User({
 		name : req.body.name,
	});

 	user.save(function(err, data){ 
		if (!err){
			// date === user (true)
			// 반환합니다. _id 값 포함되어 있는것입니다. !!!!!!!!!
			return res.send(user);
 		}else{
 			return res.send("post err");
 		}
 	});
});

// update
app.put('/user/:id', function(req, res){	
	User.findById(req.body._id, function(err, user) {
		user.name = req.body.name;
		
		user.save(function(err){
			if (!err){
				console.log("updated - req.params.name : ", req.params.name);
			}
			// _id 값이 포함된 user JSON 객체를 그대로 반환
			return res.send(user);
		});
	});
});

// delete - users
app.delete('/user', function (req, res) {
	User.remove(function (err) {
		if(!err){
			console.log("remove - all");
			return res.send('');
		}
	});
});

// delete - a single user
app.delete('/user/:id', function (req, res) {
	console.log( '--- delete --------', req.params.id)
	
	User.findById(req.params.id, function (err, user){
		user.remove(function (err) {
			if(!err){
				console.log("remove - id");
				return res.send('');
			}
		});
	});
});

// =========================================================================================
// ===================================== Server ============================================
// =========================================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
