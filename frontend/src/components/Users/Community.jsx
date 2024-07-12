// DiscussionEntry.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import image01 from "../../assets/Discussion_Ellipse2.png"
import { useMediaQuery } from 'react-responsive';

const DiscussionEntry = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const isTablet = useMediaQuery({maxWidth : 544})
    const isMobile = useMediaQuery({maxWidth : 426})

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const closeProfile = () => {
        setShowProfile(false);
    }
    const entries = [
        {
            id: 1,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 2,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 3,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 4,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
    ];

    return (
        <div className={`${isMobile ? "p-3" : "p-6"}`}>
            <div className={`flex justify-between mt-4 mb-4 ${isMobile ? "flex-col space-y-3" : ""}`}>
                <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"}`}>
                    <button className="text-gray-600 ml-1">Recent</button>
                    <button className="text-gray-600">Popular</button>
                    <button className="text-gray-600 mr-1">Last Reply</button>
                </div>

                <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm" : "p-3"}`}>
                    <button className="text-gray-600">By Category:</button>
                    <select className="text-sm focus:outline-none">
                        <option>General</option>
                        <option>Security</option>
                        <option>Privacy</option>
                    </select>
                </div>
            </div>
            {entries.map(entry => (
                <div key={entry.id} className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${isMobile ? "text-sm" : ""}`}>
                    <img src={image01} alt={entry.name} className={` rounded-full mr-4 ${isMobile ? "w-6 h-6" : "w-12 h-12"}`} />
                    <div className="flex-1">
                        <h2 className={` font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>{entry.name}</h2>
                        <p className={`${isMobile ? "text-xs" : ""}`}>{entry.content}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={` text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>{entry.date}</span>
                        <button className={` mt-2 ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscussionEntry;
