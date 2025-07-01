"use client";

import CountUp from "react-countup";
import { Users } from "lucide-react";
import { Inter, Gabarito } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], weight: "500" });
const inter = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: ["600"] });

const stats = [
  { value: 100, suffix: "k", label: "Problems Solved" },
  { value: 15000, suffix: "", label: "Hiring Positions" },
  { value: 950, suffix: "", label: "Companies" },
  { value: 250, suffix: "M", label: "Rewards Paid" },
];

const cardsData = [
  {
    company: "Company Name",
    field: "Field",
    budget: "200M dz",
    title: "AI-Powered Customer Retention Strategy",
    description: "Develop an innovative AI solution to predict customer churn and implement personalized retention strategies. Looking for cutting-edge machine learning approaches.",
    tags: ["AI/ML", "Analytics", "SaaS"],
    views: "25.6k",
    bookmarks: "52",
    daysLeft: "3",
  },
  {
    company: "Another Company",
    field: "Technology",
    budget: "500M dz",
    title: "Next-Gen Analytics Platform",
    description: "Create a scalable analytics platform capable of processing massive data streams in real-time. Must support advanced visualizations and AI insights.",
    tags: ["Big Data", "Cloud", "AI"],
    views: "15.2k",
    bookmarks: "40",
    daysLeft: "5",
  },
  {
    company: "Third Company",
    field: "Finance",
    budget: "120M dz",
    title: "Blockchain-Based Payment Gateway",
    description: "Design a secure and fast blockchain payment solution for cross-border transactions with low fees and instant settlement.",
    tags: ["Blockchain", "Fintech", "Security"],
    views: "10.8k",
    bookmarks: "28",
    daysLeft: "7",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafbfe]">
      {/* ===================== HEADER ===================== */}
      <header className={`flex items-center justify-between px-20 py-6 ${inter600.className}`}>
        <div
          className="text-[#1e1e1e]"
          style={{ fontWeight: 400, fontSize: "22px", lineHeight: "100%", textTransform: "capitalize" }}
        >
          <img src="./Layer_1.svg" />
        </div>

        <nav className="flex items-center space-x-8">
          {["Browse", "Companies", "Solvers", "Populaire"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#1e1e1e] hover:text-[#4218ff] transition-colors"
              style={{ fontWeight: 400, fontSize: "22px", lineHeight: "100%", textTransform: "capitalize" }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <span
            className="text-[#1e1e1e]"
            style={{ fontWeight: 400, fontSize: "22px", lineHeight: "100%", textTransform: "capitalize" }}
          >
            Profile
          </span>
          <div className="w-10 h-10 bg-[#a58eff] rounded-full"></div>
        </div>
      </header>

      {/* ===================== MAIN ===================== */}
      <main className="px-6 py-12">
        {/* --------------------- HERO --------------------- */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-[#4218FF]" aria-hidden="true" />
            </div>
            <span className={`${inter.className} text-[#1E1E1E] capitalize`} style={{ fontWeight: 500, fontSize: "16px", lineHeight: "100%" }}>
              Hire More Than +15000 Problem Solver
            </span>
          </div>
        </div>

        {/* --------------------- HERO TITLE --------------------- */}
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className={`${gabarito.className} text-center capitalize font-normal`}
            style={{ fontSize: "100px", fontWeight: 500, lineHeight: "101%" }}
          >
            <span className="text-[#1e1e1e]">Solve Your </span>
            <span className="bg-gradient-to-r from-[#2200B7] to-[#0F0051] bg-clip-text text-transparent">Problems</span>
            <br />
            <span className="text-[#1e1e1e]">And </span>
            <span className="text-[#463199]">Enjoy</span>
            <span className="text-[#1e1e1e]"> The </span>
            <span className="text-[#4218FF]">Solutions</span>
          </h1>

          <p
            className={`${inter.className} text-[#1E1E1E] mt-20 mx-auto text-center capitalize`}
            style={{ fontWeight: 500, fontSize: "34px", lineHeight: "100%" }}
          >
            The Number One Algerian Platform For Solving Companies Problems, Finding Multiple Solutions And Discovering Problem Solvers From All Over Algeria
          </p>

          {/* --------------------- CTA BUTTONS --------------------- */}
          <div className="flex justify-center gap-16 mt-16">
            <button
              className={`${inter.className} w-72 px-10 py-5 rounded-2xl text-white shadow-[0_4px_60px_#D1C3FF] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 transition capitalize text-[22px] font-semibold`}
              style={{
                backgroundImage: `linear-gradient(#4218FF, #280E99), linear-gradient(90deg, #FFFFFF, #3C16E7)`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "4px solid transparent",
              }}
            >
              Post Problem
            </button>

            <button
              className={`${inter.className} w-72 px-10 py-5 rounded-2xl text-black shadow-[0_4px_20px_#D1C3FF] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300 transition capitalize text-[22px] font-semibold`}
            >
              Solve Problems
            </button>
          </div>

          {/* --------------------- HERO IMAGE --------------------- */}
          <div className="max-w-4xl mx-auto mt-20 flex justify-center">
            <img src="./Mask group.svg" alt="Laptop mockup" className="w-full max-w-4xl h-auto" />
          </div>
        </div>

        {/* --------------------- CONNECT & SOLVE --------------------- */}
        <section className="max-w-4xl mx-auto text-center mt-24 space-y-72">
          <div
            className={`${gabarito.className} flex flex-row justify-center items-center mb-6 capitalize`}
            style={{ fontWeight: 500, fontSize: "120px", lineHeight: "100%" }}
          >
            <span className="text-[#1e1e1e]">Connect </span>
            <img src="./Frame 1000006675.svg" alt="Et" className="h-[1em] mx-4" />
            <span className="text-[#4218ff]">Solve</span>
          </div>

          <p
            className={`${inter.className} capitalize text-center text-[#1E1E1E] mt-16`}
            style={{ fontWeight: 500, fontSize: "25px", lineHeight: "100%", letterSpacing: "5%" }}
          >
            Connect With Top Developers To Solve Your Tech Challenges Through Competitive, Hackathon-Style Solutions.
          </p>
        </section>

        {/* --------------------- WHO ARE FIXILI --------------------- */}
        <section className="flex flex-col items-center justify-center mt-64 space-y-5">
          <h3
            className={`${gabarito.className} capitalize text-center text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "60px", lineHeight: "101%" }}
          >
            who are <span className="text-[#4218FF]">fixili</span> ?
          </h3>

          <h4
            className={`${inter.className} capitalize text-center mx-auto text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "24px", lineHeight: "101%", maxWidth: "850px" }}
          >
            We offer a platform where companies can post real-world tech problems, and individuals or teams compete to solve them in a hackathon-style environment, with prizes or rewards at the end.
          </h4>

          {/* --------------------- STATS --------------------- */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 py-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${gabarito.className} text-black capitalize`} style={{ fontWeight: 500, fontSize: "32px", lineHeight: "100%" }}>
                  +<CountUp end={stat.value} duration={3} separator="," />
                  {stat.suffix}
                </div>
                <div
                  className={`${gabarito.className} mt-2 text-[#8F7FFF] hover:text-[#4218FF] transition`}
                  style={{ fontWeight: 500, fontSize: "32px", lineHeight: "100%", textTransform: "capitalize" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------- FEATURES PROBLEMS --------------------- */}
        <section className="flex flex-col items-center justify-center mt-72 space-y-5">
          <h3
            className={`${gabarito.className} capitalize text-center text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "60px", lineHeight: "101%" }}
          >
            Features <span className="text-[#4218FF]">Problems</span> ?
          </h3>

          <h4
            className={`${inter.className} capitalize text-center mx-auto text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "24px", lineHeight: "101%", maxWidth: "850px" }}
          >
            high impact problems from leading companies
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-4">
            {cardsData.map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-[0_4px_20px_#D1C3FF] p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 border"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-black">{card.company}</h4>
                      <p className="text-sm text-gray-500">⭐ {card.field}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs font-semibold rounded-full px-3 py-1">{card.budget}</span>
                </div>

                <h3
                  className={`${inter.className} text-[#1e1e1e] mb-2`}
                  style={{ fontWeight: 600, fontSize: "22px", textTransform: "capitalize" }}
                >
                  <span className="text-[#4218FF]">AI-Powered</span>{" "}
                  {card.title.replace("AI-Powered", "").trim()}
                </h3>

                <p
                  className={`${inter.className} text-[#1E1E1E] mb-4`}
                  style={{ fontWeight: 500, fontSize: "18px", lineHeight: "18px", textTransform: "capitalize" }}
                >
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {card.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <div>{card.views} Views</div>
                  <div>{card.bookmarks} Bookmarks</div>
                  <div className="text-red-500">{card.daysLeft} Days Left</div>
                </div>

                <button
                  className={`${inter.className} w-full rounded-xl bg-gradient-to-r from-[#4218FF] to-[#280E99] text-white py-3 shadow hover:opacity-90 transition`}
                  style={{ fontWeight: 500, fontSize: "22px", textTransform: "capitalize" }}
                >
                  View Problem
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------- WHY FIXILI --------------------- */}
        <section className="space-y-5 mt-32 pb-10">
          <h3
            className={`${gabarito.className} capitalize text-center text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "60px", lineHeight: "101%" }}
          >
            why <span className="text-[#4218FF]">fixili</span> ?
          </h3>

          <h4
            className={`${inter.className} capitalize text-center mx-auto text-[#1E1E1E]`}
            style={{ fontWeight: 500, fontSize: "24px", lineHeight: "101%", maxWidth: "850px" }}
          >
            Our platform empowers companies to post real-world technical challenges, and invites skilled developers or teams to compete in a hackathon-style environment to solve them. In return, participants gain recognition, experience, and rewards or cash prizes—while companies receive high-quality, tailored solutions.
          </h4>
        </section>
      </main>
    </div>
  );
}
