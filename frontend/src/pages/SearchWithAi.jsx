import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Self-Contained Components & Assets ---

// Defining serverUrl here to remove dependency on another file that couldn't be resolved.
// In a real-world app, this should be an environment variable.
const serverUrl = "http://localhost:8000";

// Inline SVG components to replace external libraries and files
const MicIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
  </svg>
);

const AiIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#CB99C7", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#8e44ad", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="url(#grad)"
      strokeWidth="5"
    />
    <text
      x="50"
      y="62"
      fontFamily="Arial, sans-serif"
      fontSize="40"
      fontWeight="bold"
      textAnchor="middle"
      fill="url(#grad)"
    >
      AI
    </text>
  </svg>
);

// CSS-based loader to replace react-spinners
const BeatLoader = () => (
  <>
    <style>{`
      .beat-loader {
        display: flex;
        justify-content: space-around;
        width: 70px;
      }
      .beat-loader div {
        width: 15px;
        height: 15px;
        background-color: #CB99C7;
        border-radius: 50%;
        animation: beat 0.7s infinite alternate;
      }
      .beat-loader div:nth-child(2) {
        animation-delay: 0.2s;
      }
      .beat-loader div:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes beat {
        to {
          transform: scale(0.75);
          opacity: 0.5;
        }
      }
    `}</style>
    <div className="beat-loader">
      <div />
      <div />
      <div />
    </div>
  </>
);

// Helper to check for speech recognition support
const isSpeechRecognitionSupported = () =>
  "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

function SearchWithAi() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [status, setStatus] = useState("idle"); // 'idle', 'listening', 'searching', 'error'
  const [errorMessage, setErrorMessage] = useState(""); // State to hold specific error messages
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const speak = useCallback((message) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setStatus("listening");
      setErrorMessage(""); // Clear previous errors on a new attempt
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setInput(transcript);
      handleRecommendation(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      let specificError = "An unknown error occurred. Please try again.";
      let spokenError = "Oops, something went wrong. Please try again.";

      if (event.error === "network") {
        specificError = "Network error. Please check your internet connection.";
        spokenError =
          "I'm having trouble connecting. Please check your internet connection.";
      } else if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        specificError =
          "Microphone access denied. Please enable it in your browser settings.";
        spokenError =
          "I can't hear you without microphone access. Please enable it in your browser settings.";
      } else if (event.error === "no-speech") {
        specificError = "I didn't hear anything. Please try again.";
        spokenError = "I didn't catch that. Could you please try again?";
      }

      setErrorMessage(specificError);
      speak(spokenError);
      setStatus("error");
    };

    recognition.onend = () => {
      if (status === "listening") setStatus("idle");
    };
    recognitionRef.current = recognition;

    return () => {
      window.speechSynthesis.cancel();
      recognitionRef.current?.stop();
    };
  }, [status, speak]);

  const handleVoiceSearch = () => {
    if (recognitionRef.current && status !== "listening") {
      recognitionRef.current.start();
    }
  };

  const handleRecommendation = useCallback(
    async (query) => {
      if (!query || query.trim() === "") return;
      setStatus("searching");
      setRecommendations([]);

      try {
        const { data } = await axios.post(
          `${serverUrl}/api/ai/search`,
          { input: query },
          { withCredentials: true }
        );
        setRecommendations(data);
        setStatus("idle");
        if (data.length > 0) {
          speak("Here are the top courses I found for you.");
        } else {
          speak("Sorry, I couldn't find any courses matching your search.");
        }
      } catch (error) {
        console.error("AI search error:", error);
        setErrorMessage(
          "Failed to fetch course recommendations. The server might be down."
        );
        setStatus("error");
        speak("Oops, I couldn't fetch the courses. Please try again later.");
      }
    },
    [speak]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleRecommendation(input);
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "listening":
        return (
          <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
            Listening...
          </h1>
        );
      case "searching":
        return (
          <div className="flex flex-col items-center justify-center mt-10">
            <BeatLoader />
            <p className="text-center text-xl sm:text-2xl mt-4 text-gray-400">
              Searching for courses...
            </p>
          </div>
        );
      case "error":
        return (
          <h1 className="text-center text-xl sm:text-2xl mt-10 text-red-400">
            {errorMessage || "An error occurred. Please try again."}
          </h1>
        );
      default:
        // Show "No Courses Found" only after a search has completed with no results and there is no input text
        return (
          !input &&
          recommendations.length === 0 && (
            <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
              No Courses Found
            </h1>
          )
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-16">
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
        <ArrowLeftIcon
          className="text-gray-600 w-6 h-6 cursor-pointer absolute top-6 left-6"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <AiIcon className="w-8 h-8" />
          Search with <span className="text-[#CB99C7]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            placeholder="What do you want to learn?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={status === "listening" || status === "searching"}
          />

          <button
            onClick={() => handleRecommendation(input)}
            disabled={!input || status === "searching"}
            className="absolute right-14 bg-white rounded-full p-2 disabled:opacity-50 transition-opacity"
          >
            <SearchIcon className="w-5 h-5 text-[#cb87c5]" />
          </button>

          {isSpeechRecognitionSupported() && (
            <button
              onClick={handleVoiceSearch}
              disabled={status === "listening" || status === "searching"}
              className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <MicIcon
                className={`w-5 h-5 text-[#cb87c5] ${
                  status === "listening" ? "animate-pulse" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center flex items-center justify-center gap-3">
            <AiIcon className="w-12 h-12" />
            AI Search Results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((course) => (
              <div
                key={course._id}
                className="bg-white text-black p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                <h3 className="text-lg font-bold sm:text-xl">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderStatusMessage()
      )}
    </div>
  );
}

export default SearchWithAi;
