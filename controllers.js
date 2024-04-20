const express = require("express")
const {con} = require("./db-connections")
const PORT  = 5000
const app = express();

app.use(express.json())

const getSqlQueryResponse = async (query)=>{
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          
          return result
        });

      });
    
}

// req.query.id


app.post("/add_job", async(req, res)=>{
    console.log("req body==>",req.body)
    const {Job_Id,
        title, 
    description, 
    deadline,
    location,
    phone_number, 
    email} = req.body
    const query = `INSERT INTO jobdeatils (Job_Id,title, description, location, deadline, phone_number, email) VALUES (${Job_Id},"${title}", "${description}", "${location}",${deadline}, "${phone_number}", "${email}")`

    const query_res = await getSqlQueryResponse(query)

    console.log("res==>", query_res)

    res.send(query_res)

    res.end()

})

app.get("/available_jobs", async(req, res)=>{
    const query = "SELECT * FROM jobdeatils"

    const query_res = await getSqlQueryResponse(query)
    console.log("query_res", query_res)
    res.send(query_res)

    res.end()

})

app.get("/interested_user_by_job", async(req, res)=>{
    const params = req.params
    const {Job_Id} = params
    const query = `SELECT * FROM job_interests where user_id=${Job_Id}`
    res.end()

})

app.get("/interested_job_by_user", async(req, res)=>{
const params = req.params
    const {user_id} = params
    const query = `SELECT * FROM job_interests where user_id=${user_id}`
    res.end()
    
})

app.post("/add_interest", async()=>{

})



app.listen(PORT, ()=>{
    console.log(`Port is listening on ${PORT}`)
})
