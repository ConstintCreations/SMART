"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import GoalCard from "./goalCard";
import GoalEditableText from "./goalEditableText";

export default function GoalGrid() {

    type Goal = {
        id: number;
        text: string;
        answerSlots: string[];
        colorID: number;
        createdDate: string;
        deadline: string;
    }

    const [editingGoalID, setEditingGoalID] = useState<number | null>(null);

    const [existingGoals, setExistingGoals] = useState<Goal[]>([]);
    useEffect(() => {
        const saved = localStorage.getItem("goals");
        if (saved) {
            setExistingGoals(JSON.parse(saved));
        }
    }, []);

    function dateTimeFormatter(dateTimeAnswerSlot: string) {
        if (dateTimeAnswerSlot == "") return "";

        const [datePartRaw, timePartRaw] = dateTimeAnswerSlot.split("T");

        let datePart = null;
        let timePart = null;

        if (datePartRaw && !datePartRaw.includes("undefined") && !datePartRaw.includes(":")) {
            datePart = datePartRaw.split("-")[1] + "/" + datePartRaw.split("-")[2] + "/" + datePartRaw.split("-")[0];
        }

        if (timePartRaw && !timePartRaw.includes("undefined")) {
            let hours = parseInt(timePartRaw.split(":")[0]);
            const minutes = timePartRaw.split(":")[1];
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            timePart = `${hours}:${minutes} ${ampm}`;
        }
        
        if (datePart && timePart) {
            return datePart + ", " + timePart;
        } else if (datePart) {
            return datePart;
        } else if (timePart) {
            return timePart;
        } else {
            return "";
        }
    }

    function getDeadlineISO(dateTimeAnswerSlot: string) {
        if (dateTimeAnswerSlot == "") return new Date().toISOString();
        const [datePartRaw, timePartRaw] = dateTimeAnswerSlot.split("T");

        let datePart = null;
        let timePart = null;

        const now = new Date();
        
        if (datePartRaw && !datePartRaw.includes("undefined") && !datePartRaw.includes(":")) {
            datePart = datePartRaw;
        } else {
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const year = now.getFullYear();
            datePart = `${year}-${month}-${day}`;
        }
        if (timePartRaw && !timePartRaw.includes("undefined")) {
            timePart = timePartRaw;
        } else {
            timePart = "23:59";
        }
        return new Date(datePart + "T" + timePart).toISOString();
    }

    function deleteGoal(id: number) {
        const saved = localStorage.getItem("goals");
        if (saved) {
            let goals: Goal[] = JSON.parse(saved);
            goals = goals.filter((goal) => goal.id !== id);
            localStorage.setItem("goals", JSON.stringify(goals));
            setExistingGoals(goals);
        }
    }

    function editGoal(id: number) {
        setEditingGoalID(id);
        setAnswerSlots(existingGoals.filter((goal) => goal.id === id)[0].answerSlots);
    }

    function confirmEdit() {
        const saved = localStorage.getItem("goals");
        if (saved) {
            let goals: Goal[] = JSON.parse(saved);

            goals = goals.map((goal) => {
                if (goal.id === editingGoalID) {
                    return {
                        ...goal,
                        text: `I will ${answerSlots[0]} before ${dateTimeFormatter(answerSlots[1])} by ${answerSlots[2]} every ${answerSlots[3]} for ${answerSlots[4]} because ${answerSlots[5]}.`,
                        answerSlots: answerSlots,
                        deadline: getDeadlineISO(answerSlots[1])
                    }
                }
                return goal;
            });

            localStorage.setItem("goals", JSON.stringify(goals));
            setExistingGoals(goals);
        }
        setEditingGoalID(null);
    }

    function cancelEdit() {
        setEditingGoalID(null);
    }

    const [answerSlots, setAnswerSlots] = useState<string[]>(["", "", "", "", "", ""]);

    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
            {existingGoals.map((goal) => (
                <GoalCard key={goal.id} id={goal.id} text={goal.text} createdDate={goal.createdDate} deadline={goal.deadline} colorID={goal.colorID} onDelete={deleteGoal} onEdit={editGoal}></GoalCard>
            ))}
            <a href="/goals/create" className="cursor-pointer flex flex-col justify-center items-center h-40 w-40 bg-gray-800 hover:bg-gray-700 rounded-3xl border-5 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 transition-colors ease-in-out duration-300">
                <FontAwesomeIcon icon={faPlus} className="!size-20"></FontAwesomeIcon>
            </a>

            <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${editingGoalID == null ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity ease-in-out duration-300`}>
                <div className="fixed w-full h-full bg-black opacity-50"></div>
                <div className="fixed top-20 right-10 z-3">
                    <FontAwesomeIcon icon={faClose} className="!size-8 cursor-pointer" onClick={cancelEdit}></FontAwesomeIcon>
                </div>
                <div className="fixed w-full h-full flex justify-center items-center">
                    <div className="bg-gray-900 rounded-xl p-10 max-w-3xl w-full flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-gray-300">Edit Goal</h2>
                        <hr />
                        <div className="text-gray-300 mt-8">
                            {
                                existingGoals.filter((goal) => goal.id === editingGoalID).map((goal) => (
                                    <div key={goal.id}>
                                        I will <GoalEditableText id={0} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> before <GoalEditableText id={1} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} dateTime={true}></GoalEditableText> by <GoalEditableText id={2} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> every <GoalEditableText id={3} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> for <GoalEditableText id={4} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> because <GoalEditableText id={5} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText>.
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-6 flex flex-row w-full justify-center gap-4">
                            <button onClick={cancelEdit} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300">Cancel</button>
                            <button onClick={confirmEdit} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300">Confirm Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}