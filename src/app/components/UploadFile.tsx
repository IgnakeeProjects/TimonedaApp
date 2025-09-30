"use client";
import { useMemo, useState } from "react";
import { getBrowserSupabase } from "../lib/supabaseClient";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  // Crear el cliente solo en el navegador y solo si hay envs
  const supabase = useMemo(() => getBrowserSupabase(), []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setError(null);
    setUrl(null);
  };

  const uploadFile = async () => {
    if (!file) return;
    if (!supabase) {
      setError("Supabase no está configurado (faltan NEXT_PUBLIC_SUPABASE_URL/ANON_KEY).");
      return;
    }
    try {
      setUploading(true);
      setError(null);
      setUrl(null);

      // Prefijo para evitar colisiones
      const path = `uploads/${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (baseUrl) {
        const publicUrl = `${baseUrl}/storage/v1/object/public/media/${encodeURI(path)}`;
        setUrl(publicUrl);
      }
      console.log("Archivo subido:", data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error subiendo archivo";
      setError(msg);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" aria-label="Seleccionar archivo" onChange={onChange} />
      <button
        onClick={uploadFile}
        disabled={!file || uploading || !supabase}
        className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {uploading ? "Subiendo..." : "Subir"}
      </button>

      {error && <p className="text-red-600 text-sm" aria-live="polite">Error: {error}</p>}
      {url && (
        <p className="text-green-700 text-sm">
          Subido: <a href={url} target="_blank" rel="noreferrer" className="underline">{url}</a>
        </p>
      )}
    </div>
  );
}