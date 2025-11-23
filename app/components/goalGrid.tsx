"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import GoalCard from "./goalCard";

export default function GoalGrid() {

    type Goal = {
        id: number;
        text: string;
        answerSlots: string[];
        colorID: number;
    }

    const [existingGoals, setExistingGoals] = useState<Goal[]>([]);
    useEffect(() => {
        const saved = localStorage.getItem("goals");
        if (saved) {
            setExistingGoals(JSON.parse(saved));
        }
    }, []);

    function deleteGoal(id: number) {
        const saved = localStorage.getItem("goals");
        if (saved) {
            let goals: Goal[] = JSON.parse(saved);
            goals = goals.filter((goal) => goal.id !== id);
            localStorage.setItem("goals", JSON.stringify(goals));
            setExistingGoals(goals);
        }
    }

    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
            {existingGoals.map((goal, index) => (
                <GoalCard key={index} id={goal.id} text={goal.text} colorID={goal.colorID} onDelete={deleteGoal}></GoalCard>
            ))}
            <a href="/goals/create" className="cursor-pointer flex flex-col justify-center items-center h-40 w-40 bg-gray-800 hover:bg-gray-700 rounded-3xl border-5 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 transition-colors ease-in-out duration-300">
                <FontAwesomeIcon icon={faPlus} className="!size-20"></FontAwesomeIcon>
            </a>
        </div>
    )
}