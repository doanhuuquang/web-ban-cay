import { Spinner } from "@/components/ui/spinner";

export default function AppLoading() {
  return (
    <div className="mt-16 min-h-[calc(100vh-68px)] flex flex-col items-center justify-center gap-4">
      <Spinner className="size-8" />
      <p className="text-sm text-muted-foreground">Sắp xong rồi, đợi chút!</p>
    </div>
  );
}
