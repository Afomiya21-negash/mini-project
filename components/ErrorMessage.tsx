"use client" // Client component for event handlers

// TypeScript interface for component props
interface ErrorMessageProps {
  message: string // Error message to display
  onRetry?: () => void // Optional retry function
}

// Error message component with optional retry functionality
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      {/* Center the error message with vertical padding */}

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        {/* 
          Error container:
          - bg-red-50: Very light red background
          - border border-red-200: Light red border
          - rounded-lg: Large border radius
          - p-6: Padding of 1.5rem
          - max-w-md: Maximum width constraint
          - mx-auto: Center horizontally
        */}

        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        {/* Warning emoji with red color and large size */}

        <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        {/* Error title with dark red color */}

        <p className="text-red-600 mb-4">{message}</p>
        {/* Display the error message */}

        {/* Conditionally render retry button if onRetry function is provided */}
        {onRetry && (
          <button
            onClick={onRetry} // Call the retry function when clicked
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {/* 
              Retry button styling:
              - bg-red-600: Red background
              - text-white: White text
              - px-4 py-2: Horizontal and vertical padding
              - rounded-lg: Large border radius
              - hover:bg-red-700: Darker red on hover
              - transition-colors: Smooth color transition
            */}
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
