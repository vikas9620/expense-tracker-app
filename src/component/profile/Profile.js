import { Button, TextField, Paper } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AccountCircle, Image } from "@mui/icons-material";

const Profile = () => {
  const { logout, profileUpdate, token } = useContext(ExpenseContext);
  const [username, setUsername] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco`,
          {
            method: "POST",
            body: JSON.stringify({ idToken: token }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const responseData = await res.json();
          const userProfileData = responseData.users[0];

          setUsername(userProfileData.displayName || "");
          setProfileImageURL(userProfileData.photoUrl || "");
        } else {
          console.log("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [token]);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfileImageURLChange = (e) => {
    setProfileImageURL(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userdata = {
      name: username,
      profileImage: profileImageURL,
    };

    profileUpdate(userdata, token);
    console.log("Username:", username);
    console.log("Profile Image URL:", profileImageURL);
    console.log(token);
    setUsername("");
    setProfileImageURL("");
  };
  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 0.5 }} style={{ marginBottom: "1rem" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h3> welcome to expense tracker profile page </h3>
            </Typography>
            <div>
              <h5>your profile is incomplete please complete your profile</h5>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <AccountCircle sx={{ fontSize: 40, marginRight: "10px" }} />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <Image sx={{ fontSize: 40, marginRight: "10px" }} />
          <TextField
            label="Profile Image URL"
            variant="outlined"
            fullWidth
            value={profileImageURL}
            onChange={handleProfileImageURLChange}
            required
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Paper>
    </React.Fragment>
  );
};
export default Profile;
