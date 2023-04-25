var ModelProductos = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var ProductosSchema = new Schema ({
    codigo:String,
    nombre:String,
    valor:String,
    fecha_venc:String,
    categoria:String,
    descripcion:String
})

const MyModel= mongoose.model('productos', ProductosSchema)

ModelProductos.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.codigo = post.codigo,
    instancia.nombre = post.nombre,
    instancia.valor  = post.valor,
    instancia.fecha_venc = post.fecha_venc,
    instancia.categoria = post.categoria,
    instancia.descripcion = post.descripcion,
    instancia.save((error,ProductoCreate) => {
        if(error){
            return callback({estate:false,data:error})
        }
        else{
            return callback({state:true,mensaje:'Registro exitoso',ProductoCreate})
        }
    })

}

ModelProductos.listar = function(post, callback){
    MyModel.find({},{_id:1,codigo:1,nombre:1,valor:1,fecha_venc:1,categoria:1,descripcion:1},(error,documentos) => {
        if(error) {
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true,mensaje:'Lista Productos',data:documentos})
        }
    })

}

ModelProductos.listarId = function(post,callback){
    MyModel.findById(post.id,{},(error,documento) => {
        if(error) {
            return callback({state:false,data:error})
        }
        else{
            return callback({state:true,data:documento})
        }
    })

}

ModelProductos.modificar = function(post,callback){

    MyModel.find({codigo:post.codigo},{},(error,documentos) =>{

        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            if(documentos.length > 0) {
            MyModel.findByIdAndUpdate(documentos[0]._id,{
            codigo:post.codigo,
            nombre:post.nombre,
            valor:post.valor,
            fecha_venc:post.fecha_venc,
            categoria:post.categoria,
            descripcion:post.descripcion},

            (error,RegistroMod) => {
                if(error){
                    return callback({state:false,mensaje:error})
                }
                else {
                    return callback({state:true,mensaje:'Producto actualizado',data:RegistroMod})
                }
            })
        }
            else{
                return callback({state:false,mensaje:'Producto no existe'})
            }
        
        }
    })

}

ModelProductos.eliminar = function(post,callback){

    MyModel.findByIdAndDelete(post.id,(error,RegistroElim) => {
        if(error){
            return callback({state:false,data:error})
        }
        else {
            return callback({state:true})
        }
    })

}

module.exports.Productos = ModelProductos