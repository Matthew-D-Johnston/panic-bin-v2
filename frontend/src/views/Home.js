import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [bins, setBins] = useState();
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios.get("http://localhost:7003/api/bins").then((response) => {
      setBins(response.data);
    });
  }, [setBins]);

  return (
    <>
      <Box>
        <Dialog open={open} onClose={handleClick}>
          <Alert severity="success">
            Success! Your new PanicBin has been created.
          </Alert>
        </Dialog>
      </Box>
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto", marginRight: "auto" }}
          onClick={async () => {
            const response = await axios.post(`http://localhost:7003/api/bins`);
            if (response.status === 201) {
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
              setBins((prev) => [response.data, ...prev]);
            }
          }}
        >
          Create New PanicBin
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "5em",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <List>
          {bins &&
            bins.length > 0 &&
            bins.map(({ uuid }) => {
              return (
                <ListItem key={uuid} component={Link} to={`/bins/${uuid}`}>
                  <ListItemText primary={uuid} />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default Home;