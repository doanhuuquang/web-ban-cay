import Image from "next/image";

function AppLoadingBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-[50vh] flex items-center justify-center">
      {children}
    </div>
  );
}

function AppLoadingIcon({ title }: { title?: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Image
        src={"/assets/icons/gplant/gplant.svg"}
        alt="Gplant"
        width={50}
        height={50}
        className="animate-[spin_3s_linear_infinite]"
      />

      {title && <p>{title}</p>}
    </div>
  );
}

export { AppLoadingBackground, AppLoadingIcon };
