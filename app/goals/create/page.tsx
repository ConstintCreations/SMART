import CreateGoal from "../../components/createGoal";
export default function Create() {
    return (
        <div className="h-full flex flex-col items-center justify-center mt-10 px-10 gap-10">
            <h1 className="text-3xl border-b-3 border-gray-500 font-bold text-gray-300 mt-14 justify-self-start">Create a SMART Goal</h1>
            <CreateGoal></CreateGoal>
        </div>
    )
}