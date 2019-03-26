const initialState = {
  gallery: [],
  exhibitions: []
}

function deepCopy(x) {
  return JSON.parse(JSON.stringify(x))
}

const reducer = (state = initialState, action) => {
  let newGallery = deepCopy(state.gallery)
  let newExhibitions = deepCopy(state.exhibitions)

  switch (action.type) {
    case 'UPDATE_GALLERY':
      if (newGallery.find((element) => {return element.data.objectID === action.data.objectID}) === undefined) {
        newGallery.push({data: action.data, isSelected: false})
      }
      return {
        ...state,
        gallery: newGallery
      }

    case 'SELECT_IMAGE':
      newGallery[action.index].isSelected = !state.gallery[action.index].isSelected
      return {
        ...state,
        gallery: newGallery
      }

    case 'REMOVE_IMAGE':
      var i
      for (i = newGallery.length - 1; i >= 0; i -= 1) {
        if (newGallery[i].isSelected === true) {
          newGallery.splice(i, 1)
        }
      }
      return {
        ...state,
        gallery: newGallery
      }

    case 'ADD_EXHIBITION':
      newExhibitions.push({title: action.title, objects:[]})
      return {
        ...state,
        exhibitions: newExhibitions
      }

    default:
      return state
  }
}

export default reducer
