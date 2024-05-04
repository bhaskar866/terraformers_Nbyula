const express = require("express")
const { con } = require("./db-connections")
const PORT = 5000
const app = express();

app.use(express.json())

const getSqlQueryResponse = (query) => {
  return new Promise((resolve, reject) => {
    con.query(query, function (err, result, fields) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

app.post("/add_job", async (req, res) => {
  const { Job_Id, title, description, deadline, location, phone_number, email } = req.body
  const query = `INSERT INTO jobdeatils (Job_Id,title, description, location, deadline, phone_number, email) VALUES (${Job_Id},"${title}", "${description}", "${location}",${deadline}, "${phone_number}", "${email}")`

  try {
    const query_res = await getSqlQueryResponse(query)
    res.send(query_res)
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Error executing SQL query");
  }
})

app.get("/available_jobs", async (req, res) => {
  const query = "SELECT * FROM jobdeatils"

  try {
    const query_res = await getSqlQueryResponse(query)
    res.send(query_res)
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Error executing SQL query");
  }
})

app.get("/interested_user_by_job/:Job_Id", async (req, res) => {
  const { Job_Id } = req.params
  const query = `SELECT * FROM job_interests where user_id=${Job_Id}`

  try {
    const query_res = await getSqlQueryResponse(query)
    res.send(query_res)
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Error executing SQL query");
  }
})

app.get("/interested_job_by_user/:user_id", async (req, res) => {
  const { user_id } = req.params
  const query = `SELECT * FROM job_interests where user_id=${user_id}`

  try {
    const query_res = await getSqlQueryResponse(query)
    res.send(query_res)
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Error executing SQL query");
  }
})

app.post("/add_interest", async (req, res) => {
})

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`)
})
