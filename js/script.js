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

// Función para ajustar el ancho del textarea en función de su contenido
function ajustarAncho(textarea) {
  textarea.style.width = 'auto';
  textarea.style.width = textarea.scrollWidth + 'px';
}

// Llamar a la función para que los inputs se ajusten al cargarse la página
const inputs = document.querySelectorAll('.comandos input');
inputs.forEach((input) => {
  ajustarAncho(input);
});

function ajustarAncho(textarea) {
  textarea.style.width = 'auto'; // Restablece el ancho a automático
  textarea.style.width = textarea.scrollWidth + 'px'; // Establece el ancho al ancho del contenido
}

function ajustarAnchoTextarea() {
  const textareas = document.querySelectorAll('.comandos textarea');
  textareas.forEach((textarea) => {
    textarea.style.width = 'auto';
    textarea.style.width = textarea.scrollWidth + 'px';
  });
}

// Llamar a la función después de cargar la página
window.addEventListener('load', ajustarAnchoTextarea);

// También puedes llamar a esta función cada vez que se introduzca nuevo texto en el textarea
const textareas = document.querySelectorAll('.comandos textarea');
textareas.forEach((textarea) => {
  textarea.addEventListener('input', ajustarAnchoTextarea);
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
  }, 2750); // 2000 milisegundos (2 segundos)
}

// Asociar la función al botón de ambos contenedores
const botones = document.querySelectorAll('.comandos button');
botones.forEach((boton) => {
  boton.addEventListener('click', copiarValorConsola);
});





// Obtén todos los botones con la clase "boton-copiar"
const botonesCopiar = document.querySelectorAll(".boton-copiar");

// Itera a través de los botones y agrega un controlador de eventos a cada uno
botonesCopiar.forEach((boton) => {
  boton.addEventListener("click", function () {
    // Encuentra el elemento ".codigo" dentro del contenedor actual
    const codigo = this.parentElement.nextElementSibling.querySelector("pre code");
    const codigoTexto = codigo.textContent;

    // Crea un elemento de textarea para copiar el código
    const textarea = document.createElement("textarea");
    textarea.value = codigoTexto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Cambia el texto del botón a "Copiado"
    this.innerText = "Copied!";

    // Restaura el texto original después de un segundo
    setTimeout(() => {
      this.innerText = "Copy";
    }, 2000);
  });
});
