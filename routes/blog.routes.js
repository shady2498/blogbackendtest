const auth = require("../middleware/authentication");

module.exports = (app) => {
  const blog = require("../controllers/blogs.controller.js");

  var router = require("express").Router();
  router.post("/addBlog", auth, blog.addBlog);
  router.put("/updateBlog/:id", auth, blog.updateBlog);
  router.delete("/deleteBlog/:id", auth, blog.deleteBlog);
  router.get("/all-blog", blog.getAllBlogs);
  router.get("/:id", blog.getBlog);

  app.use("/api/blogs", router);
};
