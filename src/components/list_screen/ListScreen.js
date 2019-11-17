import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { changeNameHandler, changeOwnerHandler } from '../../store/database/asynchHandler'

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="card-panel white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.onChangeNameHandler} value={this.state.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.onChangeOwnerHandler} value={this.state.owner} />
                </div>
                <ItemsList todoList={todoList} />
                
                <Link to={{pathname:'/todoList/' + todoList.id + '/' + todoList.items.length, 
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
    changeListOwner: (id, owner) => dispatch(changeOwnerHandler(id, owner))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);