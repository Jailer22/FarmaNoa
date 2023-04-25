const { request, response } = require("express")
const session = require("express-session")

var usuarioscontroller = require(__dirname + '/controladores/usuarioscontroller.js').usuarios

//middleware para verificación de tiempo de sesiones
var validarsesion = function (request, response,next){
    if(request.session.rol == undefined || request.session.rol == null || request.session.rol ==  ""){
        response.json({state:false,mensaje:"Inicie sesión nuevamente",redireccion:true})
        return false
    }else{
        next()
    }
}

//Apis Usuarios

//create
app.post("/usuarios/guardar",function(request,response){
    usuarioscontroller.guardar(request, response)
}) 

 //listar
app.post("/usuarios/listar",validarsesion,function(request,response){
    usuarioscontroller.listar (request,response)
})

//Modificar
app.post("/usuarios/modificar",function(request,response){
    usuarioscontroller.modificar (request,response)
})

//Eliminar
app.post("/usuarios/eliminar",function(request,response){
   usuarioscontroller.eliminar (request, response)
})

//listar por Id
app.post("/usuarios/listarId", function(request,response){
    usuarioscontroller.listarId (request,response)
})

//login
app.post("/usuarios/login",function(request,response){
    usuarioscontroller.login(request,response)
})

//Cerrar sesion
app.post("/cerrarsesion",function(request,response){
    request.session.destroy()
    response.json({state:true,mensajes:"Sesión cerrada"})
})

//ver cookie
app.post("/usuarios/vercookies",function(request,response){
    response.json({clave:request.session})
})

//roles_usuarios
app.post("/usuarios/menu_rol",validarsesion,function(request,response){
    if(request.session.rol == 1){
        response.json({state:true,datos:[
            {nombre:'Dashboard',destino:'/dashboard'},
            {nombre:'Usuarios',destino:'/usuarios'},
            {nombre:'Agregar productos',destino:'/agregarprod'}]
        })
    }
    else
        {response.json({state:false,datos:[
            {nombre:'Dashboard',destino:'/dashboard'}
        ]
    })

}

})

//activar cuenta
app.get("/activar/:email/:Cod_activacion",function(request,response){
    usuarioscontroller.Activarcuenta(request,response)
})

//ApiProductos 
var ProductosController = require(__dirname + '/controladores/ProductosController.js').Productos

//create
app.post("/Productos/guardar",function(request,response){
    ProductosController.guardar(request, response)
})

 //listar
app.post("/Productos/listar", function(request,response){
    ProductosController.listar (request,response)
})

//Modificar
app.post("/Productos/modificar",function(request,response){
    ProductosController.modificar (request,response)
})

//Eliminar
app.post("/Productos/eliminar",function(request,response){
   ProductosController.eliminar (request, response)
})

//listar por Id
app.post("/Productos/listarId", function(request,response){
    ProductosController.listarId (request,response)
})

//Apis files(imagenes, archivos, musica)
const multer = require ("multer")
global.path = require('path')

app.post('/subir/:name',function(req,res){
    console.log(req.params)
    var post = {
        ruta:"/ImagenesProductos"
    }
    
    var upload = multer ({
        storage: multer.diskStorage({
            destination:function(req,file,callback){
                callback(null,__dirname + post.ruta)
            },
            filename:function(req,file,callback){
                var ext = path.extname(file.originalname)
                callback(null,req.params.name + ext)
            }
        }),
        fileFilter: function(req,file,callback){
            var ext = path.extname(file.originalname)
            if(ext !== '.png'){
                return callback({state:false,mensaje:"Archivo no permitido"},null)
            }
            callback(null,true)
        }
    }).single('userFile')

    upload(req,res,function(err){
        if(err){
            res.json(err)
        }
        else{
            console.log('ok')
            res.json({state:true,mensaje:"Archivo cargado"})
        }
    })
})

app.post('/ImagenesProductos/:name',function(req,res){
    console.log(req.params)
    var post = {
        ruta:"/ImagenesProductos"
    }
    
    var upload = multer ({
        storage: multer.diskStorage({
            destination:function(req,file,callback){
                callback(null,__dirname + post.ruta)
            },
            filename:function(req,file,callback){
                var ext = path.extname(file.originalname)
                callback(null,req.params.name + ext)
            }
        }),
        fileFilter: function(req,file,callback){
            var ext = path.extname(file.originalname)
            if(ext !== '.png' &&  ext !== '.jpg'){
                return callback({state:false,mensaje:"Archivo no permitido"},null)
            }
            callback(null,true)
        }
    }).single('userFile')

    upload(req,res,function(err){
        if(err){
            res.json(err)
        }
        else{
            console.log('res')
            res.json({state:true,mensaje:"Archivo cargado"})
        }
    })
})


//ApiProductos 
var CarritoController = require(__dirname + '/controladores/CarritoController.js').carrito

app.post("/carrito/guardar",function(request,response){
    CarritoController.guardar(request, response)
})

//listar
app.post("/carrito/listar", function(request,response){
    CarritoController.listar(request,response)
})

//Modificar
app.post("/carrito/modificar",function(request,response){
    CarritoController.modificar (request,response)
})

//Eliminar
app.post("/carrito/eliminar",function(request,response){
   CarritoController.eliminar (request, response)
})




