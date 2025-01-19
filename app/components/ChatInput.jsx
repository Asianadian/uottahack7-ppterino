import { useState } from "react";

export default function PepperoniPrompt() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/pptx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (response.ok) {
        const blob = await response.blob()
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); // Create an <a> element
        a.href = url;
        a.download = 'res.pptx'; // Set the filename for the downloaded file
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Remove the element after triggering the download
        window.URL.revokeObjectURL(url); // Clean up the object URL
      } else {
        console.log("No response")
      }
    } 
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Floating pizza image */}
      <div
        className="absolute top-20 left-1/2 w-24 h-24"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <img
          src="../pizza.png"
          alt="Floating Pizza"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Input your pepperoni and we'll make a ppteroni together
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="imageUpload"
              className="block font-medium mb-1 text-gray-700"
            >
              Upload an image:
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-900
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-pink-200 file:text-pink-700
                hover:file:bg-pink-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="promptInput"
              className="block font-medium mb-1 text-gray-700"
            >
              Prompt:
            </label>
            <input
              type="text"
              id="promptInput"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter your prompt here"
              className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-pink-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-full py-2 transition-colors"
          >
            Submit
          </button>
        </form>

        {image && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Preview:
            </h3>
            <img
              src={URL.createObjectURL(image)}
              alt="Pepperoni Preview"
              className="w-full rounded-md shadow-md"
            />
          </div>
        )}
      </div>

      {/* Keyframes for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -20px) rotate(15deg);
          }
          100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
