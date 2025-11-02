import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.string(),
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    categoryImage: v.string(),
    isNew: v.boolean(),
    features: v.string(),
    includes: v.array(v.object({
      quantity: v.number(),
      item: v.string(),
    })),
    gallery: v.array(v.object({
      image: v.string(),
    })),
    others: v.array(v.object({
      slug: v.string(),
      name: v.string(),
      image: v.string(),
    })),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  orders: defineTable({
    orderId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingCity: v.string(),
    shippingZip: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
    items: v.array(v.object({
      slug: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_email", ["customerEmail"]),
});