
import { useState } from "react";
import { Play, Settings, Search, Plus } from "lucide-react";
import AdminDashboard from "../components/AdminDashboard";
import SearchInterface from "../components/SearchInterface";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'search'>('home');

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'search') {
    return <SearchInterface onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ClipClass Creator
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Training Video Generator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Create Custom Training Videos
            <span className="block text-3xl mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              From Your Video Library
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build personalized workout classes by combining video clips, adding AI voiceovers, 
            and creating seamless training experiences for your students.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Card */}
          <div 
            onClick={() => setCurrentView('admin')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Admin Dashboard</h3>
                <p className="text-gray-600">Manage your video library</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-500" />
                <span>Add new YouTube video clips</span>
              </li>
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-500" />
                <span>Set metadata and categories</span>
              </li>
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-500" />
                <span>Organize by difficulty levels</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium inline-block">
                For Administrators
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div 
            onClick={() => setCurrentView('search')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Search Videos</h3>
                <p className="text-gray-600">Find and create classes</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-purple-500" />
                <span>Search by title or category</span>
              </li>
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-purple-500" />
                <span>Filter by difficulty level</span>
              </li>
              <li className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-purple-500" />
                <span>Preview video clips</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium inline-block">
                For Teachers & Students
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 rounded-xl p-6 border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Auto Video Merging</h4>
              <p className="text-sm text-gray-600">Seamlessly combine clips using FFmpeg</p>
            </div>
            <div className="bg-white/60 rounded-xl p-6 border border-gray-100">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Voiceovers</h4>
              <p className="text-sm text-gray-600">Generate natural transitions with TTS</p>
            </div>
            <div className="bg-white/60 rounded-xl p-6 border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Scheduling</h4>
              <p className="text-sm text-gray-600">Auto-generate classes by duration & difficulty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
