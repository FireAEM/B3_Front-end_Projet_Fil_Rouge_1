import React from "react";

function Hero({ title, description, onDiscover, onWatchVideo, onAddToList }) {
    return (
        <section className="hero d-flex align-items-center w-100 vh-100 overflow-hidden text-light">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 hero-content">
                        <h1 className="display-1 fw-bold text-shadow" id="hero-title">
                            {title}
                        </h1>
                        <p className="lead text-shadow mb-4" id="hero-description">
                            {description}
                        </p>
                        <div className="d-grid gap-3 d-md-flex hero-actions">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={onDiscover}
                            >
                                Découvrir
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                onClick={onWatchVideo}
                            >
                                Voir la vidéo
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={onAddToList}
                            >
                                Ajouter à ma liste
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;