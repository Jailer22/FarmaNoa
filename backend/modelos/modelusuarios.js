const mongoose = require("mongoose");
const Schema = mongoose.Schema;
console.log(usuariosSchema)

var usuariosSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  cedula: String,
  password: String,
  rol: Number,
  estado: Number,
  Cod_activacion: String,
});

const MyModel = mongoose.model("usuarios", usuariosSchema);
var ModelUsuarios = {};

//login // revisar uso de promise
ModelUsuarios.login = function (post, callback) {
  MyModel.find(
    { email: post.email, password: post.password },
    { nombre: 1, rol: 1, id: 1 },
    (error, documento) => {
      if (error) {
        return callback({ state: false, mensaje: error });
      } else {
        if (documento.length == 0) {
          return callback({ state: false, mensaje: "Datos incorrectos" });
        } else {
          return callback({ state: true, data: documento });
        }
      }
    }
  );
};
//validar usuario ok
ModelUsuarios.ValidarEstado = function (post, callback) {
  MyModel.find({ email: post.email }, { estado: 1 }, (error, documento) => {
    if (error) {
      return callback({ state: false, data: error });
    } else {
      return callback({ state: true, data: documento });
    }
  });
};

ModelUsuarios.validarEstado = (post) => new Promise( ( res , rej ) => {
    
    MyModel.find({ email: post.email }, { estado: 1 }, (error, documento) => {
        if (error) {
            res(documento)
        }else{
            rej({ state: false, data: error })
        }
    })
})


//Activar usuario
ModelUsuarios.Activar = function (post, callback) {
  MyModel.find(
    { email: post.email, Cod_activacion: post.Cod_activacion },
    { estado: 1 },
    (error, documento) => {
      if (error) {
        return callback({ state: false, data: error });
      } else {
        return callback({ state: true, data: documento });
      }
    }
  );
};

//Actualizar estado de usuario
ModelUsuarios.Actualizarestado = function (post, callback) {
  MyModel.findByIdAndUpdate(post.id, { estado: 1 }, (error, documento) => {
    if (error) {
      return callback({ state: false, data: error });
    } else {
      return callback({ state: true, data: documento });
    }
  });
};

//guardar usuario
ModelUsuarios.guardar = function (post, callback) {
  const instancia = new MyModel();

  instancia.nombre = post.nombre;
  instancia.apellido = post.apellido;
  instancia.email = post.email;
  instancia.cedula = post.cedula;
  instancia.password = post.password;
  instancia.rol = "3";
  instancia.estado = "0";
  instancia.Cod_activacion = post.Cod_activacion;
  instancia.save((error, UserCreate) => {
    if (error) {
      console.log(error);
      return callback({ estate: false, mensaje: error });
    } else {
      return callback({ state: true, mensaje: "Registro exitoso", UserCreate });
    }
  });
};

// listar usuarios
ModelUsuarios.listar = function (post, callback) {
  MyModel.find(
    {},
    {
      _id: 1,
      nombre: 1,
      apellido: 1,
      email: 1,
      cedula: 1,
      password: 1,
      Cod_activacion: 1,
      estado: 1,
    },
    (error, documentos) => {
      if (error) {
        return callback({ state: false, mensaje: error });
      } else {
        return callback({
          state: true,
          mensaje: "Lista usuarios",
          data: documentos,
        });
      }
    }
  );
};

//listar por Id
ModelUsuarios.listarId = function (post, callback) {
  MyModel.findById(post.id, {}, (error, documento) => {
    if (error) {
      return callback({ state: false, data: error });
    } else {
      return callback({ state: true, data: documento });
    }
  });
};

// Modificar usuario
ModelUsuarios.modificar = function (post, callback) {
  MyModel.find({ cedula: post.cedula }, {}, (error, documentos) => {
    if (error) {
      return callback({ state: false, mensaje: error });
    } else {
      if (documentos.length > 0) {
        MyModel.findByIdAndUpdate(
          documentos[0]._id,
          {
            nombre: post.nombre,
            apellido: post.apellido,
            email: post.email,
            password: post.password,
          },
          (error, RegistroMod) => {
            if (error) {
              return callback({ state: false, mensaje: error });
            } else {
              return callback({
                state: true,
                mensaje: "Registro actualizado",
                data: RegistroMod,
              });
            }
          }
        );
      } else {
        return callback({ state: false, mensaje: "Cédula no existe" });
      }
    }
  });
};

//Eliminar usuario
ModelUsuarios.eliminar = function (post, callback) {
  MyModel.findByIdAndDelete(post.id, (error, RegistroElim) => {
    if (error) {
      return callback({ state: false, mensaje: error });
    } else {
      return callback({ state: true, mensaje: "Registro eliminado" });
    }
  });
};

module.exports.usuarios = ModelUsuarios;
