'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Newspaper, 
  Scale, 
  UserCircle, 
  Handshake, 
  Bug, 
  Lightbulb,
  Trash2,
  Shield,
  Clock,
  ChevronRight,
  ArrowLeft,
  Loader2
} from 'lucide-react';

// Inquiry type definitions
const INQUIRY_TYPES = [
  {
    id: 'general',
    label: 'General Inquiry',
    description: 'Questions about our platform or services',
    icon: MessageSquare,
    color: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
  },
  {
    id: 'press',
    label: 'Press & Media',
    description: 'Media inquiries, interviews, or data requests',
    icon: Newspaper,
    color: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
  },
  {
    id: 'legal',
    label: 'Legal',
    description: 'Legal notices, subpoenas, or formal requests',
    icon: Scale,
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    priority: 'urgent',
  },
  {
    id: 'adjuster',
    label: 'I\'m an Adjuster',
    description: 'Profile questions, claims, or corrections',
    icon: UserCircle,
    color: 'bg-green-500',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
  },
  {
    id: 'partnership',
    label: 'Partnerships',
    description: 'Business development or integration inquiries',
    icon: Handshake,
    color: 'bg-indigo-500',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
  },
  {
    id: 'removal',
    label: 'Removal Request',
    description: 'Request to remove or modify content',
    icon: Trash2,
    color: 'bg-red-500',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
  },
  {
    id: 'bug',
    label: 'Report a Bug',
    description: 'Technical issues or website errors',
    icon: Bug,
    color: 'bg-orange-500',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    description: 'Suggestions, ideas, or general feedback',
    icon: Lightbulb,
    color: 'bg-cyan-500',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
  },
];

