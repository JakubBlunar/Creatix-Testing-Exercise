import {
	SEARCH_ARTISTS_DONE,
	SEARCH_ARTISTS_START,
	SEARCH_ARTISTS_FAIL,
} from '../types/artists'

const initState = {
	data: [],
	loading: false,
}

export default (state = initState, action) => {
	switch (action.type) {
		case SEARCH_ARTISTS_START:
			return {
				...state,
				loading: true
			}
		case SEARCH_ARTISTS_DONE:
			return {
				...state,
				loading: false,
				data: action.payload.artists
			}
		case SEARCH_ARTISTS_FAIL:
			return {
				...state,
				loading: false,
				data: [],
			}
		default:
			return state
	}
}
