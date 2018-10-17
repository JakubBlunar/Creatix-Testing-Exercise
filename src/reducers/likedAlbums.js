import {
	LIKED_ALBUMS_CHANGED,
	LIKED_ALBUMS_LOAD_FAIL,
	LIKED_ALBUMS_LOAD_DONE,
	LIKED_ALBUMS_LOAD_START
} from '../types/liked'

const initState = {
	data: [],
	loadedInfo: [],
	loading: false
}

export default (state = initState, action) => {
	switch (action.type) {
		case LIKED_ALBUMS_CHANGED:
			return {
				...state,
				data: action.payload.collection
			}
		case LIKED_ALBUMS_LOAD_FAIL:
			return {
				...state,
				loadedInfo: [],
				loading: false
			}
		case LIKED_ALBUMS_LOAD_START:
			return {
				...state,
				loading: true
			}
		case LIKED_ALBUMS_LOAD_DONE:
			return {
				...state,
				loading: false,
				loadedInfo: action.payload.collection
			}
		default:
			return state
	}
}
