import React from 'react';

const FooterComponent = ({ children }) => {
    return (
        <div className=" h-14 w-full shadow-xl shadow-black py-2 px-6 rounded-t-md fixed bottom-0 left-0 bg-white ">
            {children}
        </div>
    );
};

export default FooterComponent;
