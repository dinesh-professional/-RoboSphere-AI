# 🤖 RoboSphere AI - Enterprise Robotics Command Center

![RoboSphere Dashboard Concept](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop)

RoboSphere AI is a full-stack, microservice-based web platform designed for managing, monitoring, and controlling fleets of physical robotics. Built with a stunning dark-neon cyberpunk aesthetic, this project serves as a comprehensive "Digital Twin" command center.

## 🚀 Live Demo
**[Insert Vercel Link Here]**

*(Note: The live deployment operates in "Standalone Demo Mode". To experience the full Go backend WebSockets and Python AI predictions, clone the repository and run via Docker).*

---

## 🏗️ Architecture Stack

This project was built using a highly scalable microservices pattern:

### 1. Frontend (Next.js 14)
* **Framework:** React / Next.js
* **Styling:** Tailwind CSS (Glassmorphism & Neon UI)
* **3D Simulation:** Three.js / React Three Fiber
* **Data Visualization:** Recharts

### 2. Backend (Go/Golang)
* **Framework:** Gin
* **Real-time Streaming:** Gorilla WebSockets (streams telemetry every 2000ms)
* **Database Management:** GORM (PostgreSQL object-relational mapping)

### 3. AI Services (Python)
* **Framework:** FastAPI
* **Predictive Maintenance:** Simulates motor failure probabilities based on live telemetry.
* **Computer Vision:** Mock endpoints for YOLOv9 object detection (Forklifts, Humans, Pallets).

### 4. Orchestration (Docker)
* Fully containerized with a master `docker-compose.yml` linking the UI, Go server, Python server, Postgres Database, and Redis cache.

---

## 💻 Running Locally

### Prerequisites
* Docker Desktop installed

### Quick Start
```bash
# Clone the repo
git clone https://github.com/dinesh-professional/-RoboSphere-AI.git
cd -RoboSphere-AI

# Launch the entire microservice ecosystem
docker-compose up --build
```

**Services Available At:**
* **Dashboard:** `http://localhost:3000`
* **Go WebSocket Server:** `ws://localhost:8080/ws/telemetry`
* **Python AI Swagger Docs:** `http://localhost:8000/docs`

---

## ⚡ Features
* **Live Telemetry Stream:** Consumes WebSocket data to update UI elements (Battery, Temp, RPM) without React state lag.
* **3D Digital Twin:** Utilizes Three.js to render a spinning physical mockup of active robotic units on the simulation tab.
* **Interactive Fleet Control:** Range sliders and directional pads to manually override autonomous pathing.
* **Authentication Gateway:** JWT-styled secure login portal.
* **Stateful Animations:** Framer Motion-style seamless tab transitions and interactive UI toggles.

---
*Built as a Proof-of-Concept for advanced enterprise application development.*
