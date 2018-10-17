import React from 'react'
import PropTypes from 'prop-types'

class SearchInput extends React.Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	}

	handleChange = (e) => {
		this.props.onChange(e.target.value || '')	
	}

	render = () => {
		return (
			<div className="row">
				<div className="col-12">
					<input
						className="form-control"
						type="text"
						placeholder="Search"
						aria-label="Search"
						onChange={this.handleChange}
					/>
				</div>
			</div>
			
		)
	}
}

export default SearchInput
