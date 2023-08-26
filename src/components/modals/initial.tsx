'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type InitialSchema, initialSchema } from '@/lib/validations';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<InitialSchema>({
    defaultValues: {
      name: '',
      imageUrl: ''
    },
    resolver: zodResolver(initialSchema)
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isLoading } = form.formState;

  const onSubmit = async (values: InitialSchema) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl">
            Customize your server
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Give your description a personality with a name and an image. You
            can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="text-center flex-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        /> */}
                        File Upload
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="Enter server name"
                        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
