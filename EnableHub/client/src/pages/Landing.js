import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Collaborative learning',
    desc: 'Work together on problems, share solutions and learn from peers.',
  },
  {
    title: 'Accessible resources',
    desc: 'Curated learning paths and resources for all skill levels.',
  },
  {
    title: 'Real-time feedback',
    desc: 'Get hints, tests and instant feedback while you code.',
  },
]

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700">EnableHub</h1>
          <p className="mt-4 text-lg text-gray-600">
            A collaborative platform to learn, solve problems, and build together.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signup"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              to="/about"
              className="inline-block px-6 py-3 rounded-md border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              Learn more
            </Link>
          </div>
        </div>

        <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EnableHub — Built with care.
        </footer>
      </div>
    </main>
  )
}
