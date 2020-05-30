// function useState() {
//     let state: number;

//     function getState() {
//         return state;
//     }

//     function setState(newState: number) {
//         state = newState;
//     }

//     return {
//         getState,
//         setState,
//     };
// }

function useState<S extends string | number = string>() {
    let state: S;

    function getState() {
        return state;
    }

    function setState(newState: S) {
        state = newState;
    }

    return {
        getState,
        setState,
    };
}

const newState = useState();

newState.setState([123, 456]);
console.log(newState.getState());

newState.setState(false);
console.log(newState.getState());

newState.setState('Agora é uma string');
console.log(newState.getState());