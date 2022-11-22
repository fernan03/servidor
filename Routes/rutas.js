//ESTE ARCHIVO ESTABLECE LAS RUTAS O ENPOINTS DE CADA SERVICIO OFRECIDO POR MI API
//const express = require('express') FORMA VIEJA DE IMPORTAR
import express from 'express'

import {ControladorHabitaciones} from '../Controllers/ControladorHabitacion.js'
let controladorHabitacion=new ControladorHabitaciones() //Usando el controlador

import {ControladorReservas} from '../Controllers/ControladorReservas.js'
let controladorReserva=new ControladorReservas()

export let rutasPersonalizadas=express.Router()

rutasPersonalizadas.get('/hoteles/habitaciones',controladorHabitacion.buscarHabitacion)
rutasPersonalizadas.get('/hoteles/habitacion/:id',controladorHabitacion.buscarHabitacionPorId)
rutasPersonalizadas.post('/hoteles/habitacion',controladorHabitacion.registrarHabitacion)
rutasPersonalizadas.put('/hoteles/modificarhabitacion/:id',controladorHabitacion.editarHabitacion)

rutasPersonalizadas.get('/hoteles/reservas',controladorReserva.buscarReserva)
rutasPersonalizadas.get('/hoteles/reservas/:id',controladorReserva.buscarReservaPorId)
rutasPersonalizadas.post('/hoteles/reservas',controladorReserva.agregarReserva)
rutasPersonalizadas.put('/hoteles/modificarreservas/:id',controladorReserva.editarReserva)
rutasPersonalizadas.delete('/hoteles/eliminarreservas/:id',controladorReserva.eliminarReserva)