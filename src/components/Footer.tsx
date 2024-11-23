import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-rose-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">MarriageAdvice.AI</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              Helping Marriages Thrive One Connection at a Time
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/start" className="text-gray-600 hover:text-rose-600">Start Here</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-rose-600">Why It Works</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-rose-600">Join the Community</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-rose-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-rose-600">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-rose-600">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MarriageAdvice.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;