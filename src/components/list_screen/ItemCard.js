import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-materialize';

class ItemCard extends React.Component {
    
    handleDeleteListItem = () => {

    }

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
                        <div className='row'>
                            <div className='col s2 card-content item_content'>
                                {item.description}
                            </div>
                            <div className='col s2 card-content item_content'>
                                {item.assigned_to}
                            </div>
                            <div className='col s3 card-content item_content'>
                                {item.due_date}
                            </div>
                            {
                            item.completed ?
                            <div className='col s3 card-content item_content'>
                                completed
                            </div>
                            :
                            <div className='col s3 card-content item_content'>
                                pending
                            </div>
                            }
                        </div>
                    </div>
                </Link>
                <Button
                floating
                fab={{direction: 'left'}}
                className="red FAB_Card"
                large
                >
                    <Button floating icon= '^' className="green" />
                    <Button floating icon= 'v' className="green" />
                    <Button floating icon= 'X' className="red" onClick={this.handleDeleteListItem}/>
                </Button>
            </div>
        );
    }
}
export default ItemCard;