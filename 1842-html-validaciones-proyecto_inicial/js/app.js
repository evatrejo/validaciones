import { valida } from "./validaciones.js"; //importamos funcion valida

const inputs = document.querySelectorAll("input"); //selecciona todos los input del html

inputs.forEach( input =>{
    input.addEventListener("blur", (input) => {
        valida(input.target); //agrega el addeventlistener a cada input
    })
})

