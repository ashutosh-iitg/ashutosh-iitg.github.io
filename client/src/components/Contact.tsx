import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon."
      });
      form.reset();
    }
  });

  return (
    <section id="contact" className="container py-24">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Get in Touch</h2>
      <div className="mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => mutation.mutate(data))} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="email" {...field} />
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
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
