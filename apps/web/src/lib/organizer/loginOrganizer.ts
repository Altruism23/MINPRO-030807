'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginOrganizer = async (values: any) => {
    try {
        const response = await fetch('http://localhost:8000/api/organizers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (!response.ok) {
            throw 'error'
        }

        const data = await response.json()

        cookies().set({
            name: 'session',
            value: data.token,
            httpOnly: true,
            path: '/'
        })

    } catch (error) {
        console.log(error)
    }
    redirect('/dashboard/organizer')
}