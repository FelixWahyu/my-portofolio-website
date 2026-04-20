import React, { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { getImageUrl } from "../../../utils/image";
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
  AlertCircle,
  ExternalLink,
  Code2,
  ChevronRight,
  Sparkles,
  Eye
} from "lucide-react";


import AdminLayout from "../../../components/Admin/AdminLayout";
import Swal from "sweetalert2";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);


  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/projects");
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        description: project.description,
        tech: project.tech,
        link: project.link || "",
        image: null,
      });
      setPreviewUrl(project.image ? getImageUrl(project.image) : null);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        tech: "",
        link: "",
        image: null,
      });
      setPreviewUrl(null);
    }
    setIsModalOpen(true);
  };

  const handleOpenDetail = (project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDetailOpen(false);
    setSelectedProject(null);

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("tech", formData.tech);
    data.append("link", formData.link);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingId) {
        await api.put(`/api/projects/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/projects", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchProjects();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Project has been ${editingId ? "updated" : "created"} successfully.`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        handleCloseModal();
      });
    } catch (err) {
      const msg = err.response?.data?.errors 
        ? err.response.data.errors[0].message 
        : err.response?.data?.message || "Failed to save project.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/projects/${id}`);
        setProjects(projects.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "Project has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete project.", "error");
      }
    }
  };

  return (
    <AdminLayout title="Project Management">
      <div className="flex flex-col min-h-full bg-[#F8FAFC]">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-6 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Portfolio Projects</h2>
            <p className="text-slate-500 font-medium mt-2">Showcase your best work with detailed descriptions and tech stacks.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
          >
            <Plus size={24} />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-10 flex-1">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <p className="font-bold text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400">
              <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
              <p className="font-black text-xs uppercase tracking-[0.3em]">Loading Projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-24 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 border border-slate-100">
                <FileText size={64} className="text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Projects Yet</h3>
              <p className="text-slate-500 max-w-sm mb-12 font-medium leading-relaxed">
                Start building your portfolio by adding your first project masterpiece.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3"
              >
                <Plus size={28} />
                <span>Create First Project</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {project.image ? (
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Project Info */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-500 font-medium line-clamp-3 mb-6 flex-1 italic leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.split(",").map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100/50">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenDetail(project)}
                          className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                          title="View Detail"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                          title="Edit Project"
                        >
                          <Edit2 size={20} />
                        </button>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90 flex items-center gap-2 font-black text-sm"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
          <div
            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-700 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-[#FBFDFF]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                  {editingId ? "Editor Mode" : "Creation Mode"}
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {editingId ? "Refine Project Details" : "New Portfolio Masterpiece"}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-4 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all active:scale-95"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                {/* Visual Block */}
                <div className="space-y-6">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Project Preview</label>
                  <div
                    onClick={() => document.getElementById("projectImageInput").click()}
                    className="aspect-video w-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group relative overflow-hidden"
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <div className="bg-white p-4 rounded-xl text-blue-600 font-black shadow-2xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all">
                            <ImageIcon size={20} />
                            <span>Change Image</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-all shadow-sm">
                          <Plus size={32} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Cover</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="projectImageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  
                  <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50 mt-4">
                    <div className="flex items-center gap-3 text-indigo-600 mb-2">
                      <Sparkles size={20} />
                      <span className="font-black text-[10px] uppercase tracking-widest">Tech Stack Tip</span>
                    </div>
                    <p className="text-xs text-indigo-700/70 font-medium leading-relaxed">
                      Separate technologies with commas (e.g. React, Tailwind, Laravel) to display them as distinct tags.
                    </p>
                  </div>
                </div>

                {/* Info Block */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. E-Commerce Platform"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 transition-all outline-none font-black text-slate-800"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Tech Stack</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all">
                        <Code2 size={20} />
                      </div>
                      <input
                        type="text"
                        name="tech"
                        value={formData.tech}
                        onChange={handleInputChange}
                        placeholder="React, TailwindCSS, Node.js"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 transition-all outline-none font-bold text-slate-700"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Project Link (Optional)</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all">
                        <ExternalLink size={20} />
                      </div>
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 transition-all outline-none font-bold text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-10">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Project Narrative</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Describe your role, the challenges you solved, and the impact of the project..."
                  className="w-full p-8 rounded-[2.5rem] border border-slate-200 bg-[#FBFDFF] focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700 leading-relaxed shadow-inner"
                  required
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  <span>{editingId ? "Update Project" : "Publish Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Detail Modal */}
      {isDetailOpen && selectedProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-700 my-auto">
            <div className="relative h-[40vh] md:h-[50vh] bg-slate-100">
              {selectedProject.image ? (
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <ImageIcon size={120} strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-2xl transition-all active:scale-95 border border-white/20 z-10"
              >
                <X size={28} />
              </button>

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tech.split(",").map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-blue-500/20 backdrop-blur-md text-blue-200 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-400/30">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="p-10 md:p-14 lg:p-16 grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Project Narrative</h3>
                  <p className="text-slate-600 text-xl leading-[1.8] font-medium whitespace-pre-line italic">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Details & Links</h3>
                  <div className="space-y-6">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ExternalLink size={20} />
                          </div>
                          <span className="font-black text-slate-900">Live Demo</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600" />
                      </a>
                    )}
                    <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                            <Save size={20} />
                          </div>
                          <span className="font-black text-slate-900">Created At</span>
                        </div>
                        <span className="text-sm font-bold text-slate-400">
                          {new Date(selectedProject.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleCloseModal();
                    handleOpenModal(selectedProject);
                  }}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Edit2 size={20} />
                  <span>Edit This Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>

  );
};

export default ProjectManagement;
