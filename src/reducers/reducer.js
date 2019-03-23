const initialState = {
  gallery: []
}

function deepCopy(x) {
  return JSON.parse(JSON.stringify(x))
}

const reducer = (state = initialState, action) => {
  let newGallery = deepCopy(state.gallery)

  switch (action.type) {
    case 'UPDATE_GALLERY':
      newGallery.push(action.data)
      return {
        gallery: newGallery
      }

    default:
      return state
  }
}

export default reducer
