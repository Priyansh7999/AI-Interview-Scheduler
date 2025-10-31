![AI Recruiter Homepage](public/logo1.png)

# AI Recruiter Voice Agent

an AI Recruiter Voice Agent that can create job interviews and conduct them using voice! Perfect for HR tech, recruitment automation, and AI enthusiasts! 💼✨

## 🚀 Features

### For Recruiters

- **AI-Powered Interview Creation**: Generate personalized interview questions based on job requirements
- **Voice-Based Interviews**: Conduct automated interviews using VAPI AI voice agents
- **Real-time Feedback**: Get instant AI-generated feedback and scoring for candidates
- **Credit System**: Pay-per-interview model with flexible credit packages
- **Dashboard Analytics**: Track interview performance and candidate metrics
- **User Management**: Manage candidates, view results, and export data

### For Candidates

- **Seamless Interview Experience**: Join interviews via unique links
- **Voice Interaction**: Natural conversation with AI interviewer
- **Instant Feedback**: Receive detailed feedback and scoring immediately
- **Profile Management**: Upload CV, manage personal information
- **Interview History**: View past interviews and results

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Styling framework
- **Shadcn UI** - Accessible components
- **Lucide React** - Icons

### Backend & Database

- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication (Google OAuth)
  - Real-time subscriptions
  - File storage

### AI & Voice

- **VAPI AI** - Voice agent platform
- **OpenAI** - AI question generation and feedback
- **OpenRouter** - AI model routing
- **Deepgram** - Speech-to-text
- **PlayHT** - Text-to-speech

### Additional Tools

- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **React Dropzone** - File uploads
- **Moment.js** - Date handling
- **UUID** - Unique identifiers

## 📁 Project Structure

```
ai-recruiter-voice-agent/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main application routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── scheduled-interview   # Interview Details and Candidate Reports
│   │   ├── all-interview/        # All Interview List
│   │   ├── billing/              # Credit management
│   ├── interview/                # Interview flow
│   │   └── [interview_id]/       # Dynamic interview routes
│   ├── api/                      # API routes
│   │   ├── ai-model/             # AI question generation
│   │   ├── ai-feedback/          # AI feedback generation
│   ├── auth/                     # Authentication
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── theme-provider.jsx        # Set theme
├── context/                      # React contexts
├── lib/                          # Utility libraries
├── services/                     # External services
│   ├── Constants.jsx             # App constants
│   └── supabaseClient.js         # Supabase client
├── hooks/                        # Custom React hooks
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- VAPI AI account
- OpenAI/OpenRouter API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Priyansh7999/AI-Interview-Scheduler
cd AI-Interview-Scheduler
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENROUTER_API_KEY=your_openrouter_api_key
VAPI_API_KEY=your_vapi_api_key

# Others
NEXT_PUBLIC_HOST_URL=your_localhost_url
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features Explained

### AI-Powered Interview Generation

- Uses OpenAI to generate contextual interview questions
- Questions are tailored to job position, description, and duration
- Supports multiple interview types (Technical, Behavioral, Experience, etc.)

### Voice-Based Interviews

- Integrates VAPI AI for natural voice conversations
- Real-time speech-to-text and text-to-speech
- Automatic conversation recording and analysis

### Smart Feedback System

- AI analyzes interview conversations
- Provides detailed scoring across multiple dimensions:
  - Technical Skills
  - Communication
  - Problem Solving
  - Experience
  - Behavioral
  - Analysis
- Generates hiring recommendations

### Credit System

- Pay-per-interview model
- Flexible credit packages
- Automatic credit deduction
- Billing integration

## 🔐 Authentication

The app supports multiple authentication methods:

- **Google OAuth**: One-click Google sign-in

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant components
- **Dark Mode**: Theme support (if implemented)
- **Animations**: Smooth transitions and micro-interactions

## 📊 Analytics & Reporting

- **Interview Analytics**: Track performance metrics
- **Candidate Scoring**: Detailed evaluation reports
- **Export Functionality**: CSV export for data analysis
- **Real-time Updates**: Live dashboard updates

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable authentication with Google OAuth
3. Set up the database tables
4. Configure RLS policies

### VAPI AI Setup

1. Create a VAPI account
2. Configure voice agents
3. Set up webhooks for conversation handling

### OpenAI/OpenRouter Setup

1. Get API keys from OpenRouter
2. Configure model preferences
3. Set up rate limiting

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [VAPI AI](https://vapi.ai/) - Voice agent platform
- [OpenAI](https://openai.com/) - AI models
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components

---
