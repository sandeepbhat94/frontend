import React, { useState, useEffect, useRef } from 'react';
import NewsCard from './NewsCard';
import { getRequest } from '../helper/api';


function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef();

    // Function to handle input change
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
    };

    useEffect(() => {
        const handler = setTimeout(async() => {
            const res = await getRequest(`news/${searchTerm}`);
            setSuggestions(res.data);

        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm])

    // Handle click outside search bar to close suggestions
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSuggestions(false);
            setSuggestions([])
            setSearchTerm("")
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);            
        };
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <img src="https://png.pngtree.com/png-clipart/20201208/original/pngtree-realistic-breaking-news-label-designs-png-image_5516272.jpg" alt="Logo" />
            </div>
            <div className="search-bar" ref={searchRef}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                {showSuggestions && (
                    <ul className="related-items">
                        {suggestions.map((news, index) => (
                            // <li key={index} className="card">
                            //     <div className="card-content">
                            //         <h3>{item.title}</h3>
                            //         <p className="source">{item.source}</p>
                            //         <p className="publish-at">{item.publishAt}</p>
                            //         <p className="description">{item.description}</p>
                            //     </div>
                            //     {/* You can add more elements or buttons here */}
                            // </li>
                            <NewsCard
                                key={index}
                                title={news.title}
                                description={news.description}
                                imageUrl={news.urlToImage}
                                source={news.source}
                                timeAgo={news.publishedAt}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}

export default Header;
