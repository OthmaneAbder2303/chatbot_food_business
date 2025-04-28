
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-morocco-spice text-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-serif font-bold mb-4">Moroccan Traditions</h3>
            <p className="mb-4 text-white/80 max-w-xs">
              Experience the authentic flavors of Morocco with our traditional cuisine and warm hospitality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-morocco-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-morocco-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-morocco-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="text-white/80 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Tagine</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Couscous</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Pastilla</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Moroccan Tea</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-white/80">
              <p>123 Marrakech Street</p>
              <p>Spice District, MA 12345</p>
              <p className="mt-2">(555) 123-4567</p>
              <p>info@moroccantraditional.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Moroccan Traditions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
