import React, { useState } from "react";
import quizQuestions from "../data/quizQuestions";
import QuizStart from "../components/QuizStart";
import QuizQuestion from "../components/QuizQuestion";
import QuizResults from "../components/QuizResults";

function Quiz() {
    const [step, setStep] = useState("start"); // "start" | "quiz" | "results"
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleStart = () => {
        setStep("quiz");
        setCurrentIndex(0);
        setUserAnswers([]);
    };

    const handleSelect = (answer) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentIndex] = answer;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentIndex + 1 < quizQuestions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setStep("results");
        }
    };

    const handleRestart = () => {
        setStep("start");
        setCurrentIndex(0);
        setUserAnswers([]);
    };

    const score = userAnswers.filter(
        (answer, idx) => answer === quizQuestions[idx].correctAnswer
    ).length;

    return (
        <div className="container py-5">
            {step === "start" && <QuizStart onStart={handleStart} />}

            {step === "quiz" && (
                <QuizQuestion
                    question={quizQuestions[currentIndex].question}
                    options={quizQuestions[currentIndex].options}
                    currentIndex={currentIndex}
                    total={quizQuestions.length}
                    selectedAnswer={userAnswers[currentIndex]}
                    onSelect={handleSelect}
                    onNext={handleNext}
                />
            )}

            {step === "results" && (
                <QuizResults
                    score={score}
                    total={quizQuestions.length}
                    userAnswers={userAnswers}
                    questions={quizQuestions}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}

export default Quiz;