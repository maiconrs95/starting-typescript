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
function useState() {
    var state;
    function getState() {
        return state;
    }
    function setState(newState) {
        state = newState;
    }
    return {
        getState: getState,
        setState: setState
    };
}
var newState = useState();
newState.setState(123);
console.log(newState.getState());
newState.setState('Agora é uma string');
console.log(newState.getState());
