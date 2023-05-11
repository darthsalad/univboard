import React from 'react'
import { Loader } from '@mantine/core'
import { useStyles } from './loader.styles';

const PageLoader = () => {
	const { classes } = useStyles();
	
  return (
		<div className={classes.wrapper}>
			<Loader size={80} variant="bars" />
		</div>
	);
}

export default PageLoader