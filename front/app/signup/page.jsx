"use client";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";
import React from "react";
import { api } from "@/data";

// Icons
function GoogleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 15.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
      <path d="M12 2v1.5" />
      <path d="M12 20.5V22" />
      <path d="M4.929 4.929l1.06 1.06" />
      <path d="M18.01 18.01l1.06 1.06" />
      <path d="M2 12h1.5" />
      <path d="M20.5 12H22" />
      <path d="M4.929 19.071l1.06-1.06" />
      <path d="M18.01 5.99l1.06-1.06" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
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

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 bg-[#4218ff] lg:block" />
      <div className="flex flex-1 items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-[#121619]">
            Sign <span className="text-[#4218ff]">Up</span>
          </h1>

          <form className="space-y-7" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium text-[#21272a]"
                >
                  First Name
                </label>
                <InputText
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                  className="w-full border-0 bg-[#f1ecff] py-2 px-3 placeholder:text-[#697077] focus:ring-2 focus:ring-[#4218ff]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium text-[#21272a]"
                >
                  Last Name
                </label>
                <InputText
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="w-full border-0 bg-[#f1ecff] py-2 px-3 placeholder:text-[#697077] focus:ring-2 focus:ring-[#4218ff]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#21272a]"
              >
                Email
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border-0 bg-[#f1ecff] py-2 px-3 placeholder:text-[#697077] focus:ring-2 focus:ring-[#4218ff]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#21272a]"
              >
                Password
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                inputClassName="w-full border-0 bg-[#f1ecff] py-2 px-3 placeholder:text-[#697077] focus:ring-2 focus:ring-[#4218ff]"
                toggleMask
                feedback={false}
              />
            </div>

            <Button
              type="submit"
              label={loading ? "Signing Up..." : "Sign Up"}
              className="w-full bg-[#4218ff] py-3 text-sm font-semibold text-white hover:bg-[#4218ff]/90 border-0"
              disabled={loading}
            />

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && (
              <div className="text-green-600 text-sm mt-2">
                Signup successful!
              </div>
            )}
          </form>

          <div className="relative flex items-center justify-center my-4">
            <span className="w-full border-t border-[#dde1e6]" />
            <span className="absolute bg-white px-2 text-sm text-[#697077]">
              or
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              outlined
              className="w-full border-[#4218ff] py-3 text-[#4218ff] bg-transparent hover:bg-[#f1ecff]"
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Log In With Google
            </Button>
            <Button
              outlined
              className="w-full border-[#4218ff] py-3 text-[#4218ff] bg-transparent hover:bg-[#f1ecff]"
            >
              <GithubIcon className="mr-2 h-5 w-5" />
              Log In With Github
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-[#b9a3ff]">
              Already have an account?{" "}
              <Link
                href="#"
                className="font-medium text-[#4218ff] hover:underline"
                prefetch={false}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
