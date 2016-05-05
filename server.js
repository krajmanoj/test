var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

// application setting property to specify folder where template files are present
app.set('views', './views');

// application setting property to specify templating engine used
app.set('view engine', 'jade');

app.use('/app', express.static('app'));
app.use('/css', express.static('css'));
app.use('/thirdparty', express.static('thirdparty'));

MongoClient.connect('mongodb://admin:admin@ds011321.mlab.com:11321/billingtracker', function(err, db) {
   
    if(!err) {
        console.log("Successfully connected to MongoDB.");
    }
    else {
        console.log("Error connecting to MongoDB -> " + err);
    }

	app.get('/index', function(req, res) {
        res.sendFile('index.html',{ root: __dirname });
    });
	
	//Get all End Clients
    app.get('/rest/endclient', function(req, res){
        console.log("caught endclient request");
        db.collection('end_client').find({}).toArray(function(err, docs) {
            res.send(docs);
            res.status(200).end();
        });       
    });

	//Get all worklocation
    app.get('/rest/worklocation', function(req, res){
        console.log("caught worklocation request");
        db.collection('work_location').find({}).toArray(function(err, docs) {
            res.send(docs);
            res.status(200).end();
        });       
    });

	//Get all Service Practise
    app.get('/rest/servicepractise', function(req, res){
        console.log("caught servicepractise request");
        db.collection('service_practise').find({}).toArray(function(err, docs) {
            res.send(docs);
            res.status(200).end();
        });       
    });	

	//Get all leave calendar
    app.get('/rest/leavecalendar', function(req, res){
        console.log("caught leave calendar request");
        db.collection('leave_calendar').find({}).toArray(function(err, docs) {
            res.send(docs);
            res.status(200).end();
        });       
    });	
	
	//Get all WONs
    app.get('/rest/won', function(req, res){
        console.log("caught request");
        /*res.send([{id : 101, name : 'HLTH'}, {id : 102, name : 'CLS'}]);
        res.status(200).end();*/
        db.collection('won_details').find({}).toArray(function(err, docs) {
            res.send(docs);
            res.status(200).end();
        });       
    });
	

    /*app.get('/', function(req, res) {
        console.log("default")
        res.sendFile('/Billing/index.html');
    });*/

    

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});