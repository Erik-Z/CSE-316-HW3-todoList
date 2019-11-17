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
        case 'DELETE_LIST':
            console.log('Deleted List', action.id)
            return state;
        case 'DELETE_ITEM':
            console.log('Deleted List', action.item)
            return state;
        case 'MOVE_ITEM_UP':
            console.log('Move item up: ', action.item)
            return state;
        case 'MOVE_ITEM_DOWN':
            console.log('Move item down: ', action.item)
            return state;
        case 'SORT_ITEM_DESCRIPTION':
            console.log('Sorted Items by Description',)
            return state;
        default:
            return state;
            break;
    }
};

export default todoListReducer;