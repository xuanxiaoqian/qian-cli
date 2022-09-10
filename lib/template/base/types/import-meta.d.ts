interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
