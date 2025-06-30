# Phonics Learning Management System

A modern learning management system built with Next.js 15 and Firebase for teaching phonics to children.

## 🚀 Features

- **Real-time Data**: Firebase Firestore for real-time data synchronization
- **Learner Management**: Track student progress and performance
- **Tutor Dashboard**: Monitor teaching effectiveness and student outcomes
- **Assignment System**: Create and track phonics assignments
- **Progress Analytics**: Visual dashboards with charts and metrics
- **Parent Communication**: Contact management and progress sharing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Firebase (Firestore, Authentication)
- **UI**: Tailwind CSS, Radix UI Components
- **Charts**: Recharts
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd phonics
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the configuration

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firebase Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    // Update these rules based on your authentication needs
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 6. Seed Sample Data (Optional)

To populate your Firebase with sample data for testing:

```bash
node scripts/seed-firebase.js
```

**Note**: Make sure to update the Firebase config in the seed script with your actual project credentials.

### 7. Run the application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📱 Usage

### Dashboard
- View overall statistics and progress metrics
- See recent activities and learner performance
- Monitor tutor effectiveness

### Learners Page
- View all enrolled learners
- Filter by status, level, or search by name
- See detailed progress for each learner
- Access parent contact information

### Performance Analytics
- Track tutor performance metrics
- View learner outcomes by level
- Monitor completion rates and improvement trends

## 🗄️ Data Structure

### Learners Collection
```typescript
{
  id: string
  name: string
  age: number
  level: 'PINK' | 'BLUE' | 'YELLOW' | 'PURPLE'
  progress: number
  status: 'ACTIVE' | 'AT_RISK' | 'COMPLETED' | 'INACTIVE'
  tutor: string
  tutorId: string
  parent: {
    name: string
    email: string
    phone: string
  }
  // ... additional fields
}
```

### Tutors Collection
```typescript
{
  id: string
  name: string
  email: string
  specialization: string
  experience: string
  rating: number
  // ... performance metrics
}
```

### Assignments Collection
```typescript
{
  id: string
  title: string
  description: string
  learnerId: string
  level: 'PINK' | 'BLUE' | 'YELLOW' | 'PURPLE'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'
  // ... additional fields
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting (Alternative)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔐 Security Considerations

- Update Firebase security rules for production
- Implement proper authentication
- Validate data on the frontend and backend
- Use environment variables for sensitive configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact the development team or create an issue in the repository.
