import "./CollegesPg.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt, FaUniversity, FaGraduationCap, FaChevronRight } from "react-icons/fa";
import { GetServicesCardsFromDB } from "../../../ApiCalls/ApiCalls";

export const CollegesPage = () => {

    /* ===============================
       Data Store ⭐ (Array or undefined)
    =============================== */

    let [CollegeCrds, setCollegeCrds] = useState(undefined);

    useEffect(() => {
        window.scrollTo(0, 0);
        GetServicesCardsFromDB(setCollegeCrds, "COLLEGE");
    }, []);

    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    /* ===============================
       Rating Display ⭐
    =============================== */

    const showRating = (v) => {

        const rd = v?.ratingData;

        if (!rd || !rd.totalReviews || rd.totalReviews === 0) {
            return (
                <div className="starsCont">
                    <span className="newBadge">New</span>
                </div>
            );
        }

        const avg = Number(rd.average || 0);
        const totalReviews = Number(rd.totalReviews || 0);

        const fullStars = Math.floor(avg);
        const hasHalfStar = avg - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="starsCont">

                {Array.from({ length: fullStars }).map((_, i) => (
                    <FaStar key={`full-${i}`} className="starFilled" />
                ))}

                {hasHalfStar && <FaStarHalfAlt className="starFilled" />}

                {Array.from({ length: emptyStars }).map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="starEmpty" />
                ))}

                <span className="ratingText">
                    {avg.toFixed(1)}
                    <span className="reviewsCount">
                        ({totalReviews})
                    </span>
                </span>

            </div>
        );
    };


    if (CollegeCrds === undefined) {
    return <div className="loading-spinner">Loading Premium Institutions...</div>;
}

    return (
        <div className="edu-page-container">
            {/* TOP HEADER */}
            <header className="edu-top-header">
                <div className="header-content">
                    <div className="logo-title" onClick={() => navigate('/edu')}>
                        <FaUniversity className="header-icon" />
                        <h1>Colleges in Kohat</h1>
                    </div>
                    <div className="header-search">
                        <SearchBar SearchedInst={setCollegeCrds} AllInst={CollegeCrds} />
                    </div>
                </div>
            </header>

            <main className="edu-main-content">
                <div className="content-intro">
                    <div className="intro-badge">
                        <FaGraduationCap />
                        <span>ACADEMIC EXCELLENCE</span>
                    </div>
                    <h2>Discover Top Rated <span>Colleges</span></h2>
                    <p>Explore the best colleges near you and take the next step in your academic journey towards success.</p>
                </div>

                {/* Colleges Cards Grid */}
                <div className="edu-card-grid">
                    {CollegeCrds ? (
                        CollegeCrds.map((v, i) => (
                            <div 
                                className="edu-item-card" 
                                key={i} 
                                onClick={() => navigate(`/edu/colleges/${v.id}`)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={v.img} alt={v.serviceName || v.InstName} />
                                    {v?.ratingData?.average >= 4.5 && (
                                        <div className="featured-badge">
                                            <FaStar /> Top Rated
                                        </div>
                                    )}
                                </div>
                                <div className="card-info">
                                    {showRating(v)}
                                    <h3>{v.serviceName || v.InstName}</h3>
                                    <p className="location-text">Kohat, Pakistan</p>
                                    <p className="description-text">{v.Desc}</p>
                                    <button 
                                        className="view-details-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/edu/colleges/${v.id}`);
                                        }}
                                    >
                                        View Details
                                        <FaChevronRight className="btn-icon" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="loading-state">Loading Colleges...</div>
                    )}
                </div>
            </main>
        </div>
    );
};