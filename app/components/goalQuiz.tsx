"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
export default function GoalQuiz({ answerSlots, setAnswerSlots, setQuizComplete }: { answerSlots: string[], setAnswerSlots: (answers: string[]) => void, setQuizComplete: (value: boolean) => void }) {

    const colors = {
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
        date?: boolean;
        suggestions?: string[];
    };

    const questions:Question[] = [
        {
            category: "Specific",
            question: "What do you want to achieve?",
            stem: "I want to",
            spot: 0,
            suggestions: ["learn how to play the guitar", "run a marathon", "read 3 books", "lose 10 pounds", "start a blog", "improve my public speaking skills", "learn a new language", "build a mobile app", "meditate daily", "cook healthy meals", "learn web development", "improve my photography skills"]
        },
        {
            category: "Relevant",
            question: "Why do you want to achieve this goal?",
            stem: "Because",
            spot: 5,
            suggestions: ["it will improve my self-image", "it would be a good challenge", "it would help solve a problem", "I've always wanted to do it", "it aligns with my values", "it will enhance my career prospects", "it will improve my health", "it will boost my confidence", "it will allow me to connect with others", "it will help me develop new skills"]
        },
        {
            category: "Time-Bound",
            question: "When do you want to achieve this goal by?",
            stem: "Before",
            spot: 1,
            date: true
        },
        {
            category: "Achievable",
            question: "How will you achieve this goal?",
            stem: "By",
            spot: 2,
            suggestions: ["practicing", "taking classes", "hiring a coach", "setting a schedule", "breaking it into smaller tasks", "following a plan"]
        },
        {
            category: "Measurable",
            question: "How often will you work on this goal?",
            stem: "Every",
            spot: 3,
            suggestions: ["day", "week", "other day", "Monday, Wednesday, and Friday", "morning", "evening", "weekend", "month", "2 weeks", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "weekday"]
        },
        {
            category: "Measurable",
            question: "For how long will you work on this goal each time?",
            stem: "For",
            spot: 4,
            suggestions: ["30 minutes", "1 hour", "2 hours", "15 minutes", "the duration of my lunch break", "3 hours", "45 minutes", "5 hours", "10 minutes", "90 minutes", "5 minutes", "4 hours"]
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
            if (answerSlots[questions[currentQuestionIndex].spot] !== "") {
                setQuizComplete(true);
            }
        }
    };

    const [randomPlaceholder, setRandomPlaceholder] = useState("");

    useEffect(() => {
        const suggestions = questions[currentQuestionIndex].suggestions;
        if (suggestions && suggestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            setRandomPlaceholder(suggestions[randomIndex]);
        }
    }, [currentQuestionIndex]);

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
                    {questions[currentQuestionIndex]?.date == true ? 
                        <div className="flex flex-row items-center gap-2">
                            <input type="date" className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border-2 border-gray-600 focus:border-blue-500 focus:bg-blue-900 outline-none transition-all ease-in-out duration-300 text-2xl" 
                                value={answerSlots[questions[currentQuestionIndex].spot]?.split("T")[0] || ""}
                                onChange={(e) => {
                                    const newAnswers = [...answerSlots];
                                    const timePart = answerSlots[questions[currentQuestionIndex].spot]?.split("T")[1] || "";
                                    newAnswers[questions[currentQuestionIndex].spot] = e.target.value + (timePart ? "T" + timePart : "");
                                    setAnswerSlots(newAnswers);
                                }}>
                            
                            </input>
                            <input type="time" className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border-2 border-gray-600 focus:border-blue-500 focus:bg-blue-900 outline-none transition-all ease-in-out duration-300 text-2xl" 
                                value={answerSlots[questions[currentQuestionIndex].spot]?.split("T")[1] || ""}
                                onChange={(e) => {
                                    const newAnswers = [...answerSlots];
                                    const datePart = answerSlots[questions[currentQuestionIndex].spot]?.split("T")[0] || "";
                                    newAnswers[questions[currentQuestionIndex].spot] = (datePart ? datePart + "T" : "") + e.target.value;
                                    setAnswerSlots(newAnswers);
                                }}>
                            </input>
                        </div> : 
                        <span className="flex flex-row items-center">
                            <input type="text" className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 focus:border-blue-500 focus:bg-blue-900 outline-none transition-all ease-in-out duration-300 text-2xl w-100" 
                                value={answerSlots[questions[currentQuestionIndex].spot]}
                                placeholder={randomPlaceholder}
                                onChange={(e) => {
                                    const newAnswers = [...answerSlots];
                                    newAnswers[questions[currentQuestionIndex].spot] = e.target.value;
                                    setAnswerSlots(newAnswers);
                                }}
                            ></input>
                            <FontAwesomeIcon icon={faDice} tabIndex={0} className="!size-8 text-gray-400 border-2 border-gray-600 bg-gray-800 hover:border-blue-500 hover:bg-blue-900 p-2 rounded-xl ml-2 cursor-pointer hover:text-gray-300 outline-none transition-colors ease-in-out duration-300" onClick={() => {
                                    const suggestions = questions[currentQuestionIndex].suggestions;
                                    if (suggestions && suggestions.length > 0) {
                                        const randomIndex = Math.floor(Math.random() * suggestions.length);
                                        const newAnswers = [...answerSlots];
                                        newAnswers[questions[currentQuestionIndex].spot] = suggestions[randomIndex];
                                        setAnswerSlots(newAnswers);
                                    }
                                }
                            }></FontAwesomeIcon>
                        </span>
                        
                    }
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