import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-xl font-semibold">Welcome to Task Manager</h1>
        <p className="mt-3">
          Please <Link href="/login" className="text-blue-500 underline">login</Link>.
        </p>
      </div>
    </main>
  );
}
