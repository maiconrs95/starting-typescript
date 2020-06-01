// Read Only
// interface Todo {
//     title: string;
//     description: string;
//     completed: boolean;
// }

// const todo: Readonly<Todo> = {
//     title: 'Delete inactive users',
//     description: 'Remove all inactive users',
//     completed: false,
// };

// console.log(todo);

// todo.completed = true; // OK

// console.log(todo);

// Partial
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
});

console.log(todo1, todo2);