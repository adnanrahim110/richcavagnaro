export interface FormFieldValidation {
  maxLength?: number;
  pattern?: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required: boolean;
  validation?: FormFieldValidation;
}

export const contact = {
  hero: {
    heading: "Say Hello!",
    sub: "Whether you're looking to schedule a lively school visit, ask a question about the book, or simply say hi, drop a message below."
  },
  formFields: [
    {
      id: "name",
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "e.g. Rory R.",
      required: true,
      validation: {
        maxLength: 100
      }
    },
    {
      id: "email",
      name: "email",
      label: "Your Email",
      type: "email",
      placeholder: "rory@example.com",
      required: true,
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      }
    },
    {
      id: "subject",
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "School Visit Inquiry",
      required: true,
      validation: {
        maxLength: 150
      }
    },
    {
      id: "message",
      name: "message",
      label: "Your Message",
      type: "textarea",
      placeholder: "Write your message here...",
      required: true,
      validation: {
        maxLength: 1000
      }
    }
  ] as FormField[],
  successMessage: {
    heading: "Message Received",
    body: "Thank you for reaching out to Rich Cavagnaro Books. Your note has been sent, and the team will review it and respond as soon as possible."
  }
};
