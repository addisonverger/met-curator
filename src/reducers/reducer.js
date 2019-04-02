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

    case 'DESELECT_ALL_IMAGES':
      newGallery.forEach((element) => {
        element.isSelected = false
      })
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

    case 'MOVE_EXHIBITION':
      const selectedIndex = newExhibitions.findIndex((exhibition) => {
        return exhibition.title === action.title
      })
      newGallery.forEach((element) => {
        if (element.isSelected === true) {
          if (newExhibitions[selectedIndex].objects.find((object) => {return object.objectID === element.data.objectID}) === undefined) {
            newExhibitions[selectedIndex].objects.push({objectID: element.data.objectID, primaryImageSmall: element.data.primaryImageSmall, x: 0, y: 0})
          }
          element.isSelected = false
        }
      })
      return {
        gallery: newGallery,
        exhibitions: newExhibitions
      }

    case 'REMOVE_EXHIBITION':
      var j
      for (j = newExhibitions.length - 1; j >= 0; j -= 1) {
        if (newExhibitions[j].title === action.title) {
          newExhibitions.splice(j, 1)
        }
      }
      return {
        ...state,
        exhibitions: newExhibitions
      }

    case 'UPDATE_EXHIBITION_IMAGE_COORDINATES':
      const exhibitionIndex = newExhibitions.findIndex((exhibition) => {
        return exhibition.title === action.exhibition
      })
      console.log(newExhibitions[exhibitionIndex])

      // if (exhibitionIndex < 0 || exhibitionIndex === undefined) {
      //   console.log('error:', action.exhibition)
      //   return {
      //     ...state
      //   }
      // }

      console.log(action.objectIndex)

      newExhibitions[exhibitionIndex].objects[action.objectIndex].x = action.x
      newExhibitions[exhibitionIndex].objects[action.objectIndex].y = action.y


      return {
        ...state,
        exhibitions: newExhibitions
      }

    default:
      return state
  }
}

export default reducer
