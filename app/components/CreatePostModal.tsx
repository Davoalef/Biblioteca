"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/lib/api";
import { CreatePostInput } from "@/lib/types";
import { X, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  body?: string;
  userId?: string;
}

export default function CreatePostModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number | "">("");
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: () => {
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !mutation.isPending) onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, mutation.isPending]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setUserId("");
    setErrors({});
    mutation.reset();
  };

  const handleClose = () => {
    if (mutation.isPending) return;
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    if (!body.trim()) {
      newErrors.body = "El contenido es obligatorio";
    } else if (body.trim().length < 10) {
      newErrors.body = "El contenido debe tener al menos 10 caracteres";
    }

    if (!userId) {
      newErrors.userId = "Debes seleccionar un usuario";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutation.mutate({
      title: title.trim(),
      body: body.trim(),
      userId: userId as number,
    });
  };

  if (!isOpen) return null;

  const inputBaseClasses =
    "w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 border rounded-md focus:outline-none focus:ring-1 transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <h2
            id="create-modal-title"
            className="text-xl font-bold text-slate-900"
          >
            Agregar nuevo libro
          </h2>
          <button
            onClick={handleClose}
            disabled={mutation.isPending}
            aria-label="Cerrar modal"
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mutation.isSuccess && (
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  ¡Libro creado exitosamente!
                </p>
                <p className="text-xs text-green-700 mt-1">
                  ID asignado: #{mutation.data?.id}
                </p>
              </div>
            </div>
          </div>
        )}

        {!mutation.isSuccess && (
          <form
            onSubmit={handleSubmit}
            className="p-6 overflow-y-auto flex-1"
            noValidate
          >
            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Error al crear el libro</p>
                  <p className="text-xs mt-0.5">
                    {mutation.error instanceof Error
                      ? mutation.error.message
                      : "Intenta nuevamente"}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Título <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={mutation.isPending}
                placeholder="Ej: El Quijote de la Mancha"
                className={`${inputBaseClasses} ${
                  errors.title
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="body"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Contenido <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={mutation.isPending}
                rows={4}
                placeholder="Describe brevemente el contenido del libro..."
                className={`${inputBaseClasses} resize-none ${
                  errors.body
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.body && (
                <p className="text-xs text-red-600 mt-1">{errors.body}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Usuario <span className="text-red-500">*</span>
              </label>
              <select
                id="userId"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value ? Number(e.target.value) : "")
                }
                disabled={mutation.isPending}
                className={`${inputBaseClasses} bg-white ${
                  errors.userId
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              >
                <option value="">Selecciona un usuario</option>
                <option value={1}>Usuario 1</option>
                <option value={2}>Usuario 2</option>
                <option value={3}>Usuario 3</option>
                <option value={4}>Usuario 4</option>
                <option value={5}>Usuario 5</option>
              </select>
              {errors.userId && (
                <p className="text-xs text-red-600 mt-1">{errors.userId}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={mutation.isPending}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear libro"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}