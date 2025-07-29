import Link from "next/link"
import { AuthorInfo } from "@/components/AuthorInfo"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Welcome to Wild Paws Blog</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the fascinating world of wolves, dogs, and their incredible evolutionary journey through engaging
          articles and stunning photography.
        </p>
        <div className="flex flex-col sm:flex-row gap-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Our Blog
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/blog/1"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            Read Featured Article
          </Link>
        </div>
      </div>

      {/* Author Info Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <AuthorInfo
          name="Mabel Pines"
          bio="Wildlife biologist and canine behavior specialist with over 15 years of experience studying wolves, dogs, and their evolutionary relationships. Passionate about educating others on the fascinating world of canines and their conservation."
          avatar="/placeholder.svg?height=128&width=128&text=Afomiya+Mesfin"
        />
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Dire Wolves Section */}
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src="images/dire wolf.jpg"
              alt="Dire Wolf - prehistoric extinct wolf species"
              className="w-full h-50 object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Dire Wolves</h3>
          <p className="text-gray-600">
            Learn about the extinct dire wolves, their characteristics, and how they differed from modern wolves
          </p>
        </div>

        {/* Modern Wolves Section */}
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src="images/modern wolf.jpg"
              alt="Gray wolves in their natural habitat"
              className="w-full h-49 object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Wolves</h3>
          <p className="text-gray-600">
            Explore the behavior, habitat, and social structure of today's wolf populations
          </p>
        </div>

        {/* Dog Evolution Section */}
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-5 overflow-hidden rounded-lg">
            <img
              src="images/domeatic dogs.jpg"
              alt="Dog evolution from wolves to domestic breeds"
              className="w-full h-50 object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Dog Evolution</h3>
          <p className="text-gray-600">
            Discover how wolves evolved into our beloved domestic dogs over thousands of years
          </p>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Trust Our Expertise?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Excellence</h3>
            <p className="text-gray-600">
              PhD in Wildlife Biology with specialized research in canine evolution and behavior patterns
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Field Research</h3>
            <p className="text-gray-600">
              Extensive fieldwork with wild wolf populations across North America and Europe
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

