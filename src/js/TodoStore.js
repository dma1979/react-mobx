import {computed, observable, autorun} from "mobx"

class Todo {
    @observable value
    @observable id
    @observable complete

    constructor(value) {
        this.value = value
        this.id = Date.now()
        this.complete = false
    }
}

export class TodoStore {
    @observable todos = []
    @observable filter = ""

    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos
            .filter(todo => !this.filter || matchesFilter.test(todo.value))
    }

    @computed get filterResults() {
        return this.filteredTodos.length + '/' + this.todos.length
    }

    createTodo(value) {
        this.todos.push(new Todo(value))
    }

    clearComplete = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.complete)
        this.todos.replace(incompleteTodos)
    }
}

var store = window.store = new TodoStore()
export default store
//export default new TodoStore

// debug only
autorun(() => {
    console.log(store.filter)
})

