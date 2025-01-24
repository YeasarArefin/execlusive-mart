import { z } from 'zod';

const checkoutSchema = z.object({
    name: z.string().min(3),
    phone: z.string({ invalid_type_error: "Phone number is required" }).length(11, { message: 'Phone Number must be 11 digit' }),
    city: z.string({ message: 'City name is required' }),
    address: z.string({ message: 'Address is required' }),
    postCode: z.string({ message: 'Post Code is required' }),
    email: z.string().email(),
    code: z.string().min(3).optional(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export default checkoutSchema;