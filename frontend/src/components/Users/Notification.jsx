import React from "react";

const Notification = () => {
    return (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-72">
        <div className="flex flex-col space-y-2">
          <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
            <div className='flex justify-between mb-1'>
              <h4 className="text-sm font-semibold">Prof Raj Sharma</h4>
              <p className="text-xs text-gray-500">4:00pm</p>
            </div>
            <p className='text-gray-600 text-xs mb-1'>reply to your comment</p>
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
            <div className='flex justify-between mb-1'>
              <h4 className="text-sm font-semibold">Prof Raj Sharma</h4>
              <p className="text-xs text-gray-500">4:00pm</p>
            </div>
            <p className='text-gray-600 text-xs mb-1'>reply to your comment</p>
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
          </div>
        </div>
      </div>
    );
}

export default Notification;