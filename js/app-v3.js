/** Variables */
const listaTask = document.querySelector('#list');


/** Event Listeners */
eventListeners();

function eventListeners(){
    
    //Cuando se envía el formulario capturar el evento con submit y ejecutar
    //la funcion agregarTask.
    document.querySelector('#to_do').addEventListener('submit', agregarTask);
    
    //Borrar tasks
    listaTask.addEventListener('click', borrarTask);
    
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

/** Funciones */   

/*Annade la tarea al DOM.
 Annade la tarea al localStorage llamando a la 
función agregarTaskLocalStorage(task)*/
function agregarTask(e){
    //Prevenimos la acción por defecto del formulario
    e.preventDefault();
    
    //Leemos lo que se escribe en el input
    const task = document.querySelector('#new').value;
    
    //Crear elemento y añadirlo a la lista de task
    const li = document.createElement('li');
    li.innerText = task;
    //Anade la tarea
    listaTask.appendChild(li);

    //Crear botón borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'task-borrar';
    botonBorrar.innerText = 'x';
    //Anadir el boton borrar
    li.appendChild(botonBorrar);

    //Anadir task al localStorage
    agregarTaskLocalStorage(task);
    
}

//Elimina la tarea del DOM
function borrarTask(e){
    e.preventDefault();
    if(e.target.className === 'task-borrar'){
        e.target.parentElement.remove();
        borrarTaskLocalStorage(e.target.parentElement.innerText);        
    }
    
}

//Mostrar datos del localStorage en la lista
function localStorageListo(){
    let tasks;
    tasks = obtenerTaskLocalStorage();

    tasks.forEach(function(task) {
        //Crear botón de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'task-borrar';
        botonBorrar.innerText = 'x';
        
        //Crear elemento y añadirlo a la lista de task
        const li = document.createElement('li');
        li.innerText = task;
        //Anade el boton borrar
        li.appendChild(botonBorrar);
        //Anade la tarea
        listaTask.appendChild(li);        
    });
    
}

//Agrega task al localStorage
function agregarTaskLocalStorage(task){
    let tasks;
    tasks = obtenerTaskLocalStorage();

    //Anadir tarea nueva. Añade al final de un arreglo
    tasks.push(task);

    //Agregar a localStorage
    //JSON.stringify convierte el array obtenido en una cadena o string
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}
//Elimina task del localStorage
function borrarTaskLocalStorage(task){
    let tasks, taskBorrar;
    //Elimina la X de la task
    taskBorrar = task.substring(0, task.length-1);

    //Obtengo las tasks del localStorage
    tasks = obtenerTaskLocalStorage();
    //Recorro el array de tasks
    tasks.forEach(function(task, index){
        //Compruevo cuando sean iguales
        if(taskBorrar === task){
            /*Donde son iguales taskBorrar === task
            Obtengo la posicion del array con index y 
            elimino el elemento del array 
            */
            tasks.splice(index, 1)
        }
    });
    //Actualizo el localStorage sin el elemento eliminado
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Comprueba que hayan elementos localStorage, retorna un arreglo
function obtenerTaskLocalStorage(){
    let tasks;
    //Revisamos valores localStorage 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        
    }else{
        //JSON.parse convierte la cadena o string del localStorage en un array
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

