"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface TaskFormProps {
    onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("You must be logged in");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("tasks").insert({
            title,
            description,
            user_id: user.id,
        });

        if (error) {
            console.error("Error adding task:", error);
            alert(error.message);
        } else {
            setTitle("");
            setDescription("");
            onTaskAdded();
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col mb-4">
            <input
                type="text"
                placeholder="Title"
                className="border p-2 mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                className="border p-2 mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddTask} className="bg-green-500 text-white p-2">
                {loading ? "Adding..." : "Add Task"}
            </button>
        </div>
    );
}
