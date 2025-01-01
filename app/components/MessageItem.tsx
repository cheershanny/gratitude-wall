'use client';
import { Message } from "@/types/message";
import { motion } from "framer-motion"; 
import { formatDistanceToNow } from 'date-fns';

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <strong className="text-primary">
          {message.name ? message.name : `Anonymous ${message.id}`}
        </strong>
        <small className="text-gray-500">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </small>
      </div>
      <p className="mt-2 text-gray-700">{message.message}</p>
    </motion.li>
  );
};

export default MessageItem;