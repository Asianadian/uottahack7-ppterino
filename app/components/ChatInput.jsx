import { useState } from "react";

export default function PepperoniPrompt() {
  const [prompt, setPrompt] = useState("Hello");
  const [image, setImage] = useState(null);

  const [script, setScript] = useState(`
    Sprite: A Global Icon of Refreshment
    Sprite is a clear, lemon-lime-flavored soft drink that has become a household name worldwide. Known for its crisp, refreshing taste, Sprite is a caffeine-free alternative to cola beverages and has captured the hearts of millions. First introduced by The Coca-Cola Company in 1961, Sprite was designed to compete with the already popular 7-Up. The drink’s name is rooted in Coca-Cola’s advertising history, inspired by the “Sprite Boy” character used in campaigns during the 1940s and 50s. Today, Sprite is one of the most recognized and widely consumed soft drinks globally.

    The history of Sprite is a story of growth and innovation. Launched in the United States in 1961, Sprite quickly became a favorite among consumers for its unique lemon-lime flavor. By the 1970s, it had secured its position as the leading lemon-lime soda in the U.S. and began to expand internationally. In the 1980s, Sprite gained global recognition, spreading to markets across Europe, Asia, and Africa. Its bold marketing strategies in the 2000s, which focused on youth culture and urban influence, solidified its place as a modern and dynamic brand. Today, Sprite is sold in over 190 countries, making it one of Coca-Cola’s most successful beverages.

    Over the years, Sprite has introduced a wide range of flavors to cater to diverse consumer preferences. While the original lemon-lime flavor remains the most popular, the brand has experimented with innovative variations. Sprite Zero Sugar offers a sugar-free option for health-conscious consumers, while Sprite Cranberry has become a seasonal favorite, particularly during the holidays. Other unique flavors include Sprite Tropical Mix, which combines tropical fruit notes, and regional specialties like Sprite Cucumber in Eastern Europe and Russia or Sprite Ice in parts of Asia. Limited-edition offerings such as Sprite Lymonade (a blend of lemon-lime and lemonade) further highlight the brand’s commitment to innovation and catering to local tastes.

    Sprite’s success is not just about its flavor but also its groundbreaking marketing strategies. The brand’s campaigns have consistently targeted younger audiences, emphasizing individuality, creativity, and authenticity. Taglines like “Obey Your Thirst” in 1994 encouraged self-expression, while the 2019 campaign “Thirst for Yours” celebrated the power of creativity. Sprite’s association with hip-hop culture has been particularly notable, with collaborations featuring major artists and sponsorships of events that resonate with its core audience. Additionally, partnerships with celebrities like basketball legends Kobe Bryant and LeBron James have further cemented its cultural relevance. Region-specific marketing, including festive packaging and local influencers, ensures Sprite’s connection with audiences across the globe.

    Beyond its history and marketing, Sprite has some fascinating characteristics that have made it a staple in households worldwide. Unlike many other soft drinks, Sprite is caffeine-free, making it an ideal choice for those seeking a refreshing beverage without the stimulant effects. Its fizzy and tangy flavor complements spicy foods, making it especially popular in regions like Asia and Latin America. Sprite is also a favorite mixer in cocktails and mocktails, owing to its versatility. Furthermore, in recent years, Sprite has taken steps toward sustainability by introducing bottles made from 100% recycled plastic in certain markets, showcasing the brand’s commitment to environmental responsibility.

    In conclusion, Sprite has grown from a simple lemon-lime soda into a global icon of refreshment and cultural significance. Its innovative flavors, bold marketing campaigns, and adaptability to diverse markets have ensured its relevance over the decades. As one of Coca-Cola’s flagship products, Sprite continues to dominate the lemon-lime soda market and remains a beloved beverage for people around the world.
  `);

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = async(e) => {
    e.preventDefault();
    if (e.key === "Enter" && prompt.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/pptx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            prompt: prompt,
            script: script
          }),
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
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (prompt.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/pptx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            prompt: prompt,
            script: script
          }),
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
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100">
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
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Input your pepperoni and we'll make a ppteroni together
        </h1>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
