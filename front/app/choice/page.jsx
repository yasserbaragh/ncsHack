"use client";
import { Users, Building2, User, Shield } from "lucide-react";
import { Inter, Gabarito } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], weight: "500" });
const inter = Inter({ subsets: ["latin"], weight: "500" });

export default function ProblemSolverLanding() {
  function LoginButton({ icon: Icon, label, href }) {
    return (
      <a
        href={href}
        className="w-full h-16 inline-flex items-center justify-center bg-[#4218ff] hover:bg-[#a58eff] text-white text-xl font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        aria-label={`Login as ${label}`}
      >
        <Icon className="w-6 h-6 mr-3" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] to-[#FAFBFE] relative overflow-hidden">
      {/* Header */}
      <header className="pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-16">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-[#4218FF]" aria-hidden="true" />
            </div>
            <span
              className={`${inter.className} text-[#4218ff] capitalize`}
              style={{
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Hire More Than +15000 Problem Solver
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 text-center">
        {/* Hero Title */}
        <div className="mb-20">
          <h1
            className={`${gabarito.className} text-center capitalize font-normal`}
            style={{
              fontSize: "100px",
              fontWeight: 500,
              lineHeight: "101%",
              letterSpacing: "0%",
            }}
          >
            <span className="text-[#1e1e1e]">Solve Your </span>
            <span className="bg-gradient-to-r from-[#2200B7] to-[#0F0051] bg-clip-text text-transparent">
              Problems
            </span>
            <br />
            <span className="text-[#1e1e1e]">And </span>
            <span className="text-[#463199]">Enjoy</span>
            <span className="text-[#1e1e1e]"> The </span>
            <span className="text-[#4218FF]">Solutions</span>
          </h1>
        </div>

        {/* Login Section */}
        <div className="max-w-md mx-auto">
          <h2
            className={`${gabarito.className} text-center text-[#1E1E1E] capitalize mb-8`}
            style={{
              fontWeight: 500,
              fontSize: "60px",
              lineHeight: "101%",
              letterSpacing: "0%",
            }}
          >
            Login <span className="text-[#4218FF]">As</span>
          </h2>

          <div className="space-y-4">
            <LoginButton icon={User} label="Problem Solver" href="/login/problem-solver" />
            <LoginButton icon={Building2} label="Company" href="/login/company" />
          </div>
        </div>
      </main>

      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#4218ff] rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#b9a3ff] rounded-full opacity-30 blur-lg"></div>
    </div>
  );
}
