import { ChatMessage } from '../types/chat';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;
const MODEL = 'gpt-4';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface OpenAIError {
  error: {
    message: string;
    type: string;
    param?: string;
    code?: string;
  };
}

export async function generateAIResponse(messages: ChatMessage[], basePrompt?: string): Promise<string> {
  if (!API_URL || !API_KEY) {
    throw new Error('AI API configuration is missing. Please check your environment variables.');
  }

  try {
    // Format conversation history for context
    const conversationHistory = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system message with base prompt
    const systemMessage = {
      role: 'system',
      content: basePrompt || `You are MarriageAdvice.AI, a relationship counseling assistant. Provide empathetic, professional advice while maintaining context awareness. Focus on practical solutions and positive relationship dynamics.`
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...conversationHistory],
        temperature: 0.7,
        max_tokens: 500,
        presence_penalty: 0.6,
        frequency_penalty: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.json() as OpenAIError;
      console.error('AI API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to get AI response');
    }

    const data = await response.json() as OpenAIResponse;
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    if (error instanceof Error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while getting AI response');
  }
}