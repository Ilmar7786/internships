import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { FC } from "react";

export const Header: FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'end' }}>
                    <Button color="inherit">Войти</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
