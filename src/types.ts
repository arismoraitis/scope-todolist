export type TodoProps = {
    id: number;
    text: string;
    completed: boolean;
}

//το payload είναι τα δεδομένα που δίνει ο χρήστης μέσω μιας ενέργειας (action),
// κάθε action έχει διαφορετικό payload ανάλογα με το τι κάνει (π.χ. προσθήκη, διαγραφή, επεξεργασία).
//τι έγραψε σε input, ποιο id πάτησε να σβήσει κ.λπ.)

export type Action =
    | { type: "ADD"; payload: string }                         // προσθήκη νέου todoitem -> payload = το κείμενο
    | { type: "DELETE"; payload: number }                      // διαγραφή todoitem -> payload = το id
    | { type: "EDIT"; payload: { id: number; newText: string } } // επεξεργασία -> payload = ποιο id και νέο κείμενο
    | { type: "COMPLETE"; payload: number }                    // αλλαγή completed -> payload = το id
    | { type: "CLEAR_ALL" };                                   // καθαρισμός όλων -> δεν χρειάζεται payload


export type TodoFormProps = {
    dispatch: React.Dispatch<Action>;
}


export type TodoListProps = {
    todos: TodoProps[];
    dispatch: React.Dispatch<Action>;
}


export type TasksStatsProps = {
    todos: TodoProps[];
}


export type ClearAllBtnProps = TodoListProps;