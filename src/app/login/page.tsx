"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link"


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true)
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false)
            return;
        }

        router.push("/tasks");
        setLoading(false)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 cursor-pointer"
                >
                    {loading ? 'Loggining In...' : 'Login'}
                </button>

                <p className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 font-medium">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
