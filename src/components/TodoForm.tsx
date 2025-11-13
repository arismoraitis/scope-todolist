import {useRef, useState, useEffect} from "react";
import type {TodoFormProps} from "../types.ts";



const TodoForm = ({ dispatch }: TodoFormProps) => {

    const [text, setText] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setText(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // μην κάνει refresh η φόρμα
        if (text !== "")
        {
            dispatch({type: "ADD", payload: text})
            setText(""); // καθάρισε το input
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (

        <>
            <form className="flex gap-4 mb-4"
                  onSubmit={handleSubmit}>
                <input
                       ref={inputRef}
                       type="text"
                       value={text}
                       onChange={handleChange}
                       className="flex-1 border p-2 rounded"
                       placeholder="New task..."
                />
                <button className="bg-scope-dark-gray text-white px-4 py-2 rounded">Add</button>
            </form>

        </>
    )
}


export default TodoForm;