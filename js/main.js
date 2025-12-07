//DOM
const todosContenedor = document.getElementById("todos");
const entrada = document.getElementById("entrada");
const botonCrear = document.getElementById("crear");
const botonEjemplos = document.getElementById("ejemplos");

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
            Swal.fire({
                title: "¿Estás seguro de eliminar la tarea?",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarTarea(index);
                    crearDOM();
                }
            });
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

botonEjemplos.onclick = () => {
    fetch("./data/todos.json")
        .then((response) => {
            response
                .json()
                .then((data) => {
                    todos.push(...data);
                    guardarTareas(todos);
                    crearDOM();
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Ups...",
                        text: "Hubo un error cargando la data.",
                    });
                });
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Hubo un error cargando la data.",
            });
        });
};

crearDOM();
