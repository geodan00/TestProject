import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Box, Checkbox, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import { Edit, EditOffSharp } from '@mui/icons-material';
import Person from '../Models/Person';
import { useAuthUser } from 'react-auth-kit';
import User from '../Models/User';
import { Tooltip } from 'antd';
import Sector from '../Models/Sector';
import SectorToSaveDto from '../Models/SectorToSaveDto';
import Swal from 'sweetalert2';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function UpdatePersonModal(props: { person: Person, onSubmit: any, methods: any, allSectors: Sector[], load: boolean }) {
  const [open, setOpen] = React.useState(false);
  const auth = useAuthUser()
  const user: User = JSON.parse(JSON.stringify(auth()))
  const [sectors, setSector] = React.useState<SectorToSaveDto[]>([]);
  const [name, setName] = React.useState<string>(props.person.name);
  const [checked, setChecked] = React.useState<boolean>(true);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e: any) {
    var options = e.target.options;
    var value: SectorToSaveDto[] = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(
          {
            id: options[i].value
          }
        );
      }
    }

    setSector(value);
  }



  return (
    <React.Fragment>
      <Tooltip title={"Update " + props.person.name}>
        <IconButton onClick={handleClickOpen} disabled={props.person.createBy != user.userName} >{props.person.createBy != user.userName ? <EditOffSharp /> : <Edit />}</IconButton>
      </Tooltip>
      <Dialog
        style={{zIndex:0}}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Update {props.person.name}
        </DialogTitle>
        <DialogContent>
          <div >
            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
              <div className='form_Element'>
                <Typography>Please enter your name and pick the Sectors you are currently involved in.</Typography><br />
                <Box  >
                  <TextField
                    onChange={(e) => { setName(e.target.value) }}
                    defaultValue={props.person.name}
                    color='success'
                    label={"User Name"}
                    type={"text"}
                    size='small'
                    fullWidth
                    required
                  />
                  <br /><br />

                  <select required style={{ width: "100%" }} onChange={handleChange} className='' multiple >
                    <option disabled style={{ color: "gray" }}>Select soectors --------------------------------------------------------</option>
                    {props.allSectors.map((s: Sector) => {
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
                    <Checkbox defaultChecked onChange={()=>{setChecked(!checked)}} required color='info' />
                  </Box><br />
                  <Button

                    size='large'
                    variant='contained'
                    color='success'
                    disabled={props.load}
                    endIcon={
                      props.load ? <CircularProgress size={"20px"} color='inherit' /> : ""
                    }

                    className='btn-submit'
                    type='submit'
                    disableElevation
                    fullWidth
                    onClick={() => {
                      if (name!= "" && sectors.length != 0 && checked) {
                        props.onSubmit({
                          id: props.person.id,
                          person: {
                            name: name,
                            createBy: user.userName,
                            sectors: sectors
                          }
                        })
                        setOpen(false)
                      }else{
                        Swal.fire(
                          {
                            icon: "warning",
                            title: "All fields is required!"
                          }
                        )
                      }
                    }}

                  >
                    {"Save"}
                  </Button>
                </Box>

              </div>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}