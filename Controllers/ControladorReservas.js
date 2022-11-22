import { ServicioReserva } from "../Services/ServicioReserva.js";
import { ServicioHabitacion } from "../Services/ServicioHabitacion.js"; 

export class ControladorReservas{

    constructor(){}

    async buscarReserva(request,response){
        let objetoServicioReserva=new ServicioReserva()
       try{
        response.status(200).json({
            "mensaje":"exito en la consulta",
            "datos":await objetoServicioReserva.buscarReservas()
        })
       }catch(error){
        response.status(400).json({
            "mensaje":"error en la consulta "+error,
            "datos":null
        })
       }
    }

    async buscarReservaPorId(request,response){
        let idreserva=request.params.id
        let objetoServicioReserva=new ServicioReserva()
        try{
            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioReserva.buscarReservaPorId(idreserva),
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null
            })
        }
    }

    async agregarReserva(request,response){
        let datosreserva=request.body
        let objetoServicioReserva=new ServicioReserva()
        let objetoServicioHabitacion=new ServicioHabitacion()

        console.log(datosreserva)
        try{

            let datosHabitacion=await objetoServicioHabitacion.buscarHabitacionPorId(datosreserva.idHabitacion)
            let maximoPersonas=datosHabitacion.numeroMaximoPersona
            let numeroPersonas = datosreserva.numeroNinos+datosreserva.numeroAdultos
            let entrada=new Date(datosreserva.fechaEntrada);
            let salida=new Date(datosreserva.fechaSalida);
            const dias = Math.floor((salida-entrada)/(1000*60*60*24))
            let costo = 0;

            if(dias>0){
                if(maximoPersonas>=numeroPersonas){
                    costo=Number(datosHabitacion.valorNoche)*Number(dias);
                    datosreserva.costoReserva=costo
                    await objetoServicioReserva.agregarReservaEnBD(datosreserva)
                    response.status(200).json({
                        "mensaje":"exito en el registro",
                        "datos":null
                    })
                }else{
                    response.status(400).json({
                        "mensaje":"Espacio insuficiente",
                        "datos":null
                    })
                }
            }else{
                response.status(400).json({
                    "mensaje" : "Se debe quedar un dia como minimo",
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

    async editarReserva(request,response){
        let objetoServicioReserva=new ServicioReserva()
        let idreserva=request.params.id
        let datoseditar=request.body
        try{
            await objetoServicioReserva.editarReserva(idreserva,datoseditar)
            response.status(200).json({
                "mensaje":"exito en la actualizacion "+idreserva,
                "datos":null
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error en la actualizacion "+error,
                "datos":null
            })
        }
    }

    async eliminarReserva(request,response){
        let objetoServicioReserva=new ServicioReserva()
        let idreserva=request.params.id
        try{
            await objetoServicioReserva.eliminarReserva(idreserva)
            response.status(200).json({
                "mensaje":"exito eliminado reserva",
                "datos":null
            })
        }catch(error){
            response.status(400).json({
                "mensaje":"error elimando reserva "+error,
                "datos":null
                })
        }
    }

    
}