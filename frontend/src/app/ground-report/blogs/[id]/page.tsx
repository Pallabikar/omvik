import PostDetail from "@/components/PostDetail";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail id={id} type="blog" />;
}
