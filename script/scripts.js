import { data } from '../data/data.js';

let fragment = document.createDocumentFragment();
const slider = document.getElementById("slider");
let itemsPeliculas = document.getElementById("itemsPeliculas");
//para renderizar los elementos del slider
data.forEach(pelicula => {
    let div = document.createElement("div");
    div.innerHTML = `<img src="${pelicula.img}"><a class="enlaceInfo" id="${pelicula.posicion}">${pelicula.nombre}</a><input class="valorPosicion" value="" type="dissable">`;
    div.className = "sliderItem";
    fragment.appendChild(div);
    slider.appendChild(fragment);
})
//para renderizar los elementos de las tarjetas 
data.forEach(pelicula => {
    let div = document.createElement("div");
    div.innerHTML = `<img src="${pelicula.img}"><p>${pelicula.nombre}</p>`;
    div.id = `cards`
    fragment.appendChild(div);
    itemsPeliculas.appendChild(fragment);
});
//para identificar los botones del slider
const siguiente = document.getElementById("right");
const anterior = document.getElementById("left");
const sliderItem = document.getElementsByClassName("sliderItem");
//desplazamiento del slider hacia la derecha
function mostrarS(){
    let sliderFirst = sliderItem[0];
    slider.style.marginLeft = "-100%";
    function cambio(){
        slider.insertAdjacentElement('beforeend', sliderFirst);
        slider.style.marginLeft = "0%";
    }
    cambio();
}
//desplazamiento del slider hacia la izquierda
function mostrarA(){
    let sliderLast = sliderItem[sliderItem.length - 1];
    slider.style.marginLeft = "100%";
    function cambio(){
        slider.insertAdjacentElement('afterbegin', sliderLast);
        slider.style.marginLeft = "0%";
    }
    cambio();
}
//se agregaron las funciones al evento click de los botones para que se mueva el slider
siguiente.addEventListener('click', function(){
    mostrarS();
    //Para que cada que se de click en el boton desaparezca la tarjeta con la informacion de la pelicula
    [...document.querySelectorAll('.valorPosicion')].forEach(function(item){
        let infoPeliItem = document.getElementById("infoPeliItem");
        item.setAttribute("value", "");
        infoPeliItem.remove();
        
    })
});

anterior.addEventListener('click', function(){
    mostrarA();

    [...document.querySelectorAll('.valorPosicion')].forEach(function(item){
        let infoPeliItem = document.getElementById("infoPeliItem");
        item.setAttribute("value", "");
        infoPeliItem.remove();
        
    })
});
//capturar el evento de hacer click a los enlaces que aparecen como titulos de las peliculas en el slider
[...document.querySelectorAll('.enlaceInfo')].forEach(function(item){
    item.addEventListener('click', function(){
        let idElemento = item.id; //habia asignado anteriormente la propiedad posicion de la data como id, aca la obtuve
        let objeto = {posicion: idElemento}; //volvi la informacion capturada anteriormente en un objeto para manipular

        function obtenerPosicion(){

            [...document.querySelectorAll('.valorPosicion')].forEach(function(item){ //seleccione todos los input creados en el inner con los slider
                
                item.setAttribute("value", Number(objeto.posicion)); //al atributo value del input le asigne la posicion del objeto que se obtuvo antes

                [...document.querySelectorAll('.valorPosicion')].forEach(function(item){
                    //ya que el value del input tiene un valor diferente lo asigne a una variable llamada i
                    let i = item.value;
                    
                    let infoPeli = document.getElementById("infoPeli");//el div creado para las tarjetas con la informacion de las pelicula
                    
                    let div = document.createElement("div");
                    div.innerHTML = `<p><input type="button" value="x" id="cerrar">${data[i-1].nombre}<br>Año de estreno: ${data[i-1].anio}<br>Recaudación: ${data[i-1].recaudacion}<br>Producida por: ${data[i-1].productora}</p>`;
                    div.id = "infoPeliItem";
                    fragment.appendChild(div);
                    infoPeli.appendChild(fragment);

                    document.getElementById("cerrar").addEventListener('click', function(){
                        [...document.querySelectorAll('.valorPosicion')].forEach(function(item){
                            let infoPeliItem = document.getElementById("infoPeliItem");
                            item.setAttribute("value", "");
                            infoPeliItem.remove();      
                        })
                    })
                    
                })
            })
        }
        obtenerPosicion();
    })
})