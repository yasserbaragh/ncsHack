"use client";

// Mock data simulating a backend response
const testData = {
  testName: "Test Name",
  questions: [
    {
      id: 1,
      title: "1-Question",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      id: 2,
      title: "2-Question",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      id: 3,
      title: "3-Question",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      id: 4,
      title: "4-Question",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      id: 5,
      title: "5-Question",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      id: 6,
      title: "6-Question",
      choices: ["Choice 1"], // This question is editable in the UI
      isEditable: true,
    },
  ],
};

// --- Reusable Components & Icons ---

const Header = () => (
  <header className="container mx-auto px-8 py-4 flex justify-between items-center">
    <div className="text-2xl font-bold text-gray-800">logo</div>
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
      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-[#4f46e5]" />
    </div>
  </header>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
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

const PlusCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AddChoiceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-2 text-[#4f46e5]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const QuestionCard = ({ question }) => (
  <div className="bg-white rounded-lg p-4">
    <div className="bg-[#f5f3ff] rounded-md p-3 font-semibold text-gray-700">
      {question.title}
    </div>
    <ul className="mt-4 space-y-3 pl-2">
      {question.choices.map((choice, index) => (
        <li key={index} className="flex items-center text-gray-800">
          <span className="w-2 h-2 bg-[#4f46e5] rounded-full mr-3" />
          {choice}
        </li>
      ))}
      {question.isEditable && (
        <>
          {[...Array(3)].map((_, i) => (
            <li
              key={i}
              className="flex items-center text-gray-500 cursor-pointer"
            >
              <AddChoiceIcon />
              Add Choice
            </li>
          ))}
        </>
      )}
    </ul>
  </div>
);

// --- Main Page Component ---

export default function ApplicationTestPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-8 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Application <span className="text-[#4f46e5]">Test</span>
          </h1>
        </div>

        <div className="mt-10 max-w-5xl mx-auto">
          <div className="flex items-center space-x-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {testData.testName}
            </h2>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-[#4f46e5]">
              <ClockIcon />
              <span>Add Deadline</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-[#4f46e5]">
              <PlusCircleIcon />
              <span>Add Question</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testData.questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8 max-w-5xl mx-auto">
          <button className="bg-[#4f46e5] text-white font-semibold py-2 px-8 rounded-lg hover:bg-opacity-90">
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
