import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    displayName: v.string(),
    email: v.string(),
    profilePictureUrl: v.string(),
    createdAt: v.number(),
  })
    .index("by_username", ["username"]), // for username check
  user_relationships: defineTable({
    followerId: v.id("users"), 
    followeeId: v.id("users"), 
    createdAt: v.number(), 
  })
    .index("followeeId", ["followeeId"]) // Fetch follower of a user
    .index("followerId", ["followerId"]), // Fetch user being followed
  posts: defineTable({
    userId: v.id("users"),
    content: v.string(),
    mediaUrl: v.optional(v.string()),
    shares: v.number(),
    saves: v.number(),
    createdAt: v.number(), 
  })
    .index("userId", ["userId"]),
  post_likes: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("postId", ["postId"])
    .index("userId", ["userId"]),
  comments: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }).index("postId", ["postId"]),
});
