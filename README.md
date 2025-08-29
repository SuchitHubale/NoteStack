# NoteStack 📝

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

A modern, full-stack note-taking application built with cutting-edge web technologies. NoteStack provides a seamless experience for creating, organizing, and managing your notes with real-time synchronization and rich text formatting capabilities.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based authentication with OTP verification
- 📝 **Rich Text Editor** - Advanced formatting capabilities for your notes
- ⚡ **Real-time Sync** - Instant saving and synchronization across devices
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Modern UI/UX** - Clean and intuitive interface built with Tailwind CSS
- 🔍 **Search & Filter** - Quickly find your notes with powerful search functionality
- 🏷️ **Organization** - Tag and categorize your notes for better management

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[React Router](https://reactrouter.com/)** - Declarative routing
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Fast, minimalist web framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[JWT](https://jwt.io/)** - Secure authentication tokens
- **[Nodemailer](https://nodemailer.com/)** - Email sending capabilities

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB Atlas** account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SuchitHubale/NoteStack.git
   cd NoteStack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Update the `.env` file with your configuration (see [Environment Variables](#environment-variables))

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Update the frontend `.env` file with your backend API URL

4. **Start Development Servers**
   
   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## ⚙️ Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notestack

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for OTP)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_specific_password

# CORS
FRONTEND_URL=http://localhost:5173
```

## 📂 Project Structure

```
notestack/
├── backend/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── note.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── models/
│   │   ├── note.model.ts
│   │   └── user.model.ts
│   ├── node_modules/
│   ├── routes/
│   │   ├── note.routes.ts
│   │   └── user.routes.ts
│   ├── utils/
│   ├── .env
│   ├── app.ts
│   ├── package.json
│   ├── package-lock.json
│   └── server.ts
│
├── frontend/
│   ├── public/
│   │   ├── sun-icon-blue.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```


### Environment Setup
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure secure JWT secrets
- Set up proper CORS origins

## 🤝 Contributing

We welcome contributions to NoteStack! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Update documentation as needed

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/refresh` - Refresh JWT token

### Notes Endpoints
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 📋 Roadmap

- [ ] **v2.0.0** - Collaborative editing
- [ ] **v2.1.0** - Dark mode support
- [ ] **v2.2.0** - File attachments
- [ ] **v2.3.0** - Offline synchronization
- [ ] **v3.0.0** - Mobile applications (iOS/Android)



## 👨‍💻 Author

**Suchit Hubale**
- Twitter: [@suchithubale](https://twitter.com/suchithubale)
- Email: suchithubale@gmail.com
- GitHub: [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the reliable database solution
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/yourusername/notestack/issues)
- Email me at suchithubale@gmail.com
- Follow me on Twitter [@suchithubale](https://twitter.com/suchithubale)

---

⭐ **Star this repository if you found it helpful!**