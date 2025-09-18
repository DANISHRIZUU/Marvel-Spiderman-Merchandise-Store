🕷️ Marvel Spider-Man Merchandise Store

A full-stack web application that showcases Spider-Man merchandise.

Currently, the project has a static responsive frontend integrated with a Django backend. The backend serves APIs for managing products, while the frontend handles the UI and dynamic rendering.

🚀 Features

Responsive UI built with React + Vite

Backend powered by Django + Django REST Framework

Product catalog with consistent layout and "Add to Cart" button

API-driven architecture (frontend fetches data from Django backend)

In-development: Shopping cart, authentication, and checkout system

🛠️ Tech Stack

Frontend: React (Vite), JavaScript, CSS
Backend: Django, Django REST Framework


⚙️ Run Project
1. Backend Setup (Django)
cd backend
python manage.py migrate
python manage.py runserver


Server will start at 👉 http://127.0.0.1:8000/

2. Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend will start at 👉 http://localhost:5173/

📂 Project Structure
spiderman-merch-store/
│── backend/          # Django backend (APIs, models, serializers, views)
│── frontend/         # React frontend (UI, components, pages)
│── README.md         # Documentation
