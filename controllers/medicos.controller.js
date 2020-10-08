// ================================>
//   Controladores de los Medicos
// ================================>

let { response } = require("express");
let Medico = require("../models/medico.model");

let getMedicos = async (req, res = response) => {
  let medicos = await Medico.find()
    .populate("hospital", "nombre img")
    .populate("usuario", "nombre img");

  res.json({
    ok: true,
    medicos,
  });
};

let crearMedico = async (req, res = response) => {
  // UID tomado del token validarJWT() req => uid
  let uid = req.uid;

  let medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    let medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Favor de contactarse con el administrador. CrearMedico",
    });
  }
};

let actualizarMedico = async (req, res = response) => {
  let idMedico = req.params.id;
  // Id del usuario que realiza la modificación
  let uid = req.uid;

  try {
    let medicoDB = await Medico.findById(idMedico);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un médico con ese ID.",
      });
    }

    console.log(uid);

    let cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    let medicoActualizado = await Medico.findByIdAndUpdate(
      idMedico,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
      msg: "Medico actualizado con éxito.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Contactar con el administrador.",
    });
  }
};

let borrarMedico = async (req, res = response) => {
  let idMedico = req.params.id;

  try {
    let medicoDB = await Medico.findOne({ _id: idMedico });
    console.log(medicoDB);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe médico con ese ID.",
      });
    }

    await Medico.findByIdAndDelete(idMedico);

    res.json({
      ok: true,
      msg: "Medico eliminado.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Contacte con el administrador.",
    });
  }
};

let getMedicoById = async (req, res = response) => {
  const idMedico = req.params.id;
  try {
    let medico = await Medico.findById(idMedico)
      .populate("hospital", "nombre img")
      .populate("usuario", "nombre img");

    if (!medico || medico === null) {
      return res.json({
        ok: false,
        msg: "No existe un medico con ese id",
      });
    }

    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log("error:", error);
    res.json({
      ok: false,
      msg: "Hable con el administrador.",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
};
