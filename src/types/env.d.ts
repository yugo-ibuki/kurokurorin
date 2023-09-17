declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        login_id: string
        login_password: string
      }
    }
  }
}
