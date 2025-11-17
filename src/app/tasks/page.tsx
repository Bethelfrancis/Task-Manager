"use client";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
    const [refresh, setRefresh] = useState(0);

    const handleTaskAdded = () => {
        setRefresh((prev) => prev + 1);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl mb-4">My Tasks</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList refreshTrigger={refresh} />
        </div>
    );
}
