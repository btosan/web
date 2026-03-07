'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CldUploadWidget } from 'next-cloudinary';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, ShieldAlert } from 'lucide-react';

const adminSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof adminSchema>;

export default function RegisterAdminPage() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [adminsExist, setAdminsExist] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      image: '',
    },
  });

  useEffect(() => {
    async function checkAdminCount() {
      try {
        const res = await fetch('/api/check-admins');
        const data = await res.json();

        if (data.adminsExist) {
          setAdminsExist(true);
          toast.error('Admin accounts already exist.');
          setTimeout(() => router.replace('/signin'), 2500);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminCount();
  }, [router]);

  const handleUploadSuccess = (result: any) => {
    const uploadedUrl = result?.info?.secure_url;

    if (uploadedUrl) {
      form.setValue('image', uploadedUrl);
      setPreviewImage(uploadedUrl);
      toast.success('Image uploaded');
    }
  };

  const onSubmit = async (values: FormValues) => {

    setIsLoading(true);

    try {

      const res = await fetch('/api/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email.trim(),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          password: values.password,
          image: values.image || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create admin');
      }

      toast.success('Admin created successfully');
      router.push('/signin');

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (adminsExist) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <ShieldAlert className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <CardTitle className="text-2xl mb-4">Access Restricted</CardTitle>
          <CardDescription>
            Admin accounts already exist
          </CardDescription>

          <AppButton
            className="mt-6"
            onClick={() => router.push('/signin')}
          >
            Go to Sign In
          </AppButton>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >

        <Card>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Create First Admin
            </CardTitle>
            <CardDescription className=''>
              Only available when no admin exists
            </CardDescription>
          </CardHeader>

          <CardContent className=''>

            <Form {...form}>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel className=''>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} className=''/>
                      </FormControl>
                      <FormMessage className=''/>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormLabel className=''>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} className=''/>
                        </FormControl>
                        <FormMessage className=''/>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormLabel className=''>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} className=''/>
                        </FormControl>
                        <FormMessage className=''/>
                      </FormItem>
                    )}
                  />

                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className=''/>
                      </FormControl>
                      <FormMessage className=''/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel className=''>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className=''/>
                      </FormControl>
                      <FormMessage className=''/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className=''>

                      <FormLabel className=''>Profile Image</FormLabel>

                      <CldUploadWidget
                        uploadPreset="ofashiprofiles"
                        onSuccess={handleUploadSuccess}
                      >
                        {({ open }) => (
                          <AppButton
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                            className="w-full h-28 border-dashed border-2"
                          >
                            <Upload className="mr-2 h-5 w-5"/>
                            Upload Profile Image
                          </AppButton>
                        )}
                      </CldUploadWidget>

                      {previewImage && (
                        <div className="flex justify-center mt-4">
                          <img
                            src={previewImage}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        </div>
                      )}

                    </FormItem>
                  )}
                />

                <AppButton
                  type="submit"
                  variant="glow"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Create Admin Account
                </AppButton>

              </form>

            </Form>

          </CardContent>

        </Card>

      </motion.div>

    </div>
  );
}