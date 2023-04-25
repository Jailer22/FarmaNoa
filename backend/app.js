// Actividad 7
var express = require('express')
global.app = express()
global.datos = [];
var bodyParse = require('body-parser')
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
global.path = require('path');
global.config = require(__dirname + '/config.js').config



app.all('*',function(request,response,next){

        var listablanca  = request.headers.origin; //lista blanca
        response.header('Access-Control-Allow-Origin', listablanca)
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
        response.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        response.header("Access-Control-Allow-Credentials", "true");
        next()
     })

// llave para iniciar sesion
var session = require ('express-session')({
    secret:claveoculta,
    resave:true,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,maxAge:tiemposesion},
    name:cokiename,
    rolling:true,
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/' + db + 'cookie'})
})

app.use (session);

//Dar acceso a origenes
var cors = require('cors')//recursos compartidos
app.use(cors({origin:function(origin,callback){

        if(!origin) return callback(null,true)

        if(listablanca.indexOf(origin) === -1){

            return callback('error cors',false)
        }

        return callback (null,true)}
}))

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/' + db, {useNewUrlParser:true,useUnifiedTopology:true},(error,response)=>{
    if (error){
        console.log(error)
    }
    else {
        console.log('Conectado a la base de datos')
    }
})

require(__dirname + '/routes.js')

app.use('/archivos', express.static(__dirname + '/files'))
app.use('/productos', express.static(__dirname + '/ImagenesProductos'))

app.use('/', express.static(__dirname + '/dist/frontend'))
app.get('*/', function(request, response, next){
    response.sendFile(path.resolve(__dirname + '/dist/frontend/index.html'))
})

var sha256 = require('sha256');
const { config } = require('./config');
const path = require('path');



app.listen(config.puerto,function(){
    console.log('Servidor conectado por el puerto: ' + config.puerto)
})