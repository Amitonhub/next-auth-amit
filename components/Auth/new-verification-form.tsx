'use client'

import { redirect, useRouter, useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BounceLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const domain = process.env.NEXT_PUBLIC_APP_URL

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!")
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                domain && router.push(`${domain}/auth/login`)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [success, error, token, domain, router])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex items-center justify-center">
                {!error && !success && <BounceLoader color="pink" />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
} 