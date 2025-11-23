"use client";
import { useState } from "react";
export default function GoalQuiz({ answerSlots, setAnswerSlots, setQuizComplete }: { answerSlots: string[], setAnswerSlots: (answers: string[]) => void, setQuizComplete: (value: boolean) => void }) {

    let colors = {
        Specific: "bg-red-500",
        Measurable: "bg-orange-500",
        Achievable: "bg-yellow-500",
        Relevant: "bg-green-500",
        "Time-Bound": "bg-blue-500"
    }

    type Category = "Specific" | "Measurable" | "Achievable" | "Relevant" | "Time-Bound";
    type Question = {
        category: Category;
        question: string;
        stem: string;
        spot: number;
    };

    const questions:Question[] = [
        {
            category: "Specific",
            question: "What do you want to achieve?",
            stem: "I want to",
            spot: 0
        },
        {
            category: "Relevant",
            question: "Why do you want to achieve this goal?",
            stem: "Because",
            spot: 5
        },
        {
            category: "Time-Bound",
            question: "When do you want to achieve this goal by?",
            stem: "Before",
            spot: 1
        },
        {
            category: "Achievable",
            question: "How will you achieve this goal?",
            stem: "By",
            spot: 2
        },
        {
            category: "Measurable",
            question: "How often will you work on this goal?",
            stem: "Every",
            spot: 3
        },
        {
            category: "Measurable",
            question: "For how long will you work on this goal each time?",
            stem: "For",
            spot: 4
        }
    ]

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            if (answerSlots[questions[currentQuestionIndex].spot] !== "") {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        } else {
            setQuizComplete(true);
        }
    };

    return (
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg px-10 py-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-300 mb-10 text-center">Goal Creation Quiz</h1>
            <div className="h-full flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-row gap-4 items-center mb-6">
                    <p className={`font-bold text-gray-300 px-5 py-3 rounded-2xl text-2xl self-start ${colors[questions[currentQuestionIndex].category]}`}>{questions[currentQuestionIndex].category}</p>
                    <p className="font-bold text-gray-300 text-left text-3xl">{questions[currentQuestionIndex].question}</p>
                </div>

                <div className="flex flex-row gap-4 items-center">
                    <p className="text-gray-300 text-2xl">{questions[currentQuestionIndex].stem}</p>
                    <input type="text" className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border-2 border-gray-600 focus:border-blue-500 focus:bg-blue-900 outline-none transition-all ease-in-out duration-300 text-2xl w-100" 
                        value={answerSlots[questions[currentQuestionIndex].spot]}
                        onChange={(e) => {
                            const newAnswers = [...answerSlots];
                            newAnswers[questions[currentQuestionIndex].spot] = e.target.value;
                            setAnswerSlots(newAnswers);
                        }}
                    ></input>
                </div>

                <div>
                    <button onClick={handlePreviousQuestion} className="cursor-pointer px-5 py-3 bg-gray-700 border-2 border-gray-600 rounded-2xl text-gray-300 hover:bg-blue-700 hover:border-blue-600 transition-colors ease-in-out duration-300 mr-4">Previous</button>
                    <button onClick={handleNextQuestion} className={`cursor-pointer text-gray-300 px-5 py-3 border-2 rounded-2xl transition-colors ease-in-out duration-300 ${answerSlots[questions[currentQuestionIndex].spot] === "" ? "bg-zinc-800 border-zinc-700" : "bg-gray-700 border-gray-600 hover:bg-blue-700 hover:border-blue-600"}`}>Next</button>
                </div>

                <div className="font-bold text-xl">{currentQuestionIndex+1}/{questions.length}</div>
            </div>
        </div>
    )
}