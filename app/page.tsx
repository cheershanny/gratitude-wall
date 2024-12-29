import { Suspense } from "react";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Share Your Gratitude</h1>
      <div className="w-full max-w-xl space-y-6">
        <MessageForm />
        <div className="bg-base-200 p-4 rounded shadow-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <MessageList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
