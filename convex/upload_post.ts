import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  }
})

export const getDownloadUrl = query({
  args: {
    storageId: v.id('_storage')
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  }
})

export const post = mutation({
  args: {
    userId: v.id("users"),
    gifBackground: v.boolean(),
    name: v.string(),
    mediaUrl: v.string(),
    mediaId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('posts', {
      createdAt: Date.now(),
      likes: 0,
      saves: 0,
      shares: 0,
      gifBackground: args.gifBackground,
      name: args.name,
      userId: args.userId,
      mediaUrl: args.mediaUrl,
      mediaId: args.mediaId
    });
  }
})