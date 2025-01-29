// import React, { useState } from 'react';
// import { FiUpload } from 'react-icons/fi';
// import api from '../../axiosConfig'
// import { toast } from 'react-toastify';

// const Upload = () => {
//   const [formData, setFormData] = useState({
//     movieTitle: '',
//     category: '',
//     subscription: '',
//     videoFile: null,
//     imageFile: null,
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { movieTitle, category, subscription, videoFile, imageFile, description } = formData;
//     if (!movieTitle || !category || !subscription || !videoFile || !imageFile || !description) {
//       toast.warn('All fields are required.');
//       return;
//     }

//     const uploadData = new FormData();
//     uploadData.append('movieTitle', movieTitle);
//     uploadData.append('category', category);
//     uploadData.append('subscription', subscription);
//     uploadData.append('video', videoFile);
//     uploadData.append('image', imageFile);
//     uploadData.append('description',description);


    
//     try {
//         const response = await api.post('/api/v1/video/upload', uploadData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
      
      
//     //   console.log(response);
//       if (response.status===201) {
//         toast.success(response.data.message || 'Movie uploaded successfully!')
        
//       } else {
//         toast.error(response.data.message || 'Something went wrong.')
        
//       }
//     } catch (error) {
//         toast.error('Error uploading the movie.')
//       console.error(error);
//     }
//   };

//   return (
//     <div
//     className="min-h-screen flex items-center justify-center bg-gray-100"
//     style={{
//         background:
//             "url('https://wallpapers.com/images/high/netflix-background-gs7hjuwvv2g0e9fj.webp') no-repeat center center/cover",
//     }}
// >
// <div className="relative w-[350px] h-[750px]">
//                 <div className="absolute w-full h-full bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col justify-center">
                   
                
     
//       <h2 className="text-2xl font-bold mb-6 text-center text-white/40">Upload Movie Details</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="movieTitle" className="block text-sm font-medium text-white/60">Movie Title:</label>
//           <input
//             type="text"
//             id="movieTitle"
//             name="movieTitle"
//             value={formData.movieTitle}
//             onChange={handleChange}
//             className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-white/60">Category:</label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//             required
//           >
//             <option value="" disabled>Select Category</option>
//             <option value="action">Action</option>
//             <option value="drama">Drama</option>
//             <option value="comedy">Comedy</option>
//             <option value="anime">Anime</option>
//             <option value="crime">Crime</option>
//             <option value="fantasy">Fantasy</option>
//             <option value="horror">Horror</option>
//             <option value="romance">Romance</option>
//             <option value="sci-fi">Sci-fi</option>
//             <option value="thrillers">Thrillers</option>
//             <option value="music">Music</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="subscription" className="block text-sm font-medium text-white/60">Subscription:</label>
//           <select
//             id="subscription"
//             name="subscription"
//             value={formData.subscription}
//             onChange={handleChange}
//             className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//             required
//           >
//             <option value="" disabled>Select Subscription</option>
//             <option value="free">Free</option>
//             <option value="premium">Premium</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="videoFile" className="block text-sm font-medium text-white/60">Upload Video:</label>
//           <div className="mt-1 flex items-center space-x-2">
//             <input
//               type="file"
//               id="videoFile"
//               name="videoFile"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//               required
//             />
//             <FiUpload className="text-gray-500" />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="imageFile" className="block text-sm font-medium text-white/60">Upload Image:</label>
//           <div className="mt-1 flex items-center space-x-2">
//             <input
//               type="file"
//               id="imageFile"
//               name="imageFile"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//               required
//             />
//             <FiUpload className="text-gray-500" />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-white/60">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description || ''}
//             onChange={handleChange}
//             rows={4}
//             className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//             placeholder="Enter a brief description of the movie..."
//             required
//           ></textarea>
//         </div>


//         <button
//           type="submit"
//           className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         >
//           Submit
//         </button>
//       </form>
//      </div>
//     </div>
//     </div>
//   );
// };

