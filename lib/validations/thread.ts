import * as u from 'zod';

export const ThreadValidation = u.object({
    thread: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
    title: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
    img: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),

    firstDay: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
    lastDay: u.string().nonempty().min(3, { message: 'Minimum 3 characters' }),

    accountId: u.string(),
})

export const CommentValidation = u.object({
    thread: u.string().nonempty().min(3, { message: 'Minimum 3 characters' })
})