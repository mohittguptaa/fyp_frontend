import React, { useState, useContext } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';

const Newsletter = () => {
  const baseUrl = "https://fyp-backend-425y.onrender.com";
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  
  const sendEmail = async () => {
    let dataSend = { email: user.email };
    console.log(dataSend);
    
    try {
      const res = await fetch(`${baseUrl}/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        toast.success('Email sent successfully!')
      } else {
        toast.error('Failed to send email.');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error('An error occurred while sending the email!')
    }
  };
  
  
  const sendEmailResume = async () => {
    let dataSend = { email: user.email
     };
    console.log(dataSend);
    console.log(user);
    
    
    try {
      const res = await fetch(`${baseUrl}/resume/resumeMail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        toast.success('Your email has been sent successfully')
      } else {
        toast.error('Failed to send your email!')
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pdfFile) {
      console.log("The PDF has been submitted.");
      setShowModal(false);
      setPdfFile(null);
      sendEmailResume();
    }
  };
  
  return (
    <div>
      <div>
        <h3 className="flex items-center gap-2 mb-2 text-lg font-bold">
          <FaEnvelopeOpenText /> Email me for jobs
        </h3>
        <p className="mb-4 text-base text-primary/75">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <div className="w-full space-y-4">
          <input
            onClick={sendEmail}
            type="submit"
            value="Subscribe"
            className="block w-full py-2 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />
          <ToastContainer />
        </div>
      </div>

      {/* Second section */}
      <div className="mt-20">
        <h3 className="flex items-center gap-2 mb-2 text-lg font-bold">
          <FaRocket /> Get noticed faster
        </h3>
        <p className="mb-4 text-base text-primary/75">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <div className="w-full space-y-4">
          <input
            onClick={handleButtonClick}
            type="submit"
            value="Upload your resume"
            className="block w-full py-2 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg">
      {/* Close button for the modal */}
      <button
        className="absolute text-gray-500 top-3 right-3 hover:text-gray-900 focus:outline-none"
        onClick={handleCloseModal}
      >
        &times;
      </button>

      {/* File submission form */}
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 form-group">
            <label htmlFor="pdf-upload" className="block mb-2 text-lg font-medium text-gray-700">
              Upload your PDF:
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-800 bg-blue"
          >
            Submit PDF
          </button>
        </form>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;




