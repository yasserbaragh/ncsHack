"use client";

import { Clock, FileText } from "lucide-react";
import { Gabarito } from "next/font/google";
import { Inter } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], weight: ["400"] });
const inter500 = Inter({ subsets: ["latin"], weight: ["500"] });
const inter600 = Inter({ subsets: ["latin"], weight: ["600"] });
const inter400 = Inter({ subsets: ["latin"], weight: ["400"] });

const labelStyle = {
  fontWeight: 500,
  fontSize: "19px",
  lineHeight: "100%",
  letterSpacing: "0%",
  textTransform: "capitalize",
};

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`flex items-center justify-between px-20 py-6 ${inter400.className}`}>
        <div
          className="text-[#1e1e1e]"
          style={{
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: "100%",
            textTransform: "capitalize",
          }}
        >
          logo
        </div>

        <nav className="flex items-center space-x-8">
          {["Browse", "Companies", "Solvers", "Populaire"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#1e1e1e] hover:text-[#4218ff] transition-colors"
              style={{
                fontWeight: 400,
                fontSize: "22px",
                lineHeight: "100%",
                textTransform: "capitalize",
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <span
            className="text-[#1e1e1e]"
            style={{
              fontWeight: 400,
              fontSize: "22px",
              lineHeight: "100%",
              textTransform: "capitalize",
            }}
          >
            Profile
          </span>
          <div className="w-10 h-10 bg-[#a58eff] rounded-full"></div>
        </div>
      </header>

      {/* Main */}
      <main className="mt-10">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-24">
          <div className="flex items-center justify-center mt-28 w-full lg:w-auto">
            <div className="flex flex-col items-center justify-center w-[350px] h-[400px] border-2 border-gray-300 bg-white rounded-lg text-center p-6 space-y-3 shadow-md shadow-[#00000040]">
              <FileText className="w-20 h-20 text-[#4218ff] stroke-[1.5]" />
              <p className="text-lg text-[#1e1e1e]">drop your cv here</p>
              <p className="text-[#1e1e1e]">
                Or Click{" "}
                <button className="text-[#a58eff] hover:text-[#4218ff] transition-colors underline">
                  Add Files
                </button>
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-xl">
            <div className="mr-23">
              <h1
                className={`${gabarito.className} text-[#1e1e1e] mb-2`}
                style={{
                  fontWeight: 400,
                  fontSize: "55px",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                }}
              >
                Solve Their <span className="text-[#4218ff]">Problem</span>
              </h1>
              <p
                className={`${inter500.className} text-[#1e1e1e]`}
                style={{
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                }}
              >
                Apply to solve the problem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32">
              <div>
                <label className={`${inter600.className} block text-[#1e1e1e] mb-2`} style={labelStyle}>
                  First Name
                </label>
                <input
                  placeholder="Your First Name"
                  className="w-full px-4 py-2 bg-[#f1ecff] border-none text-[#1e1e1e] rounded-md"
                />
              </div>
              <div>
                <label className={`${inter600.className} block text-[#1e1e1e] mb-2`} style={labelStyle}>
                  Second Name
                </label>
                <input
                  placeholder="Second Name"
                  className="w-full px-4 py-2 bg-[#f1ecff] border-none text-[#1e1e1e] rounded-md"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`${inter600.className} block text-[#1e1e1e] mb-2`} style={labelStyle}>
                why would you apply to solve this problem ?
              </label>
              <textarea
                placeholder="Placeholder"
                rows={6}
                className="w-[585px] px-4 py-2 bg-[#f1ecff] border-none text-[#1e1e1e] rounded-md resize-none"
              />
            </div>

            <div>
              <label className={`${inter600.className} block text-[#1e1e1e] mb-2`} style={labelStyle}>
                Github Link
              </label>
              <input
                placeholder=" your github link"
                className="w-[600px] px-4 py-2 bg-[#f1ecff] border-none text-[#1e1e1e] rounded-md"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-row items-end justify-between gap-56 mt-6 w-full">
              {/* Timer Field */}
              <div className="w-full">
                <label className={`${inter600.className} block text-[#1e1e1e] mb-2`} style={labelStyle}>
                  Test
                </label>
                <div className="relative">
                  <input
                    value="Timed Qcm"
                    readOnly
                    className="w-full pl-10 px-4 py-2 bg-[#ffff] border-2 border-[#4218FF] text-[#1e1e1e] rounded-lg"
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1e1e1e]" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="self-end">
                <button className="bg-[#4218ff] hover:bg-[#030d45] text-white px-8 py-2 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
