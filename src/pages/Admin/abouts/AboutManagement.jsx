import React, { useState, useEffect } from 'react';
import api from '../../../utils/axios';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Briefcase, 
  Trophy, 
  FileText,
  X,
  Save,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import AdminLayout from '../../../components/Admin/AdminLayout';

const AboutManagement = () => {
  const { user } = useAuth();
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    description: '',
    yearExp: '',
    totalProj: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchAbouts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/abouts');
      setAbouts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch About entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  const handleOpenModal = (about = null) => {
    if (about) {
      setEditingId(about.id);
      setFormData({
        description: about.description,
        yearExp: about.yearExp || '',
        totalProj: about.totalProj || '',
        image: null
      });
      setPreviewUrl(about.image ? `http://localhost:3000${about.image}` : null);
    } else {
      setEditingId(null);
      setFormData({
        description: '',
        yearExp: '',
        totalProj: '',
        image: null
      });
      setPreviewUrl(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append('description', formData.description);
    data.append('yearExp', formData.yearExp);
    data.append('totalProj', formData.totalProj);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingId) {
        await api.put(`/api/abouts/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/api/abouts', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchAbouts();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save About entry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await api.delete(`/api/abouts/${id}`);
      fetchAbouts();
    } catch (err) {
      setError('Failed to delete entry.');
    }
  };

  return (
    <AdminLayout title="About Me Management">
      <div className="flex flex-col">
        {/* Internal Page Header (keep as requested) */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8 h-18">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Management Dashboard</h2>
            <p className="text-sm text-gray-500">Manage multiple "About Me" entries for your portfolio</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Plus size={20} />
            <span>Add New Entry</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium">Loading entries...</p>
            </div>
          ) : abouts.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <FileText size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No entries yet</h3>
              <p className="text-gray-500 max-w-xs mb-8">
                Start by adding your first "About Me" entry to showcase your story.
              </p>
              <button 
                onClick={() => handleOpenModal()}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {abouts.map((about) => (
                <div key={about.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row group transition-all hover:shadow-lg hover:border-blue-200">
                  <div className="md:w-48 bg-gray-100 relative overflow-hidden group">
                    {about.image ? (
                      <img 
                        src={`http://localhost:3000${about.image}`} 
                        alt="About" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleOpenModal(about)}
                        className="p-2.5 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(about.id)}
                        className="p-2.5 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-6 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Briefcase size={12} />
                        <span>{about.yearExp || 0} Yrs Exp</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Trophy size={12} />
                        <span>{about.totalProj || 0} Projects</span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-4 text-sm leading-relaxed mb-4">
                      {about.description}
                    </p>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Last updated: {new Date(about.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit About Entry' : 'Create New Entry'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Image Upload Area */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Profile Image</label>
                  <div 
                    onClick={() => document.getElementById('imageInput').click()}
                    className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group relative overflow-hidden"
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={40} className="text-gray-300 group-hover:text-blue-400 mb-2" />
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-blue-500">Upload Image</span>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="imageInput" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Stats Inputs */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Years of Experience</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="number" 
                        name="yearExp"
                        value={formData.yearExp}
                        onChange={handleInputChange}
                        placeholder="e.g. 5"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Total Projects</label>
                    <div className="relative">
                      <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="number" 
                        name="totalProj"
                        value={formData.totalProj}
                        onChange={handleInputChange}
                        placeholder="e.g. 20"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2 mb-8">
                <label className="block text-sm font-bold text-gray-700">About Me Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell your professional story..."
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-70 disabled:scale-100"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  <span>{editingId ? 'Update Entry' : 'Create Entry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AboutManagement;
