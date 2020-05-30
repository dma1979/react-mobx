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
        const {filter, todos, filteredTodos, clearComplete, filterResults} = this.props.store

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
                <div>
                    <label>Enter todo:</label><input className="new" onKeyPress={this.createNew.bind(this)}/>
                </div>
                <div>
                    Use filter:<input className="filter" value={filter} onChange={this.filter.bind(this)}/>
                    {filterResults} shown
                </div>

                <ul>{todoList}</ul>
                <a href="#" onClick={clearComplete}>Clear Complete</a>
            </div>
        )
    }

}
