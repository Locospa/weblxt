"use client";

type DeleteMatchButtonProps = {
  label?: string;
};

export default function DeleteMatchButton({
  label = "Eliminar partido",
}: DeleteMatchButtonProps) {
  return (
    <button
      type="submit"
      className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
      onClick={(e) => {
        const confirmed = window.confirm(
          "¿Estás seguro de que deseas eliminar este partido?"
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}