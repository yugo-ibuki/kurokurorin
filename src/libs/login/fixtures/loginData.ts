import type { Target } from '../login.ts'

// サービスに合わせて変更する
export const data: Target[] = [
  {
    elementData: {
      selectorType: 'name',
      selectorName: 'usernameForLogin'
    },
    actionData: {
      type: 'type',
      value: process.env.login_id
    }
  },
  {
    elementData: {
      selectorType: 'name',
      selectorName: 'passwordForLogin'
    },
    actionData: {
      type: 'type',
      value: process.env.login_password
    }
  },
  {
    elementData: {
      selectorType: 'id',
      selectorName: 'login'
    },
    actionData: {
      type: 'click'
    }
  }
]
