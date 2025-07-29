export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl">🐺</span>
            <span className="text-lg font-semibold">Wild Paws Blog</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              About Wildlife
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Conservation
            </a>
         
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
          <p>
            &copy; 2024 Wild Paws Blog. Exploring the fascinating world of canines. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
