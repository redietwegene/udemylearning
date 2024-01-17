import express from "express";
import bodyParser from "body-parser";
// import path from "path";

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


const app =express();
const port =3000;
// var x="";
// var y="";
let todoList = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.render("index.ejs",{item: todoList});
});
app.post("/add" ,(req,res)=>{
  
    const title= req.body["title"];
    const description=req.body["description"];
    const newId = todoList.length + 1;
    todoList.push({id:newId,title:title , description:description})
    res.redirect("/");
});
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoItem = todoList.find(item => item.id === id);
    res.render('edit', { todoItem });
  });
  app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTitle = req.body.updatedTitle;
    const updatedDescription = req.body.updatedDescription;
    const index = todoList.findIndex(item => item.id === id);
    todoList[index].title = updatedTitle;
    todoList[index].description = updatedDescription;
    res.redirect('/');
  });
  app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todoList = todoList.filter(item => item.id !== id);
    res.redirect('/');
  });


app.listen (port,()=>{
    console.log(` i am listening port ${port} `);
});

