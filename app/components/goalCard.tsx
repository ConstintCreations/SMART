import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function GoalCard({ text, colorID }: { text: string, colorID: number }) {
    const colors = [
        "bg-red-900 hover:bg-red-800 border-red-700 hover:border-red-600",
        "bg-orange-900 hover:bg-orange-800 border-orange-700 hover:border-orange-600",
        "bg-yellow-900 hover:bg-yellow-800 border-yellow-700 hover:border-yellow-600",
        "bg-green-900 hover:bg-green-800 border-green-700 hover:border-green-600",
        "bg-blue-900 hover:bg-blue-800 border-blue-700 hover:border-blue-600",
    ]

    return (
        <div className={`relative cursor-pointer px-5 py-3 text-center flex flex-col justify-center items-center h-40 w-80 ${colors[colorID]} rounded-3xl border-5 text-gray-300 transition-colors ease-in-out duration-300 overflow-hidden group`}>
            
            <div className="flex flex-row gap-1 absolute top-3 left-0 w-full justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
                <FontAwesomeIcon className="size-8 text-red-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faTrash}></FontAwesomeIcon>
                <div className="flex flex-row gap-1">
                    <FontAwesomeIcon className="size-8 text-gray-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faEdit}></FontAwesomeIcon>
                    <FontAwesomeIcon className="size-8 text-green-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faCheck}></FontAwesomeIcon>
                </div>
            </div>
            
            <p className="text-sm font-bold h-40 w-full flex flex-col justify-center items-center overflow-hidden">
                {text}
            </p>
        </div>
    )
}
