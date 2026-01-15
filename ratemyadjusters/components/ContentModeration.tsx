'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, X, ChevronDown, ChevronUp, Wand2, Eye, Shield } from 'lucide-react'
import {
  moderateContent,
  applyQuickFix,
  getSafeRewriteSuggestion,
  trackModerationEvent,
  type ModerationIssue,
  type ModerationResult,
  type QuickFix,
} from '@/lib/content-moderation'

interface ContentModerationProps {
  value: string
  onChange: (value: string) => void
  onValidationChange: (isValid: boolean, hasWarnings: boolean) => void
  placeholder?: string
  minLength?: number
  maxLength?: number
  rows?: number
  className?: string
}

export default function ContentModeration({
  value,
  onChange,
  onValidationChange,
  placeholder = 'Share your experience...',
  minLength = 20,
  maxLength = 2000,
  rows = 5,
  className = '',
}: ContentModerationProps) {
  const [moderation, setModeration] = useState<ModerationResult | null>(null)
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)
  const [dismissedWarnings, setDismissedWarnings] = useState<Set<string>>(new Set())
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced moderation check
  const checkModeration = useCallback((text: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (text.trim().length >= 10) {
        const result = moderateContent(text)
        setModeration(result)

        // Track if issues were found
        if (result.issues.length > 0) {
          trackModerationEvent('moderation_triggered', {
            issueCount: result.issues.length,
            textLength: text.length,
          })
        }

        // Filter out dismissed warnings
        const activeBlockingIssues = result.blockingIssues
        const activeWarningIssues = result.warningIssues.filter(
          w => !dismissedWarnings.has(w.id)
        )

        onValidationChange(
          activeBlockingIssues.length === 0,
          activeWarningIssues.length > 0
        )
      } else {
        setModeration(null)
        onValidationChange(true, false)
      }
    }, 300)
  }, [dismissedWarnings, onValidationChange])

  useEffect(() => {
    checkModeration(value)
  }, [value, checkModeration])

  // Sync scroll between textarea and highlight overlay
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  // Apply a quick fix
  const handleQuickFix = (issue: ModerationIssue, fix: QuickFix) => {
    const newValue = applyQuickFix(value, issue, fix)
    onChange(newValue)

    trackModerationEvent('quick_fix_used', {
      issueType: issue.type,
      severity: issue.severity,
      fixType: fix.action,
    })

    // Re-check moderation immediately
    const result = moderateContent(newValue)
    setModeration(result)
  }

  // Dismiss a warning
  const handleDismissWarning = (issueId: string) => {
    setDismissedWarnings(prev => {
      const next = new Set(Array.from(prev))
      next.add(issueId)
      return next
    })
    setExpandedIssue(null)
  }

  // Render text with highlighted issues
  const renderHighlightedText = () => {
    if (!moderation || moderation.issues.length === 0) {
      return <span className="invisible whitespace-pre-wrap">{value || ' '}</span>
    }

    const parts: React.ReactNode[] = []
    let lastIndex = 0

    // Sort issues by start index
    const sortedIssues = [...moderation.issues].sort((a, b) => a.startIndex - b.startIndex)

    sortedIssues.forEach((issue, idx) => {
      // Add text before this issue
      if (issue.startIndex > lastIndex) {
        parts.push(
          <span key={`text-${idx}`} className="invisible">
            {value.substring(lastIndex, issue.startIndex)}
          </span>
        )
      }

      // Skip if this is a dismissed warning
      if (issue.severity === 'warn' && dismissedWarnings.has(issue.id)) {
        parts.push(
          <span key={`issue-${idx}`} className="invisible">
            {issue.match}
          </span>
        )
      } else {
        // Add highlighted issue
        const bgColor = issue.severity === 'block'
          ? 'bg-red-200/80'
          : 'bg-amber-200/80'

        parts.push(
          <mark
            key={`issue-${idx}`}
            className={`${bgColor} rounded px-0.5 -mx-0.5`}
          >
            {issue.match}
          </mark>
        )
      }

      lastIndex = issue.endIndex
    })

    // Add remaining text
    if (lastIndex < value.length) {
      parts.push(
        <span key="text-end" className="invisible">
          {value.substring(lastIndex)}
        </span>
      )
    }

    return <span className="whitespace-pre-wrap break-words">{parts}</span>
  }

  // Get active issues (excluding dismissed warnings)
  const getActiveIssues = () => {
    if (!moderation) return { blocking: [], warnings: [] }

    return {
      blocking: moderation.blockingIssues,
      warnings: moderation.warningIssues.filter(w => !dismissedWarnings.has(w.id)),
    }
  }

  const { blocking, warnings } = getActiveIssues()
  const hasBlockingIssues = blocking.length > 0
  const hasWarnings = warnings.length > 0
  const hasAnyIssues = hasBlockingIssues || hasWarnings

  // Character count styling
  const charCountClass = value.trim().length < minLength
    ? 'text-amber-600'
    : value.length > maxLength
      ? 'text-red-600'
      : 'text-gray-500'

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Textarea with highlight overlay */}
      <div className="relative">
        {/* Highlight layer (behind textarea) */}
        <div
          ref={highlightRef}
          aria-hidden="true"
          className="absolute inset-0 px-4 py-3 overflow-hidden pointer-events-none font-sans text-base leading-relaxed"
          style={{
            fontFamily: 'inherit',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {renderHighlightedText()}
        </div>

        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`relative w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-transparent resize-none ${
            hasBlockingIssues
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
              : hasWarnings
                ? 'border-amber-400 focus:border-amber-500 focus:ring-amber-500'
                : 'border-gray-300'
          }`}
          style={{ caretColor: 'black' }}
        />
      </div>

      {/* Character count */}
      <div className="flex justify-between items-center text-sm">
        <span className={charCountClass}>
          {value.length}/{maxLength}
          {value.trim().length < minLength && ` (minimum ${minLength} characters)`}
        </span>
        {moderation && moderation.issues.length === 0 && value.trim().length >= minLength && (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Content looks good
          </span>
        )}
      </div>

      {/* Issues Panel */}
      {hasAnyIssues && (
        <div className="rounded-xl border-2 overflow-hidden bg-white shadow-sm">
          {/* Panel header */}
          <div className={`px-4 py-3 ${hasBlockingIssues ? 'bg-red-50 border-b border-red-200' : 'bg-amber-50 border-b border-amber-200'}`}>
            <div className="flex items-center gap-2">
              {hasBlockingIssues ? (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Fix before submitting</span>
                  <span className="text-red-600 text-sm">
                    ({blocking.length} {blocking.length === 1 ? 'issue' : 'issues'})
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">Review suggestions</span>
                  <span className="text-amber-600 text-sm">
                    ({warnings.length} {warnings.length === 1 ? 'warning' : 'warnings'})
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Issues list */}
          <div className="divide-y divide-gray-100">
            {/* Blocking issues first */}
            {blocking.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                isExpanded={expandedIssue === issue.id}
                onToggle={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                onQuickFix={(fix) => handleQuickFix(issue, fix)}
              />
            ))}

            {/* Then warnings */}
            {warnings.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                isExpanded={expandedIssue === issue.id}
                onToggle={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                onQuickFix={(fix) => handleQuickFix(issue, fix)}
                onDismiss={() => handleDismissWarning(issue.id)}
                showRewriteSuggestion
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Individual issue row component
interface IssueRowProps {
  issue: ModerationIssue
  isExpanded: boolean
  onToggle: () => void
  onQuickFix: (fix: QuickFix) => void
  onDismiss?: () => void
  showRewriteSuggestion?: boolean
}

function IssueRow({
  issue,
  isExpanded,
  onToggle,
  onQuickFix,
  onDismiss,
  showRewriteSuggestion = false,
}: IssueRowProps) {
  const isBlocking = issue.severity === 'block'
  const bgHover = isBlocking ? 'hover:bg-red-50' : 'hover:bg-amber-50'
  const iconColor = isBlocking ? 'text-red-500' : 'text-amber-500'
  const rewriteSuggestion = showRewriteSuggestion ? getSafeRewriteSuggestion(issue.match) : null

  return (
    <div className={`${bgHover} transition-colors`}>
      {/* Issue header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-start gap-3 text-left"
      >
        <div className={`mt-0.5 ${iconColor}`}>
          {isBlocking ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{issue.title}</span>
            {!isBlocking && onDismiss && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDismiss()
                }}
                className="text-gray-400 hover:text-gray-600 p-0.5"
                title="Dismiss warning"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-1 text-sm">
            <span className="text-gray-500">Found: </span>
            <code className={`px-1.5 py-0.5 rounded text-sm ${isBlocking ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
              {issue.match.length > 50 ? issue.match.substring(0, 50) + '...' : issue.match}
            </code>
          </div>
        </div>

        <div className="text-gray-400">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 pl-12 space-y-3">
          {/* Why flagged */}
          <div>
            <p className="text-sm text-gray-600">{issue.description}</p>
          </div>

          {/* How to fix */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">How to fix:</p>
            <p className="text-sm text-gray-600 mb-3">{issue.fixSuggestion}</p>

            {/* Quick fix buttons */}
            <div className="flex flex-wrap gap-2">
              {issue.quickFixes.map((fix, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickFix(fix)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isBlocking
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  {fix.label}
                </button>
              ))}
            </div>
          </div>

          {/* Safe rewrite suggestion for defamation warnings */}
          {showRewriteSuggestion && rewriteSuggestion && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm font-medium text-blue-800 mb-1">Suggested rewrite:</p>
              <p className="text-sm text-blue-700 italic mb-2">"{rewriteSuggestion}"</p>
              <button
                onClick={() => onQuickFix({
                  label: 'Use suggestion',
                  action: 'replace',
                  replacement: rewriteSuggestion,
                })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Use this phrasing
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Preview component for showing how review will appear
interface ReviewPreviewProps {
  value: string
  onClose: () => void
  onSubmit: () => void
  isSubmitting?: boolean
  hasIssues: boolean
}

export function ReviewPreview({
  value,
  onClose,
  onSubmit,
  isSubmitting = false,
  hasIssues,
}: ReviewPreviewProps) {
  const moderation = moderateContent(value)

  useEffect(() => {
    trackModerationEvent('preview_shown', {
      textLength: value.length,
      issueCount: moderation.issues.length,
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Preview Your Review</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status indicator */}
          {moderation.isValid ? (
            <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Your review is ready to submit</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">
                Please fix {moderation.blockingIssues.length} {moderation.blockingIssues.length === 1 ? 'issue' : 'issues'} before submitting
              </span>
            </div>
          )}

          {/* Warnings if any */}
          {moderation.warningIssues.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800">
                {moderation.warningIssues.length} {moderation.warningIssues.length === 1 ? 'suggestion' : 'suggestions'} to consider (optional)
              </span>
            </div>
          )}

          {/* Preview of review text */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Your review will appear as:
            </h3>
            <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
          </div>

          {/* Issues summary */}
          {moderation.issues.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Issues found:</h3>
              {moderation.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-3 rounded-lg border ${
                    issue.severity === 'block'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {issue.severity === 'block' ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span className={`font-medium ${
                      issue.severity === 'block' ? 'text-red-800' : 'text-amber-800'
                    }`}>
                      {issue.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      issue.severity === 'block'
                        ? 'bg-red-200 text-red-700'
                        : 'bg-amber-200 text-amber-700'
                    }`}>
                      {issue.severity === 'block' ? 'Must fix' : 'Optional'}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    issue.severity === 'block' ? 'text-red-700' : 'text-amber-700'
                  }`}>
                    "{issue.match}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={onSubmit}
            disabled={!moderation.isValid || isSubmitting}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              moderation.isValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  )
}
