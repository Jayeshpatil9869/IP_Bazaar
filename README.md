# IPBazaar - IP Request Management Platform

A modern, responsive web application for managing intellectual property requests with distinct user and admin panels.

## 🚀 Features

### User Panel
- **Landing Page**: Professional homepage with service information
- **Authentication**: Secure signup and login system
- **Dashboard**: View and manage IP requests with urgency levels
- **Profile Management**: Edit personal information with inline editing
- **Request Submission**: Modal-based form for new IP requests

### Admin Panel
- **Admin Dashboard**: Overview with statistics and latest requests
- **Request Management**: View, filter, and manage all IP requests
- **User Management**: View and edit user registrations
- **Responsive Design**: Works seamlessly on all devices

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b5998 (Main brand color)
- **Secondary Blue**: #8b9dc3 (Accent color)
- **Light Grey**: #dfe3ee (Background elements)
- **Lighter Grey**: #f7f7f7 (Subtle backgrounds)
- **White**: #ffffff (Cards and text)

### Design Principles
- **Responsive**: Mobile-first design approach
- **Modern**: Clean UI with subtle shadows and rounded corners
- **Consistent**: Unified design language across all pages
- **Accessible**: High contrast and readable typography

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Database**: Supabase (via MCP server)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IP_Bazaar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
The application uses Supabase MCP server for database operations. Ensure you have:
- Users table for authentication
- IP requests table for storing requests
- Admin table for admin authentication

## 📱 Demo Credentials

### User Login
- Email: demo@ipbazaar.com
- Password: demo123

### Admin Login
- Username: admin
- Password: admin123

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   └── Sidebar.tsx     # Navigation sidebar
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── user/          # User-facing pages
│   │   ├── LandingPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── UserDashboard.tsx
│   │   └── UserProfile.tsx
│   └── admin/         # Admin panel pages
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminRequests.tsx
│       └── AdminRegistrations.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind imports
```

## 🔐 Authentication Flow

1. **User Registration**: Users can sign up with name, email, city, and password
2. **User Login**: Email/password authentication
3. **Admin Login**: Username/password authentication
4. **Session Management**: Local storage for session persistence
5. **Route Protection**: Automatic redirection for unauthorized access

## 📊 Database Schema

### Users Table
- id (UUID, Primary Key)
- name (Text)
- email (Text, Unique)
- city (Text)
- created_at (Timestamp)

### IP Requests Table
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- name (Text)
- ip_request (Text)
- city (Text)
- urgency (Enum: Low, Medium, High)
- created_at (Timestamp)

### Admins Table
- id (UUID, Primary Key)
- username (Text, Unique)
- created_at (Timestamp)

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Netlify
- Vercel
- AWS Amplify
- GitHub Pages

Build the application using `npm run build` and deploy the `dist` folder.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@ipbazaar.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

Built with ❤️ by the IPBazaar team



<!-- 
analyze the complete project and the images. now see the first image. this is the image of contact us page and now see the highlighted section of the contact us page the contact us input fields are not visible. they are just show the text inside the input field. the fields are  present but not visible properly so make it visible and make the page resposive. now see the second image. this is the about us page our journey section. now see the highlighted section of the second image. you see that dot at the middle of the card. in the mobile view the dot are show in the middle of the card and it is not looks good so remove just that dot not all that lines. now see the third image. now see the highlighted box content and get the content at center. now see the fourth image. and now see that highlighted section. you see the navbar are not visible properly when we scroll up the pages analyze the code and fix that error and also when we are scrolling the pages and we want to go on another page like about us , our services and contact us and we click on of them then the page are starts in the middle of the page. we want when we click on the other page like about us, our services and contact us then the page starts from the starting point not in the middle of the page. now analyze all the pages in the project and make them responsive and now see the admin dashboard and user dashboard. when user see the project in the any mobile view then get that sidebar option at the bottom of the project. and make the pages responsive for all the devices specially for mobile phones  -->