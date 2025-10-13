import React from "react";

function QuizResults({ score, total, userAnswers, questions, onRestart }) {
    const getMessage = () => {
        if (score <= 3) return "Vous devriez regarder plus de films ! 🎬";
        if (score <= 6) return "Pas mal ! Un vrai amateur de cinéma 🍿";
        if (score <= 8) return "Excellent ! Vous êtes un cinéphile confirmé 🌟";
        return "Parfait ! Vous êtes un expert du 7ème art ! 🏆";
    };

    return (
        <div className="quiz-results my-5">
            <h1 className="text-center mb-5 fw-bold">
                Vous avez obtenu {score}/{total} !
            </h1>
            <h2 className="text-center mb-5">{getMessage()}</h2>

            <div className="list-group mb-5 gap-3 rounded-4">
                {questions.map((q, idx) => {
                    const userAnswer = userAnswers[idx];
                    const isCorrect = userAnswer === q.correctAnswer;
                    return (
                        <div
                            key={q.id}
                            className={`list-group-item rounded-4 ${isCorrect ? "list-group-item-success" : "list-group-item-warning"
                                }`}
                        >
                            <h3 className="mb-1 fs-5 fw-bold">{q.question}</h3>
                            <p className="mb-1 fw-light">
                                Votre réponse :{" "}
                                <span className={`fw-light ${isCorrect ? "text-success" : "text-danger"}`}>
                                    {userAnswer || "Aucune"}
                                </span>
                            </p>
                            {!isCorrect && (
                                <p className="mb-0 fw-light">
                                    Bonne réponse : <span className="text-success fw-light">{q.correctAnswer}</span>
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary" onClick={onRestart}>
                    Recommencer le quiz
                </button>
                <a href="/" className="btn btn-secondary">
                    Retour à l'accueil
                </a>
            </div>
        </div>
    );
}

export default QuizResults;