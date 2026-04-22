import "./SchoolPg.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt, FaUniversity, FaGraduationCap, FaChevronRight } from "react-icons/fa";
import { GetServicesCardsFromDB } from "../../../ApiCalls/ApiCalls";
export const SchoolPage = () => {

    // Data Storing;
    let [SchoolCrds, setSchoolCrds] = useState(undefined);

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0);
        GetServicesCardsFromDB(setSchoolCrds, "SCHOOL");
    }, []);


    // To maintain Responsivness [For Small Screen]
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    // Showing Real rating.
    const showRating = (v) => {
        const rd = v?.ratingData;

        // No rating yet
        if (!rd || !rd.totalReviews || rd.totalReviews === 0) {
            return (
                <div className="starsCont">
                    <span className="newBadge">New</span>
                </div>
            );
        }

        const avg = Number(rd.average || 0);
        const totalReviews = Number(rd.totalReviews || 0);

        // full stars
        const fullStars = Math.floor(avg);

        // half star if decimal >= 0.5
        const hasHalfStar = avg - fullStars >= 0.5;

        // empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="starsCont">
                {/* Full Stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <FaStar key={`full-${i}`} className="starFilled" />
                ))}

                {/* Half Star */}
                {hasHalfStar && <FaStarHalfAlt className="starFilled" />}

                {/* Empty Stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="starEmpty" />
                ))}

                {/* Average + Reviews */}
                <span className="ratingText">
                    {avg.toFixed(1)} <span className="reviewsCount">({totalReviews})</span>
                </span>
            </div>
        );
    };

    return (
        <div className="edu-page-container">
            {/* TOP HEADER */}
            <header className="edu-top-header">
                <div className="header-content">
                    <div className="logo-title" onClick={() => navigate('/edu')}>
                        <FaUniversity className="header-icon" />
                        <h1>Schools in Kohat</h1>
                    </div>
                    <div className="header-search">
                        <SearchBar SearchedInst={setSchoolCrds} AllInst={SchoolCrds} />
                    </div>
                </div>
            </header>

            <main className="edu-main-content">
                <div className="content-intro">
                    <div className="intro-badge">
                        <FaGraduationCap />
                        <span>PREMIUM EDUCATION</span>
                    </div>
                    <h2>Discover Top Rated <span>Schools</span></h2>
                    <p>Find the best educational institutions near you to ensure a bright future for your children.</p>
                </div>

                {/* Schools Cards Grid */}
                <div className="edu-card-grid">
                    {SchoolCrds ? (
                        SchoolCrds.map((v, i) => (
                            <div 
                                className="edu-item-card" 
                                key={i} 
                                onClick={() => navigate(`/edu/schools/${v.id}`)}
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
                                            navigate(`/edu/schools/${v.id}`);
                                        }}
                                    >
                                        View Details
                                        <FaChevronRight className="btn-icon" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="loading-state">Loading Schools...</div>
                    )}
                </div>
            </main>
        </div>
    );
};