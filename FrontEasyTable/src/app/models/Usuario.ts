export class Usuario {

    idUsuario: number = 0
    username: string = ''
    correo: string = ''
    contrasenia: string = ''
    horacreacion: Date = new Date()
    nombrecompleto: string = ''
    numcelular: number = 0
    ciudad: string = ''
    longitud: number = 0
    latitud: number = 0
    roles: { rol: string }[] = [];
}