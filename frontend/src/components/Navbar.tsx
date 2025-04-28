import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-morocco-spice font-serif text-2xl md:text-3xl font-bold">
            Moroccan Traditions
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-700 hover:text-morocco-spice transition-colors font-medium">
            Home
          </a>
          <a href="#menu" className="text-gray-700 hover:text-morocco-spice transition-colors font-medium">
            Menu
          </a>
          <a href="#about" className="text-gray-700 hover:text-morocco-spice transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-morocco-spice transition-colors font-medium">
            Contact
          </a>
          <Button className="bg-morocco-spice hover:bg-morocco-terracotta text-white">
            Reserve a Table
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-morocco-spice hover:text-morocco-terracotta"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className="text-gray-700 hover:text-morocco-spice transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#menu" 
              className="text-gray-700 hover:text-morocco-spice transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-morocco-spice transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-morocco-spice transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="bg-morocco-spice hover:bg-morocco-terracotta text-white">
              Reserve a Table
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
