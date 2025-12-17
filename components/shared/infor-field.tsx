export default function InforField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="w-full flex items-center justify-between gap-4 py-4 text-sm">
      <p className="text-muted-foreground">{label}</p>
      <p>{value ?? "Chưa cập nhật"}</p>
    </div>
  );
}
