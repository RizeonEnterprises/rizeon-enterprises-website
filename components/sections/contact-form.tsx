"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { whatsappUrl } from "@/lib/site"

const services = [
  "Custom Software",
  "Website Creation",
  "E-Commerce / Shopify & SEO",
  "Laptop Repair",
  "Laptop Sales",
  "Accessories",
  "Bulk Enquiry",
] as const

type Errors = {
  name?: boolean
  phone?: boolean
  service?: boolean
  details?: boolean
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string | false
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}

/**
 * WhatsApp enquiry form. Client island: holds field state, validates required
 * inputs, and opens a prefilled wa.me link in a new tab. Nothing is sent until
 * the visitor presses send inside WhatsApp.
 */
export function ContactForm() {
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [service, setService] = React.useState<string | null>(null)
  const [details, setDetails] = React.useState("")
  const [errors, setErrors] = React.useState<Errors>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: Errors = {
      name: name.trim() === "",
      phone: phone.trim() === "",
      service: !service,
      details: details.trim() === "",
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    const message = [
      `New enquiry from ${name.trim()}`,
      `Phone/WhatsApp: ${phone.trim()}`,
      `Service required: ${service}`,
      "",
      "Project / issue details:",
      details.trim(),
    ].join("\n")

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer")
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Full Name" htmlFor="name" error={errors.name && "Please enter your name."}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name || undefined}
        />
      </Field>

      <Field
        label="Phone / WhatsApp Number"
        htmlFor="phone"
        error={errors.phone && "Please enter a number we can reach you on."}
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 ..."
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={errors.phone || undefined}
        />
      </Field>

      <Field
        label="Service Required"
        htmlFor="service"
        error={errors.service && "Please choose a service."}
      >
        <Select value={service} onValueChange={(value) => setService(value)}>
          <SelectTrigger
            id="service"
            aria-label="Service Required"
            aria-invalid={errors.service || undefined}
            className="w-full"
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field
        label="Project or Issue Details"
        htmlFor="details"
        error={errors.details && "Tell us a little about what you need."}
      >
        <Textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Describe your project, requirement, or the issue you are facing..."
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          aria-invalid={errors.details || undefined}
        />
      </Field>

      <Button type="submit" className="mt-1 h-11 gap-2 rounded-xl text-base">
        <MessageCircle className="size-4" aria-hidden />
        Send Enquiry on WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">
        Opens WhatsApp with your details prefilled—nothing is sent until you press send.
      </p>
    </form>
  )
}
