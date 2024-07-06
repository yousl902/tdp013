import { describe, it, beforeEach } from "mocha";
import server from "../app.js"; // Adjust the path to your server file
import postSchema from "../models/post.js"; // Adjust the path to your postSchema file
import { use, should, expect } from "chai";
import chaiHttp from "chai-http";

const chai = use(chaiHttp);
should();

describe("Post Routes", () => {
  beforeEach(async () => {
    await postSchema.deleteMany({});
  });

  describe("POST /", () => {
    it("should create a new post", (done) => {
      chai.request
        .execute(server)
        .post("/posts/")
        .send({ content: "Test content" })
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res).to.have.status(200);
          const post = await postSchema.findOne({ content: "Test content" });
          expect(post).to.exist;
          expect(post).to.have.property("content", "Test content");
          expect(post).to.have.property("writer", "John Doe");
          done();
        });
    });
  });

  describe("POST /", () => {
    it("should return 500 becuase it is an empty post", () => {
      chai.request
        .execute(server)
        .post("/posts/")
        .send({ content: "" })
        .end(async (err, res) => {
          expect(res).to.have.status(500);
        });
    });
  });

  describe("POST /", () => {
    it("should return 500 becuase the post's length is more than 140", () => {
      chai.request
        .execute(server)
        .post("/posts/")
        .send({
          content: `Tips: Man kan i regel inte lita på att klienten kommer att skicka med korrekt
          tidsstämpel eller ett ID när meddelanden läggs till. Det kan därför vara klokt att hantera 
          det i backend istället. Tänk även på att unika ID:n måste vara unika i databasen även om servern skulle startas om.`,
        })
        .end(async (err, res) => {
          expect(res).to.have.status(500);
        });
    });
  });

  describe("PATCH /:id", () => {
    it("should update the post's isRead status", async () => {
      const post = new postSchema({
        writer: "John Doe",
        content: "Test content",
        date: new Date(),
        isRead: false,
      });
      await post.save();
      const res = await chai.request
        .execute(server)
        .patch(`/posts/${post._id}`)
        .send({ isRead: true });

      expect(res).to.have.status(200);
      const updatedPost = await postSchema.findById(post._id);
      expect(updatedPost).to.have.property("isRead", true);
    });
  });

  describe("GET /:id", () => {
    it("should get a post by id", async () => {
      const post = new postSchema({
        writer: "John Doe",
        content: "Test content",
        date: new Date(),
      });
      await post.save();
      const res = await chai.request.execute(server).get(`/posts/${post._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("content", "Test content");
    });
  });

  describe("GET /", () => {
    it("should get all posts", async () => {
      const post1 = new postSchema({
        writer: "John Doe",
        content: "Test content 1",
        date: new Date(),
      });
      const post2 = new postSchema({
        writer: "John Doe",
        content: "Test content 2",
        date: new Date(),
      });
      await post1.save();
      await post2.save();
      const res = await chai.request.execute(server).get("/posts/");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(2);
    });
  });

  describe("DELETE /delete", () => {
    it("should delete all posts", async () => {
      const post1 = new postSchema({
        writer: "John Doe",
        content: "Test content 1",
        date: new Date(),
      });
      const post2 = new postSchema({
        writer: "John Doe",
        content: "Test content 2",
        date: new Date(),
      });
      await post1.save();
      await post2.save();
      const res = await chai.request.execute(server).delete("/posts/delete/");

      expect(res).to.have.status(200);
      const posts = await postSchema.find();
      expect(posts.length).to.equal(0);
    });
  });
});
