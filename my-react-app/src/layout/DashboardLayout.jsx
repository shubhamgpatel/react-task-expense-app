import React, { useContext, useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { Dashboard, Assignment, AccountBalanceWallet, Person, Menu as MenuIcon, Logout, Notifications } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  // const handleDrawerToggle = () => { setOpen((prev) => !prev);} // ✅ Toggle without resetting on route change
  const handleDrawerToggle = () => {setOpen(!open); };
  const {user, logout} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => { setAnchorEl(event.currentTarget); };

  const handleMenuClose = () => { setAnchorEl(null); };

  const menuItems = [
    { text: "My Profile", icon: <Person />, path: "profile" },
    { text: "Task Manager", icon: <Assignment />, path: "tasks" },
    { text: "Expense Tracker", icon: <AccountBalanceWallet />, path: "expenses" },
  ];

  return (
    <div style={{ display: "flex" ,background:"#ddd"}}>
      {/* Sidebar */}
      <Drawer variant="permanent"
        sx={{ width: open ? drawerWidth : 70, flexShrink: 0, "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 70, transition: "width 0.4s", overflowX: "hidden", top: "85px", // ✅ Push Sidebar Below Header
            height: "calc(100% - 64px)", // ✅ Prevents Overlapping
          },
        }}>
        <List style={{background:"#ddd"}}>
          {/* <ListItem button onClick={handleDrawerToggle}> */}
            {/* <ListItemIcon><MenuIcon /></ListItemIcon> */}
            {/* {open && <ListItemText primary="Menu" />} */}
          {/* </ListItem> */}
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" ,background:"#ddd"}}>
        {/* Header */}
        <AppBar position="static" style={{ background:"#252c65"}}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}> <MenuIcon /> </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
            <IconButton color="inherit"><Notifications /> </IconButton>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <Avatar sx={{ bgcolor: "#3f5e9a" }}>{user.name[0]}</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
              <MenuItem  onClick={() => { logout();}}><Logout /> Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <main style={{ padding: "20px" , marginTop: "85px" }}><Outlet/></main>
      </div>
    </div>
  );
};

export default DashboardLayout;
