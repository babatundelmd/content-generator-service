# Content Generator Service 🤖

A powerful AI-driven content generation API built with Google Genkit and Gemini AI. This backend service provides intelligent content creation across multiple formats with customizable tones and keyword integration.

![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=flat-square&logo=typescript)
![Genkit](https://img.shields.io/badge/Google_Genkit-1.12.0-orange?style=flat-square&logo=google)
![Gemini](https://img.shields.io/badge/Gemini_AI-1.5_Flash-purple?style=flat-square&logo=google)

## ✨ Features

- **AI-Powered Generation**: Leverages Google's Gemini 1.5 Flash model for high-quality content
- **Multiple Content Types**: Blog posts, social media updates, emails, and product descriptions
- **Tone Customization**: Formal, casual, humorous, and persuasive writing styles
- **Keyword Integration**: Seamlessly incorporates provided keywords into generated content
- **Schema Validation**: Robust input/output validation using Zod
- **RESTful API**: Clean, easy-to-integrate HTTP endpoints
- **Error Handling**: Comprehensive error management and logging
- **CORS Support**: Cross-origin requests enabled for frontend integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API Key (Gemini)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd content-generator-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_ai_api_key_here
   PORT=3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify installation**
   Open `http://localhost:3000` in your browser

## 🔧 API Reference

### Base URL
```
http://localhost:3000
```

### Health Check
```http
GET /
```

**Response:**
```json
"AI Content Generator Backend is running!"
```

### Generate Content
```http
POST /api/generate-content
```

**Request Body:**
```json
{
  "topic": "sustainable fashion",
  "contentType": "blog_post",
  "tone": "casual",
  "keywords": "eco-friendly, sustainable, fashion"
}
```

**Response:**
```json
{
  "generatedContent": "Your AI-generated content here...",
  "promptUsed": "The exact prompt sent to the AI model"
}
```

## 📋 Content Types

| Type | Description | Output Length |
|------|-------------|---------------|
| `blog_post` | Structured blog content with intro, body, conclusion | 500-800 words |
| `social_media_update` | Concise, engaging social content with hashtags | Max 280 characters |
| `email_draft` | Professional email with subject, greeting, body, closing | Variable |
| `product_description` | Compelling product copy with features and benefits | Variable |

## 🎨 Tone Options

| Tone | Description | Best For |
|------|-------------|----------|
| `formal` | Professional, structured, business-appropriate | Corporate communications, official content |
| `casual` | Relaxed, conversational, approachable | Blogs, social media, informal emails |
| `humorous` | Light-hearted, entertaining, engaging | Social media, creative content |
| `persuasive` | Compelling, convincing, action-oriented | Marketing, sales, calls-to-action |

## 🔍 Request Schema

### Input Validation
```typescript
{
  topic: string (min 3 characters),
  contentType: "blog_post" | "social_media_update" | "email_draft" | "product_description",
  tone?: "formal" | "casual" | "humorous" | "persuasive" (default: "casual"),
  keywords?: string (comma-separated)
}
```

### Response Schema
```typescript
{
  generatedContent: string,
  promptUsed: string
}
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run test suite (to be implemented) |

## 🏗️ Project Structure

```
src/
├── index.ts          # Express server setup and routes
├── flows.ts          # Genkit flow definitions
└── types/            # TypeScript type definitions
.env                  # Environment variables
package.json          # Dependencies and scripts
tsconfig.json         # TypeScript configuration
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google AI API key for Gemini access | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |

### AI Model Configuration

The backend uses Gemini 1.5 Flash with optimized settings:
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Model**: `gemini-1.5-flash` (fast, efficient generation)

## 📡 Integration Examples

### cURL
```bash
curl -X POST http://localhost:3000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "productivity tips",
    "contentType": "blog_post",
    "tone": "casual",
    "keywords": "time management, efficiency"
  }'
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/generate-content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    topic: 'productivity tips',
    contentType: 'blog_post',
    tone: 'casual',
    keywords: 'time management, efficiency'
  })
});

const result = await response.json();
console.log(result.generatedContent);
```

### Angular Service
```typescript
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  generateContent(payload: ContentPayload): Observable<ContentResponse> {
    return this.http.post<ContentResponse>(`${this.apiUrl}/generate-content`, payload);
  }
}
```

## 🔐 Error Handling

The API returns structured error responses:

```json
{
  "error": "Failed to generate content",
  "details": "Specific error message here"
}
```

### Common Error Codes

| Status | Description |
|--------|-------------|
| `400` | Invalid request body or validation failure |
| `500` | Internal server error or AI generation failure |
| `401` | Invalid or missing API key |

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup for Production
```bash
# Set production environment variables
export GEMINI_API_KEY=your_production_api_key
export PORT=8080
export NODE_ENV=production
```

## 📊 Performance

- **Response Time**: Typically 1-3 seconds for content generation
- **Rate Limits**: Depends on Google AI API quotas
- **Concurrent Requests**: Handles multiple simultaneous requests
- **Memory Usage**: Optimized for minimal resource consumption

## 🔧 Development

### Adding New Content Types

1. Update the `contentType` enum in the schema:
```typescript
contentType: z.enum([
  "blog_post",
  "social_media_update", 
  "email_draft",
  "product_description",
  "your_new_type"  // Add here
])
```

2. Add corresponding prompt logic in the switch statement
3. Update documentation and types

### Adding New Tones

1. Extend the `tone` enum:
```typescript
tone: z.enum([
  "formal", 
  "casual", 
  "humorous", 
  "persuasive",
  "your_new_tone"  // Add here
])
```

2. Test with various content types to ensure quality

## 🔍 Monitoring & Logging

- **Console Logging**: All prompts and errors are logged
- **Request Tracking**: Monitor API usage and performance
- **Error Reporting**: Structured error responses for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 🙏 Acknowledgments

- **Google Genkit** - For the powerful AI framework
- **Gemini AI** - For advanced language model capabilities
- **Zod** - For robust schema validation
- **Express.js** - For reliable server framework

## 📞 Support

For issues and questions:
- Check the console logs for detailed error messages
- Verify your Google AI API key is valid
- Ensure all required environment variables are set

---

**Powered by Google Genkit & Gemini AI 🚀**