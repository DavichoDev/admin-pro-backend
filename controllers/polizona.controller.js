// ================================>
//   Controladores de polizona
// ================================>

let { response } = require("express");
let fetch = require("node-fetch");
let  ajax  = require('rxjs/ajax');

// Servicio para la creación de usuarios.
let enviarJson = async (req, res = response) => {

    let entradas = req.query.entradas;
    let id = req.query.id;

    let baseDeConocimiento = `objeto:- write('{ '), read(X), a1(X), write('}'). a1(X):- X = 'atributo' -> atributo; 
    write(' '). atributo:- read(X), write('"'), write(X), write('":'), tipoatributo(X), 
    otro. otro:- read(X), X = 'atributo' -> write(', '), atributo; write(' '). 
    tipoatributo(M):- read(X), (X = 'metodo' -> metodo(M);  
    X = 'numero' -> numero; X = 'cadena' -> cadena; X = 'objeto' -> objeto;  
    X = 'arreglo' -> arreglo; write(' ') ). cadena:- read(X), write('"'), 
    write(X), write('"'). numero:- read(X), write(X). arreglo:- write('['), 
    read(X), elemento(X). elemento(X):- tipoatributo(X) , otroElemento. 
    otroElemento:- read(X), X = 'elemento' -> write(',') , elemento(X) ; 
    X = 'finArr' -> write(']') ; otro. metodo(M):- write('"function() {'),
    a2,write(' return '), write(M), write(';}"'). a2:- read(X), 
    (X='decision'->decision;a3(X)). a3(X):- X='asignacion' -> asignacion;
    (a4(X)). a4(X):- X='fin' -> write('');(write('ERROR: '),write(X)). 
    asignacion:- read(X), write(X), write('='), read(Y), write(Y), 
    write(';'),a2. decision:- write('if('),condicion,write(')'), 
    verdadero,falso. condicion:-read(X), write(X). verdadero:- 
    write('{'),a2,write('}'). falso:- write('else {'),a2,write('}'). :- objeto.`;

    const url = `https://rextester.com/rundotnet/api?LanguageChoice=19&Program=${baseDeConocimiento}&Input=${entradas}`;
    try {

        res.json({
            ok: true,
            msg: 'conexion exitosa'
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error al enviar JSON',
            id: id,
            err: error
        });
    }
};

module.exports = {
  enviarJson,
};
