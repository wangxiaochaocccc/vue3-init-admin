const whiteList = ['/login', '/404', '/401']

export const isTag = (path) => {
  return whiteList.includes(path)
}
