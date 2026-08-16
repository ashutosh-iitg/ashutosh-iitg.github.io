import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SectionHeading } from "@/components/terminal/SectionHeading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function buildMailtoUrl({ name, email, message }: ContactFormValues): string {
  const subject = encodeURIComponent(`Portfolio contact — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    // TODO(formspree-id): swap this mailto handoff for
    // fetch("https://formspree.io/f/<FORM_ID>", ...) once the user provides a form ID (PLAN.md §10).
    window.location.href = buildMailtoUrl(values);
  }

  return (
    <section id="contact" className="container scroll-mt-14 py-24">
      <SectionHeading command="./send-message.sh" title="Get in Touch" />
      <div className="mx-auto max-w-2xl">
        <p className="mb-8 text-sm text-muted-foreground">
          Submitting opens your mail client with the message pre-filled — no backend, no middleman.
          Or just write to{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4 hover:text-foreground">
            {profile.email}
          </a>{" "}
          directly.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name:</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="name" />
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
                  <FormLabel>email:</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} autoComplete="email" />
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
                  <FormLabel>message:</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground">
              send →
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
