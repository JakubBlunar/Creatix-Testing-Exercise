import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { INDEX, ARTISTS } from '../utils/routes'

class Header extends Component {
	static propTypes = {
		location: PropTypes.shape().isRequired
	}

	state = {
		visible: false
	}

	render = () => {
		const { location } = this.props
		const { visible } = this.state
		return (
			<React.Fragment>
				<header>

					<nav className="navbar navbar-expand-lg navbar-dark primary-color fixed-top">

						<div className="container">

							<Link className="navbar-brand" to={INDEX}>Creatix</Link>

							<button
								className="navbar-toggler"
								type="button"
								onClick={() => this.setState({ visible: !visible })}
							>
								<span className="navbar-toggler-icon"></span>
							</button>

							<div className={cx('collapse', 'navbar-collapse', { show: visible })}>

								<ul className="navbar-nav mr-auto">
									<li className={cx('nav-item', { active: location.pathname == INDEX })}>
										<Link
											to={INDEX}
											className="nav-link"
											onClick={() => this.setState({ visible: false })}
										>Liked</Link>
									</li>
									<li className={cx('nav-item', { active: location.pathname.includes('artist') })}>
										<Link
											to={ARTISTS}
											className="nav-link"
											onClick={() => this.setState({ visible: false })}
										>Artists</Link>
									</li>
								</ul>
							</div>

						</div>

					</nav>

				</header>
			</React.Fragment>

		)
	}
}

export default withRouter(Header)
