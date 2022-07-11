import React from 'react';


const Loading = ({ size, color }) => {
    const loadingSize = () => {
        if(size === 'sm') return 'w-6 h-6 border-4 border-t-4';
        else if(size === 'md') return 'w-12 h-12 border-[7px] border-t-[7px]';
        else if(size === 'lg') return 'w-16 h-16 border-[10px] border-t-[10px]';
    };

    const loadingColor = () => {
        if(color === 'primary') return 'border-gray-400 border-t-indigo-600';
        else if(color === 'secondary') return 'border-gray-300 border-t-slate-400';
    };

    return (
        <span className={`${loadingSize()} ${loadingColor()} animate-loading rounded-[100%] block`} />
    )
};

export default Loading;