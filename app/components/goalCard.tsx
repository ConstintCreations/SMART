"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

export default function GoalCard({ id, text, createdDate, deadline, colorID, onDelete, onEdit }: { id: number, text: string, createdDate: string, deadline: string, colorID: number, onDelete: (id: number) => void, onEdit: (id: number) => void }) {

    const [deleting, setDeleting] = useState(false);

    let progress = 100;
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const createdDateObj = new Date(createdDate);
    const totalTime = deadlineDate.getTime() - createdDateObj.getTime();
    const timePassed = currentDate.getTime() - createdDateObj.getTime();
    if (totalTime > 0) {
        progress = Math.min(100, Math.max(0, (timePassed / totalTime) * 100));
    }

    const colors = [
        "bg-red-900 hover:bg-red-800 border-red-700 hover:border-red-600",
        "bg-orange-900 hover:bg-orange-800 border-orange-700 hover:border-orange-600",
        "bg-yellow-900 hover:bg-yellow-800 border-yellow-700 hover:border-yellow-600",
        "bg-green-900 hover:bg-green-800 border-green-700 hover:border-green-600",
        "bg-blue-900 hover:bg-blue-800 border-blue-700 hover:border-blue-600",
    ]

    const progressColors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
    ]

    function handleDelete(e: React.MouseEvent, completed:boolean = false) {
        e.stopPropagation(); 
        setDeleting(true);
        if (completed) {
            var end = Date.now() + (2000);
            var colors = ['#fb2c36', '#ff6900', '#efb100', '#00c951', '#2b7fff'];
            (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
            }());
        }
        setTimeout(() => {
            onDelete(id);
        }, 1000);
    }

    function handleEdit(e: React.MouseEvent) {
        e.stopPropagation();
        onEdit(id);
    }

    return (
        <div className={`${deleting ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out duration-1000`}>
            <div className={`relative cursor-pointer px-5 py-3 text-center flex flex-col justify-center items-center h-40 w-80 ${colors[colorID]} rounded-3xl border-5 text-gray-300 transition-colors ease-in-out duration-300 overflow-hidden group`}>
                
                <div className="flex flex-row gap-1 absolute top-3 left-0 w-full justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
                    <FontAwesomeIcon onClick={(e) => {handleDelete(e)}} className="!size-5 text-red-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faTrash}></FontAwesomeIcon>
                    <div className="flex flex-row gap-1">
                        <FontAwesomeIcon onClick={(e) => {handleEdit(e)}} className="!size-5 text-gray-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faEdit}></FontAwesomeIcon>
                        <FontAwesomeIcon onClick={(e) => {handleDelete(e, true)}} className="!size-5 text-green-400 bg-gray-800 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ease-in-out duration-300" icon={faCheck}></FontAwesomeIcon>
                    </div>
                </div>
                
                <p className="text-sm font-bold h-40 w-full flex flex-col justify-center items-center overflow-hidden">
                    {text}
                </p>
                <div className="relative w-full bg-gray-700 rounded-full border-2 border-gray-800 overflow-hidden h-8">
                    <div className={`absolute bg-gray-300 rounded-full h-full ${progressColors[colorID]}`} style={{width: `${progress}%`}}>
                        
                    </div>
                    <p className={`relative font-bold text-sm ${progress > 50 ? "text-gray-300" : "text-gray-800" }`}>
                        {Math.floor(progress)}%
                    </p>
                </div>
            </div>
        </div>
    )
}
