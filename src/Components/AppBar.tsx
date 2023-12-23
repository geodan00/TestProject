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
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import User from '../Models/User';
import { Avatar } from 'antd';

export default function AppBar() {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const user: User = JSON.parse(JSON.stringify(auth()))

     function logout() {
        signOut()
        navigate("/Login")
    }

    return (
        <Container maxWidth={"xl"} sx={{ flexGrow: 1 }}>
            <ApplicationBar
                position="static"
                variant='outlined'
                color='inherit'
            >
                <Toolbar>
                    <Typography variant='h4' fontWeight={"bold"}>TEST Géodan Nzissié</Typography>
                    <hr />
                    <Button onClick={logout} variant='contained' disableElevation startIcon={<Logout />} color="error">Logout</Button>
                    {user.picture?<Avatar style={{marginLeft:"10px"}} size={"large"} src={user.picture} /> : ""}
                </Toolbar>
            </ApplicationBar>
        </Container>
    );
}