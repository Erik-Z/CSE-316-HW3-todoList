import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { deleteListHandler } from '../../store/database/asynchHandler'

class Modal extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  handleTrash = () => {
    const id = this.props.todoList.id
    this.props.deleteList(id)
  }

  render() {
    return (
      <div>
        <a
          className="waves-effect waves-light modal-trigger"
          data-target="modal1"
          id="list_trash"
        >
          &#128465;
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4>Delete List</h4>
            <p>Are you sure you want to delete this list?</p>
            <p>This action cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <Link to={{pathname:'/'}} className="modal-close waves-effect waves-green btn-flat" onClick= {this.handleTrash}>
              Yes
            </Link>
            <a className="modal-close waves-effect waves-red btn-flat">
              No
            </a>
          </div>
        </div>
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
    deleteList: todoListid => dispatch(deleteListHandler(todoListid))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(Modal);
