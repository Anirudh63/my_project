import React, { useState } from 'react';
import { BookOpen, Sparkles, Moon, Sun, FileText, Zap, Brain, ChevronRight } from 'lucide-react';

const NoteWise = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const sampleContent = `The Renaissance was a period of cultural, artistic, political, and economic rebirth following the Middle Ages. It began in Italy in the 14th century and spread throughout Europe. Key characteristics include:

- Humanism: Focus on human potential and achievements
- Art: Realistic techniques, perspective, and classical themes
- Science: Empirical observation and scientific method
- Literature: Vernacular languages, individual expression
- Politics: Rise of city-states and centralized monarchies

Notable figures include Leonardo da Vinci (artist/inventor), Michelangelo (sculptor/painter), William Shakespeare (playwright), and Galileo Galilei (astronomer). The printing press, invented by Gutenberg around 1440, helped spread Renaissance ideas rapidly across Europe.

The Renaissance marked the transition from medieval to modern times, emphasizing reason, individualism, and the rediscovery of classical Greek and Roman texts.`;

  const handleSummarize = async () => {
    if (!notes.trim()) return;

    setIsLoading(true);
    setShowSummary(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: notes }),
      });

      const data = await response.json();

      if (data.summary) {
        setSummary(data.summary);
      } else {
        setSummary("⚠️ Failed to summarize. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("⚠️ Backend error. Is the FastAPI server running?");
    }

    setIsLoading(false);
    setShowSummary(true);
  };

  const loadSample = () => {
    setNotes(sampleContent);
    setSummary('');
    setShowSummary(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse ${isDarkMode ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/20 backdrop-blur-sm' : 'bg-blue-100'} transition-all duration-300 hover:scale-110`}>
              <Brain className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Note<span className="text-blue-500">Wise</span>
            </h1>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-300 hover:scale-110`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm' : 'bg-gradient-to-r from-blue-100 to-purple-100'} animate-pulse`}>
              <Sparkles className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>

          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Summarize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">smarter</span>
          </h2>

          <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Study faster with AI-powered note summarization
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Instant Summaries</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Study Optimized</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Smart Organization</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white/80 backdrop-blur-sm border border-gray-200'} shadow-2xl mb-8 transition-all duration-300 hover:shadow-3xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Notes</h3>
              <button
                onClick={loadSample}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${isDarkMode ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'} transition-all duration-200 hover:scale-105`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Load Sample</span>
              </button>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your notes, lecture content, or study material here..."
              className={`w-full h-64 p-6 rounded-2xl resize-none ${isDarkMode ? 'bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            />

            <div className="flex justify-between items-center mt-6">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notes.length} characters</div>

              <button
                onClick={handleSummarize}
                disabled={!notes.trim() || isLoading}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  !notes.trim() || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Summarizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Summarize</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary Section */}
          {showSummary && (
            <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-500/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'} shadow-2xl animate-in slide-in-from-bottom-4 duration-500`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <Brain className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>AI Summary</h3>
              </div>

              <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                <div className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{summary}</div>
              </div>

              <div className="flex justify-end mt-6">
                <button className={`flex items-center space-x-2 px-6 py-3 rounded-xl ${isDarkMode ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' : 'bg-green-100 hover:bg-green-200 text-green-600'} transition-all duration-200 hover:scale-105`}>
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Save Summary</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`text-center mt-16 pt-8 border-t ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
          <p className="text-sm">Built with AI-powered summarization • Perfect for students and learners</p>
        </footer>
      </div>
    </div>
  );
};

export default NoteWise;
