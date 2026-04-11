"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Post {
  _id: string;
  title: string;
  type: string;
  category: string;
  status: string;
  publishDate: string;
  isPopular: boolean;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [postId, setPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("blog");
  const [category, setCategory] = useState("Residential");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [status, setStatus] = useState("draft");
  const [isPopular, setIsPopular] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/posts/admin/all");
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      // Find the slug first or just get by id. Our API only has get /api/posts/slug/:slug.
      // But we have all posts. Actually let's just use the post object from the list to avoid refetching.
      // Wait, we need full content which may not be in admin/all if we projected it, but admin/all returns everything.
      const postArray = posts as any[];
      const p = postArray.find((p) => p._id === id);
      if (!p) return;

      setPostId(p._id);
      setTitle(p.title);
      setType(p.type);
      setCategory(p.category);
      setSummary(p.excerpt);
      setContent(p.content);
      // Format date for input[type="date"]
      const dateStr = new Date(p.publishDate).toISOString().split('T')[0];
      setPublishDate(dateStr);
      setStatus(p.status);
      setIsPopular(p.isPopular || false);
      setThumbnailUrl(p.thumbnail);
      setIsEditing(true);
    } catch (err) {
      toast.error("Could not load post details.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const resetForm = () => {
    setPostId(null);
    setTitle("");
    setType("blog");
    setCategory("Residential");
    setSummary("");
    setContent("");
    setPublishDate("");
    setStatus("draft");
    setIsPopular(false);
    setThumbnailUrl("");
    setImageFile(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalImageUrl = thumbnailUrl;

      // Handle Image Upload if new file selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        finalImageUrl = uploadRes.data.url;
      }

      if (!finalImageUrl) {
        toast.error("Thumbnail image is required");
        setIsSubmitting(false);
        return;
      }

      // Generate slug from title
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

      const payload = {
        title,
        slug,
        type,
        category,
        excerpt: summary,
        content,
        publishDate: publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
        status,
        isPopular,
        thumbnail: finalImageUrl
      };

      if (postId) {
        await api.put(`/posts/${postId}`, payload);
        toast.success("Post updated successfully");
      } else {
        await api.post("/posts", payload);
        toast.success("Post created successfully");
      }

      resetForm();
      fetchPosts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar: Post List */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">All Posts</h2>
            <button 
              onClick={resetForm}
              className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
              + New Post
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {posts.map(p => (
                <div key={p._id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                          {p.status}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase">{p.type}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-800 line-clamp-2">{p.title}</h4>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 text-sm font-medium">
                    <button onClick={() => handleEdit(p._id)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main: Editor Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
            {postId ? 'Edit Post' : 'Create New Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail Upload</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all text-sm text-gray-500"
                />
                {thumbnailUrl && !imageFile && (
                  <p className="text-xs text-green-600 mt-2">Current image loaded. Uploading a new one will replace it.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Market Trends">Market Trends</option>
                  <option value="Company News">Company News</option>
                  <option value="Guides">Guides</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Publish Date</label>
                <input 
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 mt-2">
                <input 
                  type="checkbox"
                  id="isPopular"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="isPopular" className="text-sm font-bold text-gray-700 cursor-pointer">
                  Mark as Popular (Featured in Sidebox)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt Summary</label>
              <textarea 
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Brief summary shown on the cards"
              />
            </div>

            <div className="pb-10">
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Content (HTML)</label>
              <div className="bg-white rounded-lg overflow-hidden h-96">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  className="h-80"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
              {postId && (
                <button type="button" onClick={resetForm} className="px-6 py-3 font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Cancel Edit
                </button>
              )}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 font-bold text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : (postId ? 'Update Post' : 'Publish Post')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
