import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Pagina Principal</h1>
    </div>
  );
}
