# Netflix GPT Setup Guide

## Environment Variables Setup

### 1. Create `.env` file in the root directory

Create a file named `.env` in the root of your project with the following content:

```env
# TMDB API Configuration
REACT_APP_TMDB_KEY=your_tmdb_api_key_here

# OpenAI/Groq API Configuration  
REACT_APP_OPENAI_KEY=your_openai_or_groq_api_key_here

# Firebase Configuration (if needed)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 2. Get API Keys

#### TMDB API Key
1. Go to [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings → API
4. Request an API key
5. Copy the API key and replace `your_tmdb_api_key_here`

#### OpenAI/Groq API Key
1. Go to [Groq](https://console.groq.com/) or [OpenAI](https://platform.openai.com/)
2. Create an account
3. Get your API key
4. Copy the API key and replace `your_openai_or_groq_api_key_here`

### 3. Restart Development Server

After creating the `.env` file:

```bash
npm start
```

### 4. Verify Setup

Check the browser console for:
- ✅ TMDB Key: Found
- ✅ OpenAI Key: Found

If you see ❌ Missing, double-check your `.env` file.

## Troubleshooting

### API Key Issues
- Make sure the `.env` file is in the root directory
- Restart the development server after adding the file
- Check that the API keys are valid and active

### Network Issues
- Check your internet connection
- Try accessing the API directly in browser
- Check if the API service is down

### Firebase Issues
- Ensure Firebase project is properly configured
- Check Firebase console for any errors
- Verify authentication rules are set correctly 