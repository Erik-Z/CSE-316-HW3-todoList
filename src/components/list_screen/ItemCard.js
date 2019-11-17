import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteListItemHandler, moveItemUpHandler, moveItemDownHandler } from '../../store/database/asynchHandler'

class ItemCard extends React.Component {
    
    handleDeleteListItem = (e) => {
        const { item } = this.props;
        const {todoList} = this.props;
        this.props.deleteItem(todoList.id, item)
    }

    handleMoveItemUp = () => {
        const { item } = this.props;
        const {todoList} = this.props;
        this.props.moveItemUp(todoList.id, item)
    }

    handleMoveItemDown = () => {
        const { item } = this.props;
        const {todoList} = this.props;
        this.props.moveItemDown(todoList.id, item)
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
                    {
                        item.index != 0 ? <Button floating icon= '^' className="green" onClick={this.handleMoveItemUp}/> : <Button floating icon= '^' className="grey" />
                    }
                    {
                        todoList.items.length - 1 != item.index ? <Button floating icon= 'v' className="green" onClick={this.handleMoveItemDown}/> : <Button floating icon= 'v' className="grey" />
                    }
                    
                    <Button floating icon= 'X' className="red" onClick={this.handleDeleteListItem}/>
                </Button>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
    };
};

const mapDispatchToProps = dispatch => ({
    //deleteList: todoListid => dispatch(deleteListHandler(todoListid))
    deleteItem: (todolistid, item) => dispatch(deleteListItemHandler(todolistid, item)),
    moveItemUp: (todolistid, item) => dispatch(moveItemUpHandler(todolistid, item)),
    moveItemDown: (todolistid, item) => dispatch(moveItemDownHandler(todolistid, item))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(ItemCard);
