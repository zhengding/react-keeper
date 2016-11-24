import React from 'react'


/**
 * Object.defineProperty
 * @method defineProperty
 */
export const defineProperty = (ob, property, description) => {
  try {
    Object.defineProperty(ob, property, description)
  }catch(e) {
    // console.log(e)
  }
}

/**
 * judge if childElement is a child of parentElement
 */
export const isChild = (parentElement, childElement)=> {
  if(!parentElement || !childElement) {
    return false
  }
  if(parentElement === childElement) {
    return true
  }
  if(!parentElement.props
      || !parentElement.props.children
      || (typeof parentElement.props.children === 'string')) {
    return false
  }
  
  let children = parentElement.props.children instanceof Array ? parentElement.props.children : [ parentElement.props.children ]
  // React.Children.toArray(parentElement.props.children)
  for(let i=0; i<children.length; i++) {
    if(React.isValidElement(children[i])
        && isChild(children[i], childElement)) {
      return true
    }
  }

  return false
}

/**
 * judg if parentComponent contains childComponent
 */
export function reactContains(parentComponent, childComponent) {
  if(!parentComponent || !childComponent
      || !(parentComponent instanceof React.Component)
      || !(childComponent instanceof React.Component)) {
    return false
  }
  const parentSelf = parentComponent._reactInternalInstance
  const childSelf = childComponent._reactInternalInstance

  const parentOwner = parentSelf._currentElement._owner
  let childOwner = childSelf._currentElement._owner

  while(childOwner
      && childOwner !== parentSelf
      && childOwner !== parentOwner) {
    childOwner = childOwner._currentElement._owner
  }

  if(!childOwner) {
    return false
  }

  if(childOwner === parentSelf) {
    return true
  }

  if(childOwner === parentOwner) {
    return isChild(parentSelf._currentElement, childSelf._currentElement)
  }
  console.log('%c--error--', 'color:red')
}

/**
 * get the size of an object
 * 
 * @method size
 * 
 * @param {object} ob    - the object to check
 * 
 * @return {int}         - the size of the object
 */
Object.size = (ob)=> {
  if(!ob)
    return 0
  return Object.keys(ob).length
}

/**
 * get unique hashCode
 * @methdo hashCode - Usually use to create an identify an object
 */
export function hashCode() {
  let res = ''
  for(let i = 0; i < 6; i ++) {
    res += chars[Math.ceil(Math.random() * 35)]
  }
  return res + new Date().getTime()
}

/**
 * get correct path
 * @method resetPath
 */
export function resetPath(path) {
  if(!path) {
    return null
  }
  if(path.charAt(0) !== '/') {
    path = `/${path}`
  }
  if(path.length>1 && path.charAt(path.length-1) === '/') {
    path = path.substring(0, path.length-1)
  }
  return path.replace(/\/{2,}/g, '/')
}

const chars = [ '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ]