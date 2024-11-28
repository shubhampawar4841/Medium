import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Publish Your Blog Post</h1>
          <input
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 transition duration-150 ease-in-out"
            placeholder="Your Title"
          />
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
              }, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              });
              navigate(`/blog/${response.data.id}`)
            }}
            type="submit"
            className="mt-6 w-full inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Publish post
          </button> 
        </div>   
      </div>
    </div>
  )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="mt-4">
      <div className="w-full mb-4">
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-300">
            <h2 className="text-sm font-semibold text-gray-700">Blog Content</h2>
          </div>
          <div className="bg-white w-full">
            <label htmlFor="editor" className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={12}
              className="block w-full px-3 py-2 text-sm text-gray-800 bg-white border-0 focus:ring-0 focus:outline-none resize-none"
              placeholder="Write your blog post here..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publish;

