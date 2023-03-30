const inputNacimiento = document.querySelector("#birth");

//blur se activa saliendo del input
inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);

})

export function valida(input){ //se manda llamar cada vez que el usuario sale del input que estaba rellendando 
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "paternMismatch",
    "customError"
]
    


//objeto
const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio",
        paternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minuscula, una mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento:{
        valueMissing: "Este campo de fecha no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo de numero no puede estar vacio",
        paternMismatch: "El formato requerido es xxxxxx"
    },
    direccion:{
        valueMissing: "Este campo de direccion no puede estar vacio",
        paternMismatch: "La direccion debe contener al menos 10 caracteres"
    },
    estado:{
        valueMissing: "Este campo de estado no puede estar vacio",
        paternMismatch: "El estado debe contener al menos 10 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo de ciudad no puede estar vacio",
        paternMismatch: "La ciudad debe contener al menos 10 caracteres"
    }

}

//objeto
const validadores = {
    //funcion que recibe un input
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoInput,input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]) {
            mensaje = mensajesDeError[tipoInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value) ; //creamos nueva instancia de fecha
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje);

}

function mayorDeEdad(fecha){
    const fechaActual = new Date(); 
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth() , 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
