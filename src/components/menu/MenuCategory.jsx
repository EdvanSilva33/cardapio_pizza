import React from 'react';

const MenuCategory = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeCategory === category.id
                  ? 'border-red-600 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-600 hover:text-red-600 hover:border-red-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategory;

