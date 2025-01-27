import React, { useState, useEffect, useRef } from "react";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [videoType, setVideoType] = useState("all");
    const [videos, setVideos] = useState([]); 
    const [filteredVideos, setFilteredVideos] = useState([]); 

    const videoRefs = useRef([]);
    const debounceTimeout = useRef(null); // Ref to store timeout ID

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
    };

    const handleMouseLeave = (index) => {
        videoRefs.current[index].pause();
    };

    const videoData = [
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Adventure",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Comedy",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Comedy",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Comedy",
            description: "transportation the perfect pants",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Adventure",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Drama",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Comedy",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Adventure",
            description: "transportation the perfect pants",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Sci-Fi",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Drama",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Sci-Fi",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Drama",
            description: "transportation the perfect pants",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Adventure",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Anime",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Action",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Sci-Fi",
            description: "transportation the perfect pants",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Action",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Anime",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Action",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Sci-Fi",
            description: "transportation the perfect pants",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
            title: "bodega x new balance",
            category: "Anime",
            description: "the trail less taken",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
            title: "bodega x hoka",
            category: "Drama",
            description: "the world at large",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
            title: "juno",
            category: "Anime",
            description: "grandma cabbage",
        },
        {
            src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
            title: "cala x public",
            category: "Action",
            description: "transportation the perfect pants",
        },
    ];

    // Filter videos by selected category and search query
    const filterVideos = () => {
        const filtered = videos.filter((video) => {
            const matchesCategory =
                videoType === "all" || video.category === videoType;
            const matchesQuery = video.title
                .toLowerCase()
                .includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });
        setFilteredVideos(filtered);
    };

    // Fetch videos from API 
    const getVideos = async () => {
        try {
            // Simulating API data fetch 
            setVideos(videoData); 
            console.log("Video data",videoData)
            setFilteredVideos(videoData); 
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    // Run on mount to load initial videos
    useEffect(() => {
        getVideos(); 
    }, []);

    // Run the filter every time query or videoType changes
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            filterVideos(); // Filter the videos after the debounce delay
        }, 500); // Delay in milliseconds (500ms here)

        // Cleanup timeout on unmount
        return () => clearTimeout(debounceTimeout.current);
    }, [query, videoType, videos]); // Added videos in dependencies to trigger filter when videos are loaded

    return (
        <div>
            <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                {/* Hero Section */}
                <div className="hero-headline flex flex-col items-center justify-center pt-24 text-center">
                    <h1 className="font-bold text-3xl text-gray-300">
                        Stream Anytime, Anywhere – Your Ultimate Video
                        Destination!
                    </h1>
                    <p className="font-base text-base text-gray-400">
                        High-quality videos shared by our talented community.
                    </p>
                </div>

                {/* Search Box */}
                <div className="box pt-6">
                    <div className="box-wrapper">
                        <div className="rounded flex items-center w-full p-3 shadow-sm border border-gray-100">
                            <button
                                onClick={getVideos}
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
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && filterVideos()
                                }
                                className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                            />
                            <div className="select bg-black text-white rounded-md relative z-10">
                                <select
                                    value={videoType}
                                    onChange={(e) => {
                                        setVideoType(e.target.value);
                                        filterVideos();
                                    }}
                                    className="text-sm outline-none focus:outline-none bg-black text-white px-3 py-2 my-2 w-full sm:w-full max-w-full sm:max-w-xs relative z-10"
                                >
                                    <option value="all">All</option>
                                    <option value="Action">Action</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Anime">Anime</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Gallery */}
                <div className="relative flex min-h-screen flex-col bg-black">
                    <div className="min-h-28">
                        <div className="mx-auto py-4">
                            <div className="gap-4 mt-8 md:flex flex-wrap justify-center">
                                {/* Render filtered videos */}
                                {filteredVideos.length > 0 ? (
                                    filteredVideos.map((video, index) => (
                                        <div
                                            key={index}
                                            className="lg:w-1/5 md:w-1/4 sm:w-1/2 w-full"
                                        >
                                            <div
                                                className="wrap-video"
                                                onMouseEnter={() =>
                                                    handleMouseEnter(index)
                                                }
                                                onMouseLeave={() =>
                                                    handleMouseLeave(index)
                                                }
                                            >
                                                <video
                                                    ref={(el) =>
                                                        (videoRefs.current[
                                                            index
                                                        ] = el)
                                                    }
                                                    className="object-cover w-full h-[300px] bg-black"
                                                    loop
                                                >
                                                    <source
                                                        src={video.src}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            </div>
                                            <div className="pt-4 grid grid-cols-6 gap-4">
                                                <span className="col-start-1 col-end-3 font-bold text-lg text-white uppercase font-mono">
                                                    {video.title}
                                                </span>
                                                <span className="col-end-7 col-span-2 text-sm text-slate-500 uppercase font-mono flex justify-end">
                                                    {video.category}
                                                </span>
                                            </div>
                                            <span className="block text-slate-400 text-xs uppercase font-mono">
                                                {video.description}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white">
                                        No videos found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSearch;
