interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_PORT: number;
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_FIREBASE_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}