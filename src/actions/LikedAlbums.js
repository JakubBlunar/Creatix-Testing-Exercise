import {
	LIKED_ALBUMS_CHANGED,
	LIKED_ALBUMS_LOAD_FAIL,
	LIKED_ALBUMS_LOAD_DONE,
	LIKED_ALBUMS_LOAD_START
} from '../types/liked'
import {
	get,
	filter
} from 'lodash'
import axios from 'axios'
import {
	toast
} from 'react-toastify'

export function likedAlbumsChangedCreator(collection) {
	return {
		type: LIKED_ALBUMS_CHANGED,
		payload: {
			collection
		}
	}
}

export function loadLikedAlbumsStartCreator() {
	return {
		type: LIKED_ALBUMS_LOAD_START
	}
}

export function loadLikedAlbumsDoneCreator(collection) {
	return {
		type: LIKED_ALBUMS_LOAD_DONE,
		payload: {
			collection
		}
	}
}

export function loadLikedAlbumsFailCreator() {
	return {
		type: LIKED_ALBUMS_LOAD_FAIL
	}
}

const reloadData = async (dispatch, getStore) => {
	const {
		data
	} = getStore().likedAlbums

	dispatch(loadLikedAlbumsStartCreator())
	if (!data.length) {
		dispatch(loadLikedAlbumsDoneCreator([]))
	}

	try {
		const response = await axios.get(`https://itunes.apple.com/lookup?id=${data.join(',')}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		})

		const albums = filter(get(response, 'data.results', []), (o) => o.wrapperType == "collection" && o.collectionType == "Album")
		dispatch(loadLikedAlbumsDoneCreator(albums))
	} catch (e) {
		toast.error("Error while fetching liked albums")
		dispatch(loadLikedAlbumsFailCreator())
	}
}

export const reloadLikedAlbumsData = () => {
	return async (dispatch, getStore) => {
		reloadData(dispatch, getStore)
	}
}

export const likedAlbumsChanged = (collection) => {
	return async (dispatch, getStore) => {
		dispatch(likedAlbumsChangedCreator(collection))
		reloadData(dispatch, getStore)
	}
}
