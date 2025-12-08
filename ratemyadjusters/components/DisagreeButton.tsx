'use client'

import { useState } from 'react'
import { Flag, CheckCircle } from 'lucide-react'

interface DisagreeButtonProps {
  reviewId: string
}

export default function DisagreeButton({ reviewId }: DisagreeButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('')

  const reasons = [
    { value: 'wrong_adjuster', label: 'Wrong adjuster' },
    { value: 'wrong_info', label: 'Contains incorrect information' },
    { value: 'not_factual', label: 'Not factual / misleading' },
    { value: 'not_professional', label: 'Unprofessional language' },
    { value: 'i_am_adjuster', label: 'I am the adjuster' },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = () => {
    if (!reason) return
    
    // In production, you'd send this to your API
    console.log('Review dispute:', { reviewId, reason })
    
    setSubmitted(true)
    setTimeout(() => {
      setShowModal(false)
      setTimeout(() => {
        setSubmitted(false)
        setReason('')
      }, 300)
    }, 2000)
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Flag className="w-3 h-3" />
        Disagree with this review?
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
                  Report Review
                </h3>
                <p className="text-gray-600 mb-6">
                  Why do you disagree with this review?
                </p>
                
                <div className="space-y-2 mb-6">
                  {reasons.map((r) => (
                    <label
                      key={r.value}
                      className={'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ' +
                        (reason === r.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300')
                      }
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{r.label}</span>
                    </label>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!reason}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  We review all reports and take action on violations.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Report Submitted</h3>
                <p className="text-gray-600">We'll review this and take action if needed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
