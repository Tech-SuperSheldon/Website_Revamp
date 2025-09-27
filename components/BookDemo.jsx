// components/BookDemo.jsx
import { useState } from 'react';
import axios from 'axios';
import GlossyButton from './GlossyButton';
import axiosClient from './utils/axios';

export default function BookDemo() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    grade: '',
    subject: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    } else if (formData.fullName.length > 20) {
      newErrors.fullName = 'Full name must be less than 20 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    
    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade is required';
    } else if (formData.grade.length > 8) {
      newErrors.grade = 'Grade must be less than 8 characters';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.length > 15) {
      newErrors.subject = 'Subject must be less than 15 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare data exactly matching backend schema
      const requestData = {
        fullName: formData.fullName,
        email: formData.email.toLowerCase().trim(), // Trim and lowercase as per schema
        mobile: Number(formData.mobile.replace(/\D/g, '')), // Convert to number and remove non-digits
        grade: formData.grade,
        subject: formData.subject
      };
      
      console.log('Sending data to backend:', requestData);
      
      const response = await axiosClient.post('/user/bookDemo', requestData);
      
      console.log(response.data) ;

      if (response.status === 200 || response.status === 201) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 400) {
          // Show the specific error message from backend
          setSubmitError(error.response.data || 'Please check all fields are filled correctly.');
        } else {
          setSubmitError(error.response.data?.message || `Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        setSubmitError('Network error. Please check if your backend server is running.');
      } else {
        setSubmitError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
          <p className="text-gray-600 mb-2">Your demo session has been successfully booked.</p>
          <p className="text-gray-600 mb-6">We'll contact you shortly to confirm the details.</p>
          <GlossyButton 
            onClick={() => {
              setIsRegistered(false);
              setFormData({
                fullName: '',
                email: '',
                mobile: '',
                grade: '',
                subject: ''
              });
            }}
            className="w-full bg-[#e66e37] hover:bg-[#e68355] text-white font-medium py-3 px-4 rounded-lg transition duration-300"
          >
            Book Another Demo
          </GlossyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white/95 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-white/20 p-6 md:p-8 ">
          <header className=" mb-2">
            <img src='/Group 19.png'></img>
         </header>

          <div className="h-px bg-gray-200 my-6"></div>

          <main className="mt-6 ">
            <h2 className="text-xl font-semibold text-[#e66e37] mb-4">Book a Demo Session</h2>
            <div className="bg-orange-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-800">Student Demo Booking</h3>
              <p className="font-semibold text-gray-700 mt-1">Ace your next class with a free demo</p>
              <p className="text-gray-600 mt-2">Pick your subject and grade. We'll match you with the right tutor.</p>
              <div className="flex items-center mt-3 text-red-500 font-medium">
                <span className="mr-2">📌</span>
                Limited slots today
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Awaiting submission</span>
                <span className="text-red-500 text-sm">All fields are required</span>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <strong>Error: </strong>
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name (3-20 characters)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g., 918081824766 (without + or spaces)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className="mt-1 text-xs text-gray-500">Enter numbers only (no + sign or spaces)</p>
                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  Grade *
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="e.g., 10th Grade (max 8 characters)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.grade ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics (3-15 characters)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <GlossyButton
                  type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#e66e37] hover:bg-[#e68355] text-white font-medium py-3 px-4 rounded-lg transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Booking'}
                </GlossyButton> 
              
              
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting, you agree to be contacted about your demo.
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}