import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentColor: '#6c5ce7',
			newColorName: ''
		};
	}

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addNewColor(newColor);
	};

	render() {
		const { paletteIsFull, classes } = this.props;
		return (
			<div style={{ width: '100%' }}>
				<ChromePicker
					width='100%'
					className={classes.picker}
					color={this.state.currentColor}
					onChangeComplete={this.updateCurrentColor}
				/>
				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={this.state.newColorName}
						name='newColorName'
						variant='filled'
						margin='normal'
						placeholder='Color Name'
						onChange={this.handleChange}
						className={classes.colorNameInput}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'Give your color a name!',
							'That name is already taken!',
							'Color must be unique!'
						]}
					/>
					<Button
						variant='contained'
						color='primary'
						style={{ backgroundColor: paletteIsFull ? 'grey' : this.state.currentColor }}
						type='submit'
						className={classes.addColor}
						disabled={paletteIsFull}
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
