var ModelCarrito = require(__dirname + "/../modelos/ModelCarrito.js").carrito;

var CarritoController = {};

CarritoController.guardar = function (request, response) {
  var post = {
    usuario_id: request.session.usuario_id,
    producto_id: request.body.producto_id,
    cantidad: request.body.cantidad,
  };

  if (
    post.usuario_id == undefined ||
    post.usuario_id == null ||
    post.usuario_id == ""
  ) {
    response.json({ state: false, mensaje: "Ingrese id del usuario" });
    return false;
  }

  if (
    post.producto_id == undefined ||
    post.producto_id == null ||
    post.producto_id == ""
  ) {
    response.json({ state: false, mensaje: "Ingrese id del producto" });
    return false;
  }

  if (
    post.cantidad == undefined ||
    post.cantidad == null ||
    post.cantidad == ""
  ) {
    response.json({
      state: false,
      mensaje: "Ingrese cantidad a comprar del producto",
    });
    return false;
  }

  ModelCarrito.guardar(post, function (respuesta) {
    if (respuesta.state == true) {
      response.json({
        state: true,
        mensaje: "Producto agregado correctamente",
      });
    } else {
      response.json({ state: false, mensaje: "Error al guardar producto" });
    }
  });
};

CarritoController.listar = function (request, response) {
  var post = {
    usuario_id: request.session.usuario_id,
  };

  if (
    post.usuario_id == undefined ||
    post.usuario_id == null ||
    post.usuario_id == ""
  ) {
    response.json({ state: false, mensaje: "Ingrese id del usuario" });
    return false;
  }

  ModelCarrito.listar(null, function (respuesta) {
    response.json(respuesta);
  });
};

CarritoController.modificar = function (request, response) {
  var post = {
    id: request.body.id,
    cantidad: request.body.cantidad,
  };

  if (post.id == "" || post.id == undefined || post.id == null) {
    response.json({
      state: false,
      mensaje: "Ingrese el id del producto a modificar",
    });
    return false;
  }

  if (
    post.cantidad == "" ||
    post.cantidad == undefined ||
    post.cantidad == null
  ) {
    response.json({ state: false, mensaje: "Ingrese cantidad" });
    return false;
  }

  ModelCarrito.modificar(post, function (respuesta) {
    response.json(respuesta);
  });
};

CarritoController.eliminar = function (request, response) {
  var post = {
    id: request.body.id,
  };

  if (post.id == "" || post.id == undefined || post.id == null) {
    response.json({ state: false, mensaje: "Ingrese id para eliminar" });
    return false;
  }

  ModelCarrito.eliminar(post, function (respuesta) {
    if (respuesta.state == true) {
      response.json({ state: true, mensaje: "Se eliminó el producto" });
    } else {
      response.json({ state: false, mensaje: "No se pudo eliminar" });
    }
  });
};

module.exports.carrito = CarritoController;
