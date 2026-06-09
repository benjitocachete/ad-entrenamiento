function ingresarCliente(){

let usuario =
document.getElementById("loginUsuario").value;

let password =
document.getElementById("loginPassword").value;

db.ref("clientes").once("value", function(snapshot){

let encontrado = false;

snapshot.forEach(function(cliente){

let datos = cliente.val();

if(
datos.usuario === usuario &&
datos.password === password
){

document.getElementById("fichaCliente").innerHTML = `

<h2>${datos.nombre}</h2>

<p><b>Whatsapp:</b> ${datos.whatsapp}</p>

<p><b>Edad:</b> ${datos.edad}</p>

<p><b>Peso:</b> ${datos.peso} kg</p>

<p><b>Altura:</b> ${datos.altura} cm</p>

<p><b>Objetivo:</b> ${datos.objetivo}</p>

<p><b>Lesiones:</b> ${datos.lesiones}</p>

<p><b>Observaciones:</b> ${datos.observaciones}</p>

<h2>📅 Rutina Semanal</h2>

<h3>Lunes</h3>
<p>${datos.lunes}</p>

<h3>Martes</h3>
<p>${datos.martes}</p>

<h3>Miércoles</h3>
<p>${datos.miercoles}</p>

<h3>Jueves</h3>
<p>${datos.jueves}</p>

<h3>Viernes</h3>
<p>${datos.viernes}</p>

<h3>Sábado</h3>
<p>${datos.sabado}</p>

<h3>Domingo</h3>
<p>${datos.domingo}</p>

`;

encontrado = true;

}

});

if(!encontrado){
alert("Usuario o contraseña incorrectos");
}

});

}
