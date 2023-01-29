import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

const Request = () => {
  const binId = useParams().binId;
  const requestId = useParams().requestId;
  console.log(requestId);
  const [createdAt, setCreatedAt] = useState();
  const [method, setMethod] = useState();
  const [headers, setHeaders] = useState();
  const [body, setBody] = useState();

  useEffect(() => {
    axios
      .get(`https://panicbin.mattdjohnston.ca/api/requests/${requestId}`)
      .then((response) => {
        setCreatedAt(response.data.createdat);
        setMethod(response.data.method);
        setHeaders(JSON.stringify(response.data.headers, null, 2));
        setBody(JSON.stringify(response.data.body, null, 2));
      });
  }, [requestId]);

  return (
    <>
      <Box>
        <Typography variant="h5" align="center" style={{ marginTop: "3em" }}>
          Request {requestId}
        </Typography>
        <Typography variant="subtitle2" align="center">
          for Bin <Link to={`../bins/${binId}`}>{binId}</Link>
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2em",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: 720,
        }}
      >
        <List>
          <ListItem key="createdAt">
            <ListItemText primary="Created At" />
            <ListItemText primary={createdAt} />
          </ListItem>
          <ListItem key="method">
            <ListItemText primary="Method" />
            <ListItemText primary={method} />
          </ListItem>
          <ListItem key="headers">
            <ListItemText primary="Headers" />
            <pre>
              <ListItemText primary={headers} />
            </pre>
          </ListItem>
          <ListItem key="body">
            <ListItemText primary="Body" />
          </ListItem>
          <ListItem key="body-json">
            <pre>
              <ListItemText primary={body} />
            </pre>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Request;
