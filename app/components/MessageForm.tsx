"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  name: z.string().optional(),
});

interface MessageForm {
  message: string;
  name?: string;
}

const MessageForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: MessageForm) => {
    setSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create message");
      }

      reset();
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto"
    >
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-error mb-5"
        >
          <div>
            <span>{errorMessage}</span>
          </div>
        </motion.div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xl font-bold block mb-2">Your Name</label>
          <input
            className="input input-bordered w-full"
            placeholder="Your name (optional)"
            {...register("name")}
          />
        </div>
        <div>
          <label className="text-xl font-bold block mb-2">Your Gratitude</label>
          <textarea
            className={`textarea textarea-bordered w-full min-h-[100px] ${
              errors.message ? "textarea-error" : ""
            }`}
            placeholder="Share something you're grateful for..."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-error text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Sharing..." : "Share Gratitude"}
        </button>
      </form>
    </motion.div>
  );
};

export default MessageForm;
