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
    videoFiles: [], // Changed to array
    imageFiles: [], // Changed to array
    description: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState('0 KB/s');
  const [timeRemaining, setTimeRemaining] = useState('0s');
  const [fileList, setFileList] = useState({ videos: [], images: [] }); // New state for file list

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);
    
    if (name === 'videoFiles') {
      setFileList(prev => ({ ...prev, videos: fileArray.map(file => file.name) }));
    } else if (name === 'imageFiles') {
      setFileList(prev => ({ ...prev, images: fileArray.map(file => file.name) }));
    }
    
    setFormData({ ...formData, [name]: fileArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { movieTitle, category, subscription, videoFiles, imageFiles, description } = formData;
    if (!movieTitle || !category || !subscription || !videoFiles.length || !imageFiles.length || !description) {
      toast.warn('All fields are required.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('movieTitle', movieTitle);
    uploadData.append('category', category);
    uploadData.append('subscription', subscription);
    uploadData.append('description', description);
    
    // Append multiple video files
    videoFiles.forEach((file, index) => {
      uploadData.append('videos', file);
    });

    // Append multiple image files
    imageFiles.forEach((file, index) => {
      uploadData.append('images', file);
    });

    try {
      const startTime = Date.now();
      let uploadedBytes = 0;

      const response = await api.post('/api/v1/video/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setUploadProgress(percentCompleted);

          const currentTime = Date.now();
          const timeElapsed = (currentTime - startTime) / 1000;
          const speed = (loaded - uploadedBytes) / timeElapsed;
          setUploadSpeed(`${(speed / 1024).toFixed(2)} KB/s`);
          uploadedBytes = loaded;

          const remainingBytes = total - loaded;
          const remainingTime = remainingBytes / speed;
          setTimeRemaining(`${Math.round(remainingTime)}s`);
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message || 'Movies uploaded successfully!');
        setUploadProgress(0);
        setUploadSpeed('0 KB/s');
        setTimeRemaining('0s');
        setFileList({ videos: [], images: [] });
        setFormData({
          movieTitle: '',
          category: '',
          subscription: '',
          videoFiles: [],
          imageFiles: [],
          description: '',
        });
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Error uploading the movies.');
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        background:
          "url('https://wallpapers.com/images/high/netflix-background-gs7hjuwvv2g0e9fj.webp')",
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
              <label htmlFor="videoFiles" className="block text-sm font-medium text-white/60">
                Upload Videos (Multiple):
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="file"
                  id="videoFiles"
                  name="videoFiles"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                  multiple
                />
                <FiUpload className="text-gray-500" />
              </div>
              {fileList.videos.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-white/60">Selected videos:</p>
                  <ul className="text-xs text-white/60">
                    {fileList.videos.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="imageFiles" className="block text-sm font-medium text-white/60">
                Upload Images (Multiple):
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="file"
                  id="imageFiles"
                  name="imageFiles"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                  multiple
                />
                <FiUpload className="text-gray-500" />
              </div>
              {fileList.images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-white/60">Selected images:</p>
                  <ul className="text-xs text-white/60">
                    {fileList.images.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
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










// import React, { useState } from 'react';
// import { Upload as UploadIcon } from 'lucide-react';
// import api from '../../axiosConfig';
// import { toast } from 'react-toastify';
// import { FiUpload } from 'react-icons/fi';


// const Upload = () => {
//   const [formData, setFormData] = useState({
//     movieTitle: '',
//     category: '',
//     subscription: '',
//     videoFiles: [],
//     imageFiles: [],
//     description: '',
//   });

//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadSpeed, setUploadSpeed] = useState('0 KB/s');
//   const [timeRemaining, setTimeRemaining] = useState('0s');
//   const [fileList, setFileList] = useState({ videos: [], images: [] });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const fileArray = Array.from(files);
    
//     // Validate file types and sizes
//     const isValid = fileArray.every(file => {
//       const maxSize = 50 * 1024 * 1024; // 50MB
//       if (file.size > maxSize) {
//         toast.error(`File ${file.name} is too large. Maximum size is 50MB`);
//         return false;
//       }
//       return true;
//     });

//     if (!isValid) {
//       e.target.value = '';
//       return;
//     }

//     if (name === 'videoFiles') {
//       setFileList(prev => ({ ...prev, videos: fileArray.map(file => file.name) }));
//     } else if (name === 'imageFiles') {
//       setFileList(prev => ({ ...prev, images: fileArray.map(file => file.name) }));
//     }
    
//     setFormData(prev => ({ ...prev, [name]: fileArray }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { movieTitle, category, subscription, videoFiles, imageFiles, description } = formData;
    
//     if (!movieTitle || !category || !subscription || videoFiles.length === 0 || imageFiles.length === 0 || !description) {
//       toast.warn('All fields are required');
//       return;
//     }

//     const uploadData = new FormData();
//     uploadData.append('movieTitle', movieTitle);
//     uploadData.append('category', category);
//     uploadData.append('subscription', subscription);
//     uploadData.append('description', description);
    
//     // Append multiple video files
//     videoFiles.forEach(file => {
//       uploadData.append('videos', file);
//     });

//     // Append multiple image files
//     imageFiles.forEach(file => {
//       uploadData.append('images', file);
//     });

//     try {
//       const startTime = Date.now();
//       let uploadedBytes = 0;

//       const response = await api.post('/api/v1/video/upload', uploadData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setUploadProgress(percentCompleted);

//           const currentTime = Date.now();
//           const timeElapsed = (currentTime - startTime) / 1000;
//           const speed = loaded / timeElapsed;
//           setUploadSpeed(`${(speed / 1024 / 1024).toFixed(2)} MB/s`);

//           const remainingBytes = total - loaded;
//           const remainingTime = remainingBytes / speed;
//           setTimeRemaining(`${Math.round(remainingTime)}s`);
//         },
//       });

//       if (response.data.success) {
//         toast.success('Upload successful!');
//         // Reset form
//         setFormData({
//           movieTitle: '',
//           category: '',
//           subscription: '',
//           videoFiles: [],
//           imageFiles: [],
//           description: '',
//         });
//         setFileList({ videos: [], images: [] });
//         setUploadProgress(0);
//         setUploadSpeed('0 KB/s');
//         setTimeRemaining('0s');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error(error.response?.data?.message || 'Error uploading files');
//     }
//   };


//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gray-100"
//       style={{
//         background:
//           "url('https://wallpapers.com/images/high/netflix-background-gs7hjuwvv2g0e9fj.webp')",
//       }}
//     >
//       <div className="relative w-[400px] h-[800px]">
//         <div className="absolute w-full h-full bg-black/10 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-6 text-center text-white/80">Upload Movie Details</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//               <label htmlFor="movieTitle" className="block text-sm font-medium text-white/60">
//                 Movie Title:
//               </label>
//               <input
//                 type="text"
//                 id="movieTitle"
//                 name="movieTitle"
//                 value={formData.movieTitle}
//                 onChange={handleChange}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-white/60">
//                 Category:
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                 required
//               >
//                 <option value="" disabled>
//                   Select Category
//                 </option>
//                 <option value="action">Action</option>
//                 <option value="drama">Drama</option>
//                 <option value="comedy">Comedy</option>
//                 <option value="anime">Anime</option>
//                 <option value="crime">Crime</option>
//                 <option value="fantasy">Fantasy</option>
//                 <option value="horror">Horror</option>
//                 <option value="romance">Romance</option>
//                 <option value="sci-fi">Sci-fi</option>
//                 <option value="thrillers">Thrillers</option>
//                 <option value="music">Music</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="subscription" className="block text-sm font-medium text-white/60">
//                 Subscription:
//               </label>
//               <select
//                 id="subscription"
//                 name="subscription"
//                 value={formData.subscription}
//                 onChange={handleChange}
//                 className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                 required
//               >
//                 <option value="" disabled>
//                   Select Subscription
//                 </option>
//                 <option value="free">Free</option>
//                 <option value="premium">Premium</option>
//               </select>
//             </div>

            
//             <div>
//               <label htmlFor="videoFiles" className="block text-sm font-medium text-white/60">
//                 Upload Videos (Multiple):
//               </label>
//               <div className="mt-1 flex items-center space-x-2">
//                 <input
//                   type="file"
//                   id="videoFiles"
//                   name="videoFiles"
//                   accept="video/*"
//                   onChange={handleFileChange}
//                   className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                   required
//                   multiple
//                 />
//                 <FiUpload className="text-gray-500" />
//               </div>
//               {fileList.videos.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-sm text-white/60">Selected videos:</p>
//                   <ul className="text-xs text-white/60">
//                     {fileList.videos.map((name, index) => (
//                       <li key={index}>{name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label htmlFor="imageFiles" className="block text-sm font-medium text-white/60">
//                 Upload Images (Multiple):
//               </label>
//               <div className="mt-1 flex items-center space-x-2">
//                 <input
//                   type="file"
//                   id="imageFiles"
//                   name="imageFiles"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="w-full bg-black/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                   required
//                   multiple
//                 />
//                 <FiUpload className="text-gray-500" />
//               </div>
//               {fileList.images.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-sm text-white/60">Selected images:</p>
//                   <ul className="text-xs text-white/60">
//                     {fileList.images.map((name, index) => (
//                       <li key={index}>{name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>


//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-white/60">
//                 Description:
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description || ''}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full bg-black/20 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
//                 placeholder="Enter a brief description of the movie..."
//                 required
//               ></textarea>
//             </div>
            
//             <div className="space-y-2">
//               <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//                 <div
//                   className="bg-red-500 h-2.5 rounded-full"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <div className="flex justify-between text-sm text-white/60">
//                 <span>{uploadProgress}%</span>
//                 <span>Speed: {uploadSpeed}</span>
//                 <span>Remaining: {timeRemaining}</span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upload;



