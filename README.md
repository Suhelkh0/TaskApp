# ✅ TaskApp - Task Management System  

TaskApp is a **task management system** that allows users to create, organize, and track their tasks efficiently. It supports **task folders, user roles (Managers & Users), activity tracking, and progress analytics with charts**.  

🚀 **Features:**  
- 📝 **Task Management** – Users can create, update, and delete tasks  
- 📂 **Task Folders** – Organize tasks into categories  
- 👥 **User Roles** – Manager & Users with different permissions  
- 📊 **Analytics Dashboard** – Visualize user activity & task completion progress  
- 🔑 **User Authentication** – Secure login & account management  

---

## 📜 Table of Contents
- [🛠 Features](#-features)
- [👥 User Roles](#-user-roles)
- [📸 Screenshots](#-screenshots)
- [🚀 How It Works](#-how-it-works)
- [📦 Installation](#-installation)
- [🛠 Technologies Used](#-technologies-used)
- [📊 Analytics & Charts](#-analytics--charts)
- [✅ Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🛠 **Features**
✔️ **Task Creation & Management** – Add, update, and delete tasks  
✔️ **Task Folders** – Organize tasks into folders for easy access  
✔️ **User Authentication** – Login & Registration system  
✔️ **Role-based Access** – Manager (assigns tasks) and Users (complete tasks)  
✔️ **Progress Tracking** – Charts showing completed tasks and ongoing progress  
✔️ **Analytics Dashboard** – View **user activity logs & task performance**  

---

## 👥 **User Roles**
TaskApp supports **two primary user roles**:

| Role | Description |
|------|------------|
| **Manager** | Can create tasks, assign them to users, and monitor progress. |
| **User** | Can view assigned tasks, mark them as completed, and track progress. |

---

## 📸 **Screenshots**
| Feature  | Screenshot |
|----------|-----------|
| **Login Page** | ![Login](docs/images/login.png) |
| **Task Management** | ![Tasks](docs/images/task-list.png) |
| **Task Folders** | ![Task Folders](docs/images/task-folders.png) |
| **Progress Charts** | ![Charts](docs/images/user-progress-chart.png) |

---

## 🚀 **How It Works**
1️⃣ **User Login**  
   - Users authenticate using email & password.  
   - Different dashboards for **Managers & Users**.

2️⃣ **Task Creation & Folders**  
   - Tasks are added and categorized into folders.  
   - Users receive tasks based on their **role**.

3️⃣ **Task Progress Tracking**  
   - Users **update task status** (Pending → In Progress → Completed).  
   - Charts visualize progress & activity.

4️⃣ **Manager Dashboard**  
   - Managers **assign, track, and analyze tasks**.

---

## 📦 **Installation**
### 🔹 Prerequisites
Ensure you have:
- **Node.js** & **NPM** installed (`node -v && npm -v`)
- **MongoDB** (for backend storage)
- **Chart.js** (for analytics)
- **Express.js** (for API routing)

### 🔹 Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/TaskApp.git
cd TaskApp
