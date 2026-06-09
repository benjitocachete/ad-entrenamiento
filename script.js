const firebaseConfig = {
  apiKey: "AIzaSyBsncDyibFxoYoS22ZE1Y7MBBZB2iMwszM",
  authDomain: "ad-entrenamiento.firebaseapp.com",
  databaseURL: "https://ad-entrenamiento-default-rtdb.firebaseio.com",
  projectId: "ad-entrenamiento",
  storageBucket: "ad-entrenamiento.firebasestorage.app",
  messagingSenderId: "689233058150",
  appId: "1:689233058150:web:12315eac0657daf362d0a7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let cantidadClientes = 0;
let clienteEditando = null;

function mostrarAdmin(){
document.getElementById("inicio").classList.add("oculto");
document.getElementById("clientePanel").classList.add("oculto");
document.getElementById("admin").classList.remove("oculto");
}

function mostrarCliente(){
document.getElementById("inicio").classList.add("oculto");
document.getElementById("admin").classList.add("oculto");
document.getElementById("clientePanel").classList.remove("oculto");
}

function volverInicio(){
document.getElementById("inicio").classList.remove("oculto");
document.getElementById("admin").classList.add("oculto");
document.getElementById("clientePanel").classList.add("oculto");
}

function agregarCliente(){

let nombre = document.getElementById("cliente").value;
let usuario = document.getElementById("usuario").value;
let password = document.getElementById("password").value;
let whatsapp = document.getElementById("whatsapp").value;
let edad = document.getElementById("edad").value;
let peso = document.getElementById("peso").value;
let altura = document.getElementById("altura").value;
let objetivo = document.getElementById("objetivo").value;
let lesiones = document.getElementById("lesiones").value;
let observaciones = document.getElementById("observaciones").value;
let asistencias = document.getElementById("asistencias").value;
let ausencias = document.getElementById("ausencias").value;
let lunes = document.getElementById("lunes").value;
let martes = document.getElementById("martes").value;
let miercoles = document.getElementById("miercoles").value;
let jueves = document.getElementById("jueves").value;
let viernes = document.getElementById("viernes").value;
let sabado = document.getElementById("sabado").value;
let domingo = document.getElementById("domingo").value;

if(nombre===""){
alert("Escribí un nombre");
return;
}

let html = `

<h3>${nombre}</h3>
<b>Usuario:</b><br>
${usuario}<br><br>

<b>Contraseña:</b><br>
${password}<br><br>
<b>whatsapp:</b><br>
${whatsapp}<br><br>
<b>Edad:</b><br>
${edad}<br><br>

<b>Peso:</b><br>
${peso} kg<br><br>

<b>Altura:</b><br>
${altura} cm<br><br>

<b>Objetivo:</b><br>
${objetivo}<br><br>

<b>Lesiones:</b><br>
${lesiones}<br><br>

<b>Observaciones:</b><br>
${observaciones}<br><br>

<b>Asistencias:</b><br>
${asistencias}<br><br>

<b>Ausencias:</b><br>
${ausencias}<br><br>

<h2>📅 Rutina Semanal</h2>
<h2>📅 Rutina Semanal</h2>

<h3>⬜ Lunes</h3>
${lunes}<br><br>

<h3>⬜ Martes</h3>
${martes}<br><br>

<h3>⬜ Miércoles</h3>
${miercoles}<br><br>

<h3>⬜ Jueves</h3>
${jueves}<br><br>

<h3>⬜ Viernes</h3>
${viernes}<br><br>

<h3>⬜ Sábado</h3>
${sabado}<br><br>

<h3>⬜ Domingo</h3>
${domingo}<br><br>

<button
onclick="editarCliente(this)">
Editar
</button>
<button onclick="eliminarCliente(this)">
Eliminar
</button>
`;
if(clienteEditando){

clienteEditando.innerHTML = html;
clienteEditando = null;


}else{

let card = document.createElement("div");
card.className = "card";
card.innerHTML = html;

document.getElementById("lista")
.appendChild(card);

}

cantidadClientes =
document.querySelectorAll(".card").length;

document.getElementById("contador").innerText =
"Clientes: " + cantidadClientes;
db.ref("clientes").push({
    nombre,
    usuario,
    password,
    whatsapp,
    edad,
    peso,
    altura,
    objetivo,
    lesiones,
    observaciones,
    asistencias,
    ausencias,
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo
});
guardarDatos();
limpiarFormulario();
}

function editarCliente(boton){

clienteEditando = boton.parentElement;

let nombre =
clienteEditando.querySelector("h3").innerText;

document.getElementById("cliente").value = nombre;

window.scrollTo({
top:0,
behavior:"smooth"
});

alert("Modificá los datos y apretá Guardar Cliente");
}

function eliminarCliente(boton){

boton.parentElement.remove();

cantidadClientes =
document.querySelectorAll(".card").length;

document.getElementById("contador").innerText =
"Clientes: " + cantidadClientes;

guardarDatos();
}

function ingresarCliente(){

let usuario =
document.getElementById("loginUsuario").value;

let password =
document.getElementById("loginPassword").value;

let tarjetas =
document.querySelectorAll(".card");

let encontrado = false;

tarjetas.forEach(card=>{

let contenido =
card.innerHTML.toLowerCase();

if(
contenido.includes(usuario.toLowerCase()) &&
contenido.includes(password.toLowerCase())
){

let copia =
card.cloneNode(true);

let botones =
copia.querySelectorAll("button");

botones.forEach(btn=>{
btn.remove();
});

document.getElementById("fichaCliente")
.innerHTML = "";

document.getElementById("fichaCliente")
.appendChild(copia);

encontrado = true;

}

});

if(!encontrado){

alert("Usuario o contraseña incorrectos");

}
}

function limpiarFormulario(){

document.getElementById("cliente").value="";
document.getElementById("usuario").value="";
document.getElementById("password").value="";
document.getElementById("edad").value="";
document.getElementById("peso").value="";
document.getElementById("altura").value="";
document.getElementById("objetivo").value="";
document.getElementById("lesiones").value="";
document.getElementById("observaciones").value="";
document.getElementById("lunes").value="";
document.getElementById("martes").value="";
document.getElementById("miercoles").value="";
document.getElementById("jueves").value="";
document.getElementById("viernes").value="";
document.getElementById("sabado").value="";
document.getElementById("domingo").value="";
}

function buscarCliente(){

let filtro =
document.getElementById("busqueda")
.value.toLowerCase();

let tarjetas =
document.querySelectorAll(".card");

tarjetas.forEach(card=>{

if(card.innerText.toLowerCase().includes(filtro)){
card.style.display="block";
}else{
card.style.display="none";
}

});

}

function guardarDatos(){

localStorage.setItem(
"clientes",
document.getElementById("lista").innerHTML
);

}

window.onload = function(){

let datos =
localStorage.getItem("clientes");

if(datos){

document.getElementById("lista").innerHTML =
datos;

cantidadClientes =
document.querySelectorAll(".card").length;

document.getElementById("contador").innerText =
"Clientes: " + cantidadClientes;

}cargarEjercicios();

}
function agregarEjercicio(){

let ejercicio =
document.getElementById("nuevoEjercicio").value;

if(ejercicio===""){
alert("Escribí un ejercicio");
return;
}

let select =
document.getElementById("listaEjercicios");

let opcion =
document.createElement("option");

opcion.text = ejercicio;
opcion.value = ejercicio;

select.appendChild(opcion);
console.log("Ejercicio agregado:", ejercicio);
guardarEjercicios();

document.getElementById("nuevoEjercicio").value="";

}

function guardarEjercicios(){

localStorage.setItem(
"ejercicios",
document.getElementById("listaEjercicios").innerHTML
);

}

function cargarEjercicios(){

let datos =
localStorage.getItem("ejercicios");

if(datos){

document.getElementById("listaEjercicios").innerHTML =
datos;

}

}
function eliminarEjercicio(){

let select =
document.getElementById("listaEjercicios");

if(select.selectedIndex == -1){
alert("Seleccioná un ejercicio");
return;
}

select.remove(select.selectedIndex);

guardarEjercicios();

}
function agregarEjercicioRutina(){

let ejercicio =
document.getElementById("listaEjercicios").value;

let series =
document.getElementById("series").value;

let repeticiones =
document.getElementById("repeticiones").value;

let descanso =
document.getElementById("descanso").value;

let dia =
document.getElementById("diaSeleccionado").value;

let texto =
ejercicio + "\n" +
"Series: " + series + "\n" +
"Repeticiones: " + repeticiones + "\n" +
"Descanso: " + descanso + " seg\n\n";

document.getElementById(dia).value += texto;

}
let asistencias = 0;
let ausencias = 0;

function sumarAsistencia(){

asistencias++;

actualizarSeguimiento();

}

function sumarAusencia(){

ausencias++;

actualizarSeguimiento();

}

function actualizarSeguimiento(){

let total = asistencias + ausencias;

let porcentaje = 0;

if(total > 0){
porcentaje =
Math.round((asistencias / total) * 100);
}

document.getElementById("asistencias").innerText =
asistencias;

document.getElementById("ausencias").innerText =
ausencias;

document.getElementById("porcentaje").innerText =
porcentaje + "%";

}
