"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("media")
      .upload(`uploads/${file.name}`, file, { upsert: true });
    if (error) console.error(error);
    else console.log("Archivo subido:", data);
  };

  return (
    <div>
      <input type="file" aria-label="Seleccionar archivo" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFile}>Subir</button>
    </div>
  );
}