import {
	SEARCH_ARTIST_ALBUMS_DONE,
	SEARCH_ARTIST_ALBUMS_START,
	SEARCH_ARTIST_ALBUMS_FAIL,
} from '../types/artists'
import {
	get,
	filter,
	find
} from 'lodash'
import {
	toast
} from 'react-toastify'
import axios from 'axios'
import {
	ARTISTS
} from '../utils/routes'
import {
	history,
} from '../utils/history'

export function searchArtistAlbumStartCreator() {
	return {
		type: SEARCH_ARTIST_ALBUMS_START
	}
}

export function searchArtistAlbumDoneCreator(albums, detail) {
	return {
		type: SEARCH_ARTIST_ALBUMS_DONE,
		payload: {
			albums,
			detail
		}
	}
}

export function searchArtistAlbumFailCreator() {
	return {
		type: SEARCH_ARTIST_ALBUMS_FAIL,
	}
}

export const searchArtistAlbums = (artistId) => {
	return async (dispatch) => {
		dispatch(searchArtistAlbumStartCreator())
		try {
			const response = await axios.get(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				}
			})
			const albums = filter(get(response, 'data.results', []), (o) => o.wrapperType == "collection" && o.collectionType == "Album")
			const detail = find(get(response, 'data.results', []), (o) => o.wrapperType == "artist") || {}
			dispatch(searchArtistAlbumDoneCreator(albums, detail))
		} catch (e) {
			toast.error("Error while fetching artist albums")
			history.push(ARTISTS)
			dispatch(searchArtistAlbumFailCreator())
		}
	}
}
