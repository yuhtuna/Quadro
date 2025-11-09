import React, { JSX } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps): JSX.Element {
  const handleSignIn = (e?: React.FormEvent) => {
    e?.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSignIn} className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h1 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Sign In</h1>
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
          Email
          <input className="mt-1 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700" type="email" defaultValue="user@example.com" />
        </label>
        <label className="block mb-4 text-sm text-gray-700 dark:text-gray-300">
          Password
          <input className="mt-1 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700" type="password" defaultValue="password" />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}