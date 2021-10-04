import {Todo} from "./todo.js";
import {TodoList} from "./todoList.js";

let list = new TodoList();
let completeList = new TodoList();


const getEle = (id) => {
    return document.getElementById(id);
}

const addTodo = () => {
    let txtTodo = getEle("newTask").value;
    let ulTodo = getEle("todo");

    if (txtTodo != ""){
        let td = new Todo(txtTodo,"todo");
        list.addTodo(td);
    }

    showTodoList(ulTodo);

    getEle("newTask").value = "";
}

getEle("addItem").addEventListener("click",()=>{
    addTodo();
})
// show Todo List
const showTodoList = (ulTodo) => {
    ulTodo.innerHTML = list.renderTodo();
}

const showCompleteList = (ulComplete) => {
    ulComplete.innerHTML = completeList.renderTodo();
}
// remove an element from Todo List
const deleteTodo = (event) => {
    let tdIndex = event.currentTarget.getAttribute("data-index");
    let status = event.currentTarget.getAttribute("data-status");
    let ulTodo = getEle("todo");
    let ulComplete = getEle("completed");

    if (status == "todo"){
        list.removeTodo(tdIndex);
        showTodoList(ulTodo);
    } else if (status == "completed"){
        completeList.removeTodo(tdIndex);
        showCompleteList(ulComplete);
    } else{
        alert("Cannot delete todo");
    }

}
window.deleteTodo = deleteTodo;

const completeTodo = (event) => {
    let tdIndex = event.currentTarget.getAttribute("data-index");
    let status = event.currentTarget.getAttribute("data-status");
    let ulTodo = getEle("todo");
    let ulCompleted = getEle("completed");

    if (status == "todo"){
        let completedItem = list.todoList.slice(tdIndex,tdIndex+1);
        let objTodo = new Todo(completedItem[0].txtTodo, "completed");
        moveTodo(list,completeList, objTodo, tdIndex);
        showTodoList(ulTodo);
        showCompleteList(ulCompleted);
    } else if ( status == "completed"){
        let undoItem = completeList.todoList.slice(tdIndex,tdIndex+1);
        let objTodo = new Todo(undoItem[0].txtTodo, "todo");
        moveTodo(completeList, list, objTodo, tdIndex);
        showTodoList(ulTodo);
        showCompleteList(ulCompleted);
    } else {
        alert("Cannot move todo task");
    }
}

window.completeTodo = completeTodo;

const moveTodo = (depart, arrival, obj, tdIndex) => {
    // remove todo from depart
    depart.removeTodo(tdIndex);
    // add todo from arrival
    arrival.addTodo(obj);
}

const sortAscending = (event) => {
    let ulTodo = getEle("todo");
    list.sortTodoList(false);
    showTodoList(ulTodo);
}
window.sortASC = sortAscending;

const sortDescending = (event) => {
    let ulTodo = getEle("todo");
    list.sortTodoList(true);
    showTodoList(ulTodo);
}
window.sortDES = sortDescending;

const getDate = () =>{
    var today = new Date();
    var day = today.getDay();
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    var month = today.getMonth();
    const monthlist = ["Jan","Feb","Mar","Apr ","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    var date = today.getDate();
    var year = today.getFullYear();
     
    document.getElementById("date").innerHTML = daylist[day] + ' - ' + monthlist[month] + ' ' + date + ', ' + year;
    
}
window.onload = getDate;
