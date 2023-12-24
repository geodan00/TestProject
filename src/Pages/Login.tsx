import { Message } from '@mui/icons-material';
import { Box, Button, CircularProgress, Collapse, Icon, Skeleton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import '../Styles/LoginStyle.css'
import User from '../Models/User';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import Datas from "../Datas/var.json";
import axios from "axios";
import Sw from "sweetalert2";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import DecodeToken from '../Services/DecodeToken';
import env from "react-dotenv";

function Login() {
    const { register, handleSubmit } = useForm();
    const methods = useForm();
    const [load, setLoad] = useState(false)
    const navigat = useNavigate()
    const signIn = useSignIn()


    async function onSubmit(data: any) {
        setLoad(true)

        let user: User = new User(data.userName, data.password)
        user.name = data.name
        user.picture = data.picture

        user.password = data.password == "OAuth" ? "OAuth" : user.password
        //alert(JSON.stringify(user))
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: env.BASE_URL + Datas.ApiUrl.LogIn,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: JSON.stringify(user)
        };

        axios.request(config)
            .then((response) => {
                setLoad(false)
                //console.log(response)
                if (response.data.userName) {
                    if (signIn(
                        {
                            token: "",
                            expiresIn: 3600,
                            tokenType: "Bearer",
                            authState: { "userName": user.userName, "name": user.name, "picture": user.picture }
                        }
                    )) {
                        // Redirecting to home page
                        navigat("/")
                    } else {
                        Sw.fire({
                            title: "User not found.",
                            text: "Make sure that that all your credential is correct!",
                            icon: 'warning'

                        })
                    }
                }
            })
            .catch((error) => {
                setLoad(false)
                if (error.request.status == 404) {

                    Sw.fire({
                        title: "User not found",
                        text: "Make sure that all your credential is correct!",
                        icon: 'warning'

                    })
                } else {
                    Sw.fire({
                        title: "Error occured",
                        text: error.message,
                        icon: 'warning'

                    })
                }
            });
    }

    return (

        <FormProvider {...methods}>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <p className='form-title'>Please enter your login details !!!</p>
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
                </Button><br /><br />
                or
                <br />

                <Button>
                    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID as string} >

                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                let response: any = DecodeToken(credentialResponse.credential as string)

                                let user: User = new User(response.email, "")
                                user.password = "OAuth"
                                user.name = response.name
                                user.email = response.email
                                user.picture = response.picture

                                onSubmit(user)
                            }}
                            onError={() => {
                                Sw.fire({
                                    icon: "warning",
                                    text: "Login Failed"
                                })
                            }}
                        />
                    </GoogleOAuthProvider>
                </Button>
            </form>
        </FormProvider>
    )
}

export default Login
