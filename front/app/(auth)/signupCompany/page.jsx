"use client";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";
import React from "react";
import { api } from "@/data";
import { Gabarito, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "600" });
const gabarito = Gabarito({ subsets: ["latin"], weight: "500" });

function GithubIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="#4218FF"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path d="M21.35 11.1H12V13.91H17.91C17.26 16.08 15.29 17.64 12.98 17.64C10.17 17.64 7.89 15.41 7.89 12.56C7.89 9.71 10.17 7.48 12.98 7.48C14.39 7.48 15.62 8.01 16.53 8.85L18.58 6.85C17.01 5.41 15.07 4.5 12.98 4.5C8.55 4.5 5 8.04 5 12.56C5 17.07 8.55 20.62 12.98 20.62C17.21 20.62 20.62 17.29 20.62 12.56C20.62 11.97 20.54 11.52 20.44 11.1H21.35Z" />
    </svg>
  );
}

export default function SignUpPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role] = React.useState("client");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const labelClass = `${inter.className} text-[18px] font-[600] leading-[100%] tracking-[0] capitalize text-[#21272a]`;
  const inputPlaceholderClass = `${inter.className} placeholder:text-[#697077]`;

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 bg-[#D9D9D9] lg:block" />
      <div className="flex flex-1 items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <h1 className={`text-[#121619] text-[76px] leading-[100%] font-[500] capitalize ${gabarito.className}`} style={{ letterSpacing: "0%" }}>
            Sign <span className="text-[#4218ff]">Up</span>
          </h1>

          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="Company name" className={labelClass}>Company name</label>
                <InputText id="Company-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your company name" required className={`w-full border-0 bg-[#f1ecff] text-black rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#4218ff] ${inputPlaceholderClass}`} />
              </div>
              <div className="space-y-2">
                <label htmlFor="Company-field" className={labelClass}>Company Field</label>
                <InputText id="Company-field" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your field" required className={`w-full border-0 bg-[#f1ecff] text-black rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#4218ff] ${inputPlaceholderClass}`} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className={labelClass}>Professional Email</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className={`w-full border-0 bg-[#f1ecff] text-black rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#4218ff] ${inputPlaceholderClass}`} />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className={labelClass}>Location</label>
                <InputText id="location" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your location" required className={`w-full border-0 bg-[#f1ecff] text-black rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#4218ff] ${inputPlaceholderClass}`} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={labelClass}>Password</label>
              <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required inputClassName={`w-full border-0 bg-[#f1ecff] rounded-lg text-black py-2 px-3 focus:ring-2 focus:ring-[#4218ff] ${inputPlaceholderClass}`} toggleMask feedback={false} />
            </div>

            <Button type="submit" label={loading ? "Signing Up..." : "Sign Up"} className={`w-full bg-[#4218ff] rounded-xl py-3 text-lg font-semibold text-white hover:bg-[#4218ff]/90 border-0 ${inter.className}`} disabled={loading} />

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">Signup successful!</div>}
          </form>

          <div className="relative flex items-center justify-center my-4">
            <span className="w-full border-t border-[#dde1e6]" />
            <span className="absolute bg-white px-2 text-sm text-[#697077]">or</span>
          </div>

          <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${inter.className}`}>
            <Button outlined className="p-4 w-full border-2 border-[#4218ff] rounded-xl py-3 text-[#4218ff] bg-transparent hover:bg-[#f1ecff]">
              <GoogleIcon className="mr-2" />
              Log In With Google
            </Button>
            <Button outlined className="p-4 w-full border-2 border-[#4218ff] rounded-xl py-3 text-[#4218ff] bg-transparent hover:bg-[#f1ecff]">
              <GithubIcon className="mr-2" />
              Log In With Github
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-[#b9a3ff]">
              Already have an account?{' '}
              <Link href="#" className="font-medium text-[#4218ff] hover:underline" prefetch={false}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
