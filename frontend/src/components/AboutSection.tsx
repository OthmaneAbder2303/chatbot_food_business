
import { ChefHat } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-morocco-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-morocco-spice mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-morocco-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the passion and tradition behind our authentic Moroccan cuisine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-morocco-spice rounded-full p-2 text-white">
                <ChefHat size={24} />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Authentic Recipes</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our recipes have been passed down through generations, preserving the authentic 
              flavors and cooking techniques that make Moroccan cuisine truly special. Each dish 
              tells a story of our rich culinary heritage.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="bg-morocco-spice rounded-full p-2 text-white">
                <ChefHat size={24} />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Fresh Ingredients</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We source the finest spices and freshest ingredients to create dishes that burst with 
              flavor. Our commitment to quality ensures an exceptional dining experience with every visit.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="bg-morocco-spice rounded-full p-2 text-white">
                <ChefHat size={24} />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Cultural Experience</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Dining with us is more than just a meal—it's a journey through Moroccan culture. 
              From our décor to our hospitality, we aim to transport you to the vibrant streets of Marrakech.
            </p>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Moroccan architecture" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-morocco-blue rounded-lg -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
