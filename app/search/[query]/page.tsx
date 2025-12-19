import SearchFoundProducts from "@/components/shared/search-found-products";

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const keyword = decodeURIComponent((await params).query);

  return (
    <main className="w-full max-w-[1400px] m-auto p-4">
      <SearchFoundProducts keyword={keyword} />
    </main>
  );
}
