import CreateGoal from "../../components/createGoal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
export default function Create() {
    return (
        <div className="h-full flex flex-col items-center justify-center mt-10 px-10 gap-10">
            <Link href="/goals" className="fixed top-24 left-10 text-gray-400 hover:text-gray-300 transition-colors duration-300 ease-in-out flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faArrowLeft} className="w-5"></FontAwesomeIcon>Back to My Goals</Link>
            <h1 className="text-3xl border-b-3 border-gray-500 font-bold text-gray-300 mt-14 justify-self-start">Create a SMART Goal</h1>
            <CreateGoal></CreateGoal>
        </div>
    )
}