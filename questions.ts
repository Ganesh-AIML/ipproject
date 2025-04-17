import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "Paris has been France's capital since 508 CE."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Mars appears red due to iron oxide (rust) on its surface."
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: "The Pacific Ocean covers approximately 63 million square miles."
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Au comes from the Latin word for gold, 'aurum'."
  }
];