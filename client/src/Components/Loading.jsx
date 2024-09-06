import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="w-20 h-20 border-t-2 border-red-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;