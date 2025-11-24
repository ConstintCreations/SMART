"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose, faFilter, faArrowDownShortWide, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import GoalCard from "./goalCard";
import GoalEditableText from "./goalEditableText";
import GoalInfo from "./goalInfo";

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

    const [goalColorID, setGoalColorID] = useState(0);

    const [existingGoals, setExistingGoals] = useState<Goal[]>([]);
    useEffect(() => {
        const saved = localStorage.getItem("goals");
        if (saved) {
            setExistingGoals(JSON.parse(saved));
        }
    }, []);

    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500"
    ]

    const selectedBorderColors = [
        "border-red-500",
        "border-orange-500",
        "border-yellow-500",
        "border-green-500",
        "border-blue-500"
    ]

    const borderColors = [
        "border-red-900 hover:border-red-700",
        "border-orange-900 hover:border-orange-700",
        "border-yellow-900 hover:border-yellow-700",
        "border-green-900 hover:border-green-700",
        "border-blue-900 hover:border-blue-700"
    ]

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
        setGoalColorID(existingGoals.filter((goal) => goal.id === id)[0].colorID);
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
                        deadline: getDeadlineISO(answerSlots[1]),
                        colorID: goalColorID
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

    const [search, setSearch] = useState("");

    type SortOption = "Alphabetically" | "By Deadline" | "By Progress" | null;
    type SortDirection = "Ascending" | "Descending";

    const [sortOption, setSortOption] = useState<SortOption>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("Ascending");

    const chosenSortOptionStyle = "text-gray-300 bg-blue-700 hover:bg-blue-700";

    const filteredGoals = existingGoals.filter((goal) =>
        goal.text.toLowerCase().includes(search.toLowerCase())
    );

    let displayedGoals = [...filteredGoals];

    if (sortOption !== null) {
        displayedGoals.sort((a, b) => {
            

            switch (sortOption) {
                case "Alphabetically":
                    if (a.text < b.text) return sortDirection == "Ascending" ? -1 : 1;
                    if (a.text > b.text) return sortDirection == "Ascending" ? 1 : -1;
                break;
                case "By Deadline":
                    const dateA = new Date(a.deadline);
                    const dateB = new Date(b.deadline);
                    if (dateA < dateB) return sortDirection == "Ascending" ? -1 : 1;
                    if (dateA > dateB) return sortDirection == "Ascending" ? 1 : -1;
                break;
                case "By Progress":
                    let progressA = 100;
                    let progressB = 100;
                    const currentDate = new Date();
                    const deadlineDateA = new Date(a.deadline);
                    const deadlineDateB = new Date(b.deadline);
                    const createdDateObjA = new Date(a.createdDate);
                    const createdDateObjB = new Date(b.createdDate);
                    const totalTimeA = deadlineDateA.getTime() - createdDateObjA.getTime();
                    const totalTimeB = deadlineDateB.getTime() - createdDateObjB.getTime();
                    const timePassedA = currentDate.getTime() - createdDateObjA.getTime();
                    const timePassedB = currentDate.getTime() - createdDateObjB.getTime();
                    if (totalTimeA > 0) {
                        progressA = Math.min(100, Math.max(0, (timePassedA / totalTimeA) * 100));
                    }
                    if (totalTimeB > 0) {
                        progressB = Math.min(100, Math.max(0, (timePassedB / totalTimeB) * 100));
                    }
                    if (progressA < progressB) return sortDirection == "Ascending" ? -1 : 1;
                    if (progressA > progressB) return sortDirection == "Ascending" ? 1 : -1;
                break;
            }

            return 0;
        });
    }

    return (
        <div className="w-full flex flex-col items-center">
            
            <GoalInfo goals={existingGoals} />

            <div className="w-full flex flex-row justify-center items-center mb-4 gap-3">
                <input className="text-2xl font-bold text-gray-300 border-2 p-2 rounded-xl border-gray-800 bg-gray-900 focus:border-gray-700 outline-none transition-colors ease-in-out duration-300" placeholder="Search..." value={search} onChange={(e) => {
                    setSearch(e.target.value);
                }}></input>
                <div className="group flex flex-row justify-center items-center relative">
                    <FontAwesomeIcon icon={faFilter} className="text-2xl !size-8 rounded-xl border-gray-800 bg-gray-900 text-gray-400 p-2 border-2 group-hover:text-gray-300 group-hover:border-gray-700 group-hover:bg-gray-800 transition-colors duration-300 ease-in-out cursor-pointer"></FontAwesomeIcon>
                    <div className="absolute pointer-events-none flex flex-col gap-1 justify-center items-center top-13 left-0 w-48 border-2 border-gray-700 bg-gray-800 rounded-lg p-1 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity ease-in-out duration-300 z-10">
                        <div className="cursor-pointer flex flex-row text-gray-300 w-full px-3 py-1 font-bold justify-between">
                            <h2>Filter</h2>
                            <FontAwesomeIcon onClick={() => {setSortDirection(sortDirection == "Ascending" ? "Descending" : "Ascending")}} icon={sortDirection == "Ascending" ? faArrowUpWideShort : faArrowDownShortWide} className="!size-5 text-gray-400 hover:text-gray-300 transition-colors ease-in-out duration-300"></FontAwesomeIcon>
                        </div>
                        <div onClick={() => {setSortOption(sortOption == "Alphabetically" ? null : "Alphabetically")}} className={`cursor-pointer flex flex-row w-full p-1 justify-center rounded-lg transition-colors ease-in-out duration-300 ${sortOption == "Alphabetically" ? chosenSortOptionStyle : "text-gray-400 bg-gray-800 hover:bg-gray-700"}`}>Alphabetically</div>
                        <div onClick={() => {setSortOption(sortOption == "By Deadline" ? null : "By Deadline")}} className={`cursor-pointer flex flex-row w-full p-1 justify-center rounded-lg transition-colors ease-in-out duration-300 ${sortOption == "By Deadline" ? chosenSortOptionStyle : "text-gray-400 bg-gray-800 hover:bg-gray-700"}`}>By Deadline</div>
                        <div onClick={() => {setSortOption(sortOption == "By Progress" ? null : "By Progress")}} className={`cursor-pointer flex flex-row w-full p-1 justify-center rounded-lg transition-colors ease-in-out duration-300 ${sortOption == "By Progress" ? chosenSortOptionStyle : "text-gray-400 bg-gray-800 hover:bg-gray-700"}`}>By Progress</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
                {displayedGoals.map((goal) => (
                    <GoalCard key={goal.id} id={goal.id} text={goal.text} createdDate={goal.createdDate} deadline={goal.deadline} colorID={goal.colorID} onDelete={deleteGoal} onEdit={editGoal}></GoalCard>
                ))}
                <a href="./goals/create" className="cursor-pointer flex flex-col justify-center items-center h-40 w-40 bg-gray-800 hover:bg-gray-700 rounded-3xl border-5 border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 transition-colors ease-in-out duration-300">
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
                                        <div key={goal.id} className="flex flex-col gap-4">
                                            <div className="flex flex-row gap-8">
                                                <p>Color:</p>
                                                <div className="flex flex-row gap-2">
                                                    {[0,1,2,3,4].map((colorOption) => (
                                                        <div key={colorOption} onClick={() => {setGoalColorID(colorOption)}} className={`${colors[colorOption]} h-6 w-10 rounded-full border-3 cursor-pointer transition-colors ease-in-out duration-300 ${goalColorID == colorOption ? selectedBorderColors[colorOption] : borderColors[colorOption]}`}></div>
                                                        ))}
                                                </div>
                                            </div>
                                            <div>
                                                Goal: <br />
                                                I will <GoalEditableText id={0} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> before <GoalEditableText id={1} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots} dateTime={true}></GoalEditableText> by <GoalEditableText id={2} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> every <GoalEditableText id={3} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> for <GoalEditableText id={4} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText> because <GoalEditableText id={5} answerSlots={answerSlots} setAnswerSlots={setAnswerSlots}></GoalEditableText>.
                                            </div>
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
        </div>
    )
}