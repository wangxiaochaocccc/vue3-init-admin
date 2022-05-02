
const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return JSON.parse(state.userInfo) !== '{}'
  }
}

export default getters
