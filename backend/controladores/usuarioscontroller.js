var ModelUsuarios = require(__dirname + '/../modelos/modelusuarios.js').usuarios
var sha256 = require('sha256')
var usuarioscontroller = {
}

//Cod activacion
function Aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Usuarios
usuarioscontroller.guardar = function (request, response) {

    var post = {

        nombre: request.body.nombre,
        apellido: request.body.apellido,
        email: request.body.email,
        cedula: request.body.cedula,
        password: request.body.password

        //password:sha256(request.body.password + config.ClaveSeguraPass)
    }

    //validacion de campos
    if (post.nombre == "" || post.nombre == null || post.nombre == undefined) {
        response.json({ state: false, mensaje: "Ingrese su nombre" })
        return false
    }

    if (post.apellido == "" || post.apellido == null || post.apellido == undefined) {
        response.json({ state: false, mensaje: "ingrese su apellido" })
        return false
    }

    if (post.email == "" || post.email == null || post.email == undefined) {
        response.json({ state: false, mensaje: "Ingrese su correo" })
        return false
    }

    if (post.cedula == "" || post.cedula == null || post.cedula == undefined) {
        response.json({ state: false, mensaje: "Ingrese su numero de cédula" })
        return false
    }

    if (post.password == "" || post.password == null || post.password == undefined) {
        response.json({ state: false, mensaje: "Ingrese su contraseñaaa" })
        return false
    }

    //se genera cod activacion aleatorio
    post.Cod_activacion = Aleatorio(1000, 9999)

    //se declara variable para importar servicio de envio de correos
    const nodemailer = require('nodemailer');

    //configuración de servidor de correo
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'jaiandlui@gmail.com',
            pass: 'yqlzrljvhvwkcwpr'
        },

        tls: {
            rejectUnauthorized: false
        }
    });

    //Datos enviados al correo registrado
    let mailOptions = {
        from: 'jaiandlui@gmail.com',
        to: post.email,
        subject: 'Verificación de cuenta - Farmanoa',
        html: "<a href='http://localhost:3000/activar/" + post.email + "/" + post.Cod_activacion + "'>Activa tu cuenta en el siguiente enlace</a>",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message)
            response.json({ state: 'error' });
        }
        else {
            ModelUsuarios.guardar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Registro exitoso" })
                }
                else {
                    response.json({ state: false, mensaje: "Registro no exitoso" })
                }
            })

        }
    });
}

usuarioscontroller.listar = function (request, response) {
    ModelUsuarios.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

usuarioscontroller.listarId = function (request, response) {

    var post = {
        id: request.body.id
    }

    if (post.id == undefined || post.id == null || post.id == "") {
        response.json({ state: false, mensaje: 'El Id es obligatorio' })
        return false
    }

    ModelUsuarios.listarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

usuarioscontroller.modificar = function (request, response) {

    var post = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        correo: request.body.correo,
        cedula: request.body.cedula,
        password: request.body.password
        // password:sha256(request.body.password + config.ClaveSeguraPass)

    }


    if (post.nombre == "" || post.nombre == undefined || post.nombre == null) {
        response.json({ state: false, mensaje: "Ingrese nombre" })
        return false
    }


    if (post.cedula == "" || post.cedula == undefined || post.cedula == null) {
        response.json({ state: false, mensaje: "Ingrese numero de cédula" })
        return false
    }


    // //var posicion = datos.findIndex((item)=> item.cedula == post.cedula)

    // //if(posicion == -1 ){
    //     response.json({state:false,mensaje:"Esta cedula no existe"})
    //     return false
    // }

    // post.posicion = posicion
    ModelUsuarios.modificar(post, function (respuesta) {
        response.json(respuesta)
    })
}

usuarioscontroller.eliminar = function (request, response) {

    var post = {
        id: request.body.id
    }

    // if(post.id == "" || post.id == undefined || post.id == null){
    //     response.json({state:false,mensaje:"Ingrese Id para eliminar"}) 
    //     return false
    // }

    ModelUsuarios.eliminar(post, function (respuesta) {
        response.json(respuesta)
    })
}

usuarioscontroller.login = function (request, response) {

    var post = {
        email: request.body.email,
        password: request.body.password,
        //password:sha256(request.body.password + config.ClaveSeguraPass)
    }

    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({ state: false, mensaje: 'Ingrese su contraseña' })
        return false
    }

    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: 'Ingrese su correo electrónico' })
        return false
    }

    ModelUsuarios.ValidarEstado(post, function (estado) {

        if (estado.data[0].estado == 0) {
            console.log(estado)
            response.json({ state: false, mensaje: "Debe activar su cuenta" })
        }
        else {
            ModelUsuarios.login(post, function (respuesta) {
                console.log(respuesta)
                if (respuesta.state == true) {

                    request.session.nombre = respuesta.data[0].nombre
                    request.session.rol = respuesta.data[0].rol
                    request.session.usuario_id = respuesta.data[0]._id
                    response.json({ state: true, mensaje: "Bienvenido" })
                } else {
                    response.json({ state: false, mensaje: "Correo o contraseña incorrecta" })
                }
            })

        }
    })

}

usuarioscontroller.Activarcuenta = function (request, response) {
    var post = {
        email: request.params.email,
        Cod_activacion: request.params.Cod_activacion
    }

    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: 'Ingrese su correo' })
        return false
    }

    if (post.Cod_activacion == undefined || post.Cod_activacion == null || post.Cod_activacion == "") {
        response.json({ state: false, mensaje: 'Ingrese su código de activación' })
        return false
    }

    ModelUsuarios.Activar(post, function (verestado) {
        if (verestado.data.length == 0) {
            response.json({ state: false, mensaje: "El email o el código es inválido" })
        }
        else {
            if (verestado.data[0].estado == 1) {
                response.send("<div style='background: blue; color: white; width: 170px; height: 55px;'>La Cuenta ya fue activada</div>")
                // response.json({state:true,mensaje:"La cuenta ya fue activada"})
            }
            else {
                post.id = verestado.data[0]._id
                ModelUsuarios.Actualizarestado(post, function (resp) {
                    if (resp.state == true) {
                        response.send("<div style='background: blue; color: white; text-align:center'>Cuenta activada correctamente</div>")

                        //response.json({state:true,mensaje:"Cuenta activada correctamente"})
                    }
                    else {
                        response.json({ state: false, mensaje: "No se pudo activar la cuenta" })
                    }
                })
            }
        }

    })
}
module.exports.usuarios = usuarioscontroller
