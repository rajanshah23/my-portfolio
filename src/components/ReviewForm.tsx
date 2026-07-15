import { useState } from 'react';
import axios from 'axios';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnndjdqq'; // replace with yours
const CLOUDINARY_CLOUD_NAME = 'nodeqa';     // from Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = 'portfolio_reviews'; // your unsigned preset

interface ReviewFormData {
  name: string;
  rating: number;
  comment: string;
  imageFile: File | null;
}

const ReviewForm = ({ onReviewSubmitted }: { onReviewSubmitted?: () => void }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 5,
    comment: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, imageFile: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl = '';
      if (formData.imageFile) {
        imageUrl = await uploadImageToCloudinary(formData.imageFile);
      }

      // Submit to Formspree
      const payload = {
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        imageUrl: imageUrl,
        _subject: `New Portfolio Review from ${formData.name}`
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMessage({ text: 'Thank you for your review (image included)!', type: 'success' });
        // Reset form
        setFormData({ name: '', rating: 5, comment: '', imageFile: null });
        setImagePreview(null);
        onReviewSubmitted?.();
      } else {
        setMessage({ text: 'Submission failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error uploading image or submitting review.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 my-8">
      <h3 className="text-2xl font-bold mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating *</label>
          <select name="rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Review *</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-full" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
        {message && (
          <p className={`mt-3 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;