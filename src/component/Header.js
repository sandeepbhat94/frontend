import React, { useState, useEffect, useRef } from 'react';
import NewsCard from './NewsCard';
import { getRequest } from '../helper/api';


function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);

        };
    }, []);

    //Debouncing for api call
    useEffect(() => {
        const handler = setTimeout(async () => {
            const res = await getRequest(`news/${searchTerm}`);
            setSuggestions(res.data);

        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm])

    // Function to handle input change
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
    };

    //clearing text form search
    const handleClearClick = () => {
        setSearchTerm('');
        setSuggestions([])
    };

    // handling click outside search bar to close suggestions
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSuggestions(false);
            setSuggestions([])
            setSearchTerm("")
        }
    };

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
                {searchTerm && (
                    <button className="clear-button" onClick={handleClearClick}>
                        Clear
                    </button>
                )}
                {showSuggestions && searchTerm && (
                    <ul className="related-items">
                        {suggestions.map((news, index) => (                            
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
