import React from 'react';

class TodoListCard extends React.Component {
    moveItem = (from, to, items) => {
        // remove `from` item and store it
        var f = items.splice(from, 1)[0];
        // insert stored item into position `to`
        items.splice(to, 0, f);
    }

    setLinkToTop = () => {
        const todoLists = this.props.todoLists;
        const { todoList } = this.props;
        const index = todoLists.indexOf(todoList)
        this.moveItem(index, 0, this.props.todoLists)
    }

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link" onClick={this.setLinkToTop}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;