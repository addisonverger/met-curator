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
      if (newGallery.find((element) => {return element.data.objectID === action.data.objectID}) === undefined) {
        newGallery.push({data: action.data, isSelected: false})
      }
      return {
        gallery: newGallery
      }

    case 'SELECT_IMAGE':
      newGallery[action.index].isSelected = !state.gallery[action.index].isSelected
      return {
        gallery: newGallery
      }

    default:
      return state
  }
}

export default reducer
