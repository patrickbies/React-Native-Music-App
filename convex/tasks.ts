import { v } from "convex/values";
import { query } from "./_generated/server";

export const isUsernameUnique = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const unique = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username)).collect();
    return unique.length == 0;
  },
});

// const checkUsername = async () => {
//   const existingUser = await ctx.db.query("users")
//   .withIndex("by_username", q => q.eq("username", targetUsername))
//   .unique(); // Null if no user with the username exists
// }
