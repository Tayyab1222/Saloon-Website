/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_GOOGLE_PLACES_API_KEY?: string;
  readonly VITE_GOOGLE_PLACE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
