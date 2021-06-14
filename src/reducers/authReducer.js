export const authReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_USER':
          //console.log(action)
        return {email: action.user.useremail, id: action.user.userid}
        case 'REMOVE_USER':
          //console.log(action)
        return {}
      default:
        return state;
    }
  } 