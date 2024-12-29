import prisma from "@/prisma/client";
import React from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/types/message";

const MessageList = async () => {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mt-8 mb-4">
        Gratitude Wall
      </h1>

      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">
          Be the first to share your gratitude!
        </p>
      )}
    </div>
  );
};
export const revalidate = 30;

export default MessageList;
