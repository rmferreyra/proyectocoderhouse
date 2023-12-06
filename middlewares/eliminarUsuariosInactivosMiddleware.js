const logger = require('../logger/index');
const ManagerFactory = require('../dao/managersMongo/manager.factory')

const userManager = ManagerFactory.getManagerInstance('users')

const mailSenderService = require('../services/mail.sender.service')

async function eliminarUsuariosInactivos () {
    logger.info('Ejecutando eliminacion de usuarios inactivos' + " " + new Date())
    const users = await userManager.getUsers()

    const fechaActual = new Date()

    users.forEach(async usuarios => {
        
        const dosDias = 2 * 24 * 60 * 60 * 1000
        const fechaCadena = usuarios.last_connection.replace(/^Connect|Disconnect/, '').trim();
        const fechaConexion = new Date(fechaCadena)

        const tiempoInactivo = fechaActual - fechaConexion

        if(tiempoInactivo >= dosDias){
            if(usuarios.role === 'admin'){
                return
            }
                      
            const template = `
            <h2>¡Hola ${usuarios.first_name}, ${usuarios.last_name}!</h2>
            <h4>Queriamos avisarte que tu cuenta del eCommerce fue eliminada por inactividad. Te invitamos a que vuelvas a registrarte y comprar en nuestra pagina.</h4>
            <h4>Muchas Gracias.</h4>
            <h4>Tu eCommerce de Confianza.</h4>
            `
            
            const subject = 'Cuenta Eliminadad Por Inactividad'
            
            mailSenderService.send(subject, usuarios.email, template)

            logger.info(`El usuario ${usuarios.first_name} fue eliminado por inactividad`)
            await userManager.deleteUser(usuarios._id)
        }
    });

    setTimeout(eliminarUsuariosInactivos, 24 * 60 * 60 * 1000)
}

module.exports = eliminarUsuariosInactivos