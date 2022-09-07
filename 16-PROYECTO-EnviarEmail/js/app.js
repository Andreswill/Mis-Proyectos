//Variables
const btnEnviar = document.querySelector("#enviar");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const alerta = document.querySelector('#alerta');
const form = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




//Eventos
eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  //Validar form
  email.addEventListener("blur", validarForm);
  asunto.addEventListener("blur", validarForm);
  mensaje.addEventListener("blur", validarForm);
  //Reset btn
  btnReset.addEventListener("click", resetForm);
  //Enviar Email
  btnEnviar.addEventListener("click", enviarMail);
  
}





//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
  alerta.style.visibility = "hidden";
  
}



function validarForm(e) {
  if (e.target.value.length > 0) {
        alerta.style.visibility = "hidden";
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    
  } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios.");
  }
  if (e.target.type === "email") {
    if(er.test(email.value)){

    }else{
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Email no válido.");
    }
  }
  if ( er.test(email.value) && asunto.value !== "" && mensaje.value !== "" ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    } 

}


function mostrarError(mensaje) {
    alerta.innerHTML = `<span class="font-bold">Opps!</span> ${mensaje}`
    alerta.style.visibility = "visible";
}

function enviarMail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";

    //Despues de tres segundos mostrar mensaje
    setTimeout( () => {
        spinner.style.display = "none";
        resetForm();
        swal("Enviado!", "Su mensaje se envío correctamente.", "success");
    }, 3000 );
}


//Funcion que resetea el formulario
function resetForm() {
    form.reset();
    iniciarApp();
}