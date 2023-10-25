import React, { useEffect } from "react";
import "./randomletter.css";

export default function RandomLetters() {
  const letters = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЮЯ";
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      const randomFont = Math.random() * 100;

      const letterElement = document.createElement("div");
      letterElement.className = "random-letter";
      letterElement.textContent = randomLetter;
      letterElement.style.left = `${randomX}px`;
      letterElement.style.top = `${randomY}px`;
      letterElement.style.fontSize = `${randomFont}px`;

      document.body.appendChild(letterElement);

      setTimeout(() => {
        document.body.removeChild(letterElement);
      }, 6000);
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return null;
}
