
import { useState} from "react";
import {Square, Trash2, Edit, Save, X, CheckSquare} from "lucide-react";
import type {TodoListProps} from "../types.ts";


const TodoList = ({todos, dispatch}: TodoListProps) => {

    const [editId,setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleDelete = (id: number) => {
        dispatch({type: "DELETE", payload: id});
    }


//  όταν εγώ πατήσω το κουμπί/εικονίδιο edit περνάω στα 2 states το id και το text του ώστε να εμφανίζεται μέσα στο περιβάλλον του edit.
    const handleEdit = (idedit: number, textedit: string) => {
        setEditId(idedit);
        setEditText(textedit);
    }

    const handleCancel = () => {
        setEditId(null);
        setEditText("");
    }

    const handleSave = (id:number) => {
        dispatch({type: "EDIT", payload: {id, newText: editText}});
        setEditId(null);
        setEditText("");
    }

    const handleToggle = (id: number) => {
        dispatch({type: "COMPLETE", payload: id})
    }



    return (

        <>
<ul className="space-y-2">

    {todos.map(item => (
    <li key={item.id}
        className={`flex items-center justify-between bg-scope-gray p-3 rounded ${item.completed ? "opacity-60 line-through" : ""}`}>

        {
            editId === item.id ? (
                <>

                    <input type="text"
                    value={editText}
                    className="border rounded p-1"
                    onChange={(e) => setEditText(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSave(item.id)}
                            className="text-scope-dark-gray"
                        >
                            <Save size={18}/>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="text-scope-red"
                        >
                            <X size={18}/>
                        </button>
                    </div>
                </>
            ) :
                <>
                    <div className="flex item-center gap-2 flex-1">
                    <button
                    className="text-green-500"
                    onClick={() => handleToggle(item.id)}
                    >
                        {item.completed ? (
                     <CheckSquare size={18}/>
                            ): (
                     <Square size={18}/>)}

                    </button>

                    <span>{item.text}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(item.id, item.text)}
                            className="text-scope-dark-gray"

                        >
                            <Edit size={18}/>
                        </button>

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-scope-red hover:underline"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </div>
                </>
        }
    </li>

        ))}
</ul>


        </>
    )
}

export default TodoList;