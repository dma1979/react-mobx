import React from "react"
import {observer} from "mobx-react"

@observer
export default class TodoList extends React.Component {

    createNew(e) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value)
            e.target.value = ""
        }
    }

    toggleComplete(todo) {
        todo.complete = !todo.complete
    }

    filter(e) {
        this.props.store.filter = e.target.value
    }

    render() {
        const {filter, todos, filteredTodos, clearComplete} = this.props.store

        const todoList = filteredTodos.map((todo) => (
            <li key={todo.id}>
                <input type="checkbox"
                       onChange={this.toggleComplete.bind(this, todo)}
                       value={todo.complete}
                       checked={todo.complete}/>
                <span>{todo.value}</span>
            </li>
        ))

        return (
            <div>
                <h1>TODOS</h1>
                <input className="new" onKeyPress={this.createNew.bind(this)}/>
                <input className="filter" value={filter} onChange={this.filter.bind(this)}/>
                <ul>{todoList}</ul>
                <a href="#" onClick={clearComplete}>Clear Complete</a>
            </div>
        )
    }

}
