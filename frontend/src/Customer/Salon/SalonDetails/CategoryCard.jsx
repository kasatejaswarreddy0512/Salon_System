import React from 'react';

const CategoryCard = ({ handleCategoryClick, selectedCategory, item }) => {
    return (
        <div
            onClick={handleCategoryClick}
            className={`px-3  py-2 cursor-pointer flex gap-2 items-center rounded-md ${
                selectedCategory === item ? "bg-green-500 text-white rounded-md" : ""
            }`}
        >
            <img
                className='w-14 h-14 object-cover rounded-full'
                src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg"
                alt=""
            />
            <h1 className='font-semibold'>Hair Cut</h1>
        </div>
    );
};

export default CategoryCard;