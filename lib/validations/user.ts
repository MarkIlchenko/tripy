import * as u from 'zod';

export const UserValidation = u.object({
    profile_photo: u.string().url().nonempty(),
    name: u.string().min(3).max(30),
    username: u.string().min(3).max(30),
    bio: u.string().min(3).max(1000)
})