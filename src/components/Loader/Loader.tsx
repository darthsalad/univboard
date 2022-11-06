import React from 'react'
import { Loader } from '@mantine/core';

const LoaderAnimation = () => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}
    >
        <Loader color="yellow" size="xl" variant="dots" />
    </div>
  )
}

export default LoaderAnimation