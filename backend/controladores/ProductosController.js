var ModelProductos = require(__dirname + '/../modelos/modelProductos.js').Productos

var ProductosController = {}

ProductosController.guardar = function (request, response) {

    var post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        valor: request.body.valor,
        fecha_venc: request.body.fecha_venc,
        categoria: request.body.categoria,
        descripcion: request.body.descripcion
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
        response.json({ state: false, mensaje: "Ingrese código del producto" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "Ingrese nombre del producto" })
        return false
    }

    if (post.valor == undefined || post.valor == null || post.valor == "") {
        response.json({ state: false, mensaje: "Ingrese valor del producto" })
        return false
    }

    if (post.fecha_venc == undefined || post.fecha_venc == null || post.fecha_venc == "") {
        response.json({ state: false, mensaje: "Ingrese fecha de vencimiento del producto" })
        return false
    }

    if (post.categoria == undefined || post.categoria == null || post.categoria == "") {
        response.json({ state: false, mensaje: "Ingrese categoria del producto" })
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == "") {
        response.json({ state: false, mensaje: "Ingrese descripcion del producto" })
        return false
    }

    ModelProductos.guardar(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Producto guardado correctamente" })
        } else {
            response.json({ state: false, mensaje: "Error al guardar producto" })
        }
    })
}

ProductosController.listar = function (request, response) {
    ModelProductos.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

ProductosController.listarId = function (request, response) {

    var post = {
        id: request.body.id
    }

    if (post.id == undefined || post.id == null || post.id == "") {
        response.json({ state: false, mensaje: 'El Id es obligatorio' })
        return false
    }

    ModelProductos.listarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

ProductosController.modificar = function (request, response) {
    var post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        valor: request.body.valor,
        fecha_venc: request.body.fecha_venc,
        categoria: request.body.categoria,
        descripcion: request.body.descripcion

    }

    if (post.codigo == "" || post.codigo == undefined || post.codigo == null) {
        response.json({ state: false, mensaje: "Ingrese el código del producto a modificar" })
        return false
    }

    if (post.nombre == "" || post.nombre == undefined || post.nombre == null) {
        response.json({ state: false, mensaje: "Ingrese nombre" })
        return false
    }

    ModelProductos.modificar(post, function (respuesta) {
        response.json(respuesta)
    })
}

ProductosController.eliminar = function (request, response) {

    var post = {
        id: request.body.id
    }

    if (post.id == "" || post.id == undefined || post.id == null) {
        response.json({ state: false, mensaje: "Ingrese id para eliminar" })
        return false
    }

    ModelProductos.eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se eliminó el producto" })
        } else {
            response.json({ state: false, mensaje: "No se pudo eliminar" })
        }
    })

}

module.exports.Productos = ProductosController