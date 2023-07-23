document.getElementById("icon_menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){

    document.querySelector(".menu").classList.toggle("mostrar_menu");
    
}

window.onscroll = function () {
    var posicion = window.pageYOffset || document.documentElement.scrollTop;
    var elemento1 = document.getElementById("icon_robot");
    var elemento2 = document.getElementById("icon_fire");
    elemento1.style.bottom = posicion * 0.1 + "px";
    elemento2.style.top = posicion * 0.1 + "px";
}

// Función para copiar el texto del comando al portapapeles
function copiarTexto(comando) {
    // Crea un elemento de texto temporal
    const textoTemp = document.createElement('textarea');
    textoTemp.value = comando;
    
    // Agrega el elemento al DOM para copiar el texto
    document.body.appendChild(textoTemp);
    
    // Selecciona el texto del elemento
    textoTemp.select();
    
    // Copia el texto seleccionado al portapapeles
    document.execCommand('copy');
    
    // Remueve el elemento temporal
    document.body.removeChild(textoTemp);
  }
  
  // Obtén todos los botones de copiar
  const botonesCopiar = document.querySelectorAll('.btn-copiar');
  
  // Agrega el evento click a cada botón
  botonesCopiar.forEach(boton => {
    boton.addEventListener('click', () => {
      const comando = boton.previousElementSibling.textContent; // Obtiene el texto del comando
      copiarTexto(comando);
      alert('Comando copiado al portapapeles: ' + comando);
    });
  });
  
