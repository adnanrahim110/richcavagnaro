'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { contact } from '@/content/contact';
import { amazonLink } from '@/content/book';
import { Button } from '@/components/ui';

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (name: string, value: string) => {
    const field = contact.formFields.find(f => f.name === name);
    if (!field) return '';
    
    if (field.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
      return `Maximum ${field.validation.maxLength} characters allowed`;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
        >
          {contact.formFields.map(field => (
            <div key={field.name} className="mb-6">
              <label htmlFor={field.id} className="block font-display text-sm font-semibold text-slate-700 mb-2">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition resize-y"
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              )}
              {touched[field.name] && errors[field.name] && (
                <p className="text-accent-600 text-sm font-body mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <Button variant="primary" size="lg" type="submit" className="w-full">
            Submit
          </Button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <CheckCircle2 size={64} className="mx-auto text-green-500 animate-bounce-in" />
          <h3 className="font-display font-bold text-slate-800 text-2xl mt-6">
            {contact.successMessage.heading}
          </h3>
          <p className="font-body text-slate-600 text-base mt-3 max-w-md mx-auto">
            {contact.successMessage.body}
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button variant="ghost" href="/">
              Back to Home
            </Button>
            <Button variant="primary" href={amazonLink} external>
              Get the Book
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
