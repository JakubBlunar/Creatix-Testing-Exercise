import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { indexOf, filter } from 'lodash'
import { Link } from 'react-router-dom'

import { ARTIST_DETAIL, setRouteParams } from '../utils/routes'
import * as LikedAlbumsActions from '../actions/LikedAlbums'

class AlbumInfo extends React.Component {
	static propTypes = {
		album: PropTypes.shape().isRequired,
		LikedAlbumsActions: PropTypes.shape({
			likedAlbumsChanged: PropTypes.func.isRequired
		}).isRequired,
		likedAlbums: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
		showLink: PropTypes.bool
	}

	toggleFavorites = (collectionId) => {
		const { likedAlbums, LikedAlbumsActions } = this.props
		const { data } = likedAlbums

		const index = indexOf(data, collectionId)
		let newCollection = []
		if (index > -1) {
			newCollection = filter(data, (e) => e != collectionId)
		} else {
			newCollection = [ ...data, collectionId]
		}

		LikedAlbumsActions.likedAlbumsChanged(newCollection)	
	}

	render = () => {
		const { likedAlbums, album, showLink } = this.props
		const { data } = likedAlbums

		return (
			<div
				className="col-md-6 col-sm-12 artist-list"
			>
				<div className="well">
					<h3>{album.collectionCensoredName}</h3>
					<div className="row">
						<div className="col-4">
							<Link to={setRouteParams(ARTIST_DETAIL, album.artistId)} >
								<img src={album.artworkUrl100} alt={album.collectionCensoredName} className="img-thumbnail" />
							</Link>
						</div>
						<div className="col-8">
							Genre: {album.primaryGenreName}
							<br />
							<span onClick={() => this.toggleFavorites(album.collectionId)}>
								<i className="fa fa-heart" aria-hidden="true" style={{ color: indexOf(data, album.collectionId) > -1 ? 'red' : 'black', cursor: 'pointer' }}></i>
							</span>
							<br />
							{showLink && <Link to={setRouteParams(ARTIST_DETAIL, album.artistId)} >To artist</Link>}
						</div>
					</div>
				</div>
			</div>
			
		)
	}

}

const mapStateToProps = state => ({
	likedAlbums: state.likedAlbums
})

const mapDispatchToProps = dispatch => ({
	LikedAlbumsActions: bindActionCreators(LikedAlbumsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumInfo)

