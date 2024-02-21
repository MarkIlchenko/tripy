import * as u from 'zod';

export const ThreadValidation = u.object({
    thread: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
    accountId: u.string(),
})

export const CommentValidation = u.object({
    thread: u.string().nonempty().min(3, { message: 'Minimum 3 characters' })
})