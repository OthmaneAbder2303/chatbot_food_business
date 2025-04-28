
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, Bed, Sandwich, ChefHat } from "lucide-react";

const menuItems = [
  {
    id: 1,
    name: "Harira",
    description: "Traditional Moroccan tomato and lentil soup.",
    price: "$8.99",
    category: "starters",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Zaalouk",
    description: "Cooked salad made with eggplant, tomatoes, garlic, and spices.",
    price: "$7.99",
    category: "starters",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Tajine de Poulet",
    description: "Chicken with preserved lemons and olives, slow-cooked in traditional clay pot.",
    price: "$19.99",
    category: "mains",
    image: "https://images.unsplash.com/photo-1611097642591-7baf8ed989b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Couscous Royal",
    description: "Steamed semolina served with lamb, chicken, and seasonal vegetables.",
    price: "$22.99",
    category: "mains",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Pastilla",
    description: "Savory-sweet pie made with chicken, almonds, and crispy pastry layers.",
    price: "$16.99",
    category: "mains",
    image: "https://images.unsplash.com/photo-1604147968587-384e2d8eae5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Khobz",
    description: "Traditional Moroccan round bread.",
    price: "$3.99",
    category: "sides",
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Thé à la Menthe",
    description: "Traditional sweet mint tea, Morocco's national drink.",
    price: "$4.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1576097449818-d83aeb4bdef9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Chebakia",
    description: "Honey-soaked sesame cookies shaped into flower patterns.",
    price: "$6.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1558301211-0d8067b2d7d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  }
];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = ["all", "starters", "mains", "sides", "desserts", "drinks"];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mains":
        return <Utensils className="w-5 h-5" />;
      case "drinks":
        return <Coffee className="w-5 h-5" />;
      case "sides":
        return <Sandwich className="w-5 h-5" />;
      case "desserts":
        return <ChefHat className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 px-6 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-morocco-spice mb-4">Notre Menu</h2>
          <div className="w-24 h-1 bg-morocco-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Découvrez les saveurs authentiques du Maroc à travers nos plats traditionnels préparés avec passion.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                activeCategory === category 
                  ? "bg-morocco-spice hover:bg-morocco-terracotta capitalize" 
                  : "text-gray-700 hover:text-morocco-spice capitalize"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryIcon(category)}
              {category}
            </Button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 bg-morocco-spice text-white px-3 py-1 rounded-full font-bold">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2 text-morocco-terracotta">{item.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                <button className="text-morocco-spice font-medium hover:text-morocco-terracotta transition-colors underline decoration-2 underline-offset-4">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
