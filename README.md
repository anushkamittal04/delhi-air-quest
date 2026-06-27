--Delhi Air Quest--

A full-stack Air Quality Monitoring and Prediction web application that predicts AQI (Air Quality Index) using a machine learning model and displays results through a modern interactive dashboard.

PROJECT OVERVIEW->
Delhi Air Quest:
- Predicts Air Quality Index (AQI) using ML model
- FastAPI backend for predictions
- Responsive frontend dashboard
- Runs locally and can be exposed using ngrok

Frontend UI was generated using Lovable and then customized and integrated with backend.

TECH STACK->

Frontend:
- React (Vite)
- TypeScript
- Tailwind CSS
- Lovable-generated UI
- Supabase (optional)

Backend:
- FastAPI
- Python
- Scikit-learn
- Pandas, NumPy

Tools:
- Git & GitHub
- ngrok

PROJECT STRUCTURE->

delhi-air-quest/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   │   └── aqi_model.pkl
│   ├── data/
│   ├── test.ipynb
│   └── delhi_pm25_aqi (1).csv
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── supabase/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── bun.lockb
│   ├── components.json
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── vitest.config.ts
│
├── .gitignore
└── README.md

HOW TO RUN LOCALLY->

Backend:
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

Backend runs at:
http://127.0.0.1:8000

Frontend:
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

NGROK USAGE->

Install:
npm install -g ngrok

Backend tunnel:
ngrok http 8000

Frontend tunnel:
ngrok http 5173

FEATURES->
- AQI prediction
- ML-based forecasting
- Clean dashboard UI
- FastAPI backend
- ngrok public access

LIMITATIONS->
- Runs locally
- ngrok link changes every session
- Not deployed permanently

FUTURE IMPROVEMENTS->
- Deploy backend (Render/Railway)
- Deploy frontend (Vercel/Netlify)
- Improve ML accuracy
- Add live pollution APIs
- Add authentication

AUTHOR->
About

This project was originally created for a hackathon. It is now being maintained and shared here as part of my portfolio. I served as the primary developer throughout the project.

Team Members

- Anushka Mittal
- Yashree Srivastava
- Somya Mishra
- Avlika Rawat


