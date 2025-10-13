import React from "react";

function QuizQuestion({
    question,
    options,
    currentIndex,
    total,
    selectedAnswer,
    onSelect,
    onNext,
}) {
    return (
        <div className="quiz-question text-center my-5">
            <h1 className="mb-5 fw-bold">
                Question {currentIndex + 1}/{total}
            </h1>
            <h2 className="mb-5">{question}</h2>

            <div className="d-flex flex-column gap-3 mb-5">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        className={`btn rounded-pill ${selectedAnswer === option ? "btn-primary" : "btn-outline-primary"
                            }`}
                        onClick={() => onSelect(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button
                className="btn btn-lg btn-success rounded-pill"
                onClick={onNext}
                disabled={!selectedAnswer}
            >
                {currentIndex + 1 === total ? "Voir mes résultats" : "Question suivante"}
            </button>
        </div>
    );
}

export default QuizQuestion;