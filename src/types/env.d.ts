declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly login_id: string
        readonly login_password: string
      }
    }
  }
}
