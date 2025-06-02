import { UnprotectedPage } from "@/components/CheckAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center flex-col min-h-dvh h-dvh overflow-auto relative p-4">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(140,0,255,0.13)_0,rgba(140,0,255,0)_50%,rgba(140,0,255,0)_100%)]"></div>
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
     <div className="z-10 relative">
         {children}
     </div>
     <UnprotectedPage/>
    </main>
  );
}
