export default function GoalEditableText( { answerSlots, setAnswerSlots, id, dateTime }: { answerSlots: string[], setAnswerSlots: (answers: string[]) => void, id: number, dateTime?: boolean } ) {

    let colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-orange-500", "bg-orange-500", "bg-green-500"];

    return (
        <span>
            {dateTime ? 
                <span className={`${colors[id]} font-bold rounded-xl px-3 py-3 mx-1 my-2`}>
                    <input type="date" className="mr-3 py-2" 
                        value={answerSlots[id]?.split("T")[0] || ""}
                        onChange={(e) => {
                            const newAnswers = [...answerSlots];
                            const timePart = answerSlots[id]?.split("T")[1] || "";
                            newAnswers[id] = e.target.value + (timePart ? "T" + timePart : "");
                            setAnswerSlots(newAnswers);
                        }}
                    ></input>
                    <input type="time" className="py-2" 
                        value={answerSlots[id]?.split("T")[1] || ""}
                        onChange={(e) => {
                            const newAnswers = [...answerSlots];
                            const datePart = answerSlots[id]?.split("T")[0] || "";
                            newAnswers[id] = (datePart ? datePart + "T" : "") + e.target.value;
                            setAnswerSlots(newAnswers);
                        }}
                    ></input>
                </span>: 
                <input className={`text-lg ${colors[id]} font-bold rounded-xl px-3 py-2 text-center mx-1 min-w-[5ch] max-w-[50ch] my-2`} 
                    style={{width: `${Math.max(1.05, answerSlots[id].length + 3)}ch`}} value={answerSlots[id]} 
                    onChange={(e) => {
                        const newAnswers = [...answerSlots];
                        newAnswers[id] = e.target.value;
                        setAnswerSlots(newAnswers);
                    }}
                ></input>
            }
            
        </span>
    )
}