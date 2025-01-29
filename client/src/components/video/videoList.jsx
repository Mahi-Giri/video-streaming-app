import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import VideoItem from "./VideoItem";
import LoadingIndicator from "./LoadingIndicator";

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchVideos = async (pageNumber) => {
        try {
            const response = await axios.get(
                `/api/videos?page=${pageNumber}&limit=10`
            );
            const { data, totalPages } = response.data;

            setVideos((prevVideos) => [...prevVideos, ...data]);
            setHasMore(pageNumber < totalPages);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos(page);
    }, [page]);

    return (
        <InfiniteScroll
            dataLength={videos.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<LoadingIndicator />}
            endMessage={<p>No more videos to load</p>}
        >
            <div className="video-list">
                {videos.map((video) => (
                    <VideoItem key={video._id} video={video} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default VideoList;







