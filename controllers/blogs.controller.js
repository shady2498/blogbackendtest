
const {db, sequelize} = require("../models");
// const sequelize = require("../models");
const helpers = require("../helpers/helper.functions");
const Blog = db.blogs;

const Sequelize = require("sequelize");



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


    try {

        createBlogWithRawQuery(data)
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

    updateBlogWithRawQuery(id, data)
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

  
    deleteBlogByIdWithRawQuery(id)
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

    findBlogByIdWithRawQuery(id)
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

  async function findBlogByIdWithRawQuery(id) {
    try {
      const query = 'SELECT * FROM Blogs WHERE id = :id';
      const options = {
        replacements: { id }, // Providing the parameter value
        type: Sequelize.QueryTypes.SELECT,
        model: Blog // Associating the query results with the Blog model
      };
  
      const blog = await sequelize.query(query, options);
      return blog[0] || null; // Returning the first result or null if not found
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function deleteBlogByIdWithRawQuery(id) {
    try {
      const query = 'DELETE FROM Blogs WHERE id = :id';
      const options = {
        replacements: { id }, // Providing the parameter value
        type: Sequelize.QueryTypes.DELETE
      };
  
      const rowsAffected = await sequelize.query(query, options);
      return 1; // Number of rows deleted
    } catch (error) {
      console.error('Error:', error);
      return 0; // No rows deleted
    }
  }

  async function createBlogWithRawQuery(data) {
    try {
      const query = `
        INSERT INTO Blogs (title, content, published, user_id, createdAt, updatedAt)
        VALUES (:title, :content, :published, :user_id, NOW(), NOW())
      `;
      const options = {
        replacements: {
          title: data.title,
          content: data.content,
          published: data.published,
          user_id: data.user_id
        },
        type: Sequelize.QueryTypes.INSERT
      };
  
      const [result] = await sequelize.query(query, options);
      return result; // The inserted row
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function updateBlogWithRawQuery(id, data) {
    try {
      const query = `
        UPDATE Blogs
        SET title = :title, content = :content, published = :published, updatedAt = NOW()
        WHERE id = :id
      `;
      const options = {
        replacements: {
          id,
          title: data.title,
          content: data.content,
          published: data.published
        },
        type: Sequelize.QueryTypes.UPDATE
      };
  
      const [rowsAffected] = await sequelize.query(query, options);
      return 1; // Number of rows updated
    } catch (error) {
      console.error('Error:', error);
      return 0; // No rows updated
    }
  }