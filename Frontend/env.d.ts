/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_NESHAN_KEY: string;
    readonly NEXT_PUBLIC_COLOR_PRIMARY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}