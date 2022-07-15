import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Info = () => (
  <div>
    <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
      <CardContent>
        <Typography variant="h6">Execution Time (ms)</Typography>
        <Typography variant="h3">3.63</Typography>
      </CardContent>
    </Card>
    <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
      <CardContent>
        <Typography variant="h6">Nodes Visited</Typography>
        <Typography variant="h3">128</Typography>
      </CardContent>
    </Card>
    <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
      <CardContent>
        <Typography variant="h6">Path Length</Typography>
        <Typography variant="h3">24</Typography>
      </CardContent>
    </Card>
    <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
      <CardContent>
        <Typography variant="h6">Algorithm Name</Typography>
        <Typography variant="body">
          This is some information about the selected algorithm.
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default Info;
