import React, { useState } from 'react'
import AppBar from '../Components/AppBar'
import { Box, Button, Checkbox, CircularProgress, Container, Select, TextField, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { CheckBox, Refresh } from '@mui/icons-material';
import SelectInput from '@mui/material/Select/SelectInput';
import NativeSelectInput from '@mui/material/NativeSelect/NativeSelectInput';
import { Spin, TreeSelect } from 'antd';
import DataTable from '../Components/DataTable';
import Person from '../Models/Person';
import { useAuthUser } from 'react-auth-kit';
import User from '../Models/User';
import axios, { all } from 'axios';
import Sector from '../Models/Sector';
import Datas from "../Datas/var.json"
import Swal from 'sweetalert2';
import SectorToSaveDto from '../Models/SectorToSaveDto';
import env from "react-dotenv";


const { SHOW_ALL } = TreeSelect;


function Home() {

    const { register, handleSubmit, setValue } = useForm();
    const methods = useForm();
    const [load, setLoad] = useState(false)
    const [loadPage, setLoadPage] = useState(false)
    const [sectors, setSector] = useState<SectorToSaveDto[]>([]);
    const [persons, setPersons] = useState<Person[]>([])
    const [allSectors, setAllSectors] = useState<Sector[]>([])

    const [isLoad, setIsLoad] = useState(true)

    const auth = useAuthUser()
    const user: User = JSON.parse(JSON.stringify(auth()))

    // const onChange = (newValue: string[]) => {
    //     setSector(newValue);
    // };

    if (isLoad) {
        setIsLoad(false)
        LoadDatas()
    }

    function LoadDatas() {
        loadSector()
        loadPersons()
    }

    function loadSector() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: env.BASE_URL + Datas.ApiUrl.Sector,
            headers: {
                'Accept': 'text/plain'
            }
        };

        axios.request(config)
            .then((response) => {
                setAllSectors(response.data as Sector[])
            })
            .catch((error) => {  });
    }

    function loadPersons() {
        setLoadPage(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: env.BASE_URL + Datas.ApiUrl.Person,
            headers: {
                'Accept': 'text/plain'
            }
        };

        axios.request(config)
            .then((response) => {
                var pers: Person[] = [];

                (response.data).map((p: any) => {
                    pers.push(
                        {
                            key: p.id,
                            ...p
                        }
                    )
                })

                setPersons(pers)
                setLoadPage(false)
            })
            .catch((error) => {setLoadPage(false) });

    }

    // const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { options } = event.target;
    //     const value: string[] = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     setSector(value);
    // };


    async function onSubmit(data: any) {
        setLoad(true)
        data = { ...data, createBy: user.userName, sectors }

        alert(JSON.stringify(data))
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: env.BASE_URL + Datas.ApiUrl.Person,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'text/plain'
            },
            data : JSON.stringify(data)
          };
          
          axios.request(config)
          .then((response) => {
            var pers: Person[] = []
            pers.push( 
                {
                    key : (response.data).id,
                    ...response.data
                }, 
                ...persons
            )
            setPersons(pers)
            setLoad(false)

          })
          .catch((error) => {
            setLoad(false)
            Swal.fire({
              icon: "warning",
              text : error.message
            })
          });
    }

    function handleChange(e: any) {
        var options = e.target.options;
        var value: SectorToSaveDto[] = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(
                    {
                        id : options[i].value
                    }
                );
            }
        }
        setSector(value);
    }
    async function updateFunction(data: any) {
        
        setLoadPage(true)
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: env.BASE_URL+Datas.ApiUrl.Person,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'text/plain'
            },
            data : JSON.stringify(data)
          };
          
          axios.request(config)
          .then((response) => {
            var per: Person = response.data as Person
            per.key = data.id
            var tabPerson : Person[] = persons
            var newTab : Person[] = [];

            tabPerson.map((p : any)=>{
                if (p.id == per.id) {
                    p = per
                }
                newTab.push({
                    key: p.id,
                    ...p
                })
            })
            setPersons(newTab)
            
            setLoadPage(false)
          })
          .catch((error) => {
            setLoadPage(false)
            Swal.fire({
                icon: "warning",
                title: "Error occured",
                text: error.message
            })
          });
          

    }

    return (
        <Spin spinning={loadPage}>
            <div>
                <AppBar />
                <br />
                {"Welcome to you " + user.userName}
                <br />
                <br />
                <Container maxWidth={"xl"}>

                    <Button onClick={LoadDatas} disableElevation variant='contained' fullWidth endIcon={<Refresh />}>Refresh</Button>
                    <FormProvider  {...methods}>
                        <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                            <form className='form_Element' onSubmit={handleSubmit(onSubmit)}>
                                <Typography>Please enter your name and pick the Sectors you are currently involved in.</Typography><br />
                                <Box  >
                                    <TextField
                                        {...register("name")}
                                        color='success'
                                        label={"User Name"}
                                        type={"text"}
                                        size='small'
                                        fullWidth
                                        required
                                    />
                                    <br /><br />

                                    <select required onChange={handleChange} className='' multiple >
                                        <option disabled style={{color: "gray"}}>Select soectors --------------------------------------------------------</option>
                                        {allSectors.map((s: Sector) => {
                                            switch (s.level) {
                                                case 0:
                                                    return <option value={s.id}>{s.name}</option>
                                                case 1:
                                                    return <option value={s.id}>&nbsp;&nbsp;&nbsp;&nbsp;{s.name}</option>
                                                case 2:
                                                    return <option value={s.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{s.name}</option>
                                                case 3:
                                                    return <option value={s.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{s.name}</option>
                                                default:
                                                    break;
                                            }
                                        })}
                                    </select>
                                    <Box display={"flex"}>
                                        <Typography marginTop={"6px"}>Agree to terms </Typography>
                                        <Checkbox required color='info' />
                                    </Box><br />
                                    <Button
                                        size='large'
                                        variant='contained'
                                        color='success'
                                        disabled={load}
                                        endIcon={
                                            load ? <CircularProgress size={"20px"} color='inherit' /> : ""
                                        }
                                        className='btn-submit'
                                        type='submit'
                                        disableElevation
                                        fullWidth
                                    >
                                        {"Save"}
                                    </Button>
                                </Box>

                            </form>
                            <hr />
                            <DataTable onClick={(e: any) => { setValue("name", e.name); } } data={persons} methods={methods} allSectors={allSectors} load={load} updateFunction={updateFunction} />
                        </Box>
                    </FormProvider>
                </Container>
            </div>
        </Spin>
    )
}

export default Home
