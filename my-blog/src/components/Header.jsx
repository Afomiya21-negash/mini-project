export const Header = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 text-center shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      </div>
    </header>
  )
}
