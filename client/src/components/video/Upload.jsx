
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import api from '../../axiosConfig'
import { toast } from 'react-toastify';

const Upload = () => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    category: '',
    subscription: '',
    videoFile: null,
    imageFile: null,
  });

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

    const { movieTitle, category, subscription, videoFile, imageFile } = formData;
    if (!movieTitle || !category || !subscription || !videoFile || !imageFile) {
      toast.warn('All fields are required.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('movieTitle', movieTitle);
    uploadData.append('category', category);
    uploadData.append('subscription', subscription);
    uploadData.append('video', videoFile);
    uploadData.append('image', imageFile);

    
    try {
        const response = await api.post('/api/v1/video/upload', uploadData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
      
    //   console.log(response);
      if (response.status===201) {
        toast.success(response.data.message || 'Movie uploaded successfully!')
        
      } else {
        toast.error(response.data.message || 'Something went wrong.')
        
      }
    } catch (error) {
        toast.error('Error uploading the movie.')
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload Movie Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700">Movie Title:</label>
          <input
            type="text"
            id="movieTitle"
            name="movieTitle"
            value={formData.movieTitle}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="" disabled>Select Category</option>
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
          <label htmlFor="subscription" className="block text-sm font-medium text-gray-700">Subscription:</label>
          <select
            id="subscription"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="" disabled>Select Subscription</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div>
          <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Upload Video:</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            <FiUpload className="text-gray-500" />
          </div>
        </div>

        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Upload Image:</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            <FiUpload className="text-gray-500" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default Upload;
