const express = require('express');

var mysql = require('mysql')

const app = express();

app.use(express.static('./'))

app.use(express.urlencoded({extended: false}))
app.set('view engine','pug')

app.get('/', (req,res)=>{
	res.sendFile('landingpage.html', {root:__dirname});
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'covid resources'
})

connection.connect(function(err){
	if (err) {

		throw err;
	}

	console.log('Connected...');
})

app.post('/register',(req, res)=>{
	console.log(req.body);

	var sql="insert into donor_info values('"+req.body.name+"', '"+req.body.age+"', '"+req.body.bldgrp+"', "+req.body.recday+", '"+req.body.mobno+"')";
	connection.query(sql,function(err){
		if (err) {
			throw err;
		}
  
})
	res.render('donate',{title:'Data saves',
message:'Data saved successfully.' })
})



app.get('/list', (req,res)=>{
	connection.query("SELECT * FROM donor_info",(err,rows,fields)=>{
		if (err) {
			throw err;
		}
		res.render('list',{title:'Donor Details',
		items : rows })
  
})
});



app.listen(3000,()=>{
	console.log('Server is running on port 3000');
})

/*
/ -->res=this is working
/donate --> POST=success/fail
 */
