//const express = require('express') FORMA VIEJA DE IMPORTAR
import express from 'express'

import {rutasPersonalizadas} from '../Routes/rutas.js'

import { conectarConMongo } from '../Database/conexion.js'

import cors from 'cors'

export class ServidorAPI{


    constructor(){
        //app Es la variable que almacena todas las funcionalidades de express
        this.app = express()
        this.conectarConBD()
        this.activarBody()
        this.atenderPeticiones()
    }

    //Metodos de la clase ServidorAPI
    despertarServidor(){
        //ENCENDIENDO EL SERVIDOR EN EL PUERTO 3000
        this.app.listen(process.env.PORT,function(){
            console.log("SERVIDOR ENCENDIDO: "+process.env.PORT)
})
    }

    atenderPeticiones(){
        this.app.use('/',rutasPersonalizadas)
    }

    conectarConBD(){
        conectarConMongo()
    }

    activarBody(){
        this.app.use(cors())
        this.app.use(express.json())
    }
}