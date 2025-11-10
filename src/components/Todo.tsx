import { useReducer } from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type {TodoProps, Action} from "../types.ts";


const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {

    switch (action.type) {
        case "ADD":
            //Θέλω νέο στοιχείο όταν θα πατάω Add με τύπο ίδιο με TodoProps άρα φτιάχνω νέα μεταβλητή με τα συγκεκριμένα στοιχεία
            // επέστρεψε τα προηγούμενα στοιχεία της λίστας συν το νέο
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                }
            ];

        case "DELETE":
            return state.filter(item => item.id !== action.payload);

        case "EDIT":
            return state.map(item =>
            item.id === action.payload.id
                ? { ...item, text: action.payload.newText }
                : item
            )

        default:
            return state;
    }

};

const Todo = () => {

    //todos είναι το state του Reducer, dispatch είναι η δυνατότητα να χρησιμοποιήσω το κάθε case.
    const [todos, dispatch] = useReducer(todoReducer, []);

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