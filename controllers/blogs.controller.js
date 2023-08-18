
const db = require("../models");
const helpers = require("../helpers/helper.functions");
const Blog = db.blogs;




exports.addBlog = async (req, res) => {

    let value = await helpers.isBodyPresent(req.body)

    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }

    console.log('this is user id', req.user.id)
    const data = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        user_id: req.user.id,
        // user_name: req.user.user_name,

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

exports.updateBlog = async (req,res) => {
    const id = parseInt(req.params.id);
    console.log('this is data to check', req.params.id)

    // console.log("this is id", id, req.body);

    const data = {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    }
    console.log('this is data to check 22', data)

    Blog.update(data, {
      where: { id: id }
    })
      .then(num => {
        console.log("num", num)
        if (num == 1) {
          res.send({
            message: "Blog was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Blog with id=" + id
        });
      });
}


exports.deleteBlog = (req, res) => {
    const id = req.params.id;

  
    Blog.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Blog was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Blog with id=" + id
        });
      });
  };


  exports.getBlog = (req, res) => {
    const id = req.params.id;

    Blog.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Blog with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Blog with id=" + id
        });
      });
  };