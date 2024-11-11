import { useEffect } from "react";

const ScrambleText = () => {
  useEffect(() => {
    function hackerlook(message: string, speed: number) {
      const abcd = "abcdefghijklmnopqrstuvwxyz";
      const messageArray = message.split("");
      let currentIndex = 0;
      let scrambleCount = 0;
      let scrambledMessage = Array(message.length).fill(" ");

      const textElement = document.getElementById("main-title");

      function updateMessage() {
        if (currentIndex < messageArray.length) {
          scrambledMessage[currentIndex] = abcd.charAt(
            Math.floor(Math.random() * abcd.length),
          );
          if (textElement) {
            textElement.innerText = scrambledMessage.join("");
          }

          scrambleCount++;

          if (scrambleCount === 5) {
            scrambledMessage[currentIndex] = messageArray[currentIndex];
            currentIndex++;
            scrambleCount = 0;
          }
        }

        if (currentIndex === messageArray.length) {
          if (textElement) {
            textElement.innerText = message;
          }
          return;
        }

        requestAnimationFrame(updateMessage);
      }

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
