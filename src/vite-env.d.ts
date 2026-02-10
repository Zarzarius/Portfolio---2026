/// <reference types="vite/client" />
/// <reference types="@tanstack/react-start" />

interface ImportMetaEnv {
  readonly SITE_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: string;
  export default content;
}
