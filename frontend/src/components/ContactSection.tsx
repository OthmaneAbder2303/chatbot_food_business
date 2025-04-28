
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-morocco-spice mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-morocco-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions or want to make a reservation? Get in touch with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-morocco-sand/20 p-6 md:p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-morocco-terracotta">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-morocco-spice hover:bg-morocco-terracotta text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-morocco-terracotta">Our Information</h3>
            
            <div className="flex items-start gap-4">
              <div className="bg-morocco-spice/10 p-3 rounded-full text-morocco-spice">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg">Location</h4>
                <p className="text-gray-700">123 Marrakech Street<br />Spice District, MA 12345</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-morocco-spice/10 p-3 rounded-full text-morocco-spice">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg">Phone</h4>
                <p className="text-gray-700">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-morocco-spice/10 p-3 rounded-full text-morocco-spice">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg">Email</h4>
                <p className="text-gray-700">info@moroccantraditional.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-morocco-spice/10 p-3 rounded-full text-morocco-spice">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg">Hours</h4>
                <p className="text-gray-700">
                  Monday - Thursday: 11am - 10pm<br />
                  Friday - Sunday: 11am - 11pm
                </p>
              </div>
            </div>
            
            <div className="mt-8 rounded-xl overflow-hidden h-60 bg-gray-200">
              {/* Placeholder for map - in a real implementation, you'd embed a Google Map here */}
              <div className="w-full h-full flex items-center justify-center bg-morocco-sand/20">
                <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
