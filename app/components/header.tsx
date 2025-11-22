import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <header className="w-full h-14 flex flex-row justify-between items-center bg-gray-900 fixed top-0 px-10">
            <a href="/" className="flex flex-row text-3xl font-bold gap-1 cursor-pointer hover:translate-y-[-3px] transition-transform ease-in-out duration-300">
                <p className="text-red-500">S</p>
                <p className="text-orange-500">M</p>
                <p className="text-yellow-500">A</p>
                <p className="text-green-500">R</p>
                <p className="text-blue-500">T</p>
            </a>
            <div className="flex flex-row gap-6">
                <a href="/goals" className="text-gray-400 hover:text-gray-300 group transition-colors ease-in-out duration-300 flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faBullseye} className="h-5"></FontAwesomeIcon><div className="border-b border-gray-400 group-hover:border-gray-300 transition-colors ease-in-out duration-300">My Goals</div></a>
                <a href="/goals/create" className="text-gray-400 hover:text-gray-300 group transition-colors ease-in-out duration-300 flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faPlus} className="h-5"></FontAwesomeIcon><div className="border-b border-gray-400 group-hover:border-gray-300 transition-colors ease-in-out duration-300">New Goal</div></a>
            </div>
        </header>
    );
}