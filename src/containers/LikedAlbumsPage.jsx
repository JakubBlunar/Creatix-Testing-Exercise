import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import AlbumInfo from '../components/AlbumInfo'
import * as LikedAlbumsActions from '../actions/LikedAlbums'
import Loader from '../components/Loader'

class LikedAlbumsPage extends React.Component {
	static propTypes = {
		t: PropTypes.func.isRequired,
		likedAlbums: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
		LikedAlbumsActions: PropTypes.shape({
			likedAlbumsChanged: PropTypes.func.isRequired
		}).isRequired
	}

	componentDidMount = () => {
		const { LikedAlbumsActions } = this.props
		LikedAlbumsActions.reloadLikedAlbumsData()
	}

	render = () => {

		const { likedAlbums } = this.props
		const { loadedInfo, loading } = likedAlbums

		let content = null
		if (loading) {
			content = (
				<Loader />
			)
		} else if (loadedInfo) {
			content = map(loadedInfo, (album) => {
				return (
					<AlbumInfo album={album} key={`album-${album.collectionId}`} showLink />
				)
			})
		}

		return (
			<div className="page-container">
				<div className="container" style={{ paddingTop: '20px' }}>
					<h1>
						Liked albums
					</h1>
					<div className="row artists-results">
						{content}
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedAlbumsPage)
