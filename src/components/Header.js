import { Avatar } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import '../styles/Header.css'
import MainImg from '../assets/main.webp'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AlbumIcon from '@material-ui/icons/Album';
import clsx from 'clsx';

// app drawer
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function Header() {


    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Box
                    display="flex"
                    onClick={() => {
                        window.location = "/";
                    }}
                >
                    <img src={MainImg} style={{ height: "250px", width: "250px", objectFit: "contain", margin: "0" }} />

                </Box>

                <div className="listgrp">
                    <ListItem
                        button
                        onClick={() => {
                            window.location = "/";
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => {
                            window.location = "/Podcasts";
                        }}
                    >
                        <ListItemIcon>
                            <AlbumIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Podcasts"} />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => auth.signOut()}
                    >
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={"SignOut"} />
                    </ListItem>
                </div>




            </List>
        </div>
    );
    const [user] = useAuthState(auth);
    return (
        <div className="header">
            <div className="header__left">
                <div className="navbar__hamburger">
                    {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon /></Button>
                            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                </div>
                <h1>Hello {user?.displayName} !</h1>
            </div>
            <div>
                <Avatar src={user?.photoURL} onClick={() => auth.signOut()} />

            </div>



        </div>
    )
}

export default Header
