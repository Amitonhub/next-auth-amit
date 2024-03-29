'use server'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerficationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already taken!" }
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerficationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Confirmation email sent!" }
}