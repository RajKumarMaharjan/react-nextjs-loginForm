'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import GoogleSignInButton from "../ui/GoogleSignInButton"


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

const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values)
}

const SignUpForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password:'',
            confirmPassword:''
        }
    })

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