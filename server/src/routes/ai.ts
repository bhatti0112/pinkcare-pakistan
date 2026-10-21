import { Router, Request, Response } from 'express';
import { processRagQuery } from '../services/ragService';
import { rateLimiter } from '../middleware/security';

export const aiRouter = Router();

// POST /api/v1/ask-pinkcare (Rate-limited to 30 requests per minute)
aiRouter.post('/', rateLimiter(30, 60 * 1000), async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length < 2) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'A valid question string is required.',
    });
  }

  // Prevent giant payloads / prompt injection buffer overflow
  if (question.length > 1000) {
    return res.status(400).json({
      error: 'PayloadTooLarge',
      message: 'Question exceeds maximum allowed length of 1000 characters.',
    });
  }

  try {
    const result = await processRagQuery(question);
    res.json(result);
  } catch (error: any) {
    console.error('Ask PinkCare RAG error:', error);
    res.status(500).json({
      error: 'InternalServiceError',
      message: 'Unable to process educational question at this moment. Please try again.',
    });
  }
});
