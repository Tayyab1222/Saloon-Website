import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage } from '../types';
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
} from 'lucide-react';

interface PreviewFile {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  category: string;
  title: string;
  sizeFormatted: string;
}

interface AdminGalleryPageProps {
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}

export const AdminGalleryPage: React.FC<AdminGalleryPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery'>('upload');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPreviews, setSelectedPreviews] = useState<PreviewFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('shiny_admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Check auth and load gallery images
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user has active authenticated admin session
    fetch('/api/admin/check-auth', { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          onLogout();
        } else {
          fetchGallery();
        }
      })
      .catch(() => {
        onLogout();
      });
  }, []);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Process selected or dropped files with validation
  const processFiles = (files: FileList | File[]) => {
    setUploadError(null);
    setUploadSuccessMsg(null);

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB

    const newPreviews: PreviewFile[] = [];
    let errorFound: string | null = null;

    Array.from(files).forEach((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(ext)) {
        errorFound = 'This file type is not supported. Please upload JPG, JPEG, PNG, or WebP images.';
        return;
      }

      if (file.size > maxSizeBytes) {
        errorFound = 'Image exceeds the maximum allowed file size of 10MB.';
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      newPreviews.push({
        id: `prev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        file,
        previewUrl,
        name: file.name,
        category: 'HAIR',
        title: cleanName,
        sizeFormatted: formatFileSize(file.size),
      });
    });

    if (errorFound) {
      setUploadError(errorFound);
    }

    if (newPreviews.length > 0) {
      setSelectedPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removePreview = (id: string) => {
    setSelectedPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleUploadSubmit = async () => {
    if (selectedPreviews.length === 0) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    const formData = new FormData();
    selectedPreviews.forEach((item) => {
      formData.append('images', item.file);
      formData.append('categories', item.category);
      formData.append('titles', item.title);
    });

    try {
      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON server response:', text);
        data = { success: false, error: `Server error (${response.status}). Please try again.` };
      }

      if (data.success) {
        setUploadSuccessMsg(`Successfully uploaded ${selectedPreviews.length} image(s) to gallery.`);
        // Clean up object URLs
        selectedPreviews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
        setSelectedPreviews([]);
        await fetchGallery();
        // Switch to gallery tab
        setActiveTab('gallery');
      } else {
        setUploadError(data.error || 'Upload failed.');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Failed to upload images. Please check your connection.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle image deletion
  const confirmDeleteImage = async () => {
    if (!deleteTargetId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gallery/${deleteTargetId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== deleteTargetId));
      } else {
        alert(data.error || 'Failed to delete image.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting image.');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  // Handle Admin Logout
  const handleLogoutClick = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('shiny_admin_token');
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#D4AF37] selection:text-[#080808]">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl text-[#F5F1E8] font-light uppercase tracking-wider">
                SHINY'S GALLERY ADMIN
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
                AUTHENTICATED CONTROL PANEL
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('/admin/awards')}
                className="px-3 py-2 text-xs uppercase tracking-[0.15em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#D4AF37]/40 transition-all font-medium"
              >
                Awards Admin →
              </button>
            )}

            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-[#D4AF37] text-[#080808] font-semibold'
                  : 'text-[#F5F1E8] hover:text-[#D4AF37] border border-[#D4AF37]/20'
              }`}
            >
              Upload Images
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#D4AF37] text-[#080808] font-semibold'
                  : 'text-[#F5F1E8] hover:text-[#D4AF37] border border-[#D4AF37]/20'
              }`}
            >
              Gallery ({images.length})
            </button>

            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.15em] font-medium text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-950/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* TAB 1: UPLOAD IMAGES */}
        {activeTab === 'upload' && (
          <section className="space-y-8">
            <div className="border-b border-[#D4AF37]/10 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl text-[#F5F1E8] font-light uppercase tracking-wider">
                  UPLOAD NEW IMAGES
                </h2>
                <p className="text-xs text-[#A9A39A] font-mono tracking-wider mt-1">
                  SUPPORTED FORMATS: JPG, JPEG, PNG, WEBP (MAX 10MB EACH)
                </p>
              </div>

              {selectedPreviews.length > 0 && (
                <button
                  onClick={handleUploadSubmit}
                  disabled={isUploading}
                  className="group inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>UPLOADING...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      <span>UPLOAD TO GALLERY ({selectedPreviews.length})</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Error & Success Messages */}
            {uploadError && (
              <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccessMsg && (
              <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#111111]/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="max-w-md mx-auto space-y-4 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#080808] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Upload className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#F5F1E8] uppercase tracking-wider font-light">
                    DRAG & DROP IMAGES HERE
                  </h3>
                  <p className="text-xs text-[#A9A39A] font-mono tracking-widest mt-1">
                    OR <span className="text-[#D4AF37] underline">CHOOSE IMAGES</span> FROM YOUR COMPUTER
                  </p>
                </div>
              </div>
            </div>

            {/* Previews Grid */}
            {selectedPreviews.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                  <span>PREVIEW SELECTED IMAGES ({selectedPreviews.length})</span>
                  <button
                    onClick={() => setSelectedPreviews([])}
                    className="text-[#A9A39A] hover:text-red-400 transition-colors"
                  >
                    CLEAR ALL
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedPreviews.map((p) => (
                    <div
                      key={p.id}
                      className="group relative bg-[#111111] border border-[#D4AF37]/30 overflow-hidden rounded-sm"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-black">
                        <img
                          src={p.previewUrl}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePreview(p.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/80 text-red-400 hover:text-red-200 border border-red-500/40 rounded-full focus:outline-none"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3 bg-[#080808] space-y-2.5 text-xs font-mono">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] block mb-1">
                            Category
                          </label>
                          <select
                            value={p.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSelectedPreviews((prev) =>
                                prev.map((item) => (item.id === p.id ? { ...item, category: val } : item))
                              );
                            }}
                            className="w-full bg-[#161616] border border-[#D4AF37]/30 text-[#F5F1E8] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="HAIR">HAIR</option>
                            <option value="BEAUTY">BEAUTY</option>
                            <option value="MAKEUP">MAKEUP</option>
                            <option value="BRIDAL">BRIDAL</option>
                            <option value="TRANSFORMATION">TRANSFORMATION</option>
                            <option value="SALON">SALON</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] block mb-1">
                            Title (Optional)
                          </label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSelectedPreviews((prev) =>
                                prev.map((item) => (item.id === p.id ? { ...item, title: val } : item))
                              );
                            }}
                            placeholder="e.g. Couture Hair Styling"
                            className="w-full bg-[#161616] border border-[#D4AF37]/30 text-[#F5F1E8] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[9px] text-[#A9A39A] pt-1">
                          <span className="truncate max-w-[120px]">{p.name}</span>
                          <span className="text-[#D4AF37]">{p.sizeFormatted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleUploadSubmit}
                    disabled={isUploading}
                    className="group inline-flex items-center justify-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>UPLOADING TO GALLERY...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        <span>UPLOAD TO GALLERY NOW</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: GALLERY IMAGES MANAGEMENT */}
        {activeTab === 'gallery' && (
          <section className="space-y-8">
            <div className="border-b border-[#D4AF37]/10 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl text-[#F5F1E8] font-light uppercase tracking-wider">
                  GALLERY IMAGES MANAGEMENT
                </h2>
                <p className="text-xs text-[#A9A39A] font-mono tracking-wider mt-1">
                  VIEW AND MANAGE PUBLICLY VISIBLE GALLERY IMAGES
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-[#111111] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
                  TOTAL IMAGES: {images.length}
                </span>

                <button
                  onClick={fetchGallery}
                  className="p-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                  title="Refresh Gallery"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
                <p className="text-xs uppercase tracking-[0.3em] font-mono text-[#A9A39A]">
                  LOADING GALLERY DATA...
                </p>
              </div>
            ) : images.length === 0 ? (
              <div className="py-20 text-center space-y-4 border border-[#D4AF37]/20 bg-[#111111]/40 p-8 max-w-md mx-auto">
                <ImageIcon className="w-8 h-8 text-[#D4AF37] mx-auto opacity-60" />
                <p className="text-sm font-serif text-[#F5F1E8] uppercase tracking-wider">
                  NO GALLERY IMAGES FOUND
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-2.5 text-xs font-mono uppercase bg-[#D4AF37] text-[#080808] font-semibold"
                >
                  + UPLOAD FIRST IMAGE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group bg-[#111111] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col justify-between overflow-hidden shadow-lg rounded-sm"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-black">
                      <img
                        src={img.url}
                        alt={img.title || img.filename}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono tracking-widest font-semibold uppercase">
                        {img.category || 'HAIR'}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#080808] space-y-3 border-t border-[#D4AF37]/10 text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-[#D4AF37] uppercase tracking-wider block mb-1">
                          Category
                        </span>
                        <select
                          value={img.category || 'HAIR'}
                          onChange={async (e) => {
                            const newCategory = e.target.value;
                            try {
                              const res = await fetch(`/api/gallery/${img.id}`, {
                                method: 'PATCH',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...getAuthHeaders(),
                                },
                                body: JSON.stringify({ category: newCategory }),
                              });
                              const data = await res.json();
                              if (data.success) {
                                setImages((prev) =>
                                  prev.map((i) => (i.id === img.id ? { ...i, category: newCategory } : i))
                                );
                              }
                            } catch (err) {
                              console.error('Failed to update category:', err);
                            }
                          }}
                          className="w-full bg-[#161616] border border-[#D4AF37]/30 text-[#F5F1E8] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="HAIR">HAIR</option>
                          <option value="BEAUTY">BEAUTY</option>
                          <option value="MAKEUP">MAKEUP</option>
                          <option value="BRIDAL">BRIDAL</option>
                          <option value="TRANSFORMATION">TRANSFORMATION</option>
                          <option value="SALON">SALON</option>
                        </select>
                      </div>

                      <p className="text-xs font-serif text-[#F5F1E8] truncate font-light tracking-wide">
                        {img.title || img.filename}
                      </p>

                      <div className="flex items-center justify-between text-[9px] text-[#A9A39A] pt-1">
                        <span>
                          {new Date(img.uploadedAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span>{img.size ? formatFileSize(img.size) : ''}</span>
                      </div>

                      <button
                        onClick={() => setDeleteTargetId(img.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] uppercase font-mono text-red-400 hover:text-red-200 border border-red-500/30 hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>DELETE IMAGE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111111] border border-red-500/40 p-8 max-w-sm w-full space-y-6 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#F5F1E8] font-light uppercase tracking-wider">
                  DELETE IMAGE
                </h3>
                <p className="text-xs text-[#A9A39A] font-mono tracking-wider mt-2">
                  Delete this image permanently?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-mono text-[#F5F1E8] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors"
                >
                  CANCEL
                </button>

                <button
                  onClick={confirmDeleteImage}
                  disabled={isDeleting}
                  className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-mono font-bold text-white bg-red-700 hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'DELETING...' : 'DELETE'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
