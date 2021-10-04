export class TodoList {
    constructor(){
        this.todoList = [];
    }
    addTodo(todo){
        this.todoList.push(todo);
    }
    removeTodo(index){
        this.todoList.splice(index,1);
    }
    renderTodo(){
        let content = "";
        content = this.todoList.reduceRight((tdContent,item,index)=>{
            tdContent += `
                <li>
                <span>${item.txtTodo}</span>
                <div class="buttons">
                    <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteTodo(event)">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeTodo(event)" >
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `
            return tdContent;
        },'');
        return content;
    }   

    sortTodoList(isDesc){
        this.todoList.sort((todo,nextTodo)=>{
            const textA = todo.txtTodo.toLowerCase();
            const textB = nextTodo.txtTodo.toLowerCase();
            return textB.localeCompare(textA);
        })
        if (isDesc){
            this.todoList.reverse();
        }

    }
}