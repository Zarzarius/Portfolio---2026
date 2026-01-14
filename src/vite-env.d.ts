/// <reference types="vite/client" />
/// <reference types="@tanstack/react-start" />

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const content: string
  export default content
}
