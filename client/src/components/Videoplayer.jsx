import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { FaShareFromSquare } from "react-icons/fa6";

const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoSrc, type, title } = location.state || {};
  const videoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [suggestedMenuOpen, setSuggestedMenuOpen] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  // Fetch suggested videos from the API
  useEffect(() => {
    const API_KEY = "48515426-3de9de4299eadbd760d5f0c0c";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/videos/?key=${API_KEY}&q=football&pretty=true`
        );
        const data = await response.json();
        if (data.hits) {
          setSuggestedVideos(
            data.hits.slice(0,10).map((video) => ({
              
              title: video.tags,
              videoSrc: video.videos.medium.url,
              thumbnail: video.videos.tiny.thumbnail,
            }))
          );
          console.log("hello")
          {console.log(suggestedVideos.video)}
          
        }
      } catch (error) {
        console.error("Error fetching suggested videos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedOptions(false);
    }
  };

  const handleCommentPost = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        replies: [],
        upvotes: 0,
        downvotes: 0,
      };
      setComments((prev) => [...prev, newCommentObj]);
      setNewComment("");
    }
  };

  const handleVote = (id, type) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              upvotes: type === "up" ? (comment.upvotes === 0 ? 1 : 0) : comment.upvotes,
              downvotes: type === "down" ? (comment.downvotes === 0 ? 1 : 0) : comment.downvotes,
            }
          : comment
      )
    );
  };

  const toggleSuggestedMenu = (index) => {
    setSuggestedMenuOpen(suggestedMenuOpen === index ? null : index);
  };

  return (
    <div className="flex flex-col items-start justify-center min-h-screen text-white bg-black md:flex-row relative">
      {/* Left side with Video, Title, Buttons, and Description */}
      <div className="w-3/4 max-w-4xl px-4 mt-10 md:w-3/4">
        {videoSrc ? (
          <video ref={videoRef} className="w-full" autoPlay controls>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="mt-10 text-lg text-center">No video source found.</p>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between w-full">
            <div className="text-lg font-bold text-white">{title}</div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLiked((prev) => !prev)}
                className={`text-xl transition ${liked ? "text-blue-500" : "text-white"} hover:text-gray-400`}
              >
                <BiLike />
              </button>
              <button
                onClick={() => setDisliked((prev) => !prev)}
                className={`text-xl transition ${disliked ? "text-red-500" : "text-white"} hover:text-gray-400`}
              >
                <BiDislike />
              </button>
              <button
                onClick={() => alert("Share functionality is under development!")}
                className="text-xl text-white transition hover:text-gray-400"
              >
                <FaShareFromSquare />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-xl text-white transition hover:text-gray-400"
              >
                <CiMenuKebab />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-50">
                  <button
                    onClick={() => setShowSpeedOptions((prev) => !prev)}
                    className="text-xl text-center text-black transition hover:bg-gray-700 p-2 w-full"
                  >
                    Speed: {playbackSpeed}x
                  </button>
                  {showSpeedOptions && (
                    <div className="absolute right-50 mt-2 w-32 bg-white shadow-lg rounded-md">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleSpeedChange(0.5)}
                          className="text-xl text-black transition hover:bg-gray-700 p-2"
                        >
                          0.5x
                        </button>
                        <button
                          onClick={() => handleSpeedChange(1)}
                          className="text-xl text-black transition hover:bg-gray-700 p-2"
                        >
                          1x
                        </button>
                        <button
                          onClick={() => handleSpeedChange(1.5)}
                          className="text-xl text-black transition hover:bg-gray-700 p-2"
                        >
                          1.5x
                        </button>
                        <button
                          onClick={() => handleSpeedChange(2)}
                          className="text-xl text-black transition hover:bg-gray-700 p-2"
                        >
                          2x
                        </button>
                      </div>
                    </div>
                  )}
                  <button className="block w-full px-4 py-2 text-black text-xl text-center hover:bg-gray-700">
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 text-xl text-center">
            <p>
              {type === "play"
                ? "You're enjoying the complete movie experience. Sit back, relax, and enjoy the show!"
                : "This is the trailer! Get a sneak peek of what's coming next. Watch and get excited!"}
            </p>
          </div>
        </div>

        {/* Commenting System */}
        <div className="mt-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4">Comments</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="p-4 bg-gray-800 text-white rounded-md mb-4"
            />
            <button
              onClick={handleCommentPost}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Post Comment
            </button>
            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 text-white p-4 rounded-md mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">User</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleVote(comment.id, "up")}>👍 {comment.upvotes}</button>
                      <button onClick={() => handleVote(comment.id, "down")}>👎 {comment.downvotes}</button>
                    </div>
                  </div>
                  <p className="mt-2">{comment.text}</p>
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6">
                      {comment.replies.map((reply, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-md mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Reply User</span>
                          </div>
                          <p className="mt-2">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <textarea
                    placeholder="Reply to this comment..."
                    className="mt-4 p-4 bg-gray-800 text-white rounded-md w-full"
                  />
                  <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md">Post Reply</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side with Suggested Videos */}
      <div className="w-2/4 h-full px-10 mt-6 overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold text-white">Suggested Videos</h2>
        <div className="space-y-4">
          {suggestedVideos.map((video, index) => (
            <div key={index} className="relative flex items-center space-x-4">
              <div className="flex-shrink-0 w-50 h-24 bg-gray-700 rounded-md">
                <img
                  src={video.thumbnail}
                  alt="Video Thumbnail"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="flex-1 text-white">{video.title}</div>
              <button
                onClick={() => toggleSuggestedMenu(index)}
                className="text-xl text-white transition hover:text-gray-400"
              >
                <CiMenuKebab />
              </button>
              {suggestedMenuOpen === index && (
                <div className="absolute right-10 mt-20 w-32 bg-white shadow-lg rounded-md z-50">
                  <div className="flex flex-col">
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Watch Later
                    </button>
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Save
                    </button>
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Share
                    </button>
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Not Interested
                    </button>
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Don't Recommend Channel
                    </button>
                    <button className="text-xl text-black transition hover:bg-gray-700 p-2 w-full text-left">
                      Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;