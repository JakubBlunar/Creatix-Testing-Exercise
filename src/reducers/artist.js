import {
	SEARCH_ARTIST_ALBUMS_DONE,
	SEARCH_ARTIST_ALBUMS_FAIL,
	SEARCH_ARTIST_ALBUMS_START,
} from '../types/artists'

const initState = {
	detail: {},
	albums: [],
	loading: false,
}

export default (state = initState, action) => {
	switch (action.type) {
		case SEARCH_ARTIST_ALBUMS_START:
			return {
				...state,
				loading: true
			}
		case SEARCH_ARTIST_ALBUMS_DONE:
			return {
				...state,
				loading: false,
				detail: action.payload.detail,
				albums: action.payload.albums
			}
		case SEARCH_ARTIST_ALBUMS_FAIL:
			return {
				...state,
				loading: false,
				albums: [],
				detail: {}
			}
		default:
			return state
	}
}
