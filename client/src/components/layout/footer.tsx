import { Link } from 'wouter';
import { 
  Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, 
  Clock, ChevronRight, Leaf, ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  // Restaurant location with Google Maps link
  const locations = [
    {
      name: "Kalpana Restaurant",
      address: "Municipal Council, Kalyan - Badlapur Rd, opposite ambernath",
      city: "Ambernath East, Vandrapada, Ambernath, Maharashtra 421501",
      phone: "+91 09922717417",
      mapsUrl: "https://maps.app.goo.gl/EENqvjw4ReTcGTqo8"
    }
  ];

  return (
    <footer className="bg-kalpana-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-kalpana-yellow" />
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400">Get updates on new menu items and exclusive offers.</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-gray-900 border border-gray-800 px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-kalpana-yellow"
              />
              <button className="bg-kalpana-yellow hover:bg-kalpana-yellow/90 text-kalpana-black font-bold px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center mb-4">
              <img src="/images/kalpana-server-logo.svg" alt="Kalpana Restaurant Logo" className="h-12 w-12 mr-3" />
              <h3 className="restaurant-name text-2xl">
                KALPANA <span className="text-white font-normal block text-sm">RESTAURANT</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Serving authentic vegetarian cuisine from South Indian, Punjabi and Chinese 
              traditions since 1995.
            </p>
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="h-5 w-5 text-kalpana-yellow" />
              <span className="text-gray-300 font-medium">100% Pure Vegetarian</span>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-white hover:bg-kalpana-yellow hover:text-kalpana-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-white hover:bg-kalpana-yellow hover:text-kalpana-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-white hover:bg-kalpana-yellow hover:text-kalpana-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-white hover:bg-kalpana-yellow hover:text-kalpana-black transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-4 text-kalpana-yellow">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/orders", label: "My Orders" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-kalpana-yellow transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-4 text-kalpana-yellow">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-3 text-kalpana-yellow" />
                <span className="text-white font-medium">We're Open</span>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tuesday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Wednesday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Thursday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Friday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
              <li className="border-b border-gray-800 pb-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">8:00 - 23:00</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-medium text-gray-300 mb-2">Contact Us</h5>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 mr-2 text-kalpana-yellow" />
                <a href="tel:+919922717417" className="text-gray-400 hover:text-kalpana-yellow">
                  +91 9922717417
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-kalpana-yellow" />
                <a href="mailto:info@kalpanarestaurant.com" className="text-gray-400 hover:text-kalpana-yellow">
                  info@kalpanarestaurant.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h4 className="font-bold text-lg mb-4 text-kalpana-yellow">Locations</h4>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
                  <h5 className="font-medium text-white mb-2">{location.name}</h5>
                  <div className="flex items-start mb-1">
                    <MapPin className="h-5 w-5 mr-2 mt-1 text-kalpana-yellow flex-shrink-0" />
                    <div>
                      <p className="text-gray-400">{location.address},</p>
                      <p className="text-gray-400">{location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 ml-7">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-400">{location.phone}</span>
                  </div>
                  <div className="ml-7">
                    <a 
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kalpana-yellow hover:text-white inline-flex items-center text-sm font-medium"
                    >
                      View on Google Maps
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} KALPANA RESTAURANT. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-kalpana-yellow transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 hover:text-kalpana-yellow transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
