//Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articuloCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);
  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);
  //Vaciar Carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articuloCarrito = [];
    carritoHTML();
  });
}




//Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}






//Crea contenido HTML con la info del producto para el carrito
function leerDatosCurso(curso) {
  // console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  };

  //Verificar si un elemento ya esta en el carrito
  const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articuloCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso;
      } else {
        return curso;
      }
    });
    articuloCarrito = [...cursos];
  } else {
    //Agrega elementos al arreglo del carrito
    articuloCarrito = [...articuloCarrito, infoCurso];
  }


    carritoHTML();
}





//Mostrar carrito de compras con HTML del producto
function carritoHTML() {
  //Limpiar HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  for (let curso in articuloCarrito) {
    const row = document.createElement("tr");
    row.innerHTML = `<td> <img src="${articuloCarrito[curso].imagen}" width="110"> </td>
                     <td>${articuloCarrito[curso].titulo}</td>
                     <td>${articuloCarrito[curso].precio}</td>
                     <td>${articuloCarrito[curso].cantidad}</td>
                     <td> <a href="#" class="borrar-curso" data-id="${articuloCarrito[curso].id}">&#10060</a> `;
    contenedorCarrito.appendChild(row);
  }
}





//Elimina los cursos para que no se repitan al agregar nuevos cursos
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}


//Eliminar cursos del carrito
function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML();
    }
}
