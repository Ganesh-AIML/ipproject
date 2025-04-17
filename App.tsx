import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { QuizCard } from './components/QuizCard';
import { questions } from './data/questions';
import { QuizState } from './types';
import { Trophy, RotateCcw, Zap, Target, Award } from 'lucide-react';

const INITIAL_TIME = 30; // seconds per question

function App() {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    timeRemaining: INITIAL_TIME,
    selectedAnswer: null,
    isAnswered: false,
    isFinished: false,
    difficulty: 'all',
    streak: 0,
    highScore: 0
  });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      setState(prev => ({ ...prev, highScore: parseInt(savedHighScore, 10) }));
    }
  }, []);

  useEffect(() => {
    if (state.timeRemaining > 0 && !state.isAnswered && !state.isFinished) {
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (state.timeRemaining === 0 && !state.isAnswered) {
      handleAnswer(-1);
    }
  }, [state.timeRemaining, state.isAnswered]);

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    const newScore = isCorrect ? state.score + 1 : state.score;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newHighScore = Math.max(state.highScore, newScore);

    if (newHighScore > state.highScore) {
      localStorage.setItem('quizHighScore', newHighScore.toString());
    }

    setState(prev => ({
      ...prev,
      score: newScore,
      streak: newStreak,
      highScore: newHighScore,
      selectedAnswer: selectedIndex,
      isAnswered: true,
    }));

    setTimeout(() => {
      if (state.currentQuestionIndex < questions.length - 1) {
        setState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeRemaining: INITIAL_TIME,
          selectedAnswer: null,
          isAnswered: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isFinished: true,
        }));
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      timeRemaining: INITIAL_TIME,
      selectedAnswer: null,
      isAnswered: false,
      isFinished: false,
      difficulty: 'all',
      streak: 0,
      highScore: state.highScore
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl">
        {!state.isFinished ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-4 mb-8"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-semibold">Progress</div>
                    <div>{state.currentQuestionIndex + 1}/{questions.length}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Timer timeRemaining={state.timeRemaining} />
                </div>
                
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div className="text-sm">
                    <div className="font-semibold">Score</div>
                    <div>{state.score}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div className="text-sm">
                  <span className="font-semibold">Streak:</span> {state.streak}
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <QuizCard
                key={state.currentQuestionIndex}
                question={questions[state.currentQuestionIndex]}
                selectedAnswer={state.selectedAnswer}
                isAnswered={state.isAnswered}
                onSelectAnswer={handleAnswer}
              />
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-xl">
                Your score: {state.score} out of {questions.length}
              </p>
              <p className="text-sm text-gray-600">
                High score: {state.highScore}
              </p>
              {state.score === questions.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 font-semibold"
                >
                  Perfect Score! 🎉
                </motion.div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;