import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { editItemHandler } from '../../store/database/asynchHandler'
import { Redirect } from 'react-router-dom'


class EditScreen extends Component {
    constructor(props) {
        super(props);
        if(props.location.item != null){
            this.state = {
            description: props.location.item.description,
            assigned_to: props.location.item.assigned_to,
            due_date: props.location.item.due_date,
            completed: props.location.item.completed,
            index: props.location.item.index,
            key: props.match.params.itemID,
            }
        }
    }
    
    onChangeDescHandler = (e) => {
        this.setState({description: e.target.value})
    }

    onChangeAssignedHandler = (e) => {
        this.setState({assigned_to: e.target.value})
    }

    onChangeDueDateHandler = (e) => {
        this.setState({due_date: e.target.value})
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

    submitChangeHandler = (e) => {
        const item = this.state
        const {id} = this.props.match.params
        
        this.props.editItem(id, item)
    }


    render() {
        const id = this.props.match.params.itemID
        const auth = this.props.auth;
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="card-panel white">
                
                    <div className="row">
                        <div className="input-field col s6">
                            <input value ={this.state.description} id="description" type="text" onChange = {this.onChangeDescHandler}/>
                        </div>
                        <div className="input-field col s6">
                            <input value ={this.state.assigned_to} id="assigned_to" type="text" onChange = {this.onChangeAssignedHandler}/>
                        </div>
                        <div className="input-field col s12">
                            <input value ={this.state.due_date} id="due_date" type="date" onChange = {this.onChangeDueDateHandler}/>
                        </div>
                        <div className="input-field col s12">
                            <label className='edit_screen_checkbox'>
                                <input type="checkbox" className="filled-in"  checked={this.state.completed} onChange={this.handleCompletedChange} />
                                <span>Filled in</span>
                            </label>
                        </div>
                        
                        <div className="input-field col s6 ">

                            <Link to={'/todoList/' + this.props.match.params.id} className="waves-effect waves-light btn" onClick = {this.submitChangeHandler}> Submit </Link>
                           
                            
                            <a>  </a>
                            
                            <Link to={'/todoList/' + this.props.match.params.id} className="waves-effect waves-light btn red">
                                Cancel
                            </Link>
                        </div>
                    </div> 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { itemID } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    var item = null
    if(todoList != null){
        todoList.id = id;
        item = todoList.items[itemID]
    }
    return {
        todoList, item,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = dispatch => ({
    editItem: (todoListId, item) => dispatch(editItemHandler(todoListId, item)),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'todoLists'}
    ])
)(EditScreen)