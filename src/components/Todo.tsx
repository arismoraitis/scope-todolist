import {useEffect, useReducer} from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type {TodoProps, Action} from "../types.ts";


// για να πάρω μία πληροφορία από το Local Storage χρησιμοποιώ getItem
const getInitialTodos = () => {
  const stored =  localStorage.getItem("todos");
  // εάν υπάρχει πληροφοία τότε πέρασέ την στο Initial State κάνοντας την parse (από string που την είχαμε κάνει την κάνουμε ξανά json object ή array) αλλιώς γύρνα μου το αρχικό Initial State που ήταν [].
    return stored ? JSON.parse(stored) : [];
}

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
                    completed: false,
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
        case "COMPLETE":
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, completed: !item.completed }
                    : item
            )
        case "CLEAR_ALL":
            return [];

        default:
            return state;
    }

};

const Todo = () => {

    //todos είναι το state του Reducer, dispatch είναι η δυνατότητα να χρησιμοποιήσω το κάθε case.
    // χρησιμοποιώ την προαιρετική επιλογή της Reducer το init? με όνομα getInitialTodos με σκοπό να αλλάξει το αρχικό Initial State που έχουμε δηλώσει ως []
    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
    const totalTasks: number = todos.length;
    // φίλτραρε τον πίνακα todos και κράτα μόνο όσα έχουνε μέσα το completed = true και από αυτά που θα μείνουν μέσω της length μέτρα πόσα tasks έχουν ολοκληρωθεί.
    const completedTasks: number = todos.filter(item => item.completed).length;
    const activeTasks: number = totalTasks - completedTasks;


// για να στείλω πληροφορία στην Local Storage χρησιμοποιώ setItem και να μπορέσει η Local Storage να διαβάσει την πληροφορία θα πρέπει αυτή η πληροφορία να είναι String γι'αυτό και χρησιμοποιούμε την stringify
    useEffect (()=> {
        //
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"});
    }


    return (

        <>
            <div className="max-w-sm mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
<TodoForm dispatch={dispatch} />
<TodoList todos={todos} dispatch={dispatch} />
                {todos.length > 1 && (
                    <>
                        <div className="flex justify-between border-t pt-2 mt-4">
                        <span>Total: {totalTasks}</span>
                            <span>Active: {activeTasks}</span>
                            <span>Completed: {completedTasks}</span>

                        </div>
                        <div className="text-end mt-4">
                            <button
                                className="bg-scope-gray text-scope-dark-gray px-3 py-3 rounded"
                                onClick={handleClearAll}
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}
            </div>


        </>
    )
}

export default Todo;