import PostDetail from "@/components/PostDetail";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail id={id} type="news" />;
}
