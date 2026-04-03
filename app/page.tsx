import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  // initial setup basic Supabase connection using cookies + createClient.
  // Replace this scaffold with real queries and UI once data is added.
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Homepage</h1>
      <p className="text-gray-600">
        Supabase is connected. Ready to add queries and UI.
      </p>
    </main>
  );
}
