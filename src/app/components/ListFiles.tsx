"use client";
import { useEffect, useMemo, useState } from "react";
import type { SupabaseFile } from "../../../types/SupabaseFile";
import Image from "next/image";
import { getBrowserSupabase } from "../lib/supabaseClient";


export default function ListFiles() {
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Crear el cliente solo en el navegador y solo si hay envs
  const supabase = useMemo(() => getBrowserSupabase(), []);

  useEffect(() => {
    let mounted = true;
    const fetchFiles = async () => {
      if (!supabase) {
        setError("Supabase no está configurado (faltan NEXT_PUBLIC_SUPABASE_URL/ANON_KEY).");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.storage.from("media").list("uploads", {
        limit: 100,
        sortBy: { column: "name", order: "asc" },
      });
      if (!mounted) return;
      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setFiles((data as unknown as SupabaseFile[]) || []);
      }
      setLoading(false);
    };
    fetchFiles();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    // Evita romper la UI si falta la env pública
    return null;
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {files.map((file) => (
        <Image
          key={file.name}
          src={`${baseUrl}/storage/v1/object/public/media/uploads/${encodeURIComponent(file.name)}`}
          alt={file.name}
          width={200}
          height={200}
          className="object-cover rounded"
        />
      ))}
    </div>
  );
}