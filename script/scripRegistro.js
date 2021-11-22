document.addEventListener('DOMContentLoaded', function(){
    obtenerLocalStorage();
})

document.getElementById("btn").addEventListener('click', function(){
    capturarDatos();
})

function capturarDatos(){
    let nombreV = document.getElementById("inputNombre").value;
    let apellidoV = document.getElementById("inputApellido").value;
    let telV = document.getElementById("inputTel").value;
    let dirV = document.getElementById("inputDir").value;
    let observacionV = document.getElementById("ingresoObservaciones").value;

    if(isNaN(telV)){
        alert("Por favor ingrese números en el campo de teléfono")
    } else if(nombreV === "" || apellidoV === "" || telV === "" || dirV === ""){
        alert("Ingrese por favor los campos obligatorios")
    }

    let objetoDatosPersonales = {
        nombre: nombreV,
        apellido: apellidoV,
        tel: telV,
        dir: dirV,
        observacion: observacionV,
    }

    localStorage.setItem('DatosPersonales', JSON.stringify(objetoDatosPersonales));
}

function obtenerLocalStorage(){
    let objetoDatosPersonales = localStorage.getItem('DatosPersonales');
    alert(objetoDatosPersonales);
}