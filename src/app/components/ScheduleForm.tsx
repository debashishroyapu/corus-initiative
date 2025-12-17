'use client';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { createSchedule } from '../lib/api';

const meetingTypes = [
  { value: 'consultation', label: 'Initial Consultation' },
  { value: 'demo', label: 'Product Demo' },
  { value: 'technical', label: 'Technical Discussion' },
  { value: 'sales', label: 'Sales Meeting' },
  { value: 'other', label: 'Other' },
];

// ✅ Common time slots
const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

// ✅ All available timezones
const timezones = Intl.supportedValuesOf('timeZone');

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    meetingType: 'consultation',
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-hide success message
  useEffect(() => {
    if (message.includes('✅')) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name is too short';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (formData.phone && !/^[\d\s\-\(\)\+]{10,15}$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number';

    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';

    if (formData.message && formData.message.length > 500)
      newErrors.message = 'Message is too long (maximum 500 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      setMessage('❌ Please fill in all required information correctly');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createSchedule(formData);

      if (result.success) {
        setMessage('✅ Meeting scheduled successfully! We will confirm via email.');
        resetForm();
      } else {
        setMessage(`❌ ${result.message || 'Failed to schedule meeting'}`);
      }
    } catch (error: any) {
      console.error('Schedule submission error:', error);
      if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ Network error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name' && value.length > 50) return;
    if (name === 'company' && value.length > 100) return;
    if (name === 'message' && value.length > 500) return;
    if (name === 'phone' && value.length > 15) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      meetingType: 'consultation',
      preferredDate: '',
      preferredTime: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: ''
    });
    setErrors({});
  };

  // Date helpers
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* ✅ Centered Heading */}
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Schedule a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Meeting</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Meeting Type + Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type *</label>
            <select
              name="meetingType"
              required
              value={formData.meetingType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {meetingTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Selectable timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Timezone *</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
            <input
              type="date"
              name="preferredDate"
              required
              min={getMinDate()}
              max={getMaxDate()}
              value={formData.preferredDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                errors.preferredDate ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
            {formData.preferredDate && (
              <p className="text-xs text-gray-500 mt-1">{formatDate(formData.preferredDate)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
            <select
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                errors.preferredTime ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific topics you'd like to discuss..."
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
              errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Scheduling...
              </div>
            ) : (
              'Schedule Meeting'
            )}
          </Button>

          <Button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Reset
          </Button>
        </div>

        {/* Response Message */}
        {message && (
          <div
            className={`p-3 rounded-md text-center ${
              message.includes('✅')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
