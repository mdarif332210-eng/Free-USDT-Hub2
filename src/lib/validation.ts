import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(180, 'Email cannot exceed 180 characters'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(150, 'Subject cannot exceed 150 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Anti-spam bot field
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const NewsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(180, 'Email cannot exceed 180 characters'),
});

export const ViewIncrementSchema = z.object({
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
});

export const SearchQuerySchema = z.object({
  q: z.string().trim().min(1, 'Search query cannot be empty').max(100, 'Search query is too long'),
});
