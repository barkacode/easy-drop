import { getUser } from "@/lib/auth-server";
import Unauthorized from "./unauthorized";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return <Unauthorized />;
  }
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-[32px]">
        <h1 className="text-2xl font-bold text-center">Authentication</h1>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            {user.name?.[0] || "U"}
          </div>
          <div className="text-lg font-semibold">
            {user.name || "Unknown User"}
          </div>
          <div className="text-gray-500">
            {user.email || "No email provided"}
          </div>
        </div>
      </main>
    </div>
  );
}
