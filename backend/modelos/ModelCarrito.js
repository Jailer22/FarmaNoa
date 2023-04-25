var ModelCarrito = {}


const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var carritoSchema = new Schema ({
    usuario_id:{type: mongoose.Schema.Types.ObjectId,ref:'usuarios'},
    productos_id:{type: mongoose.Schema.Types.ObjectId,ref:'productos'},
    cantidad:Number
   
})

const MyModel= mongoose.model('carrito', carritoSchema)

ModelCarrito.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.usuario_id = post.usuario_id
    instancia.productos_id = post.productos_id
    instancia.cantidad  = post.cantidad
    
    instancia.save((error,Create) => {
        if(error){
            return callback({estate:false,data:error})
        }
        else{
            return callback({state:true,mensaje:Create})
        }
    })

}

ModelCarrito.listar = function(post, callback){

    MyModel.aggregate([
        {$match:{usuario_id:mongoose.Types.ObjectId(post.usuario_id)}},
        {
            $lookup:{
                from:"productos",// se enlzaza con collection producto
                localField:"producto_id",
                foreignField:"_id",
                as:"productos"
            }
        },
        {$unwind: "$productos"}, // esto es para no mostrar como array la i
        {
            $project:{_id:1,
                    productos_id:1,
                    cantidad:1,
                    productos:{nombre:1,valor:1,codigo:1}
            }
        }
    ],(error,documentos) =>{
        if(error){
            return callback ({state:false,error:error})
        }
        else{
            return callback ({state:true,data:documentos})
        }
        

    })
}


ModelCarrito.modificar = function(post,callback){

    MyModel.findByIdAndUpdate(post.id,{cantidad:post.cantidad},(error,documentos) =>{

        if(error){
            return callback({state:false,mensaje:error})
        }
        else{   
            return callback({state:true,mensaje:'Carrito actualizado'})
        }
    })
}
           
ModelCarrito.eliminar = function(post,callback){

    MyModel.findByIdAndDelete(post.id,(error,RegistroElim) => {
        if(error){
            return callback({state:false,data:error})
        }
        else {
            return callback({state:true})
        }
    })
}

module.exports.carrito = ModelCarrito