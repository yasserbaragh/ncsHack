"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";

// Custom Icons
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-[#4f46e5]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default function PostProblemPage() {
  const [deadline, setDeadline] = useState(null);

  const uploadHeaderTemplate = (options) => {
    return <div />; // Hides the default header
  };

  const uploadEmptyTemplate = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <FileIcon />
        <p className="mt-4 text-lg text-gray-700">Drop Files Here</p>
        <p className="text-sm text-gray-500">
          Or Click{" "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-semibold text-[#4f46e5]"
          >
            Add Files
          </a>
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#111827]">
      <header className="container mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">logo</div>
        <nav className="hidden md:flex items-center space-x-8 text-gray-600">
          <a href="#" className="hover:text-[#4f46e5]">
            Browse
          </a>
          <a href="#" className="hover:text-[#4f46e5]">
            Companies
          </a>
          <a href="#" className="hover:text-[#4f46e5]">
            Solvers
          </a>
          <a href="#" className="hover:text-[#4f46e5]">
            Populaire
          </a>
        </nav>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">Profile</span>
          <Avatar
            icon="pi pi-user"
            size="large"
            shape="circle"
            className="bg-gray-200 text-gray-600 border-2 border-[#4f46e5]"
          />
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: File Upload */}
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <FileUpload
              name="problemFiles"
              multiple
              accept="image/*,application/pdf"
              maxFileSize={1000000}
              headerTemplate={uploadHeaderTemplate}
              emptyTemplate={uploadEmptyTemplate}
              className="h-full custom-fileupload"
            />
          </div>

          {/* Right Side: Form */}
          <div>
            <h1 className="text-4xl font-bold">
              Post Your <span className="text-[#4f46e5]">Problem</span>
            </h1>
            <p className="mt-2 text-gray-500">
              Let Us Know What Issue You're Facing
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="companyName" className="mb-2 font-medium">
                    Company Name
                  </label>
                  <InputText
                    id="companyName"
                    placeholder="Placeholder"
                    className="bg-[#f5f3ff] border-0 p-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="problemName" className="mb-2 font-medium">
                    Problem Name
                  </label>
                  <InputText
                    id="problemName"
                    placeholder="Placeholder"
                    className="bg-[#f5f3ff] border-0 p-3"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="mb-2 font-medium">
                  Description
                </label>
                <InputTextarea
                  id="description"
                  placeholder="Placeholder"
                  rows={5}
                  className="bg-[#f5f3ff] border-0 p-3"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="deadline" className="mb-2 font-medium">
                    Deadline
                  </label>
                  <Calendar
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.value)}
                    showIcon
                    placeholder="14/06/2025"
                    className="bg-[#f5f3ff] rounded-md custom-calendar"
                    inputClassName="bg-[#f5f3ff] border-0 p-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="prizeAmount" className="mb-2 font-medium">
                    Prize Amount
                  </label>
                  <InputText
                    id="prizeAmount"
                    placeholder="Placeholder"
                    className="bg-[#f5f3ff] border-0 p-3"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-end">
                <div className="flex flex-col">
                  <label htmlFor="test" className="mb-2 font-medium">
                    Test
                  </label>
                  <div className="flex items-center p-3 border border-[#4f46e5] rounded-md text-[#4f46e5]">
                    <ClockIcon />
                    <span>Timed Qcm</span>
                  </div>
                </div>
                <Button
                  label="Submit"
                  className="bg-[#4f46e5] border-0 w-full md:w-auto justify-self-start p-3"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <style jsx global>{`
        .p-button {
          border-radius: 8px;
        }
        .p-inputtext,
        .p-inputtextarea {
          border-radius: 8px;
        }
        .p-calendar .p-inputtext {
          border-radius: 8px;
        }
        .custom-calendar .p-inputtext {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .custom-calendar .p-datepicker-trigger {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background: #f5f3ff;
          color: #6b7280;
          border: 0;
        }
        .custom-fileupload .p-fileupload-content {
          padding: 0;
          height: 300px;
        }
        .p-fileupload-empty {
          height: 100%;
        }
      `}</style>
    </div>
  );
}
