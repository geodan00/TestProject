import { Message } from '@mui/icons-material';
import { Box, Button, CircularProgress, Collapse, Icon, Skeleton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import '../Styles/LoginStyle.css'
import User from '../Models/User';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

function Login() {
    const { register, handleSubmit} = useForm();
    const methods = useForm();
    const [load, setLoad] = useState(false)
    const navigat = useNavigate()
    const signIn = useSignIn()


    async function onSubmit(data: any) {
        let user: User = new User(data.userName, data.password)
        if (signIn(
            {
                token: "",
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { "userName": user.userName }
            }
        )) {

            // Redirecting to home page
            navigat("/")
        } else {
            //Throw error
        }
    }

    return (

        <FormProvider {...methods}>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <p className='form-title'>Please enter your login details!</p>
                <p style={{ fontWeight: "lighter", textAlign: "left" }}>Make sure to enter all filed.</p><br />
                <TextField
                    {...register("userName")}
                    required
                    color='success'
                    label={"User Name"}
                    type={"text"}
                    variant="filled"
                    size='small'
                    fullWidth
                /><br /><br />

                <TextField
                    {...register("password")}
                    required
                    color='success'
                    label={"Password"}
                    type={"password"}
                    size='small'
                    variant="filled"
                    fullWidth
                /><br /><br />

                <Button
                    size='large'
                    variant='contained'
                    color='success'
                    disabled={load}
                    endIcon={
                        load ? <CircularProgress size={"20px"} color='inherit' /> : ""
                    }
                    fullWidth
                    className='btn-submit'
                    type='submit'
                >
                    {"Sign In"}
                </Button>
            </form>
        </FormProvider>
    )
}

export default Login
