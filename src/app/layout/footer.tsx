import React from "react";
import { Home, User } from "lucide-react";

export const Footer = () => {
    return <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto /80 backdrop-blur-sm border-t border-gray-100 rounded-t-3xl" >
        <div className="flex justify-around items-center h-16">
            <a href="#" className="text-pink-500 flex flex-col items-center gap-1">
                <Home size={24} fill="currentColor" />
            </a>
            <button className="w-16 h-16 bg-pink-500 rounded-full text-white text-4xl font-light shadow-lg -mt-8 flex items-center justify-center">+</button>
            <a href="#" className="text-gray-400 flex flex-col items-center gap-1">
                <User size={24} />
            </a>
        </div>
    </footer >
}