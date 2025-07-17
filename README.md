# Animal Welfare Donation Portal

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) using TypeScript. This portal allows users to view animals in need and make donations to support their medical treatment using Razorpay payment integration.

## 🚀 Features

- **Animal Listings**: Browse animals in need with detailed information
- **Donation System**: Secure payment processing with Razorpay
- **Real-time Updates**: Live donation progress tracking
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean design with shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **React** with React Router v7
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Zod** for validation
- **shadcn/ui** components

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Razorpay** for payment processing
- **Zod** for validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Razorpay account for payment integration

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run backend:install

# Install frontend dependencies  
npm run frontend:install

# Or install all at once
npm run install:all
```

### 2. Environment Setup

`.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/animal-welfare-donation
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

 `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_PATH=/api
VITE_APP_NAME=Animal Welfare Donation Portal
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id_here
VITE_ENABLE_DEBUG=true
```

### 3. Razorpay Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Update the `.env` file with your keys
4. Update the Razorpay key in `frontend/app/components/DonationModal.tsx` (line 56)

### 4. Database Setup

Start MongoDB and seed the database with sample animals:

```bash
# Make sure MongoDB is running, then:
cd backend
npm run seed
```

### 5. Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
npm run backend:dev  # Backend on http://localhost:5000
npm run frontend:dev # Frontend on http://localhost:3000
```

## 📁 Project Structure

```
animal-welfare-donation-portal/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── scripts/         # Database seeding scripts
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and API
│   │   ├── routes/         # React Router routes
│   │   ├── store/          # Zustand store
│   │   ├── types/          # TypeScript types
│   │   └── root.tsx        # App root
│   ├── package.json
│   └── tsconfig.json
└── package.json             # Root package.json
```

## 🔗 API Endpoints

### Animals
- `GET /api/animals` - Get all animals
- `GET /api/animals/:id` - Get animal by ID
- `POST /api/animals` - Create new animal (for seeding)

### Donations
- `POST /api/donations/create-order` - Create Razorpay order
- `POST /api/donations/verify-payment` - Verify payment
- `GET /api/donations/animal/:animalId` - Get donations for animal

## 🚀 Deployment

### Backend Deployment
1. Build the project: `npm run build`
2. Set environment variables
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Update API base URL in `frontend/app/lib/api.ts`
2. Build the project: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform

## 🧪 Testing

To test payments:
1. Use Razorpay test mode
2. Test card numbers: 4111111111111111
3. Use any future date for expiry
4. Use any 3-digit CVV

## 📸 Screenshots

- Home page with animal listings
- Animal detail page with donation form
- Payment flow with Razorpay
- Responsive design on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help setting up the project, please create an issue or contact the development team.

---

**Made with ❤️ for animal welfare** 