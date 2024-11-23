import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/user-not-found':
        return {
          title: 'Invalid credentials',
          message: "The email or password you entered is incorrect. Please try again or create a new account.",
          action: 'Create Account',
          redirect: '/signup'
        };
      case 'auth/wrong-password':
        return {
          title: 'Incorrect password',
          message: 'The password you entered is incorrect. Please try again.'
        };
      case 'auth/too-many-requests':
        return {
          title: 'Too many attempts',
          message: 'Access temporarily disabled due to many failed login attempts. Please try again later or reset your password.'
        };
      case 'auth/network-request-failed':
        return {
          title: 'Connection error',
          message: 'Please check your internet connection and try again.'
        };
      default:
        return {
          title: 'Error',
          message: 'An unexpected error occurred. Please try again.'
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Sign in error:', err);
      const errorDetails = getErrorMessage(err.code);
      setError({
        code: err.code,
        message: err.message
      });
      
      if (errorDetails.redirect) {
        setTimeout(() => {
          navigate(errorDetails.redirect, { 
            state: { email } 
          });
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError({
        code: err.code,
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const errorDetails = error ? getErrorMessage(error.code) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <Heart className="w-8 h-8 text-rose-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">MarriageAdvice.AI</h2>
        </div>

        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errorDetails?.title}
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{errorDetails?.message}</p>
                    {errorDetails?.action && (
                      <p className="mt-2">
                        Redirecting you to create an account...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-1 text-sm text-gray-500">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-rose-600 hover:text-rose-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}