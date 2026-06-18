'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle2, Loader2, Mail, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { contact } from '@/content/contact';
import { Button } from '@/components/ui';
import { submitForm } from '@/utils/formSubmit';

const fieldClassName =
  'w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-body text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-slate-900 transition resize-y';

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (name: string, value: string) => {
    const field = contact.formFields.find(f => f.name === name);
    if (!field) return '';
    
    if (field.required && (!value || value.trim() === '')) {
      return `${field.label} is required.`;
    }

    if (field.name === 'name' && value.trim().length > 0 && value.trim().length < 2) {
      return 'Please enter your full name.';
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }
    
    if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
      return `Please keep this under ${field.validation.maxLength} characters.`;
    }
    
    return '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let hasErrors = false;
    
    contact.formFields.forEach(field => {
      const error = validate(field.name, values[field.name] || '');
      newErrors[field.name] = error;
      newTouched[field.name] = true;
      if (error) hasErrors = true;
    });
    
    setErrors(newErrors);
    setTouched(newTouched);
    
    if (!hasErrors) {
      setSubmitting(true);

      const result = await submitForm({
        formData: new FormData(e.currentTarget),
        requiredFields: contact.formFields
          .filter((field) => field.required)
          .map((field) => field.name),
        extraFields: {
          formName: 'contact',
          source: 'Rich Cavagnaro Books contact form',
        },
      });

      setSubmitting(false);

      if (result.success) {
        toast.success('Your message was sent to Rich Cavagnaro Books.');
        setSubmitted(true);
        window.setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
        return;
      }

      if (result.validationErrors) {
        setErrors((prev) => ({ ...prev, ...result.validationErrors }));
        setTouched((prev) => ({
          ...prev,
          ...Object.keys(result.validationErrors).reduce<Record<string, boolean>>((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        }));
        toast.error('Please review the highlighted fields.');
        return;
      }

      toast.error(
        result.error ||
          'We could not send your message right now. Please try again in a moment.'
      );
    }
  };

  const handleReset = () => {
    setValues({});
    setTouched({});
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div ref={containerRef}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
          key="form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          {contact.formFields.map(field => (
            <div key={field.name} className="mb-6">
              <label htmlFor={field.id} className="block font-display text-sm font-semibold text-slate-700 mb-2">
                {field.label}
                {field.required && <span className="text-accent-600"> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  maxLength={field.validation?.maxLength}
                  rows={4}
                  aria-invalid={Boolean(touched[field.name] && errors[field.name])}
                  aria-describedby={`${field.id}-error`}
                  className={fieldClassName}
                />
              ) : (
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  maxLength={field.validation?.maxLength}
                  pattern={field.validation?.pattern}
                  aria-invalid={Boolean(touched[field.name] && errors[field.name])}
                  aria-describedby={`${field.id}-error`}
                  className={fieldClassName}
                />
              )}
              {touched[field.name] && errors[field.name] && (
                <p id={`${field.id}-error`} className="text-accent-600 text-sm font-body mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full"
            icon={submitting ? Loader2 : Mail}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
          </motion.form>
        ) : (
          <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center py-8"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-slate-900 bg-green-100 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
            <CheckCircle2 size={48} className="text-green-600 animate-bounce-in" />
          </div>
          <h3 className="font-display font-bold text-slate-800 text-2xl mt-6">
            {contact.successMessage.heading}
          </h3>
          <p className="font-body text-slate-600 text-base mt-3 max-w-md mx-auto">
            {contact.successMessage.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button variant="primary" href="/book" icon={BookOpen}>
              Explore the Book
            </Button>
            <Button variant="outline" href="/" icon={ArrowLeft}>
              Back Home
            </Button>
            <Button variant="ghost" type="button" icon={RotateCcw} onClick={handleReset}>
              Send Another
            </Button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
