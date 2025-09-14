import React, { useState } from "react";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import { RiMicAiFill } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import start from "../assets/start.mp3";
import { FaArrowLeftLong } from "react-icons/fa6";

function SearchWithAi() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const startSound = new Audio(start);

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true);
    startSound.play();
    recognition.start();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  };

  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/ai/search`,
        { input: query },
        { withCredentials: true }
      );
      setRecommendations(result.data);
      if (result.data.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("No courses found");
      }
      setListening(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center px-4 py-16 relative">
      {/* Decorative animated glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(203,153,199,0.15),transparent_70%)] animate-pulse" />

      {/* Search Box */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-2xl text-center relative">
        <FaArrowLeftLong
          className="text-white w-6 h-6 cursor-pointer absolute left-6 top-6 hover:text-pink-300 transition"
          onClick={() => navigate("/")}
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 flex items-center justify-center gap-3 tracking-tight">
          <img src={ai} className="w-10 h-10" alt="AI" />
          <span>
            Search with <span className="text-pink-300">AI</span>
          </span>
        </h1>

        <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/30 shadow-xl relative w-full">
          <input
            type="text"
            className="flex-grow px-5 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none text-base sm:text-lg"
            placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {input && (
            <button
              onClick={() => handleRecommendation(input)}
              className="absolute right-14 sm:right-16 bg-pink-400 hover:bg-pink-500 rounded-full transition transform hover:scale-105"
            >
              <img
                src={ai}
                className="w-11 h-11 p-2 rounded-full"
                alt="Search"
              />
            </button>
          )}

          <button
            className={`absolute right-2 rounded-full w-11 h-11 flex items-center justify-center bg-pink-400 hover:bg-pink-500 transition ${
              listening ? "animate-ping ring-2 ring-pink-400 ring-offset-2" : ""
            }`}
            onClick={handleSearch}
          >
            <RiMicAiFill className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="w-full max-w-6xl mt-14 px-4">
        {recommendations.length > 0 ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-3">
              <img
                src={ai1}
                className="w-12 h-12 p-1 rounded-full bg-white/10"
                alt="AI Results"
              />
              AI Search Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {recommendations.map((course, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl border border-white/20 shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition transform cursor-pointer"
                  onClick={() => navigate(`/viewcourse/${course._id}`)}
                >
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {course.category}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : listening ? (
          <h1 className="text-center text-2xl mt-12 text-pink-300 animate-pulse">
            Listening...
          </h1>
        ) : (
          <h1 className="text-center text-xl sm:text-2xl mt-12 text-gray-300">
            No Courses Found
          </h1>
        )}
      </div>
    </div>
  );
}

export default SearchWithAi;
