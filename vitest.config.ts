/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  test: {
    globals: true
  },
  resolve: {
    alias: {
      '@config': path.join(__dirname, 'src/config'),
      '@utils': path.join(__dirname, 'src/utils')
    }
  }
})
