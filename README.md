# ScamWise - Your Personal Scam-Spotting Coach

<div align="center">
  <img src="https://raw.githubusercontent.com/google/generative-ai-docs/main/public/images/firebase/scam-wise-social-card.png" alt="ScamWise Social Share Image" width="600px"/>
</div>

<p align="center">
  <strong>Trust Your Instincts. We'll Help You Verify Them.</strong>
  <br />
  <br />
  Feeling unsure about a message? ScamWise is a web application designed to help you analyze suspicious texts, emails, and images, empowering you to spot scams with confidence.
</p>

---

## ✨ Key Features

-   **Instant Analysis**: Get a quick, AI-powered verdict on whether a message is safe, suspicious, or likely a scam. The analysis provides a detailed checklist of common scam tactics.
-   **Coaching Mode**: Go step-by-step through the analysis process. You'll be asked questions to help you identify red flags on your own, building your scam-spotting skills.
-   **Image & Text Support**: Analyze text messages, emails, or upload screenshots for a comprehensive evaluation.
-   **Practice Scenarios**: Hone your skills in a safe environment with real-world examples of both scams and legitimate messages.
-   **Resource Hub**: Access a curated list of official resources to report scams and get help if you've been targeted.

## 🚀 Tech Stack

This project is built with a modern, AI-first tech stack:

-   **Frontend**: [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's [Gemini](https://deepmind.google/technologies/gemini/) models
-   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
-   **Analytics**: [Google Analytics for Firebase](https://firebase.google.com/docs/analytics)

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/scamwise.git
    cd scamwise
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a new file named `.env` in the root of your project.
    -   Add your Firebase and Google AI credentials to this file. You can find your Firebase config in your Firebase project settings.

    ```env
    # Genkit/Gemini API Key
    GEMINI_API_KEY=YOUR_GOOGLE_AI_API_KEY

    # Firebase Project Configuration (replace with your actual Firebase config)
    NEXT_PUBLIC_FIREBASE_API_KEY=AI...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-...
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) to view the app in your browser.

## 🤖 How the AI Works

The core logic is powered by **Firebase Genkit**, an open-source framework for building AI-powered applications.

1.  A user submits a message and/or an image.
2.  The Next.js server action calls a Genkit flow (`unifiedAssessmentFlow`).
3.  This flow uses a structured prompt with a detailed checklist of scam indicators (e.g., urgency, sender identity, unusual requests).
4.  The prompt, along with the user's input, is sent to the Google Gemini model.
5.  The model analyzes the content against the checklist and returns a structured JSON object containing a verdict, a recommendation, and a point-by-point analysis.
6.  The result is displayed to the user in either "Instant" or "Coaching" mode.
