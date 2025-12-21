# Ticket AI Assistant

A full-stack web application that leverages AI to intelligently manage and respond to support tickets. Built with React, Node.js, Express, MongoDB, and Inngest for asynchronous workflows.

## Overview

Ticket AI Assistant is a modern support ticket management system enhanced with AI capabilities. It allows users to:

- Register and authenticate securely
- Create and manage support tickets
- Automatically generate AI-powered responses to tickets
- Track ticket status and history
- Receive email notifications for important updates

## Tech Stack

### Frontend

- **React 19** - Modern UI library with hooks
- **Vite 7** - Lightning-fast build tool
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Component library built on Tailwind

### Backend

- **Node.js** - JavaScript runtime
- **Express 5** - Lightweight web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM for MongoDB
- **Inngest 3** - Event-driven workflow engine
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Google Gemini API** - AI agent for ticket responses

### DevOps & Tools

- **Nodemon** - Auto-reload development server
- **ESLint** - Code linting
- **Inngest CLI** - Workflow development

## Project Structure

```
ticket-ai-assistant/
├── backend/
│   ├── config/
│   │   ├── dbConnection.js        # MongoDB connection
│   │   └── tokenGenerator.js      # JWT token generation
│   ├── controllers/
│   │   ├── user.js                # User authentication logic
│   │   └── ticket.js              # Ticket management logic
│   ├── inngest/
│   │   ├── client.js              # Inngest client setup
│   │   └── functions/
│   │       ├── signUp.js          # User signup workflow
│   │       └── createTicket.js    # Ticket creation workflow
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── userModel.js           # User database schema
│   │   └── ticketModel.js         # Ticket database schema
│   ├── routes/
│   │   ├── user.js                # User endpoints
│   │   └── ticket.js              # Ticket endpoints
│   ├── utils/
│   │   ├── constant.js            # Constants and configuration
│   │   ├── mailer.js              # Email sending utility
│   │   └── ticketAgent.js         # AI agent for ticket responses
│   ├── index.js                   # Express server setup
│   ├── package.json
│   └── .env.example
│
├── ticket-ai-assistant-ui/
│   ├── src/
│   │   ├── components/
│   │   │   └── Auth/
│   │   │       └── Auth.jsx       # Authentication component
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   │   └── Login.jsx
│   │   │   ├── Signup/
│   │   │   │   └── Signup.jsx
│   │   │   ├── Tickets/
│   │   │   │   └── Tickets.jsx
│   │   │   ├── TicketDetails/
│   │   │   │   └── TicketDetails.jsx
│   │   │   └── Admin/
│   │   │       └── Admin.jsx
│   │   ├── navigations/
│   │   │   └── navigations.js     # Route configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── utils.js
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB (local or cloud instance)
- Google Gemini API key
- Inngest account (for production workflows)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ticket-ai-assistant
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   # or
   yarn install
   ```

3. **Setup Frontend**
   ```bash
   cd ../ticket-ai-assistant-ui
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create `.env` files in both `backend/` and `ticket-ai-assistant-ui/` directories.

**Backend `.env`:**

```env
# Server
PORT=5000
BASE_URL=/api

# Database
MONGODB_URI=mongodb://localhost:27017/ticket-ai-assistant

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Email (Nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password_or_app_token
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587

# Frontend
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Backend:**

```bash
cd backend
yarn dev
```

**Terminal 2 - Frontend:**

```bash
cd ticket-ai-assistant-ui
yarn dev
```

**Terminal 3 - Inngest Dev Server (Optional, for local workflow testing):**

```bash
cd backend
yarn inngest-dev
```

### Option 2: Using Docker (if configured)

```bash
docker-compose up
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000/api`.

## API Endpoints

### User Routes (`/api/user`)

- `POST /signup` - Register a new user
- `POST /login` - Authenticate user
- `GET /profile` - Get user profile (protected)
- `POST /logout` - Logout user

### Ticket Routes (`/api/ticket`)

- `POST /create` - Create a new support ticket
- `GET /list` - Get all tickets (protected)
- `GET /:id` - Get ticket details (protected)
- `PATCH /:id/status` - Update ticket status (protected)
- `POST /:id/response` - Add AI-generated response (protected)

### Inngest Hooks (`/api/inngest`)

- Webhook endpoint for Inngest event processing
- Handles async workflows for user signup and ticket creation

## Features

### Authentication

- User registration with email verification
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes

### Ticket Management

- Create support tickets with detailed descriptions
- View ticket list and individual details
- Update ticket status (Open, In Progress, Closed)
- Email notifications on ticket updates

### AI Integration

- Automatic ticket response generation using Google Gemini
- Intelligent classification and prioritization
- Context-aware replies based on ticket content

### Event-Driven Architecture

- Inngest-powered async workflows
- Reliable email delivery
- Background job processing
- Workflow monitoring and retry logic

## Development

### Code Style & Linting

**Backend:**

```bash
cd backend
yarn lint        # Check for errors
yarn lint:fix    # Auto-fix errors
```

**Frontend:**

```bash
cd ticket-ai-assistant-ui
yarn lint        # Check for errors
yarn lint:fix    # Auto-fix errors
```

### Building for Production

**Backend:**

```bash
cd backend
yarn build  # If build script exists, or use `node index.js`
```

**Frontend:**

```bash
cd ticket-ai-assistant-ui
yarn build
# Output will be in `dist/` directory
```

## Troubleshooting

### Inngest API Error: 401 Event key not found

- Ensure `INNGEST_EVENT_KEY` is set in your `.env` file
- Verify the key is valid from your Inngest dashboard
- Ensure `dotenv` is loaded before importing the Inngest client

### MongoDB Connection Failed

- Check if MongoDB is running locally or the connection string is correct
- Verify network access if using MongoDB Atlas
- Check credentials in `MONGODB_URI`

### Emails Not Sending

- Verify email credentials in `.env`
- Check if you're using app-specific passwords for Gmail
- Ensure Nodemailer configuration is correct

### Frontend Not Connecting to Backend

- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend (`index.js`)
- Ensure backend is running on the correct port

## Testing

To test the application:

1. **Signup a new user** via the signup page
2. **Login** with your credentials
3. **Create a ticket** from the dashboard
4. **Monitor email** for notifications
5. **View ticket responses** generated by the AI agent

## Performance Tips

- Use MongoDB indexes for frequent queries
- Cache user sessions with Redis (optional)
- Enable gzip compression in Express
- Optimize frontend bundle with tree-shaking
- Use CDN for static assets in production

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation
- Review the API endpoints and workflows

## Future Enhancements

- [ ] Multi-user support with team collaboration
- [ ] Advanced ticket filtering and search
- [ ] Custom AI model training
- [ ] Integration with external support systems
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Ticket analytics and reporting
- [ ] Multilingual support

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Maintainer:** Your Team
