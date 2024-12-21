import prisma from "@/prisma/client";
import React from "react";

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
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>
                {message.name ? `${message.name}:` : `Anonymous ${message.id}:`}
              </strong>{" "}
              {message.message} <br />
              <small>{new Date(message.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
};

export default MessageList;
