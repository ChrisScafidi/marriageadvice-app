import React, { useState } from 'react';
import { generateAIResponse } from '../services/ai';

export default function AITest() {
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAI = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await generateAIResponse([{
        id: '1',
        content: 'Hello, can you confirm that you are working?',
        sender: 'user',
        timestamp: new Date()
      }]);
      
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get AI response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4">AI Integration Test</h2>
      
      <button
        onClick={testAI}
        disabled={loading}
        className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test AI Connection'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
          <p className="font-semibold">AI Response:</p>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}