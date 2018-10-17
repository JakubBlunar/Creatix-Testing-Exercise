import {
	SEARCH_ARTISTS_DONE,
	SEARCH_ARTISTS_START,
	SEARCH_ARTISTS_FAIL,
} from '../types/artists'

import axios from 'axios'

export function searchArtistsStartCreator() {
	return {
		type: SEARCH_ARTISTS_START
	}
}

export function searchArtistsDoneCreator(artists) {
	return {
		type: SEARCH_ARTISTS_DONE,
		payload: {
			artists
		}
	}
}

export function searchArtistsFailCreator() {
	return {
		type: SEARCH_ARTISTS_FAIL
	}
}

export const searchArtists = (searchValue) => {
	return async (dispatch) => {
		dispatch(searchArtistsStartCreator())
		try {
			const response = await axios.get(`https://itunes.apple.com/search?term=${searchValue}&entity=musicArtist`, {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			})
			dispatch(searchArtistsDoneCreator(response.data.results))
		} catch (e) {
			dispatch(searchArtistsFailCreator())
		}
	}
}
