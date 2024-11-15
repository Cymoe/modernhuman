import { Link } from 'react-router-dom';
import { ArrowRightIcon, BeakerIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-73px)]">
      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 max-w-4xl">
          Learn AI Development
          <span className="block mt-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> 
            The Right Way
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Master practical AI skills through hands-on courses designed for modern developers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors group"
          >
            Start Learning
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="bg-gray-50 dark:bg-zinc-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BeakerIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practical Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn through real-world projects and hands-on exercises.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <UserGroupIcon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with AI developers and learn from their experiences.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <AcademicCapIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Path</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Follow a clear learning path from basics to advanced AI concepts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Master AI Development?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of developers and start building the future with AI today.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center bg-white text-blue-500 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}