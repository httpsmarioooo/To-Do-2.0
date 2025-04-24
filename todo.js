const input = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('btnAgregar');
const lista = document.getElementById('listaTareas');
const mensaje = document.getElementById('mensaje');

// Obtener tareas desde localStorage
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Crear y mostrar una tarea en la lista
function crearTarea(tareaTexto, completada = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = tareaTexto;
  if (completada) span.classList.add('completada');

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';

  // Tachado
  span.addEventListener('click', () => {
    span.classList.toggle('completada');
    const index = tareas.findIndex(t => t.texto === tareaTexto);
    if (index !== -1) {
      tareas[index].completada = !tareas[index].completada;
      guardarTareas();
    }
  });

  // Eliminar
  btnEliminar.addEventListener('click', () => {
    lista.removeChild(li);
    tareas = tareas.filter(t => t.texto !== tareaTexto);
    guardarTareas();
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
}

// Cargar tareas guardadas
tareas.forEach(texto => crearTarea(texto.texto, texto.completada));

// Agregar nueva tarea
btnAgregar.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto === '') {
    mensaje.textContent = 'Debes escribir una tarea.';
    return;
  }

  mensaje.textContent = '';
  crearTarea(texto);
  tareas.push({ texto: texto, completada: false });
  guardarTareas();
  input.value = '';
});
