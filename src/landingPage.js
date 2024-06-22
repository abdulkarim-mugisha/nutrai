import React from 'react';
import { ArrowRight, Utensils, Activity, Dna } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <header className="p-5 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">NutriAI</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-gray-600 hover:text-green-600">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-green-600">How It Works</a></li>
              <li><a href="#signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-10 px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Personalized Nutrition, Powered by AI</h2>
          <p className="text-xl mb-8">Get custom meal plans tailored to your unique health profile, genetic predispositions, and fitness goals.</p>
          <a href="#signup" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 inline-flex items-center">
            Get Started <ArrowRight className="ml-2" />
          </a>
        </section>

        <section id="features" className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Utensils size={48} className="mx-auto mb-4 text-green-500" />
              <h4 className="text-xl font-semibold mb-2">Custom Meal Plans</h4>
              <p>Receive personalized meal plans based on your nutritional needs and preferences.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Activity size={48} className="mx-auto mb-4 text-green-500" />
              <h4 className="text-xl font-semibold mb-2">Fitness Integration</h4>
              <p>Sync with your fitness trackers to optimize your nutrition based on your activity level.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Dna size={48} className="mx-auto mb-4 text-green-500" />
              <h4 className="text-xl font-semibold mb-2">Genetic Insights</h4>
              <p>Incorporate genetic data to provide nutrition recommendations tailored to your DNA.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">How It Works</h3>
          <div className="max-w-2xl mx-auto">
            <ol className="space-y-4">
              <li className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</span>
                <span>Sign up and complete a comprehensive health questionnaire.</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</span>
                <span>Connect your fitness devices and upload genetic data (optional).</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</span>
                <span>Receive your personalized nutrition plan and start your journey to better health.</span>
              </li>
            </ol>
          </div>
        </section>

        <section id="signup" className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-center">Sign Up for Early Access</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded" placeholder="your@email.com" />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Join Waitlist</button>
          </form>
        </section>
      </main>

      <footer className="mt-16 bg-gray-100 py-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2024 NutriAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;