import { useEffect } from "react";

const ScrambleText = () => {
  useEffect(() => {
    function hackerlook(message: string, speed: number) {
      const abcd = "abcdefghijklmnopqrstuvwxyz";
      const messageArray = message.split("");
      let currentIndex = 0;
      let scrambleCount = 0;
      let scrambledMessage = Array(message.length).fill(" "); // Initialize with spaces

      const textElement = document.getElementById("main-title");

      function updateMessage() {
        // Replace a character with a random one
        if (currentIndex < messageArray.length) {
          scrambledMessage[currentIndex] = abcd.charAt(
            Math.floor(Math.random() * abcd.length)
          );
          if (textElement) {
            textElement.innerText = scrambledMessage.join("");
          }

          scrambleCount++;

          // After 5 scrambles, replace with the actual character
          if (scrambleCount === 5) {
            scrambledMessage[currentIndex] = messageArray[currentIndex];
            currentIndex++;
            scrambleCount = 0;
          }
        }

        // Stop when the entire message has been revealed
        if (currentIndex === messageArray.length) {
          if (textElement) {
            textElement.innerText = message; // Final output
          }
          return; // Stop the animation
        }

        // Request the next frame
        requestAnimationFrame(updateMessage);
      }

      // Start the scrambling effect
      updateMessage();
    }

    hackerlook("Circuit Sim", 25);
  }, []);

  return (
    <div className="flex gap-1">
      <div
        id="main-title"
        className="text-center text-4xl font-extrabold md:text-start md:text-7xl"
      ></div>
    </div>
  );
};

export default ScrambleText;
