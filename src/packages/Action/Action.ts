import { action } from './libs/action'
import type { Target } from '@packages/Action/types'
import { createSelectorQuery } from '@packages/Action/libs'
import type { ElementHandle } from 'puppeteer'

interface ActionInterface {
  run: (
    actionData: Target['actionData'],
    element: ElementHandle<Element>
  ) => Promise<void>
  createSelectorQuery: (elementData: Target['elementData']) => Promise<string>
}

export class Action implements ActionInterface {
  public async run(
    actionData: Target['actionData'],
    element: ElementHandle<Element>
  ): Promise<void> {
    await action(actionData, element)
  }

  public async createSelectorQuery(
    elementData: Target['elementData']
  ): Promise<string> {
    return await createSelectorQuery(elementData)
  }
}
