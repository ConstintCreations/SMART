import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import GoalGrid from "../components/goalGrid";

export default function Goals() {
    return (
        <div className="flex flex-col items-center justify-center mt-24 px-10 gap-5">
            <h1 className="flex flex-row gap-2 items-center text-3xl self-start text-gray-300"><FontAwesomeIcon icon={faBullseye} className="h-8"></FontAwesomeIcon>My Goals</h1>
            <GoalGrid />
        </div>
    )
}