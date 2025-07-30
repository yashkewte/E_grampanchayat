# 🏡 Digital E-Gram Panchayat

A full-stack web application built with **React.js**, **Firebase**, and **Tailwind CSS**, designed to streamline rural governance by digitizing Gram Panchayat services. Citizens can apply for schemes, track applications, and access government services online, while admins and staff manage operations efficiently.

🚀 Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons

Backend: Firebase (Authentication, Firestore)

State Management:Context API

UI/UX: Responsive Design, Dark Mode, Toast Notifications (Sonner)

## 🚀 Features

### 👨‍💼 User Module
- Register & Login (with Firebase Auth)
- Browse available services
- Apply for services
- Track application status
- View & update personal profile
- Logout

### 🧑‍💻 Staff Module
- Login to access internal tools
- View list of citizen applications
- Update status of assigned applications
- Logout

### 🛡️ Admin/Officer Module
- Admin login & dashboard
- Create, update, or delete services/schemes
- Approve or reject citizen applications
- Manage user and staff roles
- Logout

Note: You can register only as a user, for staff and admin you can change role manually in firebase/firestore

🧪 Setup Instructions

# 1. Clone the repo
git clone https://github.com/yashkewte/E_grampanchayat

# 2. Install dependencies
npm install

# 3. Setup Firebase
# - Create a project on Firebase Console
# - Enable Authentication (Email/Password)
# - Setup Firestore DB
# - Add your credentials in /firebase/firebaseConfig.js

# 4. Run the app
npm run dev