import chroma from 'chroma-js';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		verticalAlign: 'top',
		'&:hover svg': {
			color: 'rgba(255,0,0,0.5)',
			transform: 'scale(1.5)'
		}
	},
	boxContent: {
		position: 'absolute',
		padding: '10px',
		width: '100%',
		left: '0',
		bottom: '0',
		color: 'black',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		transition: 'all 0.3s ease-in-out',
		color: (props) => (chroma(props.color).luminance() >= 0.6 ? 'rgba(0,0,0,0.5)' : 'white')
	}
};

export default styles;
