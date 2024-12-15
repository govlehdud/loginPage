"use client";
import { useActionState } from "react";
import { deleteAction } from "@/lib/editService";

export default function DeleteButton({ id }: { id: number }) {
  const [state, formAction] = useActionState(deleteAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        className="bg-red-500 px-5 py-2.5 rounded-md w-30 text-white font-semibold hover:opacity-90 active:scale-95"
        type="submit"
      >
        Delete
      </button>
    </form>
  );
}
