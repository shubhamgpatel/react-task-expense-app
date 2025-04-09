import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Avatar, Container, Typography } from "@mui/material";

const Profile = () => {
  const { user,loading,login } = useContext(AuthContext);
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const handleSave = () => {
    console.log("Updated Profile:", { name, email, profilePic });
    // TODO: Send update request to backend
  };

  return (
    <Container>
      <Typography variant="h4" style={{color:"#252c65"}} gutterBottom>My Profile</Typography>
      <Avatar src={profilePic} sx={{ width: 80, height: 80, marginBottom: 2 }} />
      <TextField label="Name" value={user.name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
      <TextField label="Email" value={user.email} fullWidth margin="normal" disabled />
      <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
    </Container>
  );
};

export default Profile;
