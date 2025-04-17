import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';
import { AlertCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
}) => {
  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-100 border-green-500';
    }
    
    if (selectedAnswer === index) {
      return 'bg-red-100 border-red-500';
    }
    
    return 'opacity-50';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: !isAnswered ? 1.01 : 1 }}
            whileTap={{ scale: !isAnswered ? 0.99 : 1 }}
            onClick={() => !isAnswered && onSelectAnswer(index)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 
              ${getOptionClass(index)}`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {isAnswered && question.explanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};