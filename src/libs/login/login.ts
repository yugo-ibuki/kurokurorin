import type { Page } from 'puppeteer'
import type { ElementHandle } from 'puppeteer'
import { Log } from '@utils/log'

type ClickAction = {
  type: 'click'
}

type TypeAction = {
  type: 'type'
  value: string
}

export type Target = {
  elementData: {
    /** 取得したい対象の要素の属性 */
    selectorType: 'class' | 'id' | 'name'
    /** 取得したい対象の要素の属性値 */
    selectorName: string
  }
  actionData: ClickAction | TypeAction
}

export const login = async (
  page: Page,
  targets: Target[]
): Promise<boolean> => {
  await page.goto('http://localhost:3333/login', {
    waitUntil: ['load', 'networkidle2']
  })

  let isSucceeded = true

  for (const target of targets) {
    const selectorQuery = await createSelectorQuery(target.elementData)
    const element = await page.$(selectorQuery)
    if (!element) {
      throw new Error('element is empty')
    }

    // htmlをstringとして取得
    await element.evaluate((x) => x.outerHTML)
    // const html = await element.evaluate((x) => x.outerHTML)
    // if (html.includes('login')) {
    // Log.info(html)
    // }

    if (!element) {
      isSucceeded = false
      break
    }

    Log.info('actions: ', target.actionData)
    await action(target.actionData, element)
  }

  // 画面の遷移をURLの変更を検知して待つ
  await page.waitForNavigation({
    timeout: 10000, // 10秒
    waitUntil: 'load'
  })

  return isSucceeded
}

/**
 * 取得したい対象の要素のセレクターのクエリを取得します。
 * @param elementData - 取得したい対象の要素に対する情報
 * @param elementData.element.selectorType - 取得したい対象の要素の属性
 * @param elementData.element.selectorName - 取得したい対象の要素の名前
 * @returns - 取得したい対象の要素のセレクター
 */
const createSelectorQuery = async (
  elementData: Target['elementData']
): Promise<string> => {
  const selectorType = elementData.selectorType
  const selectorName = elementData.selectorName
  let selectorQuery = ''

  // selectorTypeによってセレクターのクエリを変更する
  switch (selectorType) {
    case 'name':
      // name属性の場合は[name="name属性の値"]というクエリになる
      selectorQuery = `[name="${selectorName}"]`
      break
    case 'id':
      // id属性の場合は#id属性の値というクエリになる
      selectorQuery = `#${selectorName}`
      break
    case 'class':
      // class属性の場合は.class属性の値というクエリになる
      selectorQuery = `.${selectorName}`
      break
    default:
      break
  }

  return selectorQuery !== ''
    ? selectorQuery
    : Promise.reject('selectorQuery is empty')
}

/**
 * 取得したい対象の要素に対するアクションを実行します。
 * @param actionData - 取得したい対象の要素に対するアクションの情報
 * @param actionData.type - 取得したい対象の要素に対するアクションの種類
 * @param actionData.value - 取得したい対象の要素に対するアクションの値
 * @param element - ページから取得された対象の要素
 */
const action = async (
  actionData: Target['actionData'],
  element: ElementHandle<Element>
): Promise<void> => {
  const actionType = actionData.type

  // typeの場合はvalueをinputにタイプする
  if (actionType === 'type') {
    await element.type(actionData.value)
  }

  // clickの場合はクリックする
  if (actionType === 'click') {
    await element.click()
  }
}
