// Obtener elementos
var input = document.getElementById("nuevaTarea");
var btnAgregar = document.getElementById("btnAgregar");
var lista = document.getElementById("listaTareas");
var mensaje = document.getElementById("mensaje");

// Traer tareas guardadas o iniciar vacío
var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Guardar en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Mostrar tarea en la lista
function mostrarTarea(texto, completada) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  span.textContent = texto;

  if (completada) {
    span.classList.add("completada");
  }

  // Evento para marcar como completada
  span.addEventListener("click", function () {
    span.classList.toggle("completada");
    for (var i = 0; i < tareas.length; i++) {
      if (tareas[i].texto === texto) {
        tareas[i].completada = !tareas[i].completada;
        break;
      }
    }
    guardarTareas();
  });

  // Botón eliminar
  var btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", function () {
    lista.removeChild(li);
    tareas = tareas.filter(function (t) {
      return t.texto !== texto;
    });
    guardarTareas();
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
}

// Mostrar todas las tareas guardadas
for (var i = 0; i < tareas.length; i++) {
  mostrarTarea(tareas[i].texto, tareas[i].completada);
}

// Cuando el usuario da click en "Agregar"
btnAgregar.addEventListener("click", function () {
  var textoTarea = input.value.trim();

  if (textoTarea === "") {
    mensaje.textContent = "Debes escribir una tarea.";
    return;
  }

  mensaje.textContent = "";

  mostrarTarea(textoTarea, false);

  tareas.push({ texto: textoTarea, completada: false });
  guardarTareas();

  input.value = "";
});
