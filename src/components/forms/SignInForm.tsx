'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { PasswordInput } from '@/components/ui/PasswordInput';
import { AppButton } from '@/components/ui/AppButton';
import GoogleSignInButton from '@/components/Buttons/GoogleSignInButton';


const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;


export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get('callbackUrl') ?? '/profile';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (session.user?.role === 'ADMIN') {
        router.replace('/admin');
      } else {
        router.replace(callbackUrl);
      }
    }
  }, [status, session, router, callbackUrl]);


  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        toast.error('Invalid email or password');
        return;
      }

      toast.success('Signed in successfully!');
      router.refresh();
      router.replace(callbackUrl);

    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };


  if (status === 'loading') {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }


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

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-purple-100">
          Welcome back
        </h1>

        <p className="text-sm xl:text-lg text-gray-400">
          Sign in to your account to continue
        </p>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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
                    placeholder="Enter your password"
                    className="h-11 bg-gray-800/90 border-gray-800/30
                    text-white placeholder:text-gray-400
                    focus:border-gray-600 focus:bg-gray-900 focus:placeholder:text-gray-100 focus:ring-gray-600/30"
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />


          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 text-center"
            >
              {error}
            </motion.p>
          )}


          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </AppButton>


          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-900/20" />
            </div>

            <div className="relative flex justify-center text-sm xl:text-lg">
              <span className="px-3 bg-transparent text-gray-400">
                Or continue with
              </span>
            </div>
          </div>


          <GoogleSignInButton>
            Sign in with Google
          </GoogleSignInButton>


          <p className="text-center text-sm xl:text-lg text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-purple-300 hover:text-purple-200 transition"
            >
              Sign up
            </Link>
          </p>

        </form>
      </Form>
    </motion.div>
  );
}