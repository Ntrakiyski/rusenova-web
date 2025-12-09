'use client';

import { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';

// Simple password protection for demo purposes
// In production, this should be handled by a proper authentication system
const VALID_PASSWORD = 'admin123';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    // Check if password is saved in localStorage and auto-login
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword === VALID_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection for demo purposes
    // In production, this should be handled by a proper authentication system
    if (password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      
      // Save password to localStorage if "Remember me" is checked
      if (rememberPassword) {
        localStorage.setItem('adminPassword', password);
      } else {
        localStorage.removeItem('adminPassword');
      }
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-gray-600">Enter password to access admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-700">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('adminPassword');
                  setError('Auto-login disabled. Password removed from browser storage.');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear saved password
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}