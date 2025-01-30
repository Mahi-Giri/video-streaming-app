// import React, { useState, useEffect } from 'react';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';
// import api from '../../axiosConfig';
// import { toast } from 'react-toastify';

// const EditDeleteVideo = () => {
//   const [videos, setVideos] = useState([]);
//   const [editData, setEditData] = useState(null);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await api.get('/api/v1/video/videos');
//       if (response.data.success) {
//         setVideos(response.data.data);
//       } else {
//         toast.error('Failed to fetch videos');
//       }
//     } catch (error) {
//       toast.error('Error fetching videos');
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleEditSubmit = async (id) => {
//     try {
//       const response = await api.put(`/api/v1/video/edit/${id}`, editData);
//       if (response.status === 200) {
//         toast.success('Video updated successfully');
//         fetchVideos();
//         setEditData(null);
//       } else {
//         toast.error('Failed to update video');
//       }
//     } catch (error) {
//       toast.error('Error updating video');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this video?')) {
//       try {
//         const response = await api.delete(`/api/v1/video/delete/${id}`);
//         if (response.status === 200) {
//           toast.success('Video deleted successfully');
//           fetchVideos();
//         } else {
//           toast.error('Failed to delete video');
//         }
//       } catch (error) {
//         toast.error('Error deleting video');
//       }
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">Manage Videos</h2>
//       {videos.map((video) => (
//         <div
//           key={video._id}
//           className="bg-red-300 p-4 shadow-md rounded-lg mb-4 flex justify-between items-center"
//         >
//           {editData?.id === video._id ? (
//             <div className="flex flex-col space-y-2">
//               <input
//                 type="text"
//                 name="title"
//                 value={editData.title}
//                 onChange={handleEditChange}
//                 className="p-2 border rounded"
//                 placeholder="Title"
//               />
//               <textarea
//                 name="description"
//                 value={editData.description}
//                 onChange={handleEditChange}
//                 rows="3"
//                 className="p-2 border rounded"
//                 placeholder="Description"
//               ></textarea>
//               <button
//                 onClick={() => handleEditSubmit(video._id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <video
//                   controls
//                   className="w-full h-40 object-cover rounded mb-2"
//                   src={video.videoUrl} // Assuming videoUrl is the correct field
//                   alt={video.title}
//                 ></video>
//                 <h3 className="text-xl font-bold">{video.title}</h3>
//                 <p>{video.description}</p>
//               </div>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => setEditData({ ...video, id: video._id })}
//                   className="text-blue-500"
//                 >
//                   <FiEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(video._id)}
//                   className="text-red-500"
//                 >
//                   <FiTrash2 />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EditDeleteVideo;

// import React, { useState, useEffect } from 'react';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';
// import api from '../../axiosConfig';
// import { toast } from 'react-toastify';

// const EditDeleteVideo = () => {
//   const [videos, setVideos] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await api.get('/api/v1/video/videos');
//       if (response.data.success) {
//         setVideos(response.data.data);
//       } else {
//         toast.error('Failed to fetch videos');
//       }
//     } catch (error) {
//       toast.error('Error fetching videos');
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideoFile(file);
//   };

//   const handleEditSubmit = async (id) => {
//     try {
//       const formData = new FormData();
//       formData.append('title', editData.title);
//       formData.append('description', editData.description);

//       if (videoFile) {
//         formData.append('video', videoFile);
//       }

//       const response = await api.put(`/api/v1/video/edit/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         toast.success('Video updated successfully');
//         fetchVideos();
//         setEditData(null);
//         setVideoFile(null);
//       } else {
//         toast.error('Failed to update video');
//       }
//     } catch (error) {
//       toast.error('Error updating video');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this video?')) {
//       try {
//         const response = await api.delete(`/api/v1/video/delete/${id}`);
//         if (response.status === 200) {
//           toast.success('Video deleted successfully');
//           fetchVideos();
//         } else {
//           toast.error('Failed to delete video');
//         }
//       } catch (error) {
//         toast.error('Error deleting video');
//       }
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">Manage Videos</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {videos.map((video) => (
//           <div
//             key={video._id}
//             className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between space-y-4"
//           >
//             {editData?.id === video._id ? (
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   name="title"
//                   value={editData.title}
//                   onChange={handleEditChange}
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60"
//                   placeholder="Title"
//                 />
//                 <textarea
//                   name="description"
//                   value={editData.description}
//                   onChange={handleEditChange}
//                   rows="3"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60"
//                   placeholder="Description"
//                 ></textarea>
//                 <input
//                   type="file"
//                   onChange={handleVideoChange}
//                   className="w-full p-2 border rounded focus:outline-none bg-black/60"
//                   accept="video/*"
//                 />
//                 <button
//                   onClick={() => handleEditSubmit(video._id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <video
//                   controls
//                   className="w-full h-40 object-cover rounded mb-2"
//                   src={video.videoUrl}
//                 ></video>
//                 <h3 className="text-lg font-bold text-gray-800">{video.title}</h3>
//                 <p className="text-gray-600 text-sm">{video.description}</p>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setEditData({ ...video, id: video._id })}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <FiEdit size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(video._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FiTrash2 size={20} />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EditDeleteVideo;








import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import api from "../../axiosConfig";
import { toast } from "react-toastify";
import { Modal, Button } from "flowbite-react";

const EditDeleteVideo = () => {
    const [videos, setVideos] = useState([]);
    const [editData, setEditData] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, [videoId]);

    const fetchVideos = async () => {
        try {
            const response = await api.get("/api/v1/video/videos");
            if (response.data.success) {
                setVideos(response.data.data);
            } else {
                toast.error("Failed to fetch videos");
            }
        } catch (error) {
            toast.error("Error fetching videos");
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
    };

    const handleEditSubmit = async (id) => {
        try {
            const formData = new FormData();
            formData.append("title", editData.title);
            formData.append("description", editData.description);

            if (videoFile) {
                formData.append("video", videoFile);
            }

            const response = await api.put(
                `/api/v1/video/edit/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Video updated successfully");
                fetchVideos();
                setEditData(null);
                setVideoFile(null);
            } else {
                toast.error("Failed to update video");
            }
        } catch (error) {
            toast.error("Error updating video");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(
                `/api/v1/video/delete/${videoId}`
            );
            if (response.status === 200) {
                toast.success("Video deleted successfully");
                setOpenModal(false);
                fetchVideos();
            } else {
                toast.error("Failed to delete video");
            }
        } catch (error) {
            toast.error("Error deleting video");
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Manage Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className="bg-gray-800 shadow-lg rounded-lg p-4 transform hover:scale-105 transition-transform"
                    >
                        {editData?.id === video._id ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleEditChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                    placeholder="Title"
                                />
                                <textarea
                                    name="description"
                                    value={editData.description}
                                    onChange={handleEditChange}
                                    rows="3"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                    placeholder="Description"
                                ></textarea>
                                <input
                                    type="file"
                                    onChange={handleVideoChange}
                                    className="w-full p-2 border rounded focus:outline-none bg-gray-700 text-white"
                                    accept="video/*"
                                />
                                <button
                                    onClick={() => handleEditSubmit(video._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <>
                                <video
                                    controls
                                    className="w-full h-40 object-cover rounded mb-2"
                                    src={video.videoUrl}
                                ></video>
                                <h3 className="text-lg font-bold">
                                    {video.title}
                                </h3>
                                <p className="text-sm">{video.description}</p>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button
                                        onClick={() =>
                                            setEditData({
                                                ...video,
                                                id: video._id,
                                            })
                                        }
                                        className="text-blue-400 hover:text-blue-500"
                                    >
                                        <FiEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpenModal(true);
                                            setVideoId(video._id);
                                        }}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Modal
                show={openModal}
                size="md"
                position="center"
                className="model_stylings"
                onClose={() => setOpenModal(false)}
            >
                <div className="bg-black/50 p-4 backdrop-blur-md">
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-white/80 " />
                            <h3 className="mb-5 text-lg font-normal text-white/80 ">
                                Are you sure you want to log out?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button
                                    className="bg-red-500"
                                    onClick={() => setOpenModal(false)}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
};

export default EditDeleteVideo;
