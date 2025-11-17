"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Task {
    id: string;
    title: string;
    description: string;
    created_at: string;
}

interface TaskListProps {
    refreshTrigger?: number;
}

export default function TaskList({ refreshTrigger }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, _setLoading] = useState(false);

    const fetchTasks = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching tasks:", error);
        } else {
            setTasks(data as Task[]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]);

    const deleteTask = async (id: string) => {
        const { error } = await supabase.from("tasks").delete().eq("id", id);

        if (error) {
            console.error("Error deleting task:", error);
            alert(error.message);
        } else {
            fetchTasks();
        }
    };

    if (loading) return <p>Loading tasks...</p>

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className="border p-2 mb-2 flex justify-between items-center">
                <div>
                    <h2 className="font-bold">{task.title}</h2>
                    <p>{task.description}</p>
                </div>
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1">
                    Delete
                </button>
                </li>
            ))}
        </ul>
    );
}
