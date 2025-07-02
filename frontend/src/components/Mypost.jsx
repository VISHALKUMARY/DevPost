import React from 'react';

const Mypost = ({ title, content, author }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 mt-4">
      <h2 className="text-xl font-bold text-purple-700">{title}</h2>
      <p className="text-gray-700 mt-2 whitespace-pre-wrap">{content}</p>
      <p className="text-sm text-gray-500 mt-4 italic">By: {author}</p>
    </div>
  );
};

export default Mypost;
