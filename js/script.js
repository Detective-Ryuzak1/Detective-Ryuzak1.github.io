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

  // Función para ajustar el ancho del input en función de su contenido
  function ajustarAncho(input) {
    input.style.width = 'auto';
    const nuevoAncho = input.scrollWidth + 10; // Agregar un poco de margen
    input.style.width = nuevoAncho + 'px';
  }

  // Llamar a la función para que los inputs se ajusten al cargarse la página
  const inputs = document.querySelectorAll('.comandos input');
  inputs.forEach((input) => {
    ajustarAncho(input);
  });

function copiarValorConsola(event) {
  const comandos = event.currentTarget.parentElement;
  const input = comandos.querySelector('.text');
  const valorInput = input.value;

  // Copiar el valor del input a la clipboard
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = valorInput;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  console.log(valorInput);

  // Agregar la clase 'active' al contenedor 'comandos'
  comandos.classList.add('active');

  // Eliminar la clase 'active' después de unos segundos
  setTimeout(() => {
    comandos.classList.remove('active');
  }, 2000); // 2000 milisegundos (2 segundos)
}

// Asociar la función al botón de ambos contenedores
const botones = document.querySelectorAll('.comandos button');
botones.forEach((boton) => {
  boton.addEventListener('click', copiarValorConsola);
});