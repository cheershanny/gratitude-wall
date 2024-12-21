"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: MessageForm) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        router.refresh();
      } else {
        throw new Error("Failed to create message");
      }
    } catch {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {errorMessage && (
        <div className="alert alert-error mb-5">
          <div>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xl font-bold">Your Name</label>
          <input
            className="input input-bordered w-full"
            placeholder="Your name (optional)"
            {...register("name")}
          />
        </div>
        <div>
        <label className="text-xl font-bold">Your Gratitude</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Something you're greateful about..."
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`btn text-xl w-full ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
