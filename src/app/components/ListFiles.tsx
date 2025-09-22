"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { SupabaseFile } from "../../../types/SupabaseFile";


export default function ListFiles() {
  const [files, setFiles] = useState<SupabaseFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from("media").list("uploads");
      if (error) console.error(error);
      else setFiles(data);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      {files.map((file) => (
        <img
          key={file.name}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/uploads/${file.name}`}
          alt={file.name}
          width={200}
        />
      ))}
    </div>
  );
}