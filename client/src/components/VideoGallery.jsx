import React, { useRef } from 'react';

function VideoGallery({ filteredVideos }) {
                    console.log(filteredVideos,"FILTERED VIDEOS")
    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index]?.play();
    };

    const handleMouseLeave = (index) => {
        videoRefs.current[index]?.pause();
    };

    return (
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
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={() => handleMouseLeave(index)}
                                    >
                                        <video
                                            ref={(el) => (videoRefs.current[index] = el)}
                                            className="object-cover w-full h-[300px] bg-black"
                                            loop
                                            muted
                                        >
                                            <source src={video.src} type="video/mp4" />
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
                            <div className="text-white">No videos found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoGallery;
