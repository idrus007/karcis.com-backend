import { z } from "zod";
import { ApiError } from "../utils/responseHandler.js";

const handleValidation = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message =
      Array.isArray(result.error.issues) && result.error.issues.length > 0
        ? result.error.issues[0].message
        : "Invalid input";

    throw new ApiError(400, message);
  }

  return result.data;
};

export const validateCreateEventInput = (data) => {
  const ticketSchema = z.object({
    name: z.string().min(1, "Ticket name is required"),
    price: z.number().positive("Ticket price must be greater than 0"),
    quantity: z.number().int().positive("Quantity must be at least 1"),
  });

  const eventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    image: z.string().min(1, "Image is required"),
    tickets: z
      .array(ticketSchema)
      .min(1, "At least one ticket must be provided"),
  });

  return handleValidation(eventSchema, data);
};
