// Simple loading spinner component
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      {/* 
        Centering container:
        - flex: Flexbox layout
        - justify-center: Horizontally center
        - items-center: Vertically center
        - py-12: Vertical padding of 3rem
      */}

      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      {/* 
        Spinning circle:
        - animate-spin: CSS animation for rotation
        - rounded-full: Perfect circle
        - h-12 w-12: 3rem height and width
        - border-b-2: Bottom border of 2px
        - border-blue-600: Blue border color
      */}
    </div>
  )
}
