import React from 'react';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        const {todoList} = this.props;
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <Link to={{pathname:'/todoList/' + todoList.id + '/' + item.id, 
                    item: {
                        description: item.description,
                        assigned_to: item.assigned_to,
                        due_date: item.due_date,
                        completed: item.completed
                    } 
                }}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="card-title">{item.assigned_to}</span>
                    <span className="card-title">{item.due_date}</span>
                    {
                        item.completed ? <span className="card-title">completed</span> : <span className="card-title">pending</span>
                    
                    }
                </div>
                </Link>
            </div>
        );
    }
}
export default ItemCard;