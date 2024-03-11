'use client'

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButtonProps {
    href: string,
    label: string
}

export const BackButton = (props: BackButtonProps) => {
    const { href, label } = props
    return (
        <Button
            variant="link"
            className="font-norma; w-full"
            size="sm"
            asChild
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}