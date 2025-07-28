# Aven Support Assistant

Customer support system for Aven. Has chat, voice, and meeting scheduling features.

## Features

### Chat System
- Text chat with smart responses
- Voice chat using Vapi AI
- Meeting scheduling detection

<img width="1097" height="821" alt="Screenshot 2025-07-27 at 5 14 58 PM" src="https://github.com/user-attachments/assets/04076f9c-55de-42ea-96cf-f67886f9597a" />

<img width="1097" height="821" alt="Screenshot 2025-07-27 at 5 15 08 PM" src="https://github.com/user-attachments/assets/1c544773-24cf-4c5e-b72e-ff06d976b3f2" />

<img width="1097" height="831" alt="image" src="https://github.com/user-attachments/assets/0656e73a-11e4-424f-b029-3a73e40ca92a" />


### Evaluation System
- Tests system with 100+ questions
- Shows accuracy and performance metrics
- Category breakdown (product, technical, billing, etc.)

  <img width="1097" height="746" alt="Screenshot 2025-07-27 at 5 15 24 PM" src="https://github.com/user-attachments/assets/77948190-b667-4548-94bc-43d82b382c38" />

### Meeting Scheduling
- Detects meeting requests automatically
- Shows available time slots
- Supports different meeting types (support, demo, consultation)

<img width="1097" height="831" alt="image" src="https://github.com/user-attachments/assets/bb24a229-1b9e-43a0-9130-2031d7621124" />


## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Lucide React icons

### Backend
- OpenAI API (GPT-3.5-turbo)
- Pinecone vector database
- Vapi AI for voice
- Axios for API calls

## Quick Start

## Setup

1. Clone the repo
   ```bash
   git clone <repo-url>
   cd aven-support
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Create `.env.local` file:
   ```env
   OPENAI_API_KEY=your_key_here
   PINECONE_API_KEY=your_key_here
   PINECONE_INDEX=your_index_name
   PINECONE_ENV=your_environment
   PINECONE_REGION=your_region
   VAPI_API_KEY=your_vapi_key
   VAPI_ASSISTANT_ID=your_assistant_id
   ```

4. Run dev server
   ```bash
   pnpm dev
   ```

## Usage

### Text Chat
- Go to "Text Chat" tab
- Type your question
- Get instant responses
- Try asking for meetings

### Voice Chat
- Click "Voice Chat" tab
- Press the button to start
- Speak naturally
- Get voice responses

### Evaluation System
- Go to "Evaluation" tab
- Click "Run Evaluation"
- View performance metrics
- Check detailed results

## Project Structure

```
aven-support/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── chat/          # Chat endpoints
│   │   ├── test/          # Evaluation system
│   │   └── meetings/      # Meeting scheduling
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── chat.tsx          # Text chat interface
│   ├── voice.tsx         # Voice chat interface
│   ├── dashboard.tsx     # Evaluation dashboard
│   └── ui/               # UI components
├── lib/                  # Core logic
│   ├── rag.ts           # RAG system
│   ├── db.ts            # Database operations
│   ├── scheduler.ts     # Meeting scheduling
│   ├── eval.ts          # Evaluation logic
│   └── types.ts         # TypeScript types
└── public/              # Static files

data-scraper/
├── embed_documents.py   # Document embedding
├── query_documents.py   # Query testing
├── data/               # Knowledge base
└── requirements.txt    # Python dependencies
```

## API Endpoints

### Chat
- `POST /api/chat/query` - Process chat messages

### Evaluation
- `POST /api/test` - Run evaluation tests

### Meetings
- `POST /api/meetings/schedule` - Schedule meetings
- `GET /api/meetings/slots` - Get available slots

## Configuration

### Environment Variables
- `OPENAI_API_KEY` - OpenAI API key for GPT responses
- `PINECONE_API_KEY` - Pinecone API key for vector database
- `PINECONE_INDEX` - Pinecone index name
- `PINECONE_ENV` - Pinecone environment
- `PINECONE_REGION` - Pinecone region
- `VAPI_API_KEY` - Vapi AI key for voice chat
- `VAPI_ASSISTANT_ID` - Vapi assistant ID

### Customization
- Modify `lib/eval.ts` to add more evaluation questions
- Update `data-scraper/data/aven/` with new knowledge base content
- Customize UI components in `components/` directory

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **Railway**: Use Railway's Node.js template
- **Docker**: Use the provided Dockerfile

## Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement changes following the existing patterns
3. Test thoroughly using the evaluation system
4. Submit pull request

### Code Style
- Use TypeScript for type safety
- Follow existing naming conventions
- Add TODO comments for future improvements
- Keep components small and focused

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the evaluation system
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the evaluation results for system performance

