import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { inquiryService } from '@/services/inquiryService';
import { customerService } from '@/services/customerService';

const formSchema = z.object({
  customerId: z.string().min(1, "Customer is required."),
  productName: z.string().optional(),
  message: z.string().min(1, 'Message cannot be empty.'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'responded', 'closed']).optional(),
});

type InquiryFormValues = z.infer<typeof formSchema>;

interface InquiryFormModalProps {
  mode: 'create' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  inquiry?: any;
  onSuccess: () => void;
}

export const InquiryFormModal = ({ mode, isOpen, onClose, inquiry, onSuccess }: InquiryFormModalProps) => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: '',
      productName: '',
      message: '',
      priority: 'medium',
      status: 'pending',
    },
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerRes = await customerService.getAll();
        setCustomers(customerRes.data || []);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load customers.', variant: 'destructive' });
      }
    };
    if (isOpen) {
      fetchCustomers();
    }
  }, [isOpen, toast]);

  useEffect(() => {
    if (isOpen && mode === 'edit' && inquiry) {
      form.reset({
        customerId: inquiry.customer?.id.toString() || '',
        productName: inquiry.productName || '',
        message: inquiry.message || '',
        priority: inquiry.priority || 'medium',
        status: inquiry.status || 'pending',
      });
    } else if (isOpen && mode === 'create') {
      form.reset({
        customerId: '',
        productName: '',
        message: '',
        priority: 'medium',
        status: 'pending',
      });
    }
  }, [isOpen, mode, inquiry, form]);

  const onSubmit = async (data: InquiryFormValues) => {
    try {
      const payload = {
        ...data,
        customerId: Number(data.customerId),
      };

      if (mode === 'edit' && inquiry) {
        await inquiryService.update(inquiry.id, payload);
        toast({ title: 'Success', description: 'Inquiry updated successfully.' });
      } else {
        await inquiryService.create(payload);
        toast({ title: 'Success', description: 'Manual inquiry created successfully.' });
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'An error occurred.', variant: 'destructive' });
    }
  };

  const title = mode === 'edit' ? 'Edit Inquiry' : 'Create Manual Inquiry';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={mode === 'edit'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Diamond Necklace" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} placeholder="Enter inquiry message..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {mode === 'edit' && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};