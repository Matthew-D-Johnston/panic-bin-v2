import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

const Bin = () => {
  const binId = useParams().binId;
  const [requests, setRequests] = useState();

  useEffect(() => {
    axios
      .get(`https://panicbin.mattdjohnston.ca/api/requests/bin/${binId}`)
      .then((response) => {
        setRequests(response.data);
      });
  }, [binId, setRequests]);

  return (
    <>
      <Box>
        <Typography variant="h5" align="center" style={{ marginTop: "3em" }}>
          Requests for Bin {binId}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2em",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: 620,
        }}
      >
        <List>
          {requests &&
            requests.length > 0 &&
            requests.map(({ uuid, createdat }) => {
              return (
                <ListItem key={uuid} component={Link} to={`/${binId}/${uuid}`}>
                  <ListItemText primary={createdat} />
                  <ListItemText primary={uuid} />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default Bin;
