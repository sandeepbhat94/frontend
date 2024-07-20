import React from 'react';

const NewsCard = ({ title, description, imageUrl, source, timeAgo }) => {
  return (
    <div className="news-item">
      <img src={imageUrl} alt={title} className="news-item-image" />
      <div className="news-item-content">
        <h3 className="news-item-title">{title}</h3>
        <p className="news-item-source">{source?.name} - {timeAgo}</p>
        <p className="news-item-description">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
