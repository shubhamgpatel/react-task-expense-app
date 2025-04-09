// import React, { useContext, useState } from "react";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar, Avatar, Tooltip } from "@mui/material";
// import { Dashboard, Task, Receipt, AccountCircle, Menu, Logout, Notifications } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Sidebar = styled(Drawer)(({ theme, open }) => ({
//   width: open ? 40 : 60,
//   transition: "width 0.3s",
//   overflowX: "hidden",
//   "& .MuiDrawer-paper": {
//     width: open ? 240 : 60,
//     overflowX: "hidden",
//   },
// }));

// const DashboardLayout = () => {
//     const {logout} = useContext(AuthContext);
//     const navigate = useNavigate();
//   const [open, setOpen] = useState(true);
//   const menuItems = [
//     { text: "My Profile", icon: <AccountCircle /> },
//     { text: "Task Manager", icon: <Task /> },
//     { text: "Expense Tracker AAAA", icon: <Receipt /> },
//   ];

//   return (
//     <div style={{ display: "flex" ,background:"#ddd" }}>
//       <AppBar position="fixed" sx={{ zIndex: 1, }}>
//         <Toolbar>
//           <IconButton onClick={() => setOpen(!open)}>
//             <Menu sx={{ color: "white" }} />
//           </IconButton>
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
//             <IconButton color="inherit"><Notifications /></IconButton>
//             <Tooltip title="Logout"><IconButton color="inherit" onClick={() => { console.log(logout());}}><Logout /></IconButton></Tooltip>
//             <Avatar sx={{ marginLeft: 2 }}>SAA</Avatar>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Sidebar variant="permanent" open={open} style={{background:"#0f0b1c"}}>
//         <List>
//           {menuItems.map(({ text, icon }) => (
//             <Tooltip title={!open ? text : ""} placement="right" key={text}>
//               <ListItemButton>
//                 <ListItemIcon>{icon}</ListItemIcon>
//                 {open && <ListItemText primary={text} />}
//               </ListItemButton>
//             </Tooltip>
//           ))}
//         </List>
//       </Sidebar>
//       <main style={{ flexGrow: 1, padding: "20px", marginTop: "64px" }}>
//         {/* Content here */}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
