import type { Target } from '../libs/login.ts'

export const data: Target[] = [
  {
    elementData: {
      selectorType: 'name',
      selectorName: 'usernameForLogin'
    },
    actionData: {
      type: 'type',
      value: 'username'
    }
  },
  {
    elementData: {
      selectorType: 'name',
      selectorName: 'passwordForLogin'
    },
    actionData: {
      type: 'type',
      value: 'password'
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
