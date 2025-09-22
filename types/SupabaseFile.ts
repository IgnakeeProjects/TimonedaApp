import { useState } from 'react';

export type SupabaseFile = {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, unknown>;
};

const [files, setFiles] = useState<SupabaseFile[]>([]);