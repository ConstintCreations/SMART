type Goal = {
    id: number;
    text: string;
    answerSlots: string[];
    colorID: number;
    createdDate: string;
    deadline: string;
}

export default function GoalInfo({ goals }: { goals: Goal[] }) {
    let totalProgress = 0;
    let upcomingGoals = 0;
    const currentDate = new Date();
    for (let goal of goals) {
        const deadlineDate = new Date(goal.deadline);
        const createdDateObj = new Date(goal.createdDate);
        const totalTime = deadlineDate.getTime() - createdDateObj.getTime();
        const timePassed = currentDate.getTime() - createdDateObj.getTime();
        let progress = 100;
        if (totalTime > 0) {
            progress = Math.min(100, Math.max(0, (timePassed / totalTime) * 100));
        }
        totalProgress += progress;
        
        const timeToDeadline = deadlineDate.getTime() - currentDate.getTime();
        if (timeToDeadline > 0 && timeToDeadline <= 7 * 24 * 60 * 60 * 1000) {
            upcomingGoals += 1;
        }
    }

    const averageGoalProgress = Math.round((goals.length > 0 ? (totalProgress / goals.length) : 0) * 100) / 100;

    return (
        <div className="w-full flex flex-col items-left gap-1 text-gray-300 mb-6">
            <div>Total Goals: {goals.length}</div>
            <div>Upcoming goals: {upcomingGoals}</div>
            <div>Average Goal Progress: {averageGoalProgress}%</div>
        </div>
    )
}