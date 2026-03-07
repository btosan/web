// components/profiles/EditProfile.tsx   or   app/profile/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ArrowLeft, Save, X } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50).optional(),
  lastName: z.string().min(1, 'Last name is required').max(50).optional(),
  name: z.string().min(1, 'Display name is required').max(100).optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
    .optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const { data: session, update: updateSession, status } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      name: '',
      username: '',
      bio: '',
      image: '',
    },
  });

  useEffect(() => {
    if (session?.user) {
      const user = session.user;

      form.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        name: user.name || '',
        username: user.username || '',
        bio: user.bio || '',
        image: user.image || '',
      });

      setPreviewImage(user.image || null);
    }
  }, [session, form]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!session?.user) {
    router.replace('/signin');
    return null;
  }

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);

    try {
      // Clean up empty strings → null
      const payload = {
        firstName: values.firstName?.trim() || null,
        lastName: values.lastName?.trim() || null,
        name: values.name?.trim() || null,
        username: values.username?.trim() || null,
        bio: values.bio?.trim() || null,
        image: values.image?.trim() || null,
      };

      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update profile');
      }

      await updateSession();

      toast.success('Profile updated successfully!');
      router.push('/profile?updated=true');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    const url = result?.info?.secure_url;
    if (url) {
      form.setValue('image', url, { shouldValidate: true });
      setPreviewImage(url);
      toast.success('Profile picture uploaded!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-2xl mx-auto py-12 px-4 sm:px-6 bg-transparent"
    >
      <Button
        variant="ghost"
        className="mb-8 pl-0 text-gray-400 hover:text-gray-300 hover:bg-gray-950 hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Profile
      </Button>

      <Card className='bg-black border border-gray-700 text-gray-100'>
        <CardHeader className=''>
          <CardTitle className="lg:text-2xl text-xl">Edit Your Profile</CardTitle>
          <CardDescription className='text-gray-400'>Update how you appear across the platform</CardDescription>
        </CardHeader>

        <CardContent className=''>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Avatar / Image */}
              <div className="space-y-4">
                <FormLabel className='text-gray-500'>Profile Picture</FormLabel>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border shadow-md">
                    {previewImage ? (
                      <Image src={previewImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <CldUploadWidget
                      uploadPreset="ofashiprofiles"
                      onSuccess={handleUploadSuccess}
                      options={{
                        maxFiles: 1,
                        resourceType: 'image',
                        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                        cropping: true,
                        croppingAspectRatio: 1,
                      }}
                    >
                      {({ open }) => (
                        <Button type="button" variant="outline" onClick={() => open()} className="w-full sm:w-auto hover:cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload / Change Picture
                        </Button>
                      )}
                    </CldUploadWidget>

                    {previewImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => {
                          form.setValue('image', '');
                          setPreviewImage(null);
                        }}
                      >
                        <X className="mr-1.5 h-3.5 w-3.5" />
                        Remove picture
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='text-gray-300'>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="How others see you" {...field} className='text-white focus:bg-gray-950 border border-gray-600 focus:border-0 focus:outline-0' />
                    </FormControl>
                    <FormDescription>
                      This is your public name — can be different from your real name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} className='text-white focus:bg-gray-950 border border-gray-600 focus:border-0 focus:outline-0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} className='text-white focus:bg-gray-950 border border-gray-600 focus:border-0 focus:outline-0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-300'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourhandle" {...field} className='text-white focus:bg-gray-950 border border-gray-600 focus:border-0 focus:outline-0' />
                    </FormControl>
                    <FormDescription>
                      Used in profile URLs and mentions (letters, numbers, underscores only).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-300'>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a bit about yourself (max 500 characters)"
                        {...field} className='min-h-30 text-white focus:bg-gray-950 border border-gray-600 focus:border-0 focus:outline-0'
                      />
                    </FormControl>
                    <FormDescription>
                      Appears on your profile and next to your posts/comments.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-purple-700 hover:bg-purple-900 hover:cursor-pointer">
                  {isSubmitting ? 'Saving...' : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="flex-1 hover:cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}