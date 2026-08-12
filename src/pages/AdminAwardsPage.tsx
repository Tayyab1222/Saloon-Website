import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AwardItem } from '../types';
import {
  Upload,
  Trash2,
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Award,
  Edit2,
  ExternalLink
} from 'lucide-react';

interface AdminAwardsPageProps {
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}

export const AdminAwardsPage: React.FC<AdminAwardsPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('list');
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [description, setDescription] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<AwardItem | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('shiny_admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/awards');
      const data = await res.json();
      if (data.success && Array.isArray(data.awards)) {
        setAwards(data.awards);
      }
    } catch (err) {
      console.error('Failed to fetch award photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/admin/check-auth', { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          onLogout();
        } else {
          fetchAwards();
        }
      })
      .catch(() => {
        onLogout();
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Strict image validation
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!file.type.startsWith('image/') && !validExtensions.includes(fileExt)) {
        setUploadError('Invalid file format. Please upload an image file (JPG, PNG, WebP).');
        setSelectedFile(null);
        if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
        setFilePreviewUrl(null);
        return;
      }

      setSelectedFile(file);
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFilePreviewUrl(null);
    setTitle('');
    setYear('');
    setOrganisation('');
    setDescription('');
    setUploadError(null);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select an award image file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    const formData = new FormData();
    formData.append('media', selectedFile);
    formData.append('title', title);
    formData.append('year', year);
    formData.append('organisation', organisation);
    formData.append('description', description);

    try {
      const response = await fetch('/api/awards/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadSuccessMsg('Award photo uploaded and saved successfully!');
        resetForm();
        await fetchAwards();
        setActiveTab('list');
      } else {
        setUploadError(data.error || 'Failed to upload award photo.');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Error uploading award photo.');
    } finally {
      setIsUploading(false);
    }
  };

  // Save Edit Item
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    setIsSavingEdit(true);
    try {
      const response = await fetch(`/api/awards/${editingItem.id}`, {
        method: 'PATCH',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingItem.title,
          year: editingItem.year,
          organisation: editingItem.organisation,
          description: editingItem.description,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAwards((prev) =>
          prev.map((a) => (a.id === editingItem.id ? { ...a, ...data.award } : a))
        );
        setEditingItem(null);
      } else {
        alert(data.error || 'Failed to update award details.');
      }
    } catch (err) {
      console.error('Edit error:', err);
      alert('Error updating award details.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete Item
  const confirmDeleteAward = async () => {
    if (!deleteTargetId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/awards/${deleteTargetId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setAwards((prev) => prev.filter((a) => a.id !== deleteTargetId));
        setDeleteTargetId(null);
      } else {
        alert(data.error || 'Failed to delete award photo.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting award photo.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#D4AF37] selection:text-[#080808] pt-24 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#D4AF37]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
              <Award className="w-4 h-4" />
              <span>AWARD GALLERY CMS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F1E8] tracking-tight uppercase">
              AWARD GALLERY <span className="italic text-[#D4AF37]">UPLOAD & MANAGEMENT</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#A9A39A] font-light mt-1">
              Upload real award photographs. Uploaded photos save directly to <code className="text-[#D4AF37]">/public/images/awards/</code> and automatically appear on the website.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('/awards')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-mono uppercase tracking-wider text-[#F5F1E8] transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
              <span>VIEW PUBLIC AWARDS PAGE</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-red-500/30 hover:border-red-500 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 border-b border-[#D4AF37]/10 pb-4">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2.5 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer border ${
              activeTab === 'list'
                ? 'bg-[#D4AF37] text-[#080808] border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#111111] text-[#A9A39A] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            ALL AWARD PHOTOS ({awards.length})
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-2.5 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer border inline-flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-[#D4AF37] text-[#080808] border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#111111] text-[#A9A39A] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>UPLOAD AWARD PHOTO</span>
          </button>

          <button
            onClick={fetchAwards}
            className="p-2.5 bg-[#111111] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#A9A39A] hover:text-[#D4AF37] transition-all ml-auto cursor-pointer"
            title="Refresh Awards List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Success Alert */}
        {uploadSuccessMsg && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{uploadSuccessMsg}</span>
            </div>
            <button onClick={() => setUploadSuccessMsg(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: UPLOAD AREA */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111111] border border-[#D4AF37]/25 p-6 sm:p-10 space-y-8 rounded-sm shadow-2xl"
          >
            <div className="border-b border-[#222222] pb-4">
              <h2 className="font-serif text-2xl text-[#F5F1E8] uppercase">
                UPLOAD NEW AWARD PHOTO
              </h2>
              <p className="text-xs font-mono text-[#D4AF37] mt-1">
                Saves directly into <span className="underline">/public/images/awards/</span>
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-6">
              
              {/* File Dropzone Area */}
              <div>
                <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                  SELECT AWARD IMAGE FILE *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#080808] p-8 text-center cursor-pointer transition-all hover:bg-[#0d0d0d] group relative overflow-hidden"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {filePreviewUrl ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative max-w-xs max-h-56 overflow-hidden border border-[#D4AF37]/50 shadow-xl bg-black">
                        <img
                          src={filePreviewUrl}
                          alt="Award Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-mono text-[#D4AF37] underline">
                        Click to choose a different image
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-6">
                      <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-mono text-[#F5F1E8] font-bold uppercase tracking-wider">
                        [ + UPLOAD AWARD IMAGE ]
                      </p>
                      <p className="text-xs text-[#A9A39A]">
                        Supports JPG, PNG, WEBP, GIF (Max 15MB)
                      </p>
                    </div>
                  )}
                </div>

                {selectedFile && (
                  <p className="text-xs font-mono text-[#A9A39A] mt-2">
                    Selected file: <span className="text-[#F5F1E8] font-bold">{selectedFile.name}</span> ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-[#A9A39A] uppercase tracking-wider mb-2">
                    AWARD TITLE / ACCOLADE
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Hair Stylist Honours"
                    className="w-full bg-[#080808] border border-[#D4AF37]/30 p-3 text-sm text-[#F5F1E8] focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A9A39A] uppercase tracking-wider mb-2">
                    YEAR
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full bg-[#080808] border border-[#D4AF37]/30 p-3 text-sm text-[#F5F1E8] focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A9A39A] uppercase tracking-wider mb-2">
                    ORGANISATION / CATEGORY
                  </label>
                  <input
                    type="text"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="e.g. UK Hair & Beauty Honours"
                    className="w-full bg-[#080808] border border-[#D4AF37]/30 p-3 text-sm text-[#F5F1E8] focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A9A39A] uppercase tracking-wider mb-2">
                  SHORT DESCRIPTION / CAPTION
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Optional details or achievement context..."
                  className="w-full bg-[#080808] border border-[#D4AF37]/30 p-3 text-sm text-[#F5F1E8] focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className="p-4 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>UPLOADING TO /public/images/awards/...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>SAVE AWARD PHOTO TO GALLERY</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3.5 bg-transparent border border-[#D4AF37]/30 text-[#A9A39A] hover:text-[#F5F1E8] font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  CLEAR FORM
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* TAB 2: AWARD GALLERY MANAGEMENT GRID */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="py-20 text-center flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                <span className="text-xs font-mono text-[#A9A39A] uppercase tracking-widest">
                  LOADING AWARD GALLERY PHOTOS...
                </span>
              </div>
            ) : awards.length === 0 ? (
              <div className="py-20 text-center bg-[#111111] border border-[#D4AF37]/20 p-8">
                <ImageIcon className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-[#F5F1E8] uppercase mb-2">
                  NO AWARD PHOTOS FOUND
                </h3>
                <p className="text-xs font-mono text-[#A9A39A] mb-6">
                  Upload real award photos to populate the website's Award Gallery.
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-[#D4AF37] text-[#080808] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  [ + UPLOAD FIRST AWARD PHOTO ]
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-[#111111] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all rounded-sm overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[4/3] bg-black overflow-hidden border-b border-[#222222]">
                        <img
                          src={item.url}
                          alt={item.title || 'Award Photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#080808]/80 border border-[#D4AF37]/40 px-2.5 py-1 text-[10px] font-mono text-[#D4AF37] uppercase">
                          #{String(idx + 1).padStart(2, '0')} • {item.year || '2026'}
                        </div>
                      </div>

                      {/* Info Details */}
                      <div className="p-5 space-y-2">
                        <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                          {item.organisation || 'BRIDAL & BEAUTY ARTISTRY'}
                        </p>
                        <h3 className="font-serif text-lg text-[#F5F1E8] leading-snug">
                          {item.title || 'Award & Recognition'}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-[#A9A39A] line-clamp-2 font-light">
                            {item.description}
                          </p>
                        )}

                        <div className="pt-2 text-[10px] font-mono text-[#666666] truncate">
                          URL: <span className="text-[#A9A39A]">{item.url}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-4 bg-[#080808] border-t border-[#222222] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 py-2 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => setDeleteTargetId(item.id)}
                        className="py-2 px-3 bg-red-950/40 border border-red-500/30 hover:border-red-500 text-red-400 hover:bg-red-900/50 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Delete Award Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DELETE</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111111] border border-[#D4AF37]/40 max-w-lg w-full p-6 sm:p-8 space-y-6 rounded-sm shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <h3 className="font-serif text-xl text-[#F5F1E8] uppercase">
                  EDIT AWARD DETAILS
                </h3>
                <button onClick={() => setEditingItem(null)} className="text-[#A9A39A] hover:text-[#F5F1E8] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#A9A39A] uppercase mb-1">
                    TITLE
                  </label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-[#080808] border border-[#D4AF37]/30 p-2.5 text-sm text-[#F5F1E8] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#A9A39A] uppercase mb-1">
                      YEAR
                    </label>
                    <input
                      type="text"
                      value={editingItem.year || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                      className="w-full bg-[#080808] border border-[#D4AF37]/30 p-2.5 text-sm text-[#F5F1E8] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#A9A39A] uppercase mb-1">
                      ORGANISATION / CATEGORY
                    </label>
                    <input
                      type="text"
                      value={editingItem.organisation || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, organisation: e.target.value })}
                      className="w-full bg-[#080808] border border-[#D4AF37]/30 p-2.5 text-sm text-[#F5F1E8] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A9A39A] uppercase mb-1">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full bg-[#080808] border border-[#D4AF37]/30 p-2.5 text-sm text-[#F5F1E8] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 bg-transparent border border-[#333333] text-[#A9A39A] text-xs font-mono uppercase cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isSavingEdit}
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] font-mono text-xs uppercase font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSavingEdit ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111111] border border-red-500/40 max-w-md w-full p-6 space-y-6 rounded-sm text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#F5F1E8] uppercase mb-2">
                  DELETE AWARD PHOTO?
                </h3>
                <p className="text-xs text-[#A9A39A] leading-relaxed">
                  This will permanently remove the award photo file and its record from the Award Gallery and the website.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="px-5 py-2.5 bg-transparent border border-[#333333] text-[#A9A39A] text-xs font-mono uppercase cursor-pointer"
                >
                  CANCEL
                </button>

                <button
                  onClick={confirmDeleteAward}
                  disabled={isDeleting}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-bold cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? 'DELETING...' : 'CONFIRM DELETE'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
