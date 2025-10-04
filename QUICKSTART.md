# Quick Start Guide

## Setup in 3 Steps

### 1️⃣ Install Backend Dependencies

```bash
cd /Users/shubhamjain/Documents/LEADS/leads-app/backend
npm install
```

### 2️⃣ Configure API Credentials

```bash
# Create .env file
cp .env.example .env
```

Then edit `backend/.env` and add your credentials:
```
AIRIA_API_KEY=your_api_key_here
AIRIA_USER_ID=your_user_id_here
PORT=5000
```

### 3️⃣ Install Frontend Dependencies

```bash
cd /Users/shubhamjain/Documents/LEADS/leads-app/frontend
npm install
```

## Running the App

### Start Backend (Terminal 1)

```bash
cd /Users/shubhamjain/Documents/LEADS/leads-app/backend
npm start
```

### Start Frontend (Terminal 2)

```bash
cd /Users/shubhamjain/Documents/LEADS/leads-app/frontend
npm start
```

The app will automatically open at `http://localhost:3000`

## Using the App

1. Enter an industry (e.g., "Technology")
2. Enter company names (e.g., "Apple, Google, Microsoft")
3. Click "Analyze Companies"
4. View results as interactive flashcards
5. Click flashcard headers to expand/collapse details

---

**That's it! You're ready to analyze leads.** 🚀

For more details, see [README.md](README.md)
