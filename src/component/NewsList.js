import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getRequest } from '../helper/api';


const NewsList = () => {

    const [newsData, setNewsData] = useState([])
    
    useEffect(() => {
        // const res = await getRequest("/news")
        // console.log("RES========",res)
        const fetchData = async () => {
            try {
              const res = await getRequest("news");              
              setNewsData(res.data);              
            } catch (error) {                            
            }
          };
          fetchData();
    }, [])    
    return (
        <div className="news-list">
            {newsData.length > 0 ?
            newsData?.map((news, index) => (
                <NewsCard
                    key={index}
                    title={news.title}
                    description={news.description}
                    imageUrl={news.urlToImage}
                    source={news.source}
                    timeAgo={news.publishedAt}
                />
            ))
            : ""
            }
        </div>
    );
};

export default NewsList;
