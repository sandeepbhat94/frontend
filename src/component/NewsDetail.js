import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../helper/api';

const NewsDetails = ({ newsData }) => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState();    

    useEffect(() => {        
        const fetchData = async () => {
            try {                
                const res = await getRequest(id);
                setNewsItem(res.data);
            } catch (error) {
            }
        };
        fetchData();
    }, [])
    

    return (
        newsItem ? 
        <div className="news-details">
            <header className="news-header">
                <h1 className="news-title">{newsItem.title}</h1>
                <div className="news-meta">
                    <p className="news-source">{newsItem.source?.name} - {new Date(newsItem.publishedAt).toDateString()}</p>
                    <p className="news-author">By {newsItem.authors}</p>
                </div>
            </header>
            <div className="news-image">
                <img src={newsItem.urlToImage} alt={newsItem.title} />
            </div>
            <div className="news-description">
                <p>{newsItem.description}</p>
            </div>
            <div className="news-content">
                <p>{newsItem.content}</p>
            </div>
        </div>
        :
        <div>
            Loading....
        </div>
    );
};

export default NewsDetails;
