import type React from "react"

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl shadow-md border border-gray-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-600 animate-pulse">{message}</p>
    </div>
  )
}
