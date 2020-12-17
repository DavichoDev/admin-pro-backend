// ================================>
//   Controladores de los Usuarios
// ================================>

let { response } = require("express");
let Arduino = require("../models/arduino.model");

let obtenerDatos = async (req, res = response) => {

  let idDispositivo = req.params.id;

  try {

    let dispositivo = await Arduino.findById(idDispositivo);
  
    if (!dispositivo) {
      return res.status(404).json({
        ok: false,
        msg: 'Dispositivo no encontrado.'
      });
    }

    res.json({
      ok: true,
      dispositivo
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor.'
    });
  }


};

let enviarDatos = async (req, res = response) => {

  try{

    let dispositivo = new Arduino(req.body);
    await dispositivo.save();
    res.json({
      ok: true,
      dispositivo
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs.",
    });
  }

};

let modificarDatos = async (req, res = response) =>{

  let idDispositivo = req.params.id;

  try {

    let dispositivo = await Arduino.findById(idDispositivo);

    if (!dispositivo) {
      return res.status(404).json({
        ok: false,
        msg: "Dispositivo no encontrado.",
      });
    }

    let cambiosDispositivo = {
      ...req.body
    };

    let dispositivoNuevo = await Arduino.findByIdAndUpdate(
      idDispositivo,
      cambiosDispositivo,
      { new: true }
    );

    res.json({
      ok: true,
      dispositivoNuevo,
      msg: "Cambio de estados.",
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Contactar con el administrador.",
    });
  }
};

module.exports = {
  obtenerDatos,
  enviarDatos,
  modificarDatos
};
