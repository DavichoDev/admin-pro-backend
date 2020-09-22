let { response } = require('express');
let { validationResult } = require('express-validator')

let validarCampos = (req, res = response, next) => {

    let errores = validationResult( req );
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}
