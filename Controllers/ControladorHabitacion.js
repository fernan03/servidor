import { ServicioHabitacion } from "../Services/ServicioHabitacion.js"

export class ControladorHabitaciones{

    constructor(){}

    async buscarHabitacion(request,response){
        let objetoServicioHabitacion=new ServicioHabitacion()
        
        try{
            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioHabitacion.buscarHabitaciones(),
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })
        }
    }

    async buscarHabitacionPorId(request,response){
        let idhabitacion=request.params.id //recibo id de la peticion
        let objetoServicioHabitacion=new ServicioHabitacion()
        
        try{
            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioHabitacion.buscarHabitacionPorId(idhabitacion),
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null
            })
        }
    }

    async registrarHabitacion(request,response){
        let datosHabitacion=request.body //OBTENGO DATOS DEL BODY
        let objetoServicioHabitacion=new ServicioHabitacion()
        
        try{
            if(datosHabitacion.numeroMaximoPersona<8){
                await objetoServicioHabitacion.agregarHabitacionEnBD(datosHabitacion)
                response.status(200).json({
                    "mensaje":"exito en el registro",
                    "datos":null
                })
            }else{
                response.status(400).json({
                    "mensaje":"no hay espacio suficiente",
                    "datos":null
                })
            }
        }catch(error){
            response.status(400).json({
                "mensaje":"error en el registro "+error,
                "datos":null
            })
        }
    }

    async editarHabitacion(request,response){
        let objetoServicioHabitacion=new ServicioHabitacion()
        let idhabitacion = request.params.id
        let datoseditar = request.body
        
        try{
            await objetoServicioHabitacion.editarHabitacion(idhabitacion,datoseditar)
            response.status(200).json({
                "mensaje":"exito en la actualizacion "+idhabitacion,
                "datos":null
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error en la actualizacion "+error,
                "datos":null
            })
        }
    }
}