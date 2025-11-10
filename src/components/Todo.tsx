import { useReducer } from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";

type TodoProps = {
    id: number;
    text: string;
}

type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number}




const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {

    switch (action.type) {
        case "ADD":
            //Θέλω νέο στοιχείο όταν θα πατάω Add με τύπο ίδιο με TodoProps άρα φτιάχνω νέα μεταβλητή με τα συγκεκριμένα στοιχεία
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
            };
            // επέστρεψε τα προηγούμενα στοιχεία της λίστας συν το νέο
            return [...state, newTodo];

        case "DELETE":
            return state.filter(item => item.id !== action.payload);


        default:
            return state;
    }

};

const Todo = () => {

    //todos είναι το state του Reducer, dispatch είναι η δυνατότητα να χρησιμοποιήσω το κάθε case.
    const [todos, dispatch] = useReducer(todoReducer, []);
console.log(todos);

    return (


        <>
            <div className="max-w-sm mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
<TodoForm dispatch={dispatch} />
<TodoList todos={todos} dispatch={dispatch} />
            </div>


        </>
    )
}

export default Todo;