import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ title, description, imageUrl, source, timeAgo, author }) => {
    return (
        // <Link to={`/news/${author}`} key={title} className="news-item-link">
            <div className="news-item">
                <img src={imageUrl} alt={title} className="news-item-image" />
                <div className="news-item-content">
                    <h3 className="news-item-title">{title}</h3>
                    <p className="news-item-source">{source?.name} - {timeAgo}</p>
                    <p className="news-item-description">{description}</p>
                </div>
            </div>
        // </Link>
    );
};

export default NewsCard;
