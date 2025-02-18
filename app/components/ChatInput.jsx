import { useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function PepperoniPrompt() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [transcription, setTranscription] = useState(null);

  const [script, setScript] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImage(file);
      const fileURL = URL.createObjectURL(file);
      setImageUrl(fileURL);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleScriptChange = (e) => {
    setScript(e.target.value);
  };

  const handleRecordingComplete = async (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(url)
    setTranscription(blob);
    console.log(blob)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image, 'image.png');
    if (transcription != null) {
      formData.append('file', transcription, 'transcription.m4a');
    };
    formData.append('prompt', prompt)
    formData.append('script', script)
    formData.append('imgUrl', imageUrl)

    try {
      const response = await fetch("http://localhost:5000/api/pptx", {
        method: "POST",
        body: formData,
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
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Floating pizza image */}
      <div
        className="absolute top-20 left-1/2 w-24 h-24"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        {/* <img
          src="../pizza.png"
          alt="Floating Pizza"
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Form Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md shadow-md rounded-lg p-6 max-h-[80vh] overflow-y-auto">
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
          {image && (
              <div className="mt-2 mb-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Pepperoni Preview"
                  className="w-full rounded-md shadow-md"
                />
              </div>
            )}

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
              style={{marginBottom:10}}
            />
            
            <AudioRecorder
              onRecordingComplete={handleRecordingComplete}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true
              }}
              onNotAllowedOrFound={(err) => console.table(err)}
              downloadOnSavePress={false}
              downloadFileExtension="m4a"
              mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
              }}
              // showVisualizer={true}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="scriptInput"
              className="block font-medium mb-1 text-gray-700"
            >
              Script:
            </label>
            <textarea
              id="scriptInput"
              value={script}
              onChange={handleScriptChange}
              placeholder="Enter your script here"
              rows={5}
              className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-pink-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-full py-2 transition-colors"
          >
            Submit
          </button>
        </form>
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
