import type {ClearAllBtnProps} from "../types.ts";

const ClearAllButton = ({ todos, dispatch }: ClearAllBtnProps) => {

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"});
    }

    return (


        <>
            {todos.length > 1 && (
                <>
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
        </>
    )
}

export default ClearAllButton;