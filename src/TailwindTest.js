import React from 'react';

const TailwindTest = () => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Tailwind CSS Test</h1>
      <p className="mt-2">If you can see this styled properly, Tailwind is working!</p>
      <button className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors">
        Test Button
      </button>
    </div>
  );
};

export default TailwindTest;
