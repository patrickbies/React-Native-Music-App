import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const addSearchWord = mutation({
  args: {
    word: v.string(),
    isPost: v.boolean(),
    contentId: v.union(v.id("posts"), v.id("users")),
  },
  handler: (ctx, args) => {
    ctx.db.insert("search_keys", args);
  },
});

export const isUsernameUnique = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const unique = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .collect();
    return unique.length == 0;
  },
});

export const createAccount = mutation({
  args: {
    username: v.string(),
    displayName: v.string(),
    email: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", {
      createdAt: Date.now(),
      displayName: args.displayName,
      email: args.email,
      username: args.username,
      clerkId: args.clerkId,
    });

    return newUserId;
  },
});

export const queryUser = query({
  args: {
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.uid) return;

    const metadata = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.uid))
      .unique();

    if (!metadata) return;
    const userPosts = await ctx.db
      .query("posts")
      .withIndex("userId", (q) => q.eq("userId", metadata?._id))
      .collect();

    return { metadata: metadata, userPosts: userPosts };
  },
});

export const searchBar = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    // Search `users` table for username and displayName
    const ids = await ctx.db
      .query("search_keys")
      .withSearchIndex("by_content", (q) => q.search("word", args.searchTerm))
      .collect();

      type post = {
        isPost: boolean;
        _id: Id<"posts">;
        _creationTime: number;
        createdAt: number;
        userId: Id<"users">;
        gifBackground: boolean;
        name: string;
        mediaUrl: string;
        shares: number;
        saves: number;
        likes: number;
        mediaId: string;
      };
      
      type user = {
        isPost: boolean;
        _id: Id<"users">;
        _creationTime: number;
        profilePictureUrl?: string | undefined;
        profilePictureId?: string | undefined;
        createdAt: number;
        username: string;
        displayName: string;
        email: string;
        clerkId: string;
      };
    
    type comb = post | user;

    var results : comb[] = [];

    for (let i = 0; i < ids.length; i++) {
      const result = await ctx.db.get(ids[i].contentId);

      if (result)
        results.push({ isPost: ids[i].isPost, ...result });
    }

    return results;
  },
});
