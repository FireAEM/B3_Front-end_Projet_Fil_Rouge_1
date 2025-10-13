import React from "react";

function QuizStart({ onStart }) {
    return (
        <div className="quiz-start text-center my-5">
            <h1 className="mb-5 fw-bold">🎬 Quiz Cinéma - Testez vos connaissances !</h1>
            <h2 className="mb-3">10 questions sur l'univers du cinéma</h2>
            <p className="mb-5">
                Êtes-vous prêt à relever le défi ? Cliquez sur le bouton ci-dessous pour commencer !
            </p>
            <button className="btn btn-primary btn-lg" onClick={onStart}>
                Commencer le quiz
            </button>
        </div>
    );
}

export default QuizStart;