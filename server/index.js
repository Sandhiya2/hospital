const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "dhiyasans",
    database: "hospital"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

/* Department*/

app.get("/api/get",(req,res)=> {
    const sqlGet = "SELECT * FROM department";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/api/post",(req,res) => {
    const{departmentname, description} = req.body;
    const sqlInsert = "INSERT INTO department(departmentname,description) VALUES (?, ?)";
    db.query(sqlInsert, [departmentname, description], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:iddepartment",(req,res) => {
    const{ iddepartment } = req.params;
    const sqlRemove = "DELETE FROM department WHERE iddepartment = ?";
    db.query(sqlRemove, iddepartment, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:iddepartment",(req,res)=> {
    const {iddepartment} = req.params;
    const sqlGet = "SELECT * FROM department WHERE iddepartment=?";
    db.query(sqlGet, iddepartment,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:iddepartment",(req,res)=> {
    const {iddepartment} = req.params;
    const {departmentname, description} = req.body;
    const sqlUpdate= "UPDATE department SET departmentname = ?, description = ? WHERE iddepartment=?";
    db.query(sqlUpdate,[ departmentname,description,iddepartment],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*... Department...*/

/* Doctor */

app.get("/doctor/get",(req,res)=> {
    const sqlGet = "SELECT * FROM doctor";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/doctor/post",(req,res) => {
    const{doctorname, specialization, gender, mobile, email, address, picture} = req.body;
    const sqlInsert = "INSERT INTO doctor(doctorname, specialization, gender, mobile, email, address, profile) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [doctorname, specialization, gender, mobile, email, address, picture.images], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/doctor/remove/:doctorid",(req,res) => {
    const{ doctorid } = req.params;
    const sqlRemove = "DELETE FROM doctor WHERE doctorid = ?";
    db.query(sqlRemove, doctorid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/doctor/get/:doctorid",(req,res)=> {
    const {doctorid} = req.params;
    const sqlGet = "SELECT * FROM doctor WHERE doctorid=?";
    db.query(sqlGet, doctorid ,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/doctor/updatedoctor/:doctorid",(req,res)=> {
    const {doctorid} = req.params;
    const {doctorname, specialization, gender, mobile, email, address, picture} = req.body;
    const sqlUpdate= "UPDATE doctor SET doctorname = ?, specialization = ?, gender = ?, mobile = ?, email = ?, address = ?, profile = ? WHERE doctorid=?";
    db.query(sqlUpdate,[ doctorname, specialization, gender, mobile, email, address, picture.images, doctorid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Doctor...*/

/* Consult */

app.get("/consult/get",(req,res)=> {
    const sqlGet = "SELECT hospital.consult.consultid,hospital.patient.name,hospital.doctor.doctorname,hospital.consult.disease,hospital.consult.prescription FROM hospital.consult INNER JOIN hospital.patient ON hospital.consult.patientid = hospital.patient.patientid INNER JOIN hospital.doctor ON hospital.consult.doctorid = hospital.doctor.doctorid; ";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/consult/post",(req,res) => {
    const{patientid,doctorid,disease,prescription }=req.body;
    const sqlInsert = "INSERT INTO consult(patientid,doctorid,disease,prescription) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(doctorid),disease,prescription], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/consult/remove/:consultid",(req,res) => {
    const{ consultid } = req.params;
    const sqlRemove = "DELETE FROM consult WHERE consultid = ?";
    db.query(sqlRemove, consultid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/consult/get/:consultid",(req,res)=> {
    const {consultid} = req.params;
    const sqlGet = "SELECT * FROM consult WHERE consultid=?";
    db.query(sqlGet, consultid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/consult/updateconsult/:consultid",(req,res)=> {
    const {consultid} = req.params;
    const {patientid,doctorid,disease,prescription} = req.body;
    const sqlUpdate= "UPDATE consult SET patientid = ?,doctorid = ?,disease = ?,prescription = ? WHERE consultid=?";
    db.query(sqlUpdate,[ patientid,doctorid,disease,prescription,consultid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Consult...*/



/*Staff*/

app.get("/staff/get",(req,res)=> {
    const sqlGet = "SELECT * FROM staff";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/staff/post",(req,res) => {
    const{staffname, designation, salary, staffmobile, email, address} = req.body;
    const sqlInsert = "INSERT INTO staff(staffname, designation, salary, staffmobile, email, address) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [staffname, designation, salary, staffmobile, email, address], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/staff/remove/:idstaff",(req,res) => {
    const{ idstaff } = req.params;
    const sqlRemove = "DELETE FROM staff WHERE idstaff = ?";
    db.query(sqlRemove, idstaff, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/staff/get/:idstaff",(req,res)=> {
    const {idstaff} = req.params;
    const sqlGet = "SELECT * FROM staff WHERE idstaff=?";
    db.query(sqlGet, idstaff,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/staff/updatestaff/:idstaff",(req,res)=> {
    const {idstaff} = req.params;
    const {staffname, designation, salary, staffmobile, email, address} = req.body;
    const sqlUpdate= "UPDATE staff SET staffname = ?, designation = ?, salary = ?, staffmobile = ?, email = ?, address = ? WHERE idstaff=?";
    db.query(sqlUpdate,[ staffname, designation, salary, staffmobile, email, address,idstaff],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Staff...*/

/*Medicines*/

app.get("/medi/get",(req,res)=> {
    const sqlGet = "SELECT * FROM medicine ORDER BY medicinename ASC;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/medi/post",(req,res) => {
    const{medicinename, brand, meditype, price, stockstatus} = req.body;
    const sqlInsert = "INSERT INTO medicine(medicinename, brand, meditype,price, stockstatus) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [medicinename, brand, meditype, price, stockstatus], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/medi/remove/:mediid",(req,res) => {
    const{ mediid } = req.params;
    const sqlRemove = "DELETE FROM medicine WHERE mediid = ?";
    db.query(sqlRemove, mediid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/medi/get/:mediid",(req,res)=> {
    const {mediid} = req.params;
    const sqlGet = "SELECT * FROM medicine WHERE mediid=? ";
    db.query(sqlGet, mediid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/medi/updatemedi/:mediid",(req,res)=> {
    const {mediid} = req.params;
    const {medicinename, brand, meditype ,price, stockstatus} = req.body;
    const sqlUpdate= "UPDATE medicine SET medicinename = ?, brand = ?, meditype = ?,price = ?, stockstatus = ? WHERE mediid=?";
    db.query(sqlUpdate,[ medicinename, brand, meditype, price, stockstatus,mediid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Medicines...*/

/* medisales */

app.get("/sales/get",(req,res)=> {
    const sqlGet = "SELECT hospital.sales.saleid,hospital.patient.name,hospital.medicine.medicinename,hospital.sales.quantity,hospital.sales.medicineamt FROM hospital.sales INNER JOIN hospital.patient ON hospital.sales.patientid = hospital.patient.patientid INNER JOIN hospital.medicine ON hospital.sales.mediid = hospital.medicine.mediid;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/sales/post",(req,res) => {
    const{patientid,mediid,quantity,medicineamt }=req.body;
    const sqlInsert = "INSERT INTO sales(patientid,mediid,quantity,medicineamt ) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(mediid),quantity,medicineamt], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/sales/remove/:saleid",(req,res) => {
    const{ saleid } = req.params;
    const sqlRemove = "DELETE FROM sales WHERE saleid = ?";
    db.query(sqlRemove, saleid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/sales/get/:saleid",(req,res)=> {
    const {saleid} = req.params;
    const sqlGet = "SELECT * FROM sales WHERE saleid=?";
    db.query(sqlGet, saleid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/sales/updatesales/:saleid",(req,res)=> {
    const {saleid} = req.params;
    const {quantity,medicineamt} = req.body;
    const sqlUpdate= "UPDATE sales SET quantity = ?, medicineamt = ? WHERE saleid=?";
    db.query(sqlUpdate,[ quantity,medicineamt,saleid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});
app.get("/sales/salereport",(req,res)=>{
    const sqlGet = "SELECT hospital.sales.saleid,hospital.patient.name,hospital.medicine.medicinename,hospital.sales.quantity,hospital.sales.medicineamt FROM hospital.sales INNER JOIN hospital.patient ON hospital.sales.patientid = hospital.patient.patientid INNER JOIN hospital.medicine ON hospital.sales.mediid = hospital.medicine.mediid;";
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

/*...medisales...*/

/* Stock */

app.get("/notification/get",(req,res)=> {
    const sqlGet = "SELECT * FROM medicine WHERE stockstatus < 50;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

/*...Stock...*/


/* Patient */

app.get("/patient/get",(req,res)=> {
    const sqlGet = "SELECT hospital.patient.patientid,hospital.doctor.doctorname,hospital.patient.name,hospital.patient.gender,hospital.patient.mobile,hospital.patient.dob,hospital.patient.age,hospital.patient.email,hospital.patient.occupation,hospital.patient.marital,hospital.patient.bg,hospital.patient.address,hospital.patient.allergy,hospital.patient.patienttype,hospital.patient.disease FROM hospital.patient INNER JOIN hospital.doctor ON hospital.patient.doctorid = hospital.doctor.doctorid;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/patient/post",(req,res) => {
    const{name,gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease,doctorid }=req.body;
    const sqlInsert = "INSERT INTO patient(name,doctorid,gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    db.query(sqlInsert, [name,parseInt(doctorid),gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/patient/remove/:patientid",(req,res) => {
    const{ patientid } = req.params;
    const sqlRemove = "DELETE FROM patient WHERE patientid = ?";
    db.query(sqlRemove, patientid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/patient/get/:patientName",(req,res)=> {
    const {patientName} = req.params;
    const sqlGet = "SELECT * FROM patient WHERE name=?";
    db.query(sqlGet, patientName,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/patient/updatepatient/:patientid",(req,res)=> {
    const {patientid} = req.params;
    const {name,gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease,doctorid} = req.body;
    const sqlUpdate= "UPDATE patient SET name = ?,doctorid = ?,gender = ?,mobile = ?,dob = ?,age = ?,email = ?,occupation = ?,marital = ?,bg = ?,address = ?,allergy = ?,patienttype = ?,disease = ? WHERE patientid=?";
    db.query(sqlUpdate,[ name,parseInt(doctorid),gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease,patientid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
    //console.log(sqlUpdate,[ name,parseInt(doctorid),gender,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,patientid]);
});

/* inpatient report */
app.get("/patient/inPatient",(req,res)=>{
    const sqlGet = "SELECT patient.patientid,doctor.doctorname,patient.name,patient.mobile,patient.age,patient.email,patient.marital,patient.bg,patient.address,patient.disease FROM hospital.patient INNER JOIN hospital.doctor ON patient.doctorid = doctor.doctorid WHERE patienttype='Inpatient' GROUP BY patientid";
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})


/* Outpatient */

app.get("/out/get",(req,res)=> {
    const sqlGet = "SELECT hospital.outpatient.outid,hospital.patient.name,hospital.doctor.doctorname,hospital.lab.category,hospital.outpatient.consultdate,hospital.outpatient.amount FROM hospital.outpatient INNER JOIN hospital.patient ON hospital.outpatient.patientid = hospital.patient.patientid INNER JOIN hospital.doctor ON hospital.outpatient.doctorid = hospital.doctor.doctorid INNER JOIN hospital.lab ON hospital.outpatient.labid = hospital.lab.labid ;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/out/post",(req,res) => {
    const{patientid,doctorid,labid,consultdate,amount }=req.body;
    const sqlInsert = "INSERT INTO outpatient(patientid,doctorid,labid,consultdate,amount ) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(doctorid),parseInt(labid),consultdate,amount], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/out/remove/:outid",(req,res) => {
    const{ outid } = req.params;
    const sqlRemove = "DELETE FROM outpatient WHERE outid = ?";
    db.query(sqlRemove, outid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/out/get/:outid",(req,res)=> {
    const {outid} = req.params;
    const sqlGet = "SELECT * FROM outpatient WHERE outid=?";
    db.query(sqlGet, outid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/out/updateout/:outid",(req,res)=> {
    const {outid} = req.params;
    const {patientid,doctorid,labid,consultdate,amount} = req.body;
    const sqlUpdate= "UPDATE outpatient SET patientid = ?,doctorid = ?,labid = ?, consultdate = ?,amount = ? WHERE outid=?";
    db.query(sqlUpdate,[ patientid,doctorid,labid,consultdate,amount,outid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Outpatient...*/


/* inpatient */

app.get("/in/get",(req,res)=> {
    const sqlGet = "SELECT hospital.inpatient.inid,hospital.patient.name,hospital.room.roomno,hospital.bedtable.bedno,hospital.lab.category,hospital.inpatient.admi_date,hospital.inpatient.dis_date FROM hospital.inpatient INNER JOIN hospital.patient ON hospital.inpatient.patientid = hospital.patient.patientid INNER JOIN hospital.room ON hospital.inpatient.roomid = hospital.room.roomid INNER JOIN hospital.bedtable ON hospital.inpatient.bedid = hospital.bedtable.bedid INNER JOIN hospital.lab ON hospital.inpatient.labid = hospital.lab.labid;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/in/post",(req,res) => {
    const{patientid,roomid,bedid,labid,admi_date,dis_date}=req.body;
    const sqlInsert = "INSERT INTO inpatient(patientid,roomid,bedid,labid,admi_date,dis_date ) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(roomid),parseInt(bedid),parseInt(labid),admi_date,dis_date], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/in/remove/:inid",(req,res) => {
    const{ inid } = req.params;
    const sqlRemove = "DELETE FROM inpatient WHERE inid = ?";
    db.query(sqlRemove, inid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/in/get/:inid",(req,res)=> {
    const {inid} = req.params;
    const sqlGet = "SELECT * FROM inpatient WHERE inid=?";
    db.query(sqlGet, inid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/in/updatein/:inid",(req,res)=> {
    const {inid} = req.params;
    const {patientid,roomid,bedid,labid,admi_date,dis_date} = req.body;
    const sqlUpdate= "UPDATE inpatient SET patientid = ?,roomid = ?,bedid = ?,labid = ?, admi_date = ?,dis_date = ? WHERE inid=?";
    db.query(sqlUpdate,[ patientid,roomid,bedid,labid,admi_date,dis_date,inid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...inpatient...*/

/* inpatient report */

app.get("/in/report/:from/:to",(req,res) =>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT hospital.inpatient.inid,hospital.patient.name,hospital.room.roomno,hospital.bedtable.bedno,hospital.lab.category,hospital.inpatient.admi_date,hospital.inpatient.dis_date FROM hospital.inpatient INNER JOIN hospital.patient ON hospital.inpatient.patientid = hospital.patient.patientid INNER JOIN hospital.room ON hospital.inpatient.roomid = hospital.room.roomid INNER JOIN hospital.bedtable ON hospital.inpatient.bedid = hospital.bedtable.bedid INNER JOIN hospital.lab ON hospital.inpatient.labid = hospital.lab.labid WHERE hospital.inpatient.admi_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
           console.log(err);
        
    res.send(result)
    })
})
/*...inPatient Report...*/

/*outpatient report */

app.get("/out/report/:from/:to",(req,res) =>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT hospital.outpatient.outid,hospital.patient.name,hospital.doctor.doctorname,hospital.lab.category,hospital.outpatient.consultdate,hospital.outpatient.amount FROM hospital.outpatient INNER JOIN hospital.patient ON hospital.outpatient.patientid = hospital.patient.patientid INNER JOIN hospital.doctor ON hospital.outpatient.doctorid = hospital.doctor.doctorid INNER JOIN hospital.lab ON hospital.outpatient.labid = hospital.lab.labid WHERE hospital.outpatient.consultdate BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
           console.log(err);
        
    res.send(result)
    })
})

/*...outpatient report...*/

/* Lab */

app.get("/lab/get",(req,res)=> {
    const sqlGet = "SELECT hospital.lab.labid,hospital.patient.name,hospital.doctor.doctorname,hospital.lab.testdate,hospital.lab.category,hospital.lab.report,hospital.lab.testamount FROM hospital.lab INNER JOIN hospital.patient ON hospital.lab.patientid = hospital.patient.patientid INNER JOIN hospital.doctor ON hospital.lab.doctorid = hospital.doctor.doctorid;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/lab/post",(req,res) => {
    const{patientid,doctorid,testdate,category,picture,testamount }=req.body;
    const sqlInsert = "INSERT INTO lab(patientid,doctorid,testdate,category,report,testamount) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(doctorid),testdate,category,picture.images,testamount], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/lab/remove/:labid",(req,res) => {
    const{ labid } = req.params;
    const sqlRemove = "DELETE FROM lab WHERE labid = ?";
    db.query(sqlRemove, labid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/lab/get/:labid",(req,res)=> {
    const {labid} = req.params;
    const sqlGet = "SELECT * FROM lab WHERE labid=?";
    db.query(sqlGet, labid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/lab/updatelab/:labid",(req,res)=> {
    const {labid} = req.params;
    const {patientid,doctorid,testdate,category,picture,testamount} = req.body;
    const sqlUpdate= "UPDATE lab SET patientid = ?,doctorid = ?,testdate = ?,category = ?,report = ?,testamount = ? WHERE labid=?";
    db.query(sqlUpdate,[ patientid,doctorid,testdate,category,picture.images,testamount,labid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/lab/report/:from/:to",(req,res) =>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT hospital.lab.labid,hospital.patient.name,hospital.doctor.doctorname,hospital.lab.testdate,hospital.lab.category,hospital.lab.report,hospital.lab.testamount FROM hospital.lab INNER JOIN hospital.patient ON hospital.lab.patientid = hospital.patient.patientid INNER JOIN hospital.doctor ON hospital.lab.doctorid = hospital.doctor.doctorid WHERE hospital.lab.testdate BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
           console.log(err);
        
    res.send(result)
    })
})

/*... Lab ...*/

/* Room Category */

app.get("/room/get",(req,res)=> {
    const sqlGet = "SELECT * FROM room";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/room/post",(req,res) => {
    const{roomtype,beds,floor,roomrate,roomno} = req.body;
    const sqlInsert = "INSERT INTO room(roomtype, beds, floor, roomrate, roomno) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [roomtype, beds, floor, roomrate, roomno], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/room/remove/:roomid",(req,res) => {
    const{ roomid } = req.params;
    const sqlRemove = "DELETE FROM room WHERE roomid = ?";
    db.query(sqlRemove, roomid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/room/get/:roomid",(req,res)=> {
    const {roomid} = req.params;
    const sqlGet = "SELECT * FROM room WHERE roomid=?";
    db.query(sqlGet, roomid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/room/updateroom/:roomid",(req,res)=> {
    const {roomid} = req.params;
    const {roomtype, beds, floor, roomrate, roomno} = req.body;
    const sqlUpdate= "UPDATE room SET roomtype = ?, beds = ?, floor = ?, roomrate = ?, roomno = ? WHERE roomid=?";
    db.query(sqlUpdate,[ roomtype, beds, floor, roomrate, roomno, roomid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


/*... Room Category...*/

/* Bedstatus */

app.get("/bed/get",(req,res)=> {
    const sqlGet = "SELECT hospital.bedtable.bedid,hospital.room.roomno,hospital.bedtable.bedno,hospital.bedtable.bedstatus FROM hospital.bedtable INNER JOIN hospital.room ON hospital.bedtable.roomid = hospital.room.roomid;";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/bed/post",(req,res) => {
    const{roomid,patientid,bedno,bedstatus}=req.body;
    const sqlInsert = "INSERT INTO bedtable(roomid,bedno,bedstatus) VALUES (?, ?, ?)";
    db.query(sqlInsert, [parseInt(roomid),bedno,bedstatus], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/bed/remove/:bedid",(req,res) => {
    const{ bedid } = req.params;
    const sqlRemove = "DELETE FROM bedtable WHERE bedid = ?";
    db.query(sqlRemove, bedid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/bed/get/:bedid",(req,res)=> {
    const {bedid} = req.params;
    const sqlGet = "SELECT * FROM bedtable WHERE bedid=?";
    db.query(sqlGet, bedid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/bed/updatebed/:bedid",(req,res)=> {
    const {bedid} = req.params;
    const {roomid,bedno,bedstatus} = req.body;
    const sqlUpdate= "UPDATE bedtable SET roomid = ?, bedno = ?,bedstatus = ? WHERE bedid=?";
    db.query(sqlUpdate,[ roomid,bedno,bedstatus,bedid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...Bedstatus...*/


/*billing*/

app.get("/billing/get",(req,res)=> {
    const sqlGet = ";";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/billing/post",(req,res) => {
    const{patientid,doctorid,saleid,labid,dcharge,ncharge,picture,testamount }=req.body;
    const sqlInsert = "INSERT INTO lab(patientid,doctorid,testdate,category,report,testamount) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [parseInt(patientid),parseInt(doctorid),testdate,category,picture.images,testamount], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/lab/remove/:labid",(req,res) => {
    const{ labid } = req.params;
    const sqlRemove = "DELETE FROM lab WHERE labid = ?";
    db.query(sqlRemove, labid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/lab/get/:labid",(req,res)=> {
    const {labid} = req.params;
    const sqlGet = "SELECT * FROM lab WHERE labid=?";
    db.query(sqlGet, labid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/lab/updatelab/:labid",(req,res)=> {
    const {labid} = req.params;
    const {patientid,doctorid,date,category,picture,testamount} = req.body;
    const sqlUpdate= "UPDATE lab SET patientid = ?,doctorid = ?,testdate = ?,category = ?,report = ?,testamount = ? WHERE labid=?";
    db.query(sqlUpdate,[ patientid,doctorid,testdate,category,picture.images,testamount,labid],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/*...billing...*/

/* appointment */

app.get("/appointment/get",(req,res)=> {
    const sqlGet = "SELECT * FROM appointment";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/appointment/post",(req,res) => {
    const{fullname,mobile,email,date,time,depart,doctor,message} = req.body;
    const sqlInsert = "INSERT INTO appointment(fullname,mobile,email,date,time,depart,doctor,message) VALUES (?, ?, ?, ?, ?, ? ,?, ?)";
    db.query(sqlInsert, [fullname,mobile,email,date,time,depart,doctor,message], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});
app.delete("/appointment/remove/:appid",(req,res) => {
    const{ appid } = req.params;
    const sqlRemove = "DELETE FROM appointment WHERE appid = ?";
    db.query(sqlRemove, appid, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/appointment/get/:appid",(req,res)=> {
    const {appid} = req.params;
    const sqlGet = "SELECT * FROM appointment WHERE appid=?";
    db.query(sqlGet, appid,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


/* appointment */



app.listen(5000, () => {
    console.log("Server is running on port 5000");
})