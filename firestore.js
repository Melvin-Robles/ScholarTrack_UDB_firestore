const firebaseConfig = {
  apiKey: "AIzaSyAagumGjFByMFFBE4aO3qTe4Rs_Kv-xINM",
  authDomain: "scholartrack-udb.firebaseapp.com",
  projectId: "scholartrack-udb",
  storageBucket: "scholartrack-udb.appspot.com",
  messagingSenderId: "1001035970339",
  appId: "1:1001035970339:web:dffe90b65bf752cd4e7e96",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



db.collection("materias")
  .get()
  .then((querySnapshot) => {
    let contenedorMaterias = document.getElementById("content-materias");

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let divContent = document.createElement("div");
      divContent.innerHTML = `   
<div class="card">
  <h5 class="card-header">${data.NOMBRE}</h5>
  <div class="card-body">
    <p class="card-text">Codigo: ${data.CODIGO}</p>
    <p class="card-text">Estado: ${data.ESTADO}</p>
  </div>
</div>
        `;

      contenedorMaterias.appendChild(divContent); 
    });
  });




db.collection("grupos")
  .get()
  .then((querySnapshot) => {
    let contenedorGrupos = document.getElementById("content-grupos");

    querySnapshot.forEach((doc) => {
      let data = doc.data();
            let divContent = document.createElement("div");
      divContent.innerHTML = `   
<div class="card">
  <h5 class="card-header">${data.NOMBRE}</h5>
  <div class="card-body">
    <p class="card-text">Estado: ${data.ESTADO}</p>
  </div>
</div>
        `;

        contenedorGrupos.appendChild(divContent); 
    });
  });


  db.collection("usuarios")
  .get()
  .then((querySnapshot) => {
    let contenedorUser = document.getElementById("content-user");

    querySnapshot.forEach((doc) => {
      let data = doc.data();

      let evaluacionesString = Array.isArray(data.EVALUACIONES) ? data.EVALUACIONES.map((evaluacion) => {

        return ` ${evaluacion.TIPO}, Puntuación: ${evaluacion.NOTA} -- ${evaluacion.MATERIA} `;
      }).join("<br>") : "";

      let materiasImpartidas = Array.isArray(data.MATERIAS_IMPARTIDAS) ? data.MATERIAS_IMPARTIDAS.map((evaluacion) => {

        return `${evaluacion.MATERIA}, GRUPO: ${evaluacion.GRUPO}`;
      }).join("<br>") : "";

      let divContent = document.createElement("div");
      divContent.innerHTML = `   
<div class="card">
  <h5 class="card-header">${data.PRIMER_NOMBRE} ${data.PRIMER_APELLIDO} -  ${data.TIPO} </h5>
  <div class="card-body">
    <p class="card-text">Estado: ${data.ESTADO}</p>
    ${data.CARRERA ? `
    <p class="card-text">Carrera: ${data.CARRERA} </p>`: '' }

    <p class="card-text">Fecha ingreso: ${data.FECHA_INGRESO ? data.FECHA_INGRESO.toDate().toLocaleDateString() : 'No disponible'}</p>
    <p class="card-text">Correo: ${data.CORREO}</p>
    <p class="card-text"> ${evaluacionesString}</p>
    ${materiasImpartidas ? `
    <p class="card-text">Materias impartidas: ${materiasImpartidas} </p>`: '' }
  </div>
</div>
        `;

      contenedorUser.appendChild(divContent); 
    });
});




