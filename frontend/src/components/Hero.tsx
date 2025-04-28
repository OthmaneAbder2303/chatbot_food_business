import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1548786811-dd6e453ccca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Experience Authentic <span className="text-morocco-gold">Moroccan Cuisine</span>
          </h1>
          <p className="text-xl text-white mb-8 md:pr-12">
            Indulge in traditional flavors, spices, and cooking techniques that have been passed down through generations. Our dishes capture the essence of Morocco's rich culinary heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-morocco-spice hover:bg-morocco-terracotta text-white"
            >
              View Our Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-morocco-spice"
            >
              Make a Reservation
            </Button>
          </div>
        </div>
      </div>
      
      {/* Moroccan Zellij pattern overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-morocco-spice opacity-90" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557433425-474d70557925?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
          clipPath: "polygon(0% 0%, 25% 100%, 50% 0%, 75% 100%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      ></div>
    </section>
  );
};

export default Hero;
