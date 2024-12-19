import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface EditorPreviewProps {
  markdown: string;
  title: string;
  setMarkdown: (value: string) => void;
  setTitle: (value: string) => void;
}

export default function EditorPreview({
  markdown,
  title,
  setMarkdown,
  setTitle,
}: EditorPreviewProps) {
  const [activeTab, setActiveTab] = useState("write");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold p-2 border border-gray-300 rounded"
      />
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 ${
            activeTab === "write"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("write")}
        >
          Write
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "preview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>
      {activeTab === "write" ? (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your markdown here..."
          className="w-full h-[500px] p-2 border border-gray-300 rounded font-mono"
        />
      ) : (
        <div className="prose max-w-none min-h-[500px] p-4 border rounded-md bg-white">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

