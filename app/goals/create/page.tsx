import GoalQuiz from "../../components/goalQuiz";
export default function Create() {
    return (
        <div className="h-full flex flex-col items-center justify-center mt-10 px-10 gap-10">
            <h1 className="text-3xl border-b-3 border-gray-500 font-bold text-gray-300">Create a SMART Goal</h1>
            <GoalQuiz></GoalQuiz>
        </div>
    )
}