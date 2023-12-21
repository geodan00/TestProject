import React from 'react'
import logo from "../logo.svg";
import { CircularProgress } from '@mui/material';

interface Props { }

function Load(props: Props) {
    const { } = props

    return (
        <div className='loading'>
            <CircularProgress />
        </div>
    )
}

export default Load
