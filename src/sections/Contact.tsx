import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { useInView } from "../hooks/useInView";
import { toast } from "react-hot-toast";

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Sending message... ✉️");

    try {
      console.log("Sending message...");
      await axios.post(
        "https://formspree.io/f/xnndjdqq", // Replace with your actual Formspree ID
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`, // subject + message merged
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setIsLoading(false);
      toast.success("Message sent successfully! 🎉", { id: loadingToast });
      console.log("Toast success triggered");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error); // Optional: See full error in dev console
      setIsLoading(false);
      toast.error("Failed to send message. Please try again! ❌", {
        id: loadingToast,
      });
      console.log("Toast error triggered");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl lg:text-4xl font-bold text-center mb-16 ${
            inView ? "animate-fade-in" : "opacity-0"
          }`}
        >
          Get In Touch
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className={`space-y-8 ${inView ? "animate-fade-in" : "opacity-0"}`}
          >
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Let's Connect
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <a
                      href="mailto:shahrajan774@gmail.com"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      shahrajan774@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <a
                      href="tel:+9779867488761"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      +977-9867488761
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="text-purple-600 font-medium">
                      Ramgram-3, Parasi, Nawalparasi
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-6 pt-4">
                  <a
                    href="https://github.com/rajanshah23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black transition-transform transform hover:scale-110"
                  >
                    <FaGithub className="w-7 h-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rajan-kumar-gupta-16696532b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110"
                  >
                    <FaLinkedin className="w-7 h-7" />
                  </a>
                  <a
                    href="https://x.com/Rajansh26003523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600 transition-transform transform hover:scale-110"
                  >
                    <FaTwitter className="w-7 h-7" />
                  </a>
                  <a
                    href="https://www.facebook.com/rajana.gupta.805984"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-transform transform hover:scale-110"
                  >
                    <FaFacebook className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className={`space-y-6 ${
              inView ? "animate-fade-in delay-100" : "opacity-0"
            }`}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
