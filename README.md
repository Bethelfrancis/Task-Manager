📝 Task Manager App – GadaHQ Frontend Developer Assessment

A simple task manager application built with Next.js (App Router), TypeScript, and Supabase for Authentication and Database storage.
Users can register, log in, create tasks, view tasks, and delete tasks — with each user only seeing their own tasks.

This project was built as part of the GadaHQ Frontend Developer Assessment.

🚀 Tech Stack

Next.js 16 (App Router)

TypeScript

Supabase Authentication (Email/Password)

Supabase Database

Tailwind CSS


🔐 Features
✅ Authentication

Email + Password login & signup using Supabase Auth

Protected routes (only authenticated users can access task page)

Automatic redirect for unauthenticated users

✅ Task Management

Every logged-in user can:

Create a task

View all their tasks

Delete a task

Each task includes:

title

description

user_id

Tasks are scoped to the current authenticated user.


🗄️ Database

Table: tasks

Column	Type
id	uuid (pk)
title	text
description	text
user_id	uuid
created_at	timestamp

Clone the repository:

git clone https://github.com/Bethelfrancis/Task-Manager.git
cd task

🔗 Live Demo

Vercel App Link: task-manager-xi-sable-47.vercel.app
GitHub Repo: https://github.com/Bethelfrancis/Task-Manager.git

👤 Author

Bethel Francis
Frontend Developer

GitHub: https://github.com/Bethelfrancis
Email: bethelndegonekwu@gmail.com