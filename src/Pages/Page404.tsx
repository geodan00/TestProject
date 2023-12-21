import React from 'react';
import NotFoundImage from '../Ressources/Na_Nov_26-removebg-preview.png';
import { Typography } from '@mui/material';

const Page404 = (props:{width? : number}) => {
    return (
        <div>
            <center>
                <img src={NotFoundImage} alt="Ressource Not Found" width={props.width} draggable="false"/>
                <Typography>Page not found!</Typography>
            </center>
        </div>
    );
};

export default Page404;