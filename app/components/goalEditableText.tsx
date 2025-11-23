export default function GoalEditableText( { answerSlots, setAnswerSlots, id }: { answerSlots: string[], setAnswerSlots: (answers: string[]) => void, id: number } ) {

    let colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-orange-500", "bg-orange-500", "bg-green-500"];

    return (
        <input className={`text-lg ${colors[id]} font-bold rounded-xl px-3 py-2 text-center mx-1 min-w-[5ch] max-w-[50ch] my-2`} 
            style={{width: `${Math.max(1.05, answerSlots[id].length + 3)}ch`}} value={answerSlots[id]} 
            onChange={(e) => {
                const newAnswers = [...answerSlots];
                newAnswers[id] = e.target.value;
                setAnswerSlots(newAnswers);
            }}
            ></input>
    )
}