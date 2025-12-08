'use client'

import { useState } from 'react'
import { CheckCircle, HelpCircle, XCircle, ThumbsUp } from 'lucide-react'

interface ConfirmAdjusterButtonProps {
  adjusterId: string
  adjusterName: string
}

export default function ConfirmAdjusterButton({ adjusterId, adjusterName }: ConfirmAdjusterButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [response, setResponse] = useState<string | null>(null)

  const handleSubmit = (answer: 'yes' | 'no' | 'not_sure') => {
    setResponse(answer)
    setSubmitted(true)
    
    // In production, you'd send this to your API
    console.log('Adjuster confirmation:', { adjusterId, answer })
    
    setTimeout(() => {
      setShowModal(false)
      setTimeout(() => {
        setSubmitted(false)
        setResponse(null)
      }, 300)
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        Is this your adjuster?
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => !submitted && setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Adjuster
                </h3>
                <p className="text-gray-600 mb-6">
                  Is <span className="font-semibold">{adjusterName}</span> the adjuster who handled your claim?
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleSubmit('yes')}
                    className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Yes, this is them
                  </button>
                  
                  <button
                    onClick={() => handleSubmit('no')}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    No, wrong person
                  </button>
                  
                  <button
                    onClick={() => handleSubmit('not_sure')}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-5 h-5" />
                    Not sure
                  </button>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks!</h3>
                <p className="text-gray-600">Your feedback helps us maintain accurate profiles.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
