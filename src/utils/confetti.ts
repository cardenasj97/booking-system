import confetti from "canvas-confetti";

export const showConfetti = () => {
  // First burst with various colors
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff5e84", "#f6c6ea", "#a288e3", "#ccdbfd"],
  });

  // Second burst after a small delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
      colors: ["#ffb6c1", "#f08080", "#ff69b4", "#c71585"],
    });
  }, 250);

  // Third burst from the right
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
      colors: ["#89cff0", "#00bfff", "#1e90ff", "#0000ff"],
    });
  }, 400);
};
