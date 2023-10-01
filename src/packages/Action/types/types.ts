type ClickAction = {
  type: 'click'
}

type TypeAction = {
  type: 'type'
  value: string
}

export type Target = {
  elementData: {
    /** The attribute name to search for */
    selectorType: 'class' | 'id' | 'name'
    /** The value of the attribute */
    selectorName: string
  }
  actionData: ClickAction | TypeAction
}
