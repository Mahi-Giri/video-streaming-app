import React, { useState, useEffect } from "react";
import VideoGallery from "../components/VideoGallery";
import SearchBar from "../components/SearchBar";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [videoType, setVideoType] = useState("all");
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);

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

    const getVideos = async () => {
        try {
            setVideos(videoData);
            setFilteredVideos(videoData);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        filterVideos(query, videoType);
    }, [query, videoType, videos]);

    const filterVideos = (query, videoType) => {
        const filtered = videos.filter((video) => {
            const matchesCategory = videoType === "all" || video.category === videoType;
            const matchesQuery = video.title.toLowerCase().includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });
        setFilteredVideos(filtered);
    };

    return (
        <div>
            <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                <div className="hero-headline flex flex-col items-center justify-center pt-24 text-center">
                    <h1 className="font-bold text-3xl text-gray-300">Stream Anytime, Anywhere!</h1>
                    <p className="font-base text-base text-gray-400">High-quality videos for you.</p>
                </div>
                <SearchBar query={query} setQuery={setQuery} videoType={videoType} setVideoType={setVideoType} value={true}/>
                <VideoGallery filteredVideos={filteredVideos} />
            </div>
        </div>
    );
};

export default MovieSearch;
