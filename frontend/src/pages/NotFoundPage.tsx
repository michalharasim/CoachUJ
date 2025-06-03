import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() : React.ReactElement {
    return (
        <div className="p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-8">Strona nie została znaleziona.</p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300">
                Wróć na Stronę Główną
            </Link>
        </div>
    );
}

export default NotFoundPage;