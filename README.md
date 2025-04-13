# Smart Feedback Collection System

An intelligent feedback collection and analysis system powered by Gemini AI, providing real-time response mechanism for service improvement at ABC Resort. 

## Acknowledgments

Special thanks to Team Scorpion for their outstanding contribution during Ethiopia's First-Ever Hospitality Hackathon. Their innovative ideas and dedication helped shape this solution into a powerful tool for enhancing hospitality services.

## Features
Find pitch deck  [here](https://www.canva.com/design/DAGkbEIVrDc/GdW0xu3JPl4TZmqoON-roA/edit?utm_content=DAGkbEIVrDc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).
- **AI-Powered Feedback Analysis**
  - Intelligent feedback processing using Gemini AI
  - Sentiment analysis and trend identification
  - Automated response generation for common feedback

- **Service-Specific Feedback Collection**
  - Customized feedback forms for different service areas
  - Real-time feedback submission and processing
  - Structured data collection for better analysis

- **Real-time Response Mechanism**
  - Instant notification system for critical feedback
  - Automated response suggestions for staff
  - Performance tracking and improvement metrics

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/AlexKalll/Smart-feedback-collection-n-response-abc-resort.git
   cd Smart-feedback-collection-n-response-abc-resort
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     GEMINI_API_KEY=your_gemini_api_key
     ```

## Running the Application

1. Start the backend server
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```bash
   cd ..
   npm run dev
   ```

## API Endpoints

### Feedback API
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Retrieve all feedback
- `GET /api/feedback/analysis` - Get AI-powered feedback analysis
- `GET /api/feedback/categories` - Get feedback categories
- `GET /api/feedback/trends` - Get feedback trends and insights

## Project Structure in a nutshell

```
├── backend/
│   ├── models/
│   │   └── Feedback.js
│   │   └── booking.js
│   ├── routes/
│   │   └── feedback.js
│   │   └── booking.js
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

🎉 Thank You! 