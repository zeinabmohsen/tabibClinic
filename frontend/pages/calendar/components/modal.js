import React from "react";

const Modal = ({ isOpen, onClose, title, content }) => {
  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      ></div>
      {/* Modal container */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md ${isOpen ? 'block' : 'hidden'}`}
      >
        {/* Modal content */}
       
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
           <div>
            {content}
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
          >
            Close
          </button></div>
       
      </div>
    </>
  );
};

export default Modal;