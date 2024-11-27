import { z } from "zod";

export const CreateMovieSchema = z.object({
  title: z.string({ required_error: "Movie title is required" }),
  published: z.number({ required_error: "Date published is required" }),
  coverImage: z
    .string({ required_error: "Cover Image is requires" })
    .url({ message: "Invalid cover image url" }),
});

export const EditMovieSchema = z.object({
  title: z
    .string({ required_error: "Movie title is required" })
    .min(1, "Movie title is required")
    .optional(),
  published: z
    .number({ required_error: "Date published is required" })
    .optional(),
  coverImage: z
    .string({ required_error: "Cover Image is requires" })
    .url({ message: "Invalid cover image url" })
    .optional(),
});