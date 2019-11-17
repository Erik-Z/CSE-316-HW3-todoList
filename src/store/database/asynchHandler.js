import * as actionCreators from '../actions/actionCreators.js'

function moveItem(from, to, items) {
  // remove `from` item and store it
  var f = items.splice(from, 1)[0];
  // insert stored item into position `to`
  items.splice(to, 0, f);
}

function compareDescription(a, b) {
  var descriptionA = a.description.toUpperCase()
  var descriptionB = b.description.toUpperCase()

  let comparison = 0
  if(descriptionA > descriptionB){
    comparison = 1
  } else if (descriptionA < descriptionB) {
    comparison = -1
  }
  return comparison
}

function compareDescriptionRev(a, b){
  var descriptionA = a.description.toUpperCase()
  var descriptionB = b.description.toUpperCase()

  let comparison = 0
  if(descriptionA < descriptionB){
  comparison = 1
  } else if (descriptionA > descriptionB) {
  comparison = -1
  }
  return comparison
}

function compareDueDate(a, b){
  var due_dateA = a.due_date
  var due_dateB = b.due_date

  let comparison = 0
  if(due_dateA > due_dateB){
    comparison = 1
  } else if (due_dateA < due_dateB) {
    comparison = -1
  }
  return comparison
}

function compareDueDateRev(a, b) {
  var due_dateA = a.due_date
  var due_dateB = b.due_date

  let comparison = 0
  if(due_dateA < due_dateB){
    comparison = 1
  } else if (due_dateA > due_dateB) {
    comparison = -1
  }
  return comparison
}

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createTodoListHandler = (todoList) => (dispatch, getState, {getFirebase, getFirestore}) =>{
  const firestore = getFirestore()
  firestore.collection('todoLists').add({
    ...todoList
  }).then(() => {
    dispatch(actionCreators.createTodoList)
  }).catch((err) => {
    dispatch(actionCreators.createTodoListError)
  })
}

export const editItemHandler = (todoListID, item) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  console.log('edit item')
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    items[item.key] = item
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.editListItem)
    })
  }).catch((err) => {
    dispatch(actionCreators.editListItemError)
  })
}

export const changeNameHandler = (todoListID, name) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  firestore.collection('todoLists').doc(todoListID).update({
    name: name
  }).then(() => {
    dispatch(actionCreators.changeListName)
  })
}

export const changeOwnerHandler = (todoListID, owner) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  firestore.collection('todoLists').doc(todoListID).update({
    owner: owner
  }).then(() => {
    dispatch(actionCreators.changeListName)
  })
}

export const deleteListHandler = (todoListID) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  firestore.collection('todoLists').doc(todoListID).delete().then(() => {
    console.log('TodoList' + todoListID + ' deleted.')
  }).catch(err => {
    console.log(err)
  })
}

export const deleteListItemHandler = (todoListID, item) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    items.splice(item.index, 1)
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.deleteListItem)
    })
  })
}

export const moveItemUpHandler = (todoListID, item) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    moveItem(item.index, item.index - 1,items)
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.moveItemUp)
    })
  })
}

export const moveItemDownHandler = (todoListID, item) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    moveItem(item.index, item.index + 1,items)
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.moveItemDown)
    })
  })
}

export const sortByDescriptionHandler = (todoListID, sorting) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    if(sorting == 'description'){
      items.sort(compareDescriptionRev)
    } else {
      items.sort(compareDescription)
    }
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.sortItemDescription)
    })
  })
}

export const sortByDueDateHandler = (todoListID, sorting) => (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  var items
  firestore.collection('todoLists').doc(todoListID).get().then((doc) => {
    items = doc.data().items
    if(sorting == 'duedate'){
      items.sort(compareDueDateRev)
    } else {
      items.sort(compareDueDate)
    }
    firestore.collection('todoLists').doc(todoListID).update({items: items}).then(() => {
      dispatch(actionCreators.sortItemDueDate)
    })
  })
}

