// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return {
        type: 'CREATE_TODO_LIST',
        todoList
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}

export function addListItem(item) {
    return {
        type: 'CREATE_ITEM',
        item
    }
}

export function addListItemError(error) {
    return {
        type: 'CREATE_ITEM_ERROR',
        error
    }
}

export function editListItem(item) {
    return {
        type: 'EDIT_ITEM',
        item
    }
}

export function editListItemError(error) {
    return {
        type: 'EDIT_ITEM_ERROR',
        error
    }
}

export function changeListName(name) {
    return {
        type: 'CHANGE_LIST_NAME',
        name
    }
}

export function deleteList(id) {
    return {
        type: 'DELETE_LIST',
        id
    }
}

export function deleteListItem(item){
    return {
        type: 'DELETE_ITEM',
        item
    }
}

export function moveItemUp(item){
    return {
        type: 'MOVE_ITEM_UP',
        item
    }
}

export function moveItemDown(item){
    return {
        type: 'MOVE_ITEM_DOWN',
        item
    }
}

export function sortItemDescription() {
    return {
        type: 'SORT_ITEM_DESCRIPTION',
    }
}

export function sortItemDueDate() {
    return {
        type: 'SORT_ITEM_DUE_DATE',
    }
}

export function sortItemStatus() {
    return {
        type: 'SORT_ITEM_STATUS',
    }
}