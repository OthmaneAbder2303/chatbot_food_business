
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    quote: "The tagine was absolutely divine! It transported me back to my travels in Morocco. The authentic flavors and warm atmosphere make this place a hidden gem.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Othmane Abderrazik",
    quote: "The couscous here is the best I've ever had outside of Morocco. The spices are perfectly balanced, and the service is exceptional. Can't wait to come back!",
    image: "/pdp.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Halima Badr",
    quote: "As someone who grew up eating Moroccan food, I can attest to the authenticity of this restaurant. The mint tea ceremony alone is worth the visit!",
    image: "hb.jpg",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 bg-morocco-blue text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
          <div className="w-24 h-1 bg-morocco-gold mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 z-10"
              onClick={prevTestimonial}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 z-10"
              onClick={nextTestimonial}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-6 md:px-12"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-2 border-morocco-gold">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={`${i < testimonial.rating ? 'fill-morocco-gold text-morocco-gold' : 'text-white/30'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl italic mb-6">{testimonial.quote}</p>
                    <p className="font-serif font-semibold text-xl">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-morocco-gold" : "bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
