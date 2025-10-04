# Leads Intelligence Dashboard

A full-stack web application that analyzes potential clients using the Aria AI agent and displays insights as interactive flashcards.

## Features

- 📝 Input form for industry and potential clients
- 🤖 Integration with Aria AI agent API
- 💳 Interactive flashcard display with expandable sections
- 📊 Company insights including:
  - Funding updates
  - Product updates
  - Hiring updates
  - Risks
  - Competitor highlights
  - Market sentiment
- ⚡ Loading states and error handling
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 with animations
- React Hooks (useState)

### Backend
- Node.js
- Express.js
- Axios for external API calls
- CORS middleware
- dotenv for environment variables

## Project Structure

```
leads-app/
├── backend/
│   ├── server.js          # Express server and API endpoint
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
└── frontend/
    ├── public/
    │   └── index.html     # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── InputForm.js       # Form for industry and clients input
    │   │   ├── FlashcardList.js   # Container for flashcards
    │   │   ├── Flashcard.js       # Individual flashcard component
    │   │   ├── LoadingSpinner.js  # Loading indicator
    │   │   └── ErrorMessage.js    # Error display component
    │   ├── styles/
    │   │   └── App.css            # All application styles
    │   ├── App.js         # Main application component
    │   └── index.js       # React entry point
    └── package.json       # Frontend dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Aria AI API key and User ID

### Step 1: Clone or Navigate to the Project

```bash
cd /Users/shubhamjain/Documents/LEADS/leads-app
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env file and add your credentials:
# AIRIA_API_KEY=your_actual_api_key_here
# AIRIA_USER_ID=your_actual_user_id_here
# PORT=5000
```

Edit the `.env` file with your actual Aria AI credentials:
```
AIRIA_API_KEY=your_actual_api_key_here
AIRIA_USER_ID=your_actual_user_id_here
PORT=5000
```

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

For development with auto-restart:
```bash
npm run dev
```

### Terminal 2 - Frontend Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## Usage

1. Open `http://localhost:3000` in your browser
2. Enter the industry (e.g., "Technology", "Healthcare", "Finance")
3. Enter potential clients (company names, one per line or comma-separated)
4. Click "Analyze Companies"
5. Wait for the analysis to complete (loading spinner will show)
6. View results as interactive flashcards
7. Click on any flashcard header to expand/collapse details
8. Click "New Analysis" to start over

## API Endpoint

### POST `/run-agent`

**Request Body:**
```json
{
  "industry": "Technology",
  "clients": "Apple, Google, Microsoft"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Aria AI response data
  }
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Error description"
}
```

## Environment Variables

### Backend (.env)
- `AIRIA_API_KEY` - Your Aria AI API key (required)
- `AIRIA_USER_ID` - Your Aria AI user ID (required)
- `PORT` - Server port (default: 5000)

## Troubleshooting

### Backend won't start
- Check that port 5000 is not already in use
- Verify your `.env` file exists and has the correct API credentials
- Run `npm install` again to ensure all dependencies are installed

### Frontend won't start
- Check that port 3000 is not already in use
- Verify backend is running on port 5000
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and run `npm install` again

### API calls failing
- Verify your Aria API credentials are correct
- Check backend server logs for detailed error messages
- Ensure you have internet connectivity
- Verify the Aria API endpoint is accessible

### CORS errors
- Ensure backend server is running
- Check that the proxy setting in frontend `package.json` points to the correct backend URL

## Development Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-restart (requires nodemon)

### Frontend
- `npm start` - Start the development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Run `npm install --production`
3. Start with `npm start`

### Frontend
1. Run `npm run build` to create optimized production build
2. Deploy the `build` folder to your hosting service
3. Configure the backend API URL if different from localhost

## Security Notes

- ✅ API keys are stored in backend `.env` file (never exposed to frontend)
- ✅ CORS is configured to accept requests
- ⚠️ In production, configure CORS to only allow your frontend domain
- ⚠️ Add rate limiting for production use
- ⚠️ Add input validation and sanitization
- ⚠️ Never commit `.env` files to version control

## License

ISC

## Support

For issues or questions, please refer to the Aria AI documentation or contact support.
