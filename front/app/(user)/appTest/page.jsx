"use client";

import { useState } from "react";
import { Clock, Edit, Settings, Plus, LogOut } from "lucide-react";
import { Gabarito, Inter } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

export default function TestApplication() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: 4,
    2: 1,
    3: 3,
    5: 2,
    6: 4,
  });

  const questions = [
    { id: 1, title: "1-Question" },
    { id: 2, title: "2-Question" },
    { id: 3, title: "3-Question" },
    { id: 4, title: "4-Question" },
    { id: 5, title: "5-Question" },
    { id: 6, title: "6-Question" },
  ];

  const handleAnswerSelect = (questionId, choiceId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`flex items-center justify-between px-20 py-6 ${inter400.className}`}>
        <div className="text-[#1e1e1e]" style={{ fontSize: "22px", textTransform: "capitalize" }}>
          logo
        </div>

        <nav className="flex items-center space-x-10">
          {["Browse", "Companies", "Solvers", "Populaire"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#1e1e1e] hover:text-[#4218ff] transition-colors"
              style={{ fontSize: "22px", fontWeight: 400, textTransform: "capitalize" }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4 relative">
          <span className="text-[#747474]" style={{ fontSize: "22px" }}>
            Profile
          </span>

          <div className="relative group cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-[#d9d9d9] border-2 border-[#4218ff] relative">
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00e439]" />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#d9d9d9] rounded-md shadow-md z-10 hidden group-hover:block">
              {/* Profile Info */}
              <div className="flex flex-col items-center px-4 py-5 border-b">
                <div className="relative w-14 h-14 rounded-full border-2 border-[#4218ff] bg-[#f1ecff]">
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00e439] rounded-full border-2 border-white" />
                </div>
                <div className="mt-3 text-center">
                  <div className="font-semibold text-[#1e1e1e] text-base">User Name</div>
                  <div className="text-sm text-[#747474]">Azddedine@Gmail.Com</div>
                </div>
              </div>

              {/* Dropdown Items */}
              <div className="py-2">
                {[
                  { icon: <Edit className="w-5 h-5 text-[#4218ff]" />, label: "Edit Profile" },
                  { icon: <Settings className="w-5 h-5 text-[#4218ff]" />, label: "Settings" },
                  { separator: true },
                  { icon: <Plus className="w-5 h-5 text-[#4218ff]" />, label: "Add Account" },
                  { icon: <LogOut className="w-5 h-5 text-[#4218ff]" />, label: "Log Out" },
                ].map((item, index) =>
                  item.separator ? (
                    <div key={index} className="border-t my-2" />
                  ) : (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#f1ecff] cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-[#1e1e1e] font-medium">{item.label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className={`${gabarito.className} text-[#1e1e1e] mb-8 mr-20`}
            style={{
              fontSize: "60px",
              fontWeight: 500,
              lineHeight: "101%",
              textTransform: "capitalize",
            }}
          >
            Application <span className="text-[#4218ff]">Test</span>
          </h1>
        </div>

        {/* Test Info */}
        <div className="mb-8">
          <h2
            className={`${inter500.className} text-[#1e1e1e] mb-4`}
            style={{
              fontSize: "40px",
              fontWeight: 500,
              lineHeight: "101%",
              textTransform: "capitalize",
            }}
          >
            Test Name
          </h2>
          <div className="flex items-center">
            <Clock className="w-6 h-6 mr-2 text-[#4218FF]" />
            <span className={`${inter500.className} text-[#1E1E1E] text-xl`}>30 Min Deadline</span>
          </div>
        </div>

        {/* Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {questions.map((question) => (
            <div key={question.id} className="bg-[#f1ecff] p-6 rounded-lg shadow-sm">
              <h3
                className={`${inter500.className} text-[#1e1e1e] mb-4`}
                style={{
                  fontSize: "22px",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                }}
              >
                {question.title}
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((choice) => (
                  <div
                    key={choice}
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => handleAnswerSelect(question.id, choice)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        selectedAnswers[question.id] === choice
                          ? "bg-[#4218ff] border-[#4218ff]"
                          : "border-[#d9d9d9] bg-white"
                      }`}
                    ></div>
                    <span
                      className={`${inter500.className} ${
                        selectedAnswers[question.id] === choice
                          ? "text-[#1e1e1e]"
                          : "text-[#d9d9d9]"
                      }`}
                      style={{
                        fontSize: "18px",
                        lineHeight: "100%",
                        textTransform: "capitalize",
                      }}
                    >
                      Choice {choice}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="bg-[#b9a3ff] hover:bg-[#4218ff] text-white px-8 py-3 text-lg font-medium rounded-md">
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
