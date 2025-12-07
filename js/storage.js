// Cargar de local storage
function cargarTareas() {
    const guardado = localStorage.getItem("todos");
    if (guardado) {
        return JSON.parse(guardado);
    }
    return [];
}

// Guardar en local storage
function guardarTareas(todos) {
    const tareas = JSON.stringify(todos);
    localStorage.setItem("todos", tareas);
}

// Array de tareas
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
