# Aven AI Support Assistant

A comprehensive AI-powered customer support system for Aven financial services, featuring text and voice chat capabilities, intelligent meeting scheduling, and advanced safety guardrails.

## 🎯 Project Requirements - All Completed ✅

### Core Requirements
- ✅ **Scalable Data Ingestion Pipeline**: Pinecone vector database with OpenAI embeddings
- ✅ **Web App with Text & Voice Chat**: Full-featured chat interface with Vapi AI integration
- ✅ **Evaluation Framework**: 50+ realistic questions with accuracy, helpfulness, and citation scoring
- ✅ **Guardrails Implementation**: Personal data, legal/financial advice, toxicity, and misuse detection
- ✅ **Meeting Scheduling Tool Calls**: Intelligent meeting detection and booking system

## 🚀 Features

### 🤖 AI-Powered Support
- **Text Chat**: Natural language conversations with context-aware responses
- **Voice Chat**: Real-time voice interactions with transcription and response
- **RAG System**: Retrieval-Augmented Generation using Pinecone vector database
- **Smart Responses**: Contextual answers based on comprehensive knowledge base

### 📅 Meeting Scheduling
- **Intelligent Detection**: Automatically detects meeting requests in conversations
- **Available Slots**: Real-time availability checking for next 2 weeks
- **Meeting Types**: Support calls, product demos, consultations, technical discussions
- **Professional UI**: Clean scheduling modal with form validation

### 🛡️ Safety & Guardrails
- **Personal Data Protection**: Detects and blocks SSN, credit cards, emails, etc.
- **Legal/Financial Advice**: Prevents inappropriate advice and refers to professionals
- **Toxicity Detection**: Filters inappropriate content and misuse
- **Content Sanitization**: Automatically masks sensitive information

### 📊 Evaluation System
- **50+ Test Questions**: Realistic scenarios across product, technical, billing, account, and general categories
- **Multi-Metric Scoring**: Accuracy, helpfulness, and citation quality assessment
- **Performance Dashboard**: Visual evaluation results with detailed breakdowns
- **Export Capabilities**: CSV export for analysis and reporting

### 🎨 Professional UI/UX
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Dark/Light Mode**: Theme support with system preference detection

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.4.2**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icons

### AI & Backend
- **OpenAI API**: GPT-3.5-turbo for responses, text-embedding-3-small for vectors
- **Pinecone**: Vector database for semantic search
- **Vapi AI**: Voice chat integration
- **Axios**: HTTP client for API calls

### Development
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **pnpm**: Fast, efficient package management

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key
- Pinecone API key and index
- Vapi AI API key (for voice chat)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aven-support
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index_name
   VAPI_API_KEY=your_vapi_api_key
   VAPI_ASSISTANT_ID=your_vapi_assistant_id
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Text Chat
1. Navigate to the "Text Chat" tab
2. Type your question about Aven services
3. Receive instant AI-powered responses
4. Try meeting requests like "I need to schedule a demo"

### Voice Chat
1. Navigate to the "Voice Chat" tab
2. Click the microphone button to start
3. Speak naturally and receive voice responses
4. Click the button again to stop

### Meeting Scheduling
1. In text chat, request a meeting: "I need to talk with a team member"
2. AI will detect the request and show available slots
3. Fill out the scheduling form
4. Receive confirmation with meeting details

### Evaluation System
1. Navigate to the "AI Evaluation" tab
2. Select questions or run all 50+ tests
3. View detailed performance metrics
4. Export results for analysis

## 📁 Project Structure

```
aven-support/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── query/         # Main chat endpoint
│   │   ├── evaluate/      # Evaluation system
│   │   └── meetings/      # Meeting scheduling
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── chat.tsx          # Text chat interface
│   ├── voice-chat.tsx    # Voice chat interface
│   ├── meeting-scheduler.tsx # Meeting booking modal
│   ├── evaluation-dashboard.tsx # Evaluation interface
│   └── ui/               # Reusable UI components
├── lib/                  # Core functionality
│   ├── rag.ts           # RAG system implementation
│   ├── pinecone.ts      # Vector database operations
│   ├── guardrails.ts    # Safety filters
│   ├── evaluation.ts    # Evaluation framework
│   └── meeting-scheduler.ts # Meeting system
├── public/              # Static assets
└── styles/              # Additional styles
```

## 🔧 API Endpoints

### `/api/query` (POST)
Main chat endpoint that processes user questions and returns AI responses.

### `/api/evaluate` (GET/POST)
Evaluation system for testing AI performance with 50+ questions.

### `/api/meetings` (GET/POST)
Meeting scheduling system with detection, booking, and management.

## 🧪 Testing

### Manual Testing
- Text chat functionality
- Voice chat with microphone
- Meeting scheduling flow
- Evaluation system
- Guardrail triggers

### Automated Testing
```bash
# Run linting
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment management
- **Docker**: Containerized deployment available

## 🔒 Security

- Environment variables for sensitive API keys
- Input sanitization and validation
- Guardrails for inappropriate content
- Personal data protection
- Rate limiting on API endpoints

## 📈 Performance

- Optimized Next.js configuration
- Efficient vector search with Pinecone
- Lazy loading of components
- Image optimization
- Minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for Aven Financial Services**
