import * as React from 'react';
import ApplicationBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout, Power } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function AppBar() {
    const signOut = useSignOut()
    const navigate = useNavigate()

     function logout() {
        signOut()
        navigate("/Login")
    }

    return (
        <Container maxWidth={"lg"} sx={{ flexGrow: 1 }}>
            <ApplicationBar
                position="static"
                variant='outlined'
                color='inherit'
            >
                <Toolbar>

                    <Typography variant='h4' fontWeight={"bold"}>TEST Géodan Nzissié</Typography>
                    <hr />
                    <Button onClick={logout} variant='contained' disableElevation startIcon={<Logout />} color="error">Logout</Button>
                </Toolbar>
            </ApplicationBar>
        </Container>
    );
}