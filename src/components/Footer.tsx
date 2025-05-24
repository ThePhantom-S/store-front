
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold">EliteShop</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for premium products and exceptional shopping experiences.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Returns
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Size Guide
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EliteShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
