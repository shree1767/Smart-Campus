import axios from 'axios';

/**
 * Sends a video file to the specified API endpoint.
 * 
 * @param {File} videoFile - The video file to be processed.
 * @returns {Promise} - The Axios response or error.
 */
export const processVideo = async (videoFile) => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await axios.post('http://localhost:5000/process-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error while processing video:', error);
    throw error;
  }
};
