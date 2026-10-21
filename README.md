# E-commerce Product Recommender 🛍️ 🧠

> **An intelligent, full-stack e-commerce application powered by Deep Learning.**

[![React Native](https://img.shields.io/badge/React_Native-Expo-blue.svg)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/AI-TensorFlow-orange.svg)](https://www.tensorflow.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 Overview

**EcommProductRecommender** is a next-generation shopping platform that personalizes the user experience in real-time. Unlike traditional e-commerce apps, it features a **Hybrid Recommendation Engine** that combines a custom **Neural Collaborative Filtering (NCF)** model with semantic search. This allows the app to adapt instantly to user interactions (taps, cart adds) and deliver highly relevant "For You" feeds and search results.

For a deep dive into the system design, check out the [**Architecture Documentation**](./architecture.md).

## ✨ Key Features

- **🧠 AI-Powered "For You" Feed**: A personalized product stream driven by a Neural Network trained on implicit user feedback.
- **🔍 Hybrid Search**: Smart search that re-ranks database results based on your personal AI interest score.
- **⚡ Real-Time Learning**: User interactions are captured and used to continuously refine the recommendation model.
- **📱 Smooth Mobile Experience**: Built with React Native and Zustand for performance and seamless state management.
- **⚙️ Admin Controls**: Endpoints to trigger model retraining and dynamic mapping updates without server downtime.

## 🛠️ Technical Stack

- **Frontend**: React Native (Expo), TypeScript, Zustand, React Query
- **Backend**: FastAPI (Python), Uvicorn
- **Database**: SQLite (Products & Interactions)
- **Machine Learning**: TensorFlow (Keras), Scikit-learn, Pandas, NumPy
- **DevOps**: Firebase (Config), Git

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v16+) & **npm**
- **Python** (3.9+)
- **Expo Go** app on your mobile device (or an Android/iOS emulator)

### 1. Backend Setup (API & ML)

The application code lives in the `EcommProductRecommender-master/` folder.
Navigate to its `API` directory and set up the Python environment.

```bash
cd EcommProductRecommender-master/API

# Create a virtual environment
python -m venv venv

# Activate Virtual Environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install Dependencies (includes python-multipart, which FastAPI needs
# at startup for the /v1/train file-upload endpoint)
pip install -r requirements.txt
```

**Seed the product catalog:**

```bash
python load_products_to_db.py
```
*(Loads `products.json` into `ecommerce.db`. The `user_interactions.db` and
the products table are also created automatically when the server starts,
but the catalog itself only ever comes from this seed step — without it
`/search` returns an empty list.)*

**Start the Server:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup (Mobile App)

Open a new terminal and navigate to the app folder.

```bash
cd EcommProductRecommender-master

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

- Scan the QR code with **Expo Go** (Android/iOS).
- Or press `a` to run on Android Emulator / `i` for iOS Simulator.
- The app reaches the backend at `http://localhost:8000` by default (web /
  simulators). On a **physical device**, point it at your machine's LAN
  address instead: `EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8000 npx expo start`
  (or set `apiUrl` under `expo.extra` in `app.json`). The address is
  configured in exactly one place: `src/services/apiConfig.ts`.

## 🧪 Usage

1.  **Browse & Interact**: Tap on products or add them to your cart. The app logs these events.
2.  **See AI in Action**: Go to the **"For You"** tab. The NCF model will rank items based on your history.
3.  **Search**: Search for "shoes" or "tech". The results are a hybrid of text matching and your personal predicted interest.

## 📂 Project Structure

Everything below lives under **`EcommProductRecommender-master/`**:

- **`API/`**: Python backend (FastAPI), ML models (`model.py`), and databases.
- **`src/`**: React Native source code.
    - **`screens/`**: UI pages (Home, Search, Details).
    - **`services/`**: API integration (Axios) and `apiConfig.ts` (backend address).
    - **`components/`**: Reusable UI widgets.
- **`functions/`**: Firebase Cloud Function that proxies recommendation requests.
- **`architecture.md`** (repo root): Detailed system design diagrams.

## 👨‍💻 Author

| Information | Details |
| :--- | :--- |
| **Name** | **K. SasiKumar** |
| **Registration No** | **22BCE11638** |
| **Email** | Kommamani012@gmail.com |

---

*Generated by Antigravity*
