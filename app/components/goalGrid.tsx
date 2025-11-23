import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GoalCard from "./goalCard";

export default function GoalGrid() {
    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
            <GoalCard text={"the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never"} colorID={1}></GoalCard>
            <a href="/goals/create" className="cursor-pointer flex flex-col justify-center items-center h-40 w-40 bg-gray-800 hover:bg-gray-700 rounded-3xl border-5 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 transition-colors ease-in-out duration-300">
                <FontAwesomeIcon icon={faPlus} className="h-20"></FontAwesomeIcon>
            </a>
        </div>
    )
}