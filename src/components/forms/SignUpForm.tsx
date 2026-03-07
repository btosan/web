'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { PasswordInput } from '@/components/ui/PasswordInput';
import GoogleSignInButton from '@/components/Buttons/GoogleSignInButton';


// ────────────────────────────────────────────────
// Schema
// ────────────────────────────────────────────────

const formSchema = z
  .object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email'),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;


// ────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {

      const name =
        `${values.firstName ?? ''} ${values.lastName ?? ''}`.trim() || undefined;

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstName: values.firstName || undefined,
          lastName: values.lastName || undefined,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Account created successfully!');
      router.push('/signin');

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto
      p-6 md:p-8 lg:p-10
      bg-black
      border border-gray-700
      rounded-2xl
      shadow-sm lg:shadow-md shadow-gray-700
      backdrop-blur
      space-y-8"
    >

      <div className="text-center space-y-2">
        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-purple-100">
          Create an account
        </h1>

        <p className="text-sm xl:text-lg text-gray-400">
          Enter your details to get started
        </p>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg text-purple-100">
                    First name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John"
                      className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg text-purple-100">
                    Last name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Doe"
                      className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

          </div>


          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm xl:text-lg text-purple-100">
                  Email address
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="mail@example.com"
                    className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />


          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm xl:text-lg text-purple-100">
                  Password
                </FormLabel>

                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Create a strong password"
                    className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />


          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm xl:text-lg text-purple-100">
                  Confirm password
                </FormLabel>

                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Confirm your password"
                    className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />


          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create account
          </AppButton>


          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/20" />
            </div>

            <div className="relative flex justify-center text-sm xl:text-lg">
              <span className="px-3 bg-transparent text-gray-400">
                Or continue with
              </span>
            </div>
          </div>


          <GoogleSignInButton>
            Sign up with Google
          </GoogleSignInButton>


          <p className="text-center text-sm xl:text-lg text-gray-200">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-medium text-purple-100 hover:text-purple-200 transition"
            >
              Sign in
            </Link>
          </p>

        </form>
      </Form>
    </motion.div>
  );
};

export default SignUpForm;