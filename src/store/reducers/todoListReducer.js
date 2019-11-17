const initState = {
    todoLists: [
    ]
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case 'CREATE_TODO_LIST':
            console.log('Created todolist', action.todoList)
            return state;
        case 'CREATE_TODO_LIST_ERROR':
                console.log('Created todolist error', action.error)
                return state;
        case 'EDIT_ITEM':
            console.log('Edited item', action.item)
            return state;
        default:
            return state;
            break;
    }
};

export default todoListReducer;