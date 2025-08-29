Here is your complete `README.md` file written out:

---

```markdown
# 📝 Note Taking App

A full-stack, responsive note-taking web application where users can securely register or log in using OTP (email only, no password), create personal notes, and manage them with a sleek user interface.

---

## 🚀 Features

- ✅ OTP-based Sign Up & Login (no password)
- ✅ JWT Authentication
- ✅ Create, Read, and Delete Notes
- ✅ Responsive UI (Mobile & Desktop)
- ✅ Modern and clean UI with Tailwind CSS
- ✅ Welcome screen with user name & email
- ✅ Email OTP sent via Gmail using Nodemailer
- ✅ Conditional layout: Notes list with dynamic form panel
- ✅ Real-world layout for production use

---

## 🧾 Tech Stack

**Frontend:**

- React
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- React Router DOM

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- Nodemailer

---

## 📁 Folder Structure

```

note-taking-app/
├── client/                  # React frontend
│   ├── pages/               # All route-based pages (Signup, Login, Notes)
│   ├── services/api.ts      # Axios instance with JWT
│   └── App.tsx              # Routing config
├── server/                  # Node/Express backend
│   ├── controllers/         # Controller logic for auth & notes
│   ├── models/              # Mongoose schemas for User & Note
│   ├── middleware/          # Auth middleware
│   ├── routes/              # Express routes
│   └── utils/               # OTP generator, mailer
├── .env                     # Environment variables (Gmail creds, JWT, DB URL)
├── .gitignore
└── README.md

````

---

## 🔐 Environment Variables

Create a `.env` file in your `server/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
````

---

## 📦 Installation

1. **Clone the repo:**

```bash
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app
```

2. **Install backend dependencies:**

```bash
cd server
npm install
```

3. **Install frontend dependencies:**

```bash
cd ../client
npm install
```

4. **Start the app:**

* In **server/**:

```bash
npm run dev
```

* In **client/**:

```bash
npm run dev
```

Now visit [http://localhost:5173](http://localhost:5173)

---

## ✉️ OTP Email Design

The OTP email template is designed with clean, professional HTML that clearly shows the OTP and includes a message for unrequested access.

---

## ✅ Functionality Summary

| Feature       | Description                                |
| ------------- | ------------------------------------------ |
| Sign Up       | With name, DOB, email & OTP                |
| Login         | Only with email & OTP                      |
| Dashboard     | Welcome message, Create & View notes       |
| Notes Display | Accordion-style content expansion          |
| Responsive UI | Fully responsive layout with modern design |

---

## 📧 Contact

* **Name**: Nitesh Kumar Sharma
* **Email**: [Niteshkumarsharma831@gmail.com](mailto:niteshkumarsharma831@gmail.com)
* **LinkedIn**: [Check LinkedIn Profile](https://www.linkedin.com/in/nitesh-kumar-sharma-2894a1185/)
* **GitHub**: [Visit GitHub](https://github.com/Niteshsharma831)

> 💡 *This project was part of a job/internship task.*
> ✅ If you like it, feel free to give ⭐ and fork the repo.

---


Let me know if you'd like me to replace the placeholders (like `[Nitesh Kumar Sharma]`, GitHub username, etc.) with your real details.
```
