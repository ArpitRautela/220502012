const express = require("express");
const axios = require("axios");

const app = express();

async function fetchUsers(req, res) {
  try {
    const response = await axios.get(
      "http://20.244.56.144/evaluation-service/users",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0OTc3LCJpYXQiOjE3NDM2MDQ2NzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNmOWExNWU3LTExYmEtNGI2Yi05YjQwLWJjODc3ODg4ZjNmMSIsInN1YiI6IjIyMDUyMDEyQGtpaS5hYy5pbiJ9LCJlbWFpbCI6IjIyMDUyMDEyQGtpaS5hYy5pbiIsIm5hbWUiOiJhcnBpdCByYXV0ZWxhIiwicm9sbE5vIjoiMjIwNTIwMTIiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiJjZjlhMTVlNy0xMWJhLTRiNmItOWI0MC1iYzg3Nzg4OGYzZjEiLCJjbGllbnRTZWNyZXQiOiJLVWVSV1FqdlRBc25GcmVZIn0.7VVmmJACvv1iRxreAxS6X2-4WQWUz0AL0hgMpTJiQdQ",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

async function fetchTopUsers(req, res) {
  try {
    const response = await axios.get(
      "http://20.244.56.144/evaluation-service/users",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0OTc3LCJpYXQiOjE3NDM2MDQ2NzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNmOWExNWU3LTExYmEtNGI2Yi05YjQwLWJjODc3ODg4ZjNmMSIsInN1YiI6IjIyMDUyMDEyQGtpaS5hYy5pbiJ9LCJlbWFpbCI6IjIyMDUyMDEyQGtpaS5hYy5pbiIsIm5hbWUiOiJhcnBpdCByYXV0ZWxhIiwicm9sbE5vIjoiMjIwNTIwMTIiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiJjZjlhMTVlNy0xMWJhLTRiNmItOWI0MC1iYzg3Nzg4OGYzZjEiLCJjbGllbnRTZWNyZXQiOiJLVWVSV1FqdlRBc25GcmVZIn0.7VVmmJACvv1iRxreAxS6X2-4WQWUz0AL0hgMpTJiQdQ",
          "Content-Type": "application/json",
        },
      }
    );
    const top5Users = Object.values(response.data.users)
      .sort((a, b) => b.localeCompare(a)) 
      .slice(0, 5); 

    res.json(top5Users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

async function fetchPosts(req, res) {
    const userId = req.query.userId || ""; 
    const postType = req.query.type || ""; 
  
    try {
      const response = await axios.get(
        `http://20.244.56.144/evaluation-service/users/${userId}/posts?type=${postType}`,
        {
            headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA1NDI2LCJpYXQiOjE3NDM2MDUxMjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNmOWExNWU3LTExYmEtNGI2Yi05YjQwLWJjODc3ODg4ZjNmMSIsInN1YiI6IjIyMDUyMDEyQGtpaS5hYy5pbiJ9LCJlbWFpbCI6IjIyMDUyMDEyQGtpaS5hYy5pbiIsIm5hbWUiOiJhcnBpdCByYXV0ZWxhIiwicm9sbE5vIjoiMjIwNTIwMTIiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiJjZjlhMTVlNy0xMWJhLTRiNmItOWI0MC1iYzg3Nzg4OGYzZjEiLCJjbGllbnRTZWNyZXQiOiJLVWVSV1FqdlRBc25GcmVZIn0.GMJ41NOm7waULaBJWseBG7LHBXkqf0dYXIPWSNekCPE",
                "Content-Type": "application/json",
            },
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

app.get("/users", fetchUsers);
app.get("/post", fetchPosts);
app.get("/users/topUsers",fetchTopUsers);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
