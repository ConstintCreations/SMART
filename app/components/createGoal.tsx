"use client";
import { useState } from "react";
import GoalQuiz from "./goalQuiz";
import GoalEditableText from "./goalEditableText";
import { useRouter } from "next/navigation";

type Goal = {
    id: number;
    text: string;
    answerSlots: string[];
    colorID: number;
    createdDate: string;
    deadline: string;
}

export default function CreateGoal() {
    const [answerSlots, setAnswerSlots] = useState<string[]>(["", "", "", "", "", ""]);
    const [quizComplete, setQuizComplete] = useState(false);
    const router = useRouter();

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

    function confirmGoal() {
        let existingGoals: Goal[] = [];
        const savedExistingGoals = localStorage.getItem("goals");
        if (savedExistingGoals) {
            existingGoals = JSON.parse(savedExistingGoals);
        }
        const newGoal: Goal = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            text: `I will ${answerSlots[0]} before ${dateTimeFormatter(answerSlots[1])} by ${answerSlots[2]} every ${answerSlots[3]} for ${answerSlots[4]} because ${answerSlots[5]}.`,
            answerSlots: answerSlots,
            colorID: Math.floor(Math.random() * 5),
            createdDate: new Date().toISOString(),
            deadline: getDeadlineISO(answerSlots[1]),
        };
        existingGoals.push(newGoal);
        localStorage.setItem("goals", JSON.stringify(existingGoals));

        router.push("/goals");
    }

    return (
        <div className="h-full flex flex-col items-center justify-center px-10 mb-14 gap-10">
            {quizComplete == false ? <GoalQuiz answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} setQuizComplete={setQuizComplete}></GoalQuiz> : (
                <div className="w-full max-w-4xl text-center bg-gray-800 rounded-lg px-5 py-5 flex flex-col items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">Your SMART Goal has been created!</h2>
                        <p className="text-gray-400 mb-4">You can edit any part of your goal by clicking on the colored sections below.</p>
                    </div>
                    <div>
                        I will <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={0}></GoalEditableText> before <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={1} dateTime={true}></GoalEditableText> by <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={2}></GoalEditableText> every <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={3}></GoalEditableText> for <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={4}></GoalEditableText> because <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={5}></GoalEditableText>.
                    </div>
                    <div className="mt-6 flex flex-row w-full justify-center gap-4">
                        <button onClick={() => setQuizComplete(false)} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300">Back to Quiz</button>
                        <button onClick={confirmGoal} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300">Confirm Goal</button>
                    </div>
                </div>
            )}
        </div>
    )
}