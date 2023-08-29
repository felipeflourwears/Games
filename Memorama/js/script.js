let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos= document.getElementById("aciertos");
let mostrarTiempo= document.getElementById("t-restante");


let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers)



//FUNCIONES

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000)
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
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
        tarjeta1.innerHTML = primerResultado;

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar Segundo Numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = segundoResultado;

        //Deshabilitar Segundo Boton
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerrar contador tarjetas encerradas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos ++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML =  `Aciertos: ${aciertos} 🥳​💪​`;
                mostrarTiempo.innerHTML = `Fantástico!🔥​​🥳​​Solo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👍​😎​`;
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