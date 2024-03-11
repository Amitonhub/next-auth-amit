import React from 'react'

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-rose-400 to-rose-800'>
            {children}
        </div>
    )
}

export default AuthLayout
