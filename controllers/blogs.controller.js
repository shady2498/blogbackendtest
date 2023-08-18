
const db = require("../models");
const helpers = require("../helpers/helper.functions");
const Blog = db.blogs;




exports.addBlog = async (req, res) => {

    let value = await helpers.isBodyPresent(req.body)

    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }


    const data = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        user_id: req.body.id,
        user_name: req.body.user_name,

    };
    console.log("this is requsted body", data);


    data.options = JSON.stringify(data.options)

    try {

        Blog.create(data)
        .then(data => {
            res.send({error_code: 0 , message: "Blog created successfully"});
        }).catch(err => {
            if(err){
                res.send({error_code:-1, message: err.message})
            }else{
            res.status(500).send({error_code:-1,message:
                err.message || "Some error occurred while creating the Blog."
            });
            }
        
          });


    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }



  };

