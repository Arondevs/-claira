# Claira - AI Women's Health Companion

A premium, production-ready AI-powered women's health and period coaching platform built with Next.js 15, TypeScript, and modern web technologies. Claira helps women track their cycles, get personalized insights, and receive expert, compassionate support for every stage of their menstrual journey.

## 🚀 Features

### Core Features
- **AI-Powered Cycle Tracking**: Intelligent, adaptive period and symptom tracking
- **Personalized Insights**: Real-time, expert-backed health guidance
- **Conversational Support**: 24/7 chat with Claira, your AI health companion
- **Mood & Symptom Analysis**: Emotional and physical health tracking
- **Privacy-First**: Bank-level encryption and privacy protection

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation
- **Lucide React**: Icon library
- **Recharts**: Data visualization
- **React Hot Toast**: Notifications

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma**: Database ORM
- **PostgreSQL**: Primary database
- **NextAuth.js**: Authentication system
- **Redis**: Caching and job queues
- **Bull**: Job queue management

### Infrastructure
- **Vercel**: Deployment and hosting
- **Stripe**: Payment processing
- **UploadThing**: File upload service
- **Sentry**: Error monitoring
- **Vercel Analytics**: Performance tracking

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Unit testing
- **Playwright**: E2E testing
- **Husky**: Git hooks
- **TypeScript**: Static type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis (for job queues)
- Stripe account
- Social media API credentials

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/claira.git
   cd claira
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/claira"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   
   # Social Media APIs
   INSTAGRAM_APP_ID="your-instagram-app-id"
   TWITTER_CLIENT_ID="your-twitter-client-id"
   # ... add other platform credentials
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with test data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Test Account
After seeding the database, you can log in with:
- **Email**: test@claira.com
- **Password**: password123

## 🗂️ Database Schema

The application uses a comprehensive database schema with the following main models:

- **User**: User accounts and authentication
- **SocialAccount**: Connected social media accounts
- **Post**: Scheduled and published content
- **Analytics**: Engagement metrics and performance data
- **Subscription**: Billing and subscription management
- **Team**: Team collaboration features
- **ApiUsage**: API rate limiting and usage tracking

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on git push

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/reset-password` - Password reset

### Posts Endpoints
- `GET /api/posts` - List user posts
- `POST /api/posts/create` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post
- `POST /api/posts/schedule` - Schedule post

### Social Accounts Endpoints
- `GET /api/social/accounts` - List connected accounts
- `POST /api/social/connect` - Connect new account
- `DELETE /api/social/connect` - Disconnect account

### Analytics Endpoints
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/posts/[id]` - Post-specific analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.claira.health](https://docs.claira.health)
- **Issues**: [GitHub Issues](https://github.com/yourusername/claira/issues)
- **Discord**: [Join our community](https://discord.gg/claira)

## 🗺️ Roadmap

### Phase 1 (MVP) ✅
- [x] User authentication
- [x] Basic period tracking
- [x] AI-powered insights
- [x] Chat support

### Phase 2 (Growth) 🚧
- [ ] Advanced analytics
- [ ] Personalized recommendations
- [ ] Bulk data import
- [ ] Health templates

### Phase 3 (Scale) 📋
- [ ] White-label solutions
- [ ] Advanced team features
- [ ] API marketplace
- [ ] Mobile applications

---

Built with ❤️ by the Claira team 