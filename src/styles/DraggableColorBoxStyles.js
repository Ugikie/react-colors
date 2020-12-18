import chroma from 'chroma-js';
import sizes from './sizes';

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
			transform: 'scale(1.5)'
		},
		'& svg:hover': {
			color: 'rgba(255,0,0,0.5)'
		},

		[sizes.down('lg')]: {
			width: '25%',
			height: '20%'
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '10%'
		},
		[sizes.down('sm')]: {
			width: '100%',
			height: '5%'
		}
	},
	boxContent: {
		position: 'absolute',
		padding: '10px',
		width: '95%',
		left: '0',
		bottom: '0',
		color: (props) => (chroma(props.color).luminance() <= 0.2 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)'),
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		transition: 'all 0.3s ease-in-out'
		// color: (props) => (chroma(props.color).luminance() >= 0.6 ? 'rgba(0,0,0,0.5)' : 'white')
	}
};

export default styles;
