import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="mt-20 py-6 border-t border-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <img src={assets.logo} alt="Logo" className="w-36" />

        {/* Copyright */}
        <p className="flex-1 md:border-l border-gray-400 md:pl-6 text-sm text-gray-500 text-center md:text-left">
          Copyright © Shivam Kumar | All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-9 h-9 cursor-pointer"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-9 h-9 cursor-pointer"
          />
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-9 h-9 cursor-pointer"
          />
        </div>

      </div>
    </footer>
  )
}

export default Footer