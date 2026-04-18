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
import Swal from 'sweetalert2';

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
      setPreviewUrl(about.image ? `${import.meta.env.VITE_API_BASE_URL || ''}${about.image}` : null);
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
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      Swal.fire({
        icon: 'success',
        title: editingId ? 'Updated!' : 'Created!',
        text: editingId ? 'About entry has been updated successfully.' : 'New about entry has been created successfully.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        handleCloseModal();
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save About entry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Entry?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#f1f5f9',
      confirmButtonText: 'Yes, Delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'px-6 py-2.5 rounded-xl font-bold bg-red-600 text-white',
        cancelButton: 'px-6 py-2.5 rounded-xl font-bold text-slate-600 border border-slate-200'
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/abouts/${id}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The entry has been deleted.',
          timer: 1500,
          showConfirmButton: false
        });
        fetchAbouts();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete entry.', 'error');
      }
    }
  };

  return (
    <AdminLayout title="About Me Management">
      <div className="flex flex-col min-h-full bg-[#F8FAFC]">
        {/* Page Header Area - Clean White */}
        <div className="bg-white border-b border-slate-200 p-3 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Management Suite</h2>
            <p className="text-slate-500 font-medium mt-1">Curate your professional journey and key milestones.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
          >
            <Plus size={22} className="transition-transform group-hover:rotate-90" />
            <span>Add New Entry</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <p className="font-bold text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-slate-100 mb-6">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
              <p className="font-black text-xs uppercase tracking-[0.3em]">Syncing Records</p>
            </div>
          ) : abouts.length === 0 ? (
            <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
                <FileText size={56} className="text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No historical data</h3>
              <p className="text-slate-500 max-w-sm mb-12 font-medium leading-relaxed">
                Connect with your audience by sharing your unique career achievements and background.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-200 active:scale-95"
              >
                Create First Entry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {abouts.map((about) => (
                <div key={about.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row group transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/40 hover:border-blue-100/50">
                  <div className="md:w-64 bg-slate-50 relative overflow-hidden flex-shrink-0">
                    {about.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL || ''}${about.image}`}
                        alt="About"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <ImageIcon size={64} strokeWidth={1} />
                      </div>
                    )}
                    {/* Actions Bar - Visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:bg-white/60 lg:backdrop-blur-md">
                      <button
                        onClick={() => handleOpenModal(about)}
                        className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all transform hover:scale-110 active:scale-90 shadow-xl shadow-blue-500/20"
                        title="Edit Entry"
                      >
                        <Edit2 size={22} />
                      </button>
                      <button
                        onClick={() => handleDelete(about.id)}
                        className="p-4 bg-white text-red-600 border border-red-50 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 shadow-xl"
                        title="Delete Entry"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-8">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-blue-100/50">
                          <Briefcase size={16} className="opacity-70" />
                          <span className='text-xs'>{about.yearExp || 0} Yrs</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-indigo-100/50">
                          <Trophy size={16} className="opacity-70" />
                          <span className='text-xs'>{about.totalProj || 0} Proj</span>
                        </div>
                      </div>
                      <p className="text-slate-600 line-clamp-5 text-base leading-[1.8] mb-8 font-medium">
                        {about.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30" />
                        Synced {new Date(about.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Modal Overlay - Refined Light Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
          <div
            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-700 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-10 md:p-14 border-b border-slate-50 flex justify-between items-center bg-[#FBFDFF]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                  Record Editor
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {editingId ? 'Refining Assets' : 'New Publication'}
                </h2>
                <p className="text-slate-500 font-medium mt-2">Adjust your presence and verify information quality.</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-4 text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-100 rounded-[1.25rem] transition-all shadow-sm hover:shadow-xl active:scale-95"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 md:p-14 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Visual Block */}
                <div className="space-y-6">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 italic">Visual Identity</label>
                  <div
                    onClick={() => document.getElementById('imageInput').click()}
                    className="aspect-square w-full rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group relative overflow-hidden shadow-inner"
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <div className="bg-white p-4 rounded-2xl text-blue-600 font-black shadow-2xl flex items-center gap-3 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 scale-90 group-hover:scale-100">
                            <ImageIcon size={22} />
                            <span>Replace Media</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-slate-100">
                          <Plus size={40} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-700 uppercase tracking-widest">Connect Asset</span>
                      </div>
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

                {/* Metrics Block */}
                <div className="space-y-10 flex flex-col justify-center">
                  <div className="space-y-4">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Experience Context</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all duration-300 group-focus-within:scale-110">
                        <Briefcase size={22} />
                      </div>
                      <input
                        type="number"
                        name="yearExp"
                        value={formData.yearExp}
                        onChange={handleInputChange}
                        placeholder="e.g. 8"
                        className="w-full pl-14 pr-7 py-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-[12px] focus:ring-blue-600/5 transition-all outline-none font-black text-slate-900 placeholder:text-slate-300 placeholder:font-bold text-lg"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100">Years</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Output Metric</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300 group-focus-within:scale-110">
                        <Trophy size={22} />
                      </div>
                      <input
                        type="number"
                        name="totalProj"
                        value={formData.totalProj}
                        onChange={handleInputChange}
                        placeholder="e.g. 50"
                        className="w-full pl-14 pr-7 py-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-[12px] focus:ring-indigo-600/5 transition-all outline-none font-black text-slate-900 placeholder:text-slate-300 placeholder:font-bold text-lg"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100">Projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Block */}
              <div className="space-y-4 mb-14">
                <label className="block text-[11px] font-black text-[rgba(15,23,42,0.4)] uppercase tracking-[0.25em] ml-2">Narrative Architecture</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Detail your professional trajectory with precision..."
                  className="w-full p-8 rounded-[2.5rem] border border-slate-200 bg-[#FBFDFF] focus:bg-white focus:border-blue-600 focus:ring-[12px] focus:ring-blue-600/2 focus:shadow-xl transition-all outline-none font-medium text-slate-700 leading-[1.8] placeholder:text-slate-300 placeholder:font-bold text-lg shadow-inner"
                  required
                ></textarea>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col md:flex-row gap-5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-10 py-6 bg-slate-100 text-slate-600 font-black rounded-[1.75rem] hover:bg-slate-200 transition-all active:scale-95 text-base tracking-tight"
                >
                  Cancel Edit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] flex items-center justify-center gap-4 px-10 py-6 bg-slate-900 text-white font-black rounded-[1.75rem] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-98 disabled:opacity-50 disabled:scale-100 group text-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} strokeWidth={3} />
                  ) : (
                    <Save size={24} className="transition-transform group-hover:-translate-y-1 duration-300" />
                  )}
                  <span>{editingId ? 'Push Final Version' : 'Initiate Publication'}</span>
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

