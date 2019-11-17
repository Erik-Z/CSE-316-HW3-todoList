import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { changeNameHandler, changeOwnerHandler, sortByDescriptionHandler, sortByDueDateHandler, sortByStatusHandler} from '../../store/database/asynchHandler'
import Modal from "./modal.js";

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
        sorting: null
    }

    onChangeNameHandler = (e) => {
        this.setState({name: e.target.value}, function() {this.props.changeListName(this.props.todoList.id,this.state.name)})
    }

    onChangeOwnerHandler = (e) => {
        this.setState({owner: e.target.value}, function() {this.props.changeListOwner(this.props.todoList.id,this.state.owner)})
    }

    handleNewItem = (e) => {
        const { props } = this;
    }

    handleSortDesc = () => {
        const id = this.props.todoList.id
        const sorting = this.state.sorting

        this.props.sortDescription(id, sorting)

        if(sorting == 'description'){
            this.setState({sorting: null})
        } else {
            this.setState({sorting: 'description'})
        }
    }

    handleSortDueDate = () => {
        const id = this.props.todoList.id
        const sorting = this.state.sorting

        this.props.sortDueDate(id, sorting)

        if(sorting == 'duedate'){
            this.setState({sorting: null})
        } else {
            this.setState({sorting: 'duedate'})
        }
    }

    handleSortStatus = () => {
        const id = this.props.todoList.id
        const sorting = this.state.sorting
        this.props.sortStatus(id, sorting)

        if(sorting == 'status'){
            this.setState({sorting: null})
        } else {
            this.setState({sorting: 'status'})
        }
    }
    

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        const nextitemkey = Math.max.apply(Math, todoList.items.map(function(o) { return o.key; })) + 1
        return (
            <div className="card-panel white">
                <h5 className="grey-text text-darken-3 list_title">Todo List</h5>
                <Modal todoList={todoList} />
                
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.onChangeNameHandler} value={this.state.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.onChangeOwnerHandler} value={this.state.owner} />
                </div>
                <div className='row'>
                    <div className="col s2 list_heading" onClick={this.handleSortDesc}>Description</div>
                    <div className="col s2 list_heading">Assigned</div>
                    <div className="col s3 list_heading" onClick={this.handleSortDueDate}>Due Date</div>
                    <div className="col s3 list_heading" onClick={this.handleSortStatus}>Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <Link to={{pathname:'/todoList/' + todoList.id + '/' + nextitemkey, 
                            item: {
                                description: '',
                                assigned_to: '',
                                due_date: '',
                                completed: ''
                            },
                    }}>
                    <div className="card white center add-item-button" onClick={this.handleNewItem}>Add Item</div>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    changeListName: (id, name) => dispatch(changeNameHandler(id, name)),
    changeListOwner: (id, owner) => dispatch(changeOwnerHandler(id, owner)),
    sortDescription: (id, sorting) => dispatch(sortByDescriptionHandler(id, sorting)),
    sortDueDate: (id, sorting) => dispatch(sortByDueDateHandler(id, sorting)),
    sortStatus: (id, sorting) => dispatch(sortByDueDateHandler(id, sorting))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);