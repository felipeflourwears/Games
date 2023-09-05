let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos= document.getElementById("aciertos");
let mostrarTiempo= document.getElementById("t-restante");

// Obtén una referencia al botón de recarga por su id
const reloadButton = document.getElementById("reloadButton");


//let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let numbers = ["pop.png","pop.png","ades.png","ades.png","clara.png","clara.png","coca.png","coca.png","power.png","power.png","powerade.png","powerade.png","santaclara.png","santaclara.png","valle.png","valle.png"]
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers)



//FUNCIONES

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer --;
        mostrarTiempo.innerHTML = `Time: ${timer} seconds`;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000)
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
       /*  tarjetaBloqueada.innerHTML = numbers[i]; */
       tarjetaBloqueada.innerHTML = `<img src="./img/${numbers[i]}" alt="Imagen" style="width: 80px; height: 80px;">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas == 1){
        //Mostrar primerResultado
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id];
        /* tarjeta1.innerHTML = primerResultado; */
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}" alt="Imagen" style="width: 80px; height: 80px;">`;

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar Segundo Numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        /* tarjeta2.innerHTML = segundoResultado; */
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}" alt="Imagen" style="width: 80px; height: 80px;">`;

        //Deshabilitar Segundo Boton
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Moves: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerrar contador tarjetas encerradas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos ++;
            mostrarAciertos.innerHTML = `Correct: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML =  `Correct: ${aciertos} 🥳​💪​`;
                mostrarTiempo.innerHTML = `Awesome! Only🔥​🥳​${timerInicial - timer} seconds`;
                mostrarMovimientos.innerHTML = `Moves: ${movimientos} 👍​😎​`;
            }

        }else{
            //Momentaneamente tarjetas
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;

            },800);
        }
    }
}

// Agrega el event listener para recargar la página
reloadButton.addEventListener("click", function() {
    location.reload(); // Esta función recargará la página
});