// export default Upload;










import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import api from '../../axiosConfig';
import { toast } from 'react-toastify';

const Upload = () => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    category: '',
    subscription: '',
    videoFile: null,
    imageFile: null,
    description: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0); // Progress percentage
  const [uploadSpeed, setUploadSpeed] = useState('0 KB/s'); // Upload speed
  const [timeRemaining, setTimeRemaining] = useState('0s'); // Time remaining

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { movieTitle, category, subscription, videoFile, imageFile, description } = formData;
    if (!movieTitle || !category || !subscription || !videoFile || !imageFile || !description) {
      toast.warn('All fields are required.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('movieTitle', movieTitle);
    uploadData.append('category', category);
    uploadData.append('subscription', subscription);
    uploadData.append('video', videoFile);
    uploadData.append('image', imageFile);
    uploadData.append('description', description);

    try {
      const startTime = Date.now(); // Start time for upload speed calculation
      let uploadedBytes = 0; // Track uploaded bytes for speed calculation

      const response = await api.post('/api/v1/video/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setUploadProgress(percentCompleted);

          // Calculate upload speed
          const currentTime = Date.now();
          const timeElapsed = (currentTime - startTime) / 1000; // in seconds
          const speed = (loaded - uploadedBytes) / timeElapsed; // bytes per second
          setUploadSpeed(`${(speed / 1024).toFixed(2)} KB/s`); // Convert to KB/s
          uploadedBytes = loaded;

          // Calculate time remaining
          const remainingBytes = total - loaded;
          const remainingTime = remainingBytes / speed; // in seconds
          setTimeRemaining(`${Math.round(remainingTime)}s`);
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message || 'Movie uploaded successfully!');
        setUploadProgress(0); // Reset progress bar
        setUploadSpeed('0 KB/s'); // Reset upload speed
        setTimeRemaining('0s'); // Reset time remaining
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Error uploading the movie.');
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        background:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs') no-repeat center center/cover",
      }}
    >
      <div className="relative w-[400px] h-[800px]">
        <div className="absolute w-full h-full bg-black/10 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-white/80">Upload Movie Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="movieTitle" className="block text-sm font-medium text-white/60">
                Movie Title:
              </label>
              <input
                type="text"
                id="movieTitle"
                name="movieTitle"
                value={formData.movieTitle}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/60">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="anime">Anime</option>
                <option value="crime">Crime</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-fi</option>
                <option value="thrillers">Thrillers</option>
                <option value="music">Music</option>
              </select>
            </div>

            <div>
              <label htmlFor="subscription" className="block text-sm font-medium text-white/60">
                Subscription:
              </label>
              <select
                id="subscription"
                name="subscription"
                value={formData.subscription}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              >
                <option value="" disabled>
                  Select Subscription
                </option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div>
              <label htmlFor="videoFile" className="block text-sm font-medium text-white/60">
                Upload Video:
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
                <FiUpload className="text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-white/60">
                Upload Image:
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
                <FiUpload className="text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/60">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Enter a brief description of the movie..."
                required
              ></textarea>
            </div>

            {/* Progress Bar and Upload Stats */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>{uploadProgress}%</span>
                <span>Speed: {uploadSpeed}</span>
                <span>Remaining: {timeRemaining}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;















// import React, { useEffect, useState } from "react";
// import api from '../../axiosConfig'

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchVideos = async () => {
//     try {
//       const response = await api.get("/api/v1/video/videos", {
//         params: { page: 1, limit: 10 },
//       });
//       setVideos(response.data.data);
//     } catch (err) {
//       setError("Failed to load videos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Video List</h1>
//       <div className="video-grid">
//         {videos.map((video) => (
//           <div key={video._id} className="video-card">
//             <img src={video.thumbnailUrl} alt={video.title} />
//             <h3>{video.title}</h3>
//             <p>{video.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;
