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

Backend:
- FastAPI
- Python
- Scikit-learn
- Pandas, NumPy
- Joblib

Tools:
- Git & GitHub

PROJECT STRUCTURE->

delhi-air-quest/
│
├── backend/
│   ├── model/
│   │   └── aqi_model.pkl
│   ├── app.py
│   ├── delhi_pm25_aqi (1).csv
│   ├── requirements.txt
│   └── test.ipynb
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

```bash
1. Clone the repository
git clone https://github.com/anushkamittal04/delhi-air-quest.git
cd delhi-air-quest

2. Backend Setup
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000

# Backend runs at:
http://localhost:8000

3. Frontend Setup (open new terminal)
cd frontend
npm install
npm run dev

# Frontend runs at:
http://localhost:8080

4. Open app
Open browser:
http://localhost:8080
```
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

Team and Contributors->

This project was originally created for a hackathon. It is now being maintained and shared here as part of my portfolio. I served as the primary developer throughout the project.

Team Members:

- Anushka Mittal
- Yashree Srivastava
- Somya Mishra
- Avlika Rawat


