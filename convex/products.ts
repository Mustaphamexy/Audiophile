import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all products
export const getAllProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

// Get product by slug
export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get products by category
export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});