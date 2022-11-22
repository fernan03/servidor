//traigo libreria que controla variables de entorno
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import {ServidorAPI} from './API/ServidorAPI.js'

let servidorHoteles=new ServidorAPI() //Instancia de una clase (OBJETO)
servidorHoteles.despertarServidor()


