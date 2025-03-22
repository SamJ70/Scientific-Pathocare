import React, { useState, useEffect } from 'react';
import { Microscope, Award, AlignCenterVertical as Certificate, Clock, MapPin, Phone, Mail, Calendar, AlertCircle, Menu, X, ChevronRight, Beaker, HeartPulse, Stethoscope } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
// import emailjs from '@emailjs/browser';

// Health Test Plans
const healthPlans = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    originalPrice: 1200,
    discountedPrice: 799,
    description: 'Comprehensive blood test including WBC, RBC, platelets, and hemoglobin levels',
    tag: 'Most Popular',
  },
  {
    id: 2,
    name: 'Diabetes Screening',
    originalPrice: 1500,
    discountedPrice: 999,
    description: 'Fasting blood sugar, HbA1c, and insulin levels',
    tag: 'Recommended',
  },
  {
    id: 3,
    name: 'Thyroid Profile',
    originalPrice: 2000,
    discountedPrice: 1299,
    description: 'Complete thyroid function test including T3, T4, and TSH',
  },
  {
    id: 4,
    name: 'Full Body Checkup',
    originalPrice: 4000,
    discountedPrice: 2499,
    description: 'Comprehensive health screening including blood, urine, and vital organ function tests',
    tag: 'Best Value',
  },
];

// Lab Benefits
const labBenefits = [
  {
    icon: <Beaker className="h-12 w-12 text-primary-600" />,
    title: 'State-of-the-Art Equipment',
    description: 'Latest technology and automated analyzers for accurate results',
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-primary-600" />,
    title: 'Expert Healthcare Team',
    description: 'Qualified pathologists and technicians with years of experience',
  },
  {
    icon: <Stethoscope className="h-12 w-12 text-primary-600" />,
    title: 'Quick Turnaround Time',
    description: 'Get your test results within 24-48 hours',
  },
];

// Lab Achievements
const achievements = [
  { title: 'NABL Accredited', description: 'National Accreditation Board for Testing and Calibration Laboratories' },
  { title: '50,000+ Tests', description: 'Successfully conducted over fifty thousand diagnostic tests' },
  { title: '99% Accuracy', description: 'Maintaining highest standards in diagnostic accuracy' },
  { title: '24/7 Service', description: 'Round-the-clock emergency testing services available' },
];

// Gallery Images
const galleryImages = [
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581093458791-4b41ce2c3f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

function App() {
  const [step, setStep] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    selectedPlan: null,
    appointmentDate: '',
    appointmentTime: '',
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleDateTimeSubmit = () => {
    const updatedFormData={ ...formData, selectedPlan};
    setFormData({ ...formData, selectedPlan });
    setShowModal(false);
    setStep(3);
    sendEmail(updatedFormData,setStep);
  };


const sendEmail = async (formData, setStep) => {
  try {
      const response = await fetch("https://scientific-pathocare-2.onrender.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
          toast.success("Appointment booked successfully!");
          setStep(4);
      } else {
          toast.error("Failed to book appointment. Please try again.");
      }
  } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to book appointment. Please try again.");
  }
};

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Microscope className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-800">Scientific Pathocare</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-primary-600">Home</button>
              <button onClick={() => scrollToSection('plans')} className="text-gray-600 hover:text-primary-600">Health Plans</button>
              <button onClick={() => scrollToSection('lab')} className="text-gray-600 hover:text-primary-600">Our Lab</button>
              <button onClick={() => scrollToSection('achievements')} className="text-gray-600 hover:text-primary-600">Achievements</button>
              <button
                onClick={() => setStep(2)}
                className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-primary-600">Home</button>
                <button onClick={() => scrollToSection('plans')} className="text-gray-600 hover:text-primary-600">Health Plans</button>
                <button onClick={() => scrollToSection('lab')} className="text-gray-600 hover:text-primary-600">Our Lab</button>
                <button onClick={() => scrollToSection('achievements')} className="text-gray-600 hover:text-primary-600">Achievements</button>
                <button
                  onClick={() => { setStep(2); setMobileMenuOpen(false); }}
                  className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={galleryImages[currentImage]}
            alt="Lab"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Your Health, Our Priority</h1>
            <p className="text-xl text-white mb-8">Advanced Diagnostic Services at Your Doorstep</p>
            <button
              onClick={() => setStep(2)}
              className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-colors text-lg"
            >
              Book My Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Latest Plans Section */}
      <div id="plans" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Health Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthPlans.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-primary-100"
              >
                {plan.tag && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full mb-4">
                    {plan.tag}
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-primary-600">₹{plan.discountedPrice}</span>
                  <span className="text-gray-500 line-through">₹{plan.originalPrice}</span>
                  <span className="text-green-500 text-sm">
                    {Math.round(((plan.originalPrice - plan.discountedPrice) / plan.originalPrice) * 100)}% off
                  </span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Our Lab Section */}
      <div id="lab" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Lab?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-primary-50 hover:shadow-lg transition-shadow">
                <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {step === 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Book Your Appointment</h2>
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                />
                <textarea
                  name="address"
                  placeholder="Complete Address"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded font-semibold hover:bg-primary-700"
                >
                  Continue to Select Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Plans Selection */}
      {step === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-2xl font-bold mb-6">Select Your Health Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border rounded-lg p-6 hover:shadow-lg cursor-pointer transition-shadow bg-white"
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.tag && (
                    <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full mb-4">
                      {plan.tag}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary-600">₹{plan.discountedPrice}</span>
                    <span className="text-gray-500 line-through">₹{plan.originalPrice}</span>
                    <span className="text-green-500 text-sm">
                      {Math.round(((plan.originalPrice - plan.discountedPrice) / plan.originalPrice) * 100)}% off
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Date & Time Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Select Appointment Time</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="appointmentTime"
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-700">Currently, we only accept Cash on Delivery</p>
                </div>
              </div>
              <button
                onClick={handleDateTimeSubmit}
                className="w-full bg-primary-600 text-white py-3 rounded font-semibold hover:bg-primary-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {step === 4 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6 text-primary-500">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Appointment Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for choosing Scientific Pathocare. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-primary-600 text-white px-6 py-2 rounded font-semibold hover:bg-primary-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
