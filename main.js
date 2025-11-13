// Cargar de local storage
function cargarTareas() {
  const guardado = localStorage.getItem("todos");
  if (guardado) {
    return JSON.parse(guardado);
  }
  return [];
}
// guardar en local storage
function guardarTareas(todos) {
  const tareas = JSON.stringify(todos);
  localStorage.setItem("todos", tareas);
}

//Array de tareas
const todos = cargarTareas();

// Agregar tarea al array y guardarlo
function agregarTarea(texto) {
  //Objeto de ToDo
  const todo = {
    tarea: texto,
    hecho: false,
  };
  todos.push(todo);
  guardarTareas(todos);
}

// Eliminar tarea al array y guardarlo
function eliminarTarea(index) {
  todos.splice(index, 1);
  guardarTareas(todos);
}

//DOM
const todosContenedor = document.getElementById("todos");
const entrada = document.getElementById("entrada");
const botonCrear = document.getElementById("crear");

function crearDOM() {
  todosContenedor.innerHTML = ""; // Limpiar contendor

  todos.forEach((todo, index) => {
    const elemento = document.createElement("article");
    const check = document.createElement("input");
    const tarea = document.createElement("p");
    const eliminar = document.createElement("button");

    elemento.className = "elemento";
    if (todo.hecho) {
      elemento.classList.add("hecho");
    }
    tarea.textContent = todo.tarea;
    check.type = "checkbox";
    check.checked = todo.hecho;
    check.onchange = () => {
      todo.hecho = check.checked;
      elemento.classList.toggle("hecho");
      guardarTareas(todos);
    };
    eliminar.textContent = "Eliminar";
    eliminar.onclick = () => {
      eliminarTarea(index);
      crearDOM();
    };

    elemento.appendChild(check);
    elemento.appendChild(tarea);
    elemento.appendChild(eliminar);

    todosContenedor.appendChild(elemento);
  });
}

botonCrear.onclick = () => {
  const texto = entrada.value;
  if (texto) {
    agregarTarea(texto);
    crearDOM();
  }
  entrada.value = "";
};

crearDOM();
