
import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ query, setQuery, videoType, setVideoType ,value }) => {
    const [searchTerm, setSearchTerm] = useState(query);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            setQuery(searchTerm);
        }, 500);

        return () => clearTimeout(debounceTimeout.current);
    }, [searchTerm, setQuery]);

    const handleSearchClick = () => {
        setQuery(searchTerm); 
    };

    return (
        <div className="box pt-6">
            <div className="box-wrapper">
                <div className="rounded flex items-center w-full p-3 shadow-sm border border-gray-100">
                    <button
                        onClick={handleSearchClick}
                        className="outline-none focus:outline-none"
                    >
                        <svg
                            className="w-5 text-gray-600 h-5 cursor-pointer"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <input
                        type="search"
                        placeholder="Search for videos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                    />
                    <div className="select bg-black text-white rounded-md ml-2">
                        {value?<select
                            value={videoType}
                            onChange={(e) => setVideoType(e.target.value)}
                            className="text-sm outline-none bg-black text-white px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Drama">Drama</option>
                            <option value="Anime">Anime</option>
                        </select>:""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
