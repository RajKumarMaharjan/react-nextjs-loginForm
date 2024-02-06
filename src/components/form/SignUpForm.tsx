'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import GoogleSignInButton from "../ui/GoogleSignInButton"
import { useState } from "react"


const FormSchema = z
.object({
    username: z.string().min(1, 'Username is required').max(50),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'password is required')
        .min(8, 'password must be at least 8 character'),
        confirmPassword: z
        .string()
        .min(1, 'password confirmation is required')
        .min(8, 'password must be at least 8 character')
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password do not match'
})


const SignUpForm = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password:'',
            confirmPassword:''
        }
    })


const onSubmit = async(values: z.infer<typeof FormSchema>) => {
    try {
        console.log('submitting form', values)
        setShowSuccessAlert(true)

        form.reset()
        
    }catch (error){
        console.log('Error during signUp', error)
    }
}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Johndoe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="mail@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-Enter password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Re-Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full mt-6 mb-2">
                    Sign in
                </Button>
            </form>
            {showSuccessAlert && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> You have signed up successfully.</span>
                    <span className="absolute -top-3 bottom-0 -right-4 px-4 py-3">
                        <svg className="fill-current h-5 w-5 text-gray-600" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setShowSuccessAlert(false)}>
                            <title>Close</title>
                            <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.708L9.293 10l-3.64 3.64a.5.5 0 10.707.708L10 10.707l3.64 3.64a.5.5 0 00.708-.708L10.707 10l3.64-3.64a.5.5 0 000-.708z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
               
            )}
            <div className="flex mx-auto items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                or
            </div>
            <div className="my-2">
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            </div>
            <span className="text-center text-sm text-gray-600 my-4">
                If you have an account, please&nbsp;
                <Link href='/sign-in' className="text-blue-400 hover:underline">
                    Sign in
                </Link>
            </span>
        </Form >
        
    )
}

export default SignUpForm