export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-screen min-h-screen">{children}</main>;
}
