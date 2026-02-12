CAREER HORIZON | JOB TRACKER #[LIVE DEMO](https://career-horizon-job-tracker.netlify.app/)

🛰️ A Full-Stack Job Tracker

As a job seeker, I needed a way to track my applications, but a spreadsheet felt like a placeholder. I wanted a tool that was minimalist yet functional. Building this was the perfect opportunity to dive into the backend; I figured I might as well build a tool that stands the test of time while learning a vital new skill set.

The result is a production-ready application optimized for desktop (for now) where every status update and search query is synced in real-time with the help of Supabase.

---

🛠️ Setup Instructions
1. Clone the repository
2. Install dependencies: npm install
3. Set up Environment Variables:
  - Copy the .env.example file and rename it to .env.
  - Add your own Supabase URL and Anon Key to the .env file.
4. Run the app: npm run dev

---

✨ Key Features

Full CRUD Functionality: Seamlessly add, edit, and delete job applications with real-time updates.

Status & Note Tracking: Manage application progress and keep essential notes organized for every role.

Minimalist UI: A clean, responsive interface designed for focus and clarity.

Secure Data Isolation: Integrated Supabase Auth to ensure users interact strictly with their own data.

Real-Time Sync: Persistent data storage that stays in sync across sessions.

Component-Driven Design: Built with modular, reusable React components for maintainability.

---

🕵️ The Detective Work

I treat bugs like clues. When I hit issues with logic or responsiveness, I used them to investigate the inner workings of React. This led to:

Performance: A memoized data pipeline using useMemo to keep searching and filtering buttery smooth.

Architecture: Refactoring a monolith into clean, reusable components. To me, a good refactor is like tidying up after a busy week.

Full-Stack Logic: Navigating the data flow between a live database and the frontend to keep everything in sync.

---

🛠️ The Toolkit

Frontend: React 18, Vite, Tailwind CSS V4, Framer Motion

Backend: Supabase (Auth & Database)

Logic: Custom Hooks & Performance Memoization

Fuel: Sheer stubbornness and and high-focus playlist.

---

🎯 The "Senior-Mindset" Junior

I don't just want to build features; I want to build systems. This project is a reflection of my approach to software:

Willpower over ease: I chose Supabase because I wanted to move past the safety of the frontend and understand how data persists and scales.

Architecture over hacks: I spent time refactoring and memoizing because I care about the developer who has to read my code six months from now—even if that developer is me.

Function over flash: I built this to solve my own problem as a job seeker, ensuring the tool was actually useful rather than just a collection of flashy animations.

I am looking for a team where I can bring this level of ownership and curiosity to production-grade challenges.
