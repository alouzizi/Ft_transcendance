"use client";


export default function AuthLayout(prompt: { children: React.ReactNode }) {
    return (
        <div >
            {prompt.children}
        </div>

    );
}