// Legal capacity options for legal inquiries
const LEGAL_CAPACITIES = [
  { value: 'attorney', label: 'Attorney' },
  { value: 'adjuster', label: 'Licensed Adjuster' },
  { value: 'insurance_company', label: 'Insurance Company Representative' },
  { value: 'individual', label: 'Individual / Self-Represented' },
  { value: 'government', label: 'Government Agency' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  // Form state
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [adjusterName, setAdjusterName] = useState('');
  const [adjusterProfileUrl, setAdjusterProfileUrl] = useState('');
  const [companyRepresented, setCompanyRepresented] = useState('');
  const [legalCapacity, setLegalCapacity] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam trap
  
  const formRef = useRef<HTMLFormElement>(null);
  
  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);
  
  // Get selected type config
  const typeConfig = INQUIRY_TYPES.find(t => t.id === selectedType);
  
  // Handle type selection
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setStep('form');
    setError(null);
  };
  
  // Handle back button
  const handleBack = () => {
    setStep('select');
    setError(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Validate required fields
    if (!email || !message) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    
    // Message length validation
    if (message.length < 10) {
      setError('Please provide more detail in your message (at least 10 characters).');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry_type: selectedType,
          name,
          email,
          phone,
          subject,
          message,
          adjuster_name: adjusterName,
          adjuster_profile_url: adjusterProfileUrl,
          company_represented: companyRepresented,
          legal_capacity: legalCapacity,
          page_source: 'contact_page',
          honeypot,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }
      
      setSubmissionId(data.id);
      setStep('success');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render step 1: Type selection
  const renderTypeSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the type of inquiry that best matches your needs. We'll route your message to the right team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INQUIRY_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className={`flex items-start gap-4 p-6 rounded-xl border-2 transition-all duration-200 text-left group hover:shadow-lg ${type.borderColor} ${type.bgLight} hover:border-current hover:${type.textColor}`}
            >
              <div className={`p-3 rounded-lg ${type.color} text-white shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold text-gray-900 group-hover:${type.textColor}`}>
                    {type.label}
                  </h3>
                  {type.priority === 'urgent' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                      Priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-current shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
            </button>
          );
        })}
      </div>
      
      {/* Quick links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600 mb-4">
          Looking for something specific?
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/for-adjusters" className="text-[#0F4C81] hover:underline">
            Information for Adjusters →
          </Link>
          <Link href="/review-guidelines" className="text-[#0F4C81] hover:underline">
            Review Guidelines →
          </Link>
          <Link href="/privacy" className="text-[#0F4C81] hover:underline">
            Privacy Policy →
          </Link>
          <Link href="/terms" className="text-[#0F4C81] hover:underline">
            Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
  
  // Render step 2: Form
  const renderForm = () => {
    if (!typeConfig) return null;
    const Icon = typeConfig.icon;
    const isLegal = selectedType === 'legal';
    const isAdjuster = selectedType === 'adjuster';
    const isRemoval = selectedType === 'removal';
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to inquiry types</span>
        </button>
        
        {/* Header */}
        <div className={`rounded-xl p-6 mb-8 ${typeConfig.bgLight} border ${typeConfig.borderColor}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${typeConfig.color} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{typeConfig.label}</h1>
              <p className="text-gray-600">{typeConfig.description}</p>
            </div>
          </div>
        </div>
        
        {/* Legal notice for legal/removal inquiries */}
        {(isLegal || isRemoval) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important Notice</p>
                <p>
                  Please review our <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
                  <Link href="/for-adjusters" className="underline">For Adjusters</Link> page before submitting.
                  RateMyAdjusters operates as a neutral platform protected under Section 230 of the Communications Decency Act.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
        
        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot - hidden from humans, visible to bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] opacity-0"
            tabIndex={-1}
            autoComplete="off"
          />
          
          {/* Name & Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
              />
            </div>
          </div>
          
          {/* Phone (optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-5555"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
            />
          </div>
          
          {/* Legal-specific fields */}
          {isLegal && (
            <>
              <div>
                <label htmlFor="legalCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                  You Are Contacting As <span className="text-red-500">*</span>
                </label>
                <select
                  id="legalCapacity"
                  value={legalCapacity}
                  onChange={(e) => setLegalCapacity(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow bg-white"
                >
                  <option value="">Select your capacity...</option>
                  {LEGAL_CAPACITIES.map((cap) => (
                    <option key={cap.value} value={cap.value}>{cap.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="companyRepresented" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Entity Represented <span className="text-gray-400">(if applicable)</span>
                </label>
                <input
                  type="text"
                  id="companyRepresented"
                  value={companyRepresented}
                  onChange={(e) => setCompanyRepresented(e.target.value)}
                  placeholder="Company name or N/A"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
                />
              </div>
            </>
          )}
          
          {/* Adjuster-specific fields */}
          {(isAdjuster || isRemoval) && (
            <>
              <div>
                <label htmlFor="adjusterName" className="block text-sm font-medium text-gray-700 mb-1">
                  Adjuster Name <span className="text-gray-400">(if applicable)</span>
                </label>
                <input
                  type="text"
                  id="adjusterName"
                  value={adjusterName}
                  onChange={(e) => setAdjusterName(e.target.value)}
                  placeholder="Name as it appears on profile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="adjusterProfileUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile URL <span className="text-gray-400">(if applicable)</span>
                </label>
                <input
                  type="url"
                  id="adjusterProfileUrl"
                  value={adjusterProfileUrl}
                  onChange={(e) => setAdjusterProfileUrl(e.target.value)}
                  placeholder="https://ratemyadjusters.com/adjuster/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
                />
              </div>
            </>
          )}
          
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your inquiry"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow"
            />
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide as much detail as possible..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent transition-shadow resize-y"
            />
            <p className="mt-1 text-xs text-gray-500">
              {message.length} characters {message.length < 10 && '(minimum 10)'}
            </p>
          </div>
          
          {/* Response time notice */}
          <div className="bg-gray-50 rounded-lg p-4 flex gap-3">
            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-1">Response Times</p>
              <p>
                We aim to respond within 2-3 business days. Legal and urgent inquiries may receive faster responses.
                We cannot guarantee a response to all submissions.
              </p>
            </div>
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-[#0F4C81] text-white font-semibold rounded-lg hover:bg-[#0d3d66] focus:ring-4 focus:ring-[#0F4C81]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
          
          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link> and{' '}
            <Link href="/terms" className="underline">Terms of Service</Link>.
          </p>
        </form>
      </div>
    );
  };
  
  // Render step 3: Success
  const renderSuccess = () => (
    <div className="max-w-xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent</h1>
        <p className="text-lg text-gray-600">
          Thank you for reaching out. We've received your message and will review it shortly.
        </p>
      </div>
      
      {submissionId && (
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 mb-1">Your reference number:</p>
          <code className="text-sm font-mono bg-white px-3 py-1 rounded border border-gray-200">
            {submissionId}
          </code>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Your message has been delivered to our team</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>We typically respond within 2-3 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Check your email (including spam folder) for our response</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-[#0F4C81] text-white font-medium rounded-lg hover:bg-[#0d3d66] transition-colors"
        >
          Return Home
        </Link>
        <button
          onClick={() => {
            setStep('select');
            setSelectedType(null);
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            setAdjusterName('');
            setAdjusterProfileUrl('');
            setCompanyRepresented('');
            setLegalCapacity('');
            setSubmissionId(null);
          }}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-[#0F4C81] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Contact Us
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
          <p className="mt-2 text-blue-100 max-w-2xl">
            Have a question, concern, or business inquiry? We're here to help.
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 'select' && renderTypeSelection()}
        {step === 'form' && renderForm()}
        {step === 'success' && renderSuccess()}
      </div>
      
      {/* Footer notice */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> RateMyAdjusters LLC does not guarantee a response to all inquiries. 
            Submission of this form does not create a contractual, attorney-client, or fiduciary relationship of any kind. 
            For urgent legal matters, please consult a licensed attorney in your jurisdiction.
          </p>
        </div>
      </div>
    </main>
  );
}
