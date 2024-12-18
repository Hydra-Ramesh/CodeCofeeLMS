import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 text-white dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo & Tagline */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
              Code & Coffee
            </h1>
            <p className="text-gray-400 dark:text-gray-300 mt-2">
              Learn, Connect, and Build your future with us.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-12">
            {/* Social Links */}
            <div className="flex space-x-6 mb-4 md:mb-0 justify-center md:justify-start">
              <a
                href="https://linkedin.com/in/rameshiitg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/algorithm_lover/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition duration-300"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100081356012498"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition duration-300"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>

            {/* Contact Details */}
            <div className="text-gray-400 space-y-2 mt-4 md:mt-0">
              <p className="flex items-center space-x-2 justify-center md:justify-start">
                <FaEnvelope className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                <span>codeandcoffee24@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2 justify-center md:justify-start">
                <FaPhone className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                <span>+91-8509778299</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-gray-600 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-orange-500 dark:text-orange-400">
              Code & Coffee
            </span>. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Made with <span className="text-red-500">♥</span> by Ramesh Das.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
