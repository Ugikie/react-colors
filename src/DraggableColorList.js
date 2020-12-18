import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	'@global': {
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-out'
		},
		'.fade-enter': {
			opacity: 0
		},
		'.fade-enter-active': {
			opacity: 1,
			transition: 'opacity 500ms ease-out'
		}
	}
};

const DraggableColorList = SortableContainer(({ classes, colors, removeColor }) => {
	return (
		<TransitionGroup className={classes.colors} style={{ height: '100%' }}>
			{colors.map((color, idx) => (
				<CSSTransition key={idx} classNames='fade' timeout={500}>
					<DraggableColorBox
						key={color.name}
						index={idx}
						color={color.color}
						name={color.name}
						handleClick={() => removeColor(color.name)}
					/>
				</CSSTransition>
			))}
		</TransitionGroup>
	);
});

export default withStyles(styles)(DraggableColorList);
