"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/api";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
}

export default function PostDetail({ id, type }: { id: string, type: 'blog' | 'news' }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const accentColor = type === 'blog' ? '#E86A2C' : '#185FA5';

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-12 bg-[#FDFCFB] flex justify-center items-start">
                <div className="animate-pulse flex flex-col w-full max-w-4xl px-6">
                    <div className="bg-black/10 h-6 w-32 mb-12 rounded" />
                    <div className="bg-black/10 h-10 w-3/4 mb-4 rounded" />
                    <div className="bg-black/10 aspect-video w-full rounded-2xl mb-8" />
                    <div className="space-y-4 w-full">
                        <div className="bg-black/10 h-4 w-full rounded" />
                        <div className="bg-black/10 h-4 w-full rounded" />
                        <div className="bg-black/10 h-4 w-5/6 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen pt-40 pb-12 bg-[#FDFCFB] flex justify-center items-start">
                <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-black/5">
                    <h1 className="text-4xl font-bold mb-6 font-clagio uppercase tracking-widest text-black">Post Not Found</h1>
                    <p className="text-black/60 mb-8 font-medium">The post you are looking for has been moved or deleted.</p>
                    <Link href={`/ground-report/${type === 'blog' ? 'blogs' : 'news'}`} className="inline-block font-bold text-xs tracking-widest uppercase bg-black text-white px-8 py-4 rounded-xl hover:bg-black/80 transition-all">
                        Return to {type === 'blog' ? 'Blogs' : 'News'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-32 pb-24 bg-[#FDFCFB]">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                
                <Link href={`/ground-report/${type === 'blog' ? 'blogs' : 'news'}`} className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase mb-12 text-black/60 hover:text-black transition-colors">
                    &larr; Back to {type === 'blog' ? 'Blogs' : 'News'}
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <span 
                            className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white rounded-full shadow-sm"
                            style={{ backgroundColor: accentColor }}
                        >
                            {post.category}
                        </span>
                        <span className="text-sm font-bold tracking-widest text-black/50 uppercase">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-clagio text-black leading-[1.1] mb-12">
                        {post.title}
                    </h1>

                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-16 border border-black/5">
                        <Image 
                            src={post.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>

                <div 
                    className="
                        text-black/80 leading-relaxed text-lg font-medium tracking-wide
                        [&>p]:mb-8 
                        [&>h2]:text-3xl [&>h2]:font-clagio [&>h2]:text-black [&>h2]:mt-16 [&>h2]:mb-8
                        [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-12 [&>h3]:mb-6 
                        [&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-8 [&>ul>li]:mb-2
                        [&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-8 [&>ol>li]:mb-2
                        [&>strong]:text-black [&>strong]:font-bold
                        [&>a]:text-[#185FA5] [&>a]:underline [&>a]:hover:text-black
                        [&>blockquote]:border-l-4 [&>blockquote]:border-black/20 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-black/60 [&>blockquote]:my-8
                        [&>img]:rounded-xl [&>img]:shadow-md [&>img]:w-full [&>img]:my-10
                    "
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

            </div>
        </article>
    );
}
