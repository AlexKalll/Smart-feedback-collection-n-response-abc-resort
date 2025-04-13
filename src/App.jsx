import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-gray-800">ABC Resort</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link to="/feedback" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Feedback
                  </Link>
                  <Link to="/booking" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to ABC Resort</h1>
      <p className="mt-4 text-lg text-gray-600">Experience luxury in the heart of Ethiopia</p>
      <div className="mt-8">
        <Link to="/booking" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Book Your Stay
        </Link>
      </div>
    </div>
  );
}

function Feedback() {
  const [selectedService, setSelectedService] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questions, setQuestions] = useState([]);
  
  const services = [
    'Accommodation',
    'Restaurant',
    'Spa & Wellness',
    'Activities & Tours',
    'Conference Facilities'
  ];

  const serviceQuestions = {
    'Accommodation': [
      'How would you rate the cleanliness of your room?',
      'Was the check-in process smooth and efficient?',
      'How comfortable was your bed and bedding?'
    ],
    'Restaurant': [
      'How would you rate the food quality?',
      'How was the service from our staff?',
      'Was the menu variety satisfactory?'
    ],
    'Spa & Wellness': [
      'How would you rate your treatment experience?',
      'Was the spa facility clean and well-maintained?',
      'How professional was your therapist?'
    ],
    'Activities & Tours': [
      'How would you rate the tour guide\'s knowledge?',
      'Were the activities well-organized?',
      'Did the experience meet your expectations?'
    ],
    'Conference Facilities': [
      'How would you rate the meeting room setup?',
      'Was the technical equipment functioning properly?',
      'How was the catering service during your event?'
    ]
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setQuestions(serviceQuestions[service] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = questions.map((question, index) => ({
        question,
        answer: document.querySelector(`textarea[data-index="${index}"]`).value
      }));

      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          responses
        })
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setSelectedService('');
        setFeedback('');
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Feedback</h2>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Choose a service</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{question}</label>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="3"
                placeholder="Your feedback"
                data-index={index}
              onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          ))}

          {selectedService && (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Booking() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const availabilityResponse = await fetch('http://localhost:5000/api/booking/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const availabilityData = await availabilityResponse.json();

      if (availabilityData.available) {
        const bookingResponse = await fetch('http://localhost:5000/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (bookingResponse.ok) {
          alert('Booking confirmed successfully!');
          setFormData({
            checkIn: '',
            checkOut: '',
            guests: 1,
            roomType: 'standard'
          });
        } else {
          throw new Error('Failed to create booking');
        }
      } else {
        alert('Sorry, the selected room is not available for these dates.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process booking. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Book Your Stay</h2>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="suite">Suite</option>
              <option value="villa">Villa</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Check Availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
