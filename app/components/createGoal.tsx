"use client";
import { useState } from "react";
import GoalQuiz from "./goalQuiz";
import GoalEditableText from "./goalEditableText";
import { useRouter } from "next/navigation";

export default function CreateGoal() {
    const [answerSlots, setAnswerSlots] = useState<string[]>(["", "", "", "", "", ""]);
    const [quizComplete, setQuizComplete] = useState(false);
    const router = useRouter();

    return (
        <div className="h-full flex flex-col items-center justify-center px-10 mb-14 gap-10">
            {quizComplete == false ? <GoalQuiz answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} setQuizComplete={setQuizComplete}></GoalQuiz> : (
                <div className="w-full max-w-4xl text-center bg-gray-800 rounded-lg px-5 py-5 flex flex-col items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">Your SMART Goal has been created!</h2>
                        <p className="text-gray-400 mb-4">You can edit any part of your goal by clicking on the colored sections below.</p>
                    </div>
                    <div>
                        I will <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={0}></GoalEditableText> before <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={1}></GoalEditableText> by <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={2}></GoalEditableText> every <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={3}></GoalEditableText> for <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={4}></GoalEditableText> because <GoalEditableText answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} id={5}></GoalEditableText>.
                    </div>
                    <div className="mt-6 flex flex-row">
                        <button onClick={() => setQuizComplete(false)} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300 mr-4">Back to Quiz</button>
                        <button onClick={() => router.push("/goals")} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300 mr-4">Confirm Goal</button>
                    </div>
                </div>
            )}
        </div>
    )
}