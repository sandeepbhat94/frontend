import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getRequest } from '../helper/api';
import { Link } from 'react-router-dom';


const NewsList = () => {

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await getRequest("news");
            setNewsData(res.data);
        } catch (error) {
        }
    };

    return (
        <div className="news-list">
            {newsData.length > 0 ?
                newsData?.map((news, index) => (
                    <Link to={`/news/${news.author}`} key={index} className="news-item-link">
                        <NewsCard
                            key={index}
                            title={news.title}
                            description={news.description}
                            imageUrl={news.urlToImage}
                            source={news.source}
                            timeAgo={news.publishedAt}
                            author={news.author}
                        />
                     </Link>
                ))
                :
                <div >Loading...</div>
            }
        </div>
    );
};

export default NewsList;
