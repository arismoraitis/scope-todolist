import type {TasksStatsProps} from "../types.ts";

const StatsTasks = ({ todos }: TasksStatsProps) => {

    const totalTasks: number = todos.length;
    // φίλτραρε τον πίνακα todos και κράτα μόνο όσα έχουνε μέσα το completed = true και από αυτά που θα μείνουν μέσω της length μέτρα πόσα tasks έχουν ολοκληρωθεί.
    const completedTasks: number = todos.filter(item => item.completed).length;
    const activeTasks: number = totalTasks - completedTasks;

    return (

        <>
            {todos.length > 1 && (
                <>
                    <div className="flex justify-between border-t pt-2 mt-4">
                        <span>Total: {totalTasks}</span>
                        <span>Active: {activeTasks}</span>
                        <span>Completed: {completedTasks}</span>

                    </div>
                </>
            )}

        </>


    )
}


export default StatsTasks;