"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

export default function GoalCard({ id, text, colorID, onDelete, onEdit }: { id: number, text: string, colorID: number, onDelete: (id: number) => void, onEdit: (id: number) => void }) {

    const [deleting, setDeleting] = useState(false);

    const colors = [
        "bg-red-900 hover:bg-red-800 border-red-700 hover:border-red-600",
        "bg-orange-900 hover:bg-orange-800 border-orange-700 hover:border-orange-600",
        "bg-yellow-900 hover:bg-yellow-800 border-yellow-700 hover:border-yellow-600",
        "bg-green-900 hover:bg-green-800 border-green-700 hover:border-green-600",
        "bg-blue-900 hover:bg-blue-800 border-blue-700 hover:border-blue-600",
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
            </div>
        </div>
    )
}
