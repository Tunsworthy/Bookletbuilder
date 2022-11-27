//Required modules
const { Console } = require('console');
const express = require('express')
    , mongoose = require('mongoose')
    , models = require('./models')
    , http = require('http')
    , path = require('path')
    , bodyParser = require('body-parser')
    , favicon = require('serve-favicon')
	, logger = require('morgan')
    , methodOverride = require('method-override')
    , fs = require('fs')

//Connect to Mongo
if(process.env.MONGODB_URI){
   async function dbconnection(){
	mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true }).then( 
			() => {
				console.log('Database connection established')
		},
		error => {
			console.log(error.reason)
			dbconnection()
		});
}
dbconnection().catch(error => console.log(error)) 
}


const app = express();

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');
    app.use(favicon(__dirname + '/public/images/favicon.png'));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true,limit: '100mb' }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json({limit: '100mb'}));
  
    app.use('/md', express.static(__dirname + '/node_modules/material-components-web/dist')); // redirect CSS bootstrap

//load all routes from route file
    const routePath="./routes/"; //add one folder then put your route files there my router folder name is routers
    fs.readdirSync(routePath).forEach(function(file) {
        const route=routePath+file;
        require(route)(app);
    });
 

    if (app.get('env') == 'development') {
        app.locals.pretty = true;
    }


    http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
      console.log(process.env.PROGRAM_NAME)
    });

    let booklet_processor = require('./backend/booklet_processor')
    //booklet_processor.intitate()