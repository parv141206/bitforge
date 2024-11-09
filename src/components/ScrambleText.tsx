import { useEffect, useState } from "react";

const ScrambleText = () => {
  useEffect(() => {
    function hackerlook(message: String, speed: number) {
      let newMessage: Array<String> = [];
      let abcd = "abcdefghijklmnopqrstuvwxyz";
      let messageArray: Array<String> = message.split("");
      let i = 0;
      let j = 0;
      const text: HTMLElement | null = document.getElementById("main-title");
      function updateMessage() {
        newMessage[i] = abcd.charAt(Math.floor(Math.random() * 26));
        if (text) {
          text.innerText = newMessage.join("");
        }
        j++;
        if (j === 5) {
          newMessage[i] = messageArray[i];
          i++;
          j = 0;
        }
        if (i === messageArray.length) {
          clearInterval(interval);
          if (text) {
            text.innerText = newMessage.join("");
          }
        }
      }

      let interval = setInterval(updateMessage, speed);
    }
    hackerlook("Circuit Sim", 50);
  }, []);
  return (
    <div className="flex gap-1">
      <div
        id="main-title"
        className="text-center text-3xl font-extrabold md:text-start md:text-7xl "
      ></div>
    </div>
  );
};

export default ScrambleText;
