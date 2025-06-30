// Firebase Configuration Example
// Copy this file to lib/firebase-config.js and replace with your actual Firebase config

export const firebaseConfig = {
    apiKey: "your_api_key_here",
    authDomain: "your_project_id.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_project_id.appspot.com",
    messagingSenderId: "your_sender_id",
    appId: "your_app_id"
};

// How to get these values:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Go to Project Settings > General > Your apps
// 4. Add a web app and copy the config object
// 5. Enable Firestore Database in Firebase console 