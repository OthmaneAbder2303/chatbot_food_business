﻿# Namoth Chatbot - Moroccan Food Assistant 

**Namoth** (derived from "Othmane"). An AI-powered chatbot for a Moroccan food business, enabling customers to order dishes (e.g., tagine, couscous) or get order info via **Dialogflow** and **ngrok** for local testing. Built with **React (TypeScript)** for the frontend, **FastAPI** for the backend, and **PostgreSQL** for data storage.

## Features
- **Natural Language Orders**:
    - "I'd like 2 lamb tagines and 1 mint tea" 
    - "I want one tagine adn two harira"
- **Smart Order Tracking**:
    - "wanna now statys of my order"
    - "Where's my order #123?" 
- **Powered by Dialogflow’s NLP, with ngrok for webhook testing**.

## Tech Stack
- **Dialogflow**: NLP and intent handling.
- **ngrok**: Exposes local FastAPI for Dialogflow webhooks.
- **React (TypeScript)**: Frontend with `DialogflowMessenger.tsx`.
- **FastAPI**: Backend webhook processing.
- **PostgreSQL**: Stores orders.

## Prerequisites
- Dialogflow account (Google Cloud project)
- ngrok
- Node.js (v16+)
- Python (v3.8+)
- PostgreSQL (v13+)
- Git

## Architecture Diagram

![Namoth Architecture](./archi/diagram-export-29-04-2025-00_30_27.png)


## Setup

### 1. Clone Repository
```bash
git clone https://github.com/OthmaneAbder2303/chatbot_food_business.git
cd chatbot_food_business
```


### 2. Dialogflow Setup

Go to [Dialogflow Console](https://dialogflow.cloud.google.com/).

Create an agent named `namoth-chatbot-food`.

Add intents:

- **Welcome**: For greetings (e.g., "Hi").
- **Order**: For orders (e.g., "Order one couscous").
- **Track**: For tracking orders (e.g., "check order!").

Enable **Fulfillment** and set the webhook URL (from ngrok, e.g., `https://your-ngrok-url.ngrok.io/webhook`).


### 3. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r backend/requirements.txt

# Set up environment variables
cp backend/.env.example backend/.env
# Edit the .env file with your database credentials
```

Run backend with:
```bash
uvicorn backend.main:app --reload
```


### 4. ngrok Setup

Install [ngrok](https://ngrok.com/download).

Expose the FastAPI backend (running on port 8000):
```bash
ngrok http 8000
```

Note: ngrok URLs change each session (free plan). Update the Dialogflow webhook URL after restarting ngrok.


### 5. Project Structure
```
chatbot_food_business/
├── archi/                      # Architecture diagrams/documentation
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── generic_helper.py       # Shared utility functions
│   ├── db_helper.py            # Database operations and queries
│   ├── ngrok.exe               # Ngrok tunneling binary (Windows)
│   └── requirements.txt        # Python dependencies
├── db
│   └── schema.sql              # Database schema definition
├── dialogflow_assest
│   └── training_phrases.txt    # NLP training phrases for intents
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/    
│   │   ├── lib/        
│   │   ├── hooks/          
│   │   └── pages/         
└── README.md                   # Utility scripts
```
