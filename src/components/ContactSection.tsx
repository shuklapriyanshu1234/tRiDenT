'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send } from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ?? 'https://trident-pharma.com/api/contact.php';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!apiUrl) {
      setStatus('error');
      setErrorMessage(
        'Set NEXT_PUBLIC_CONTACT_API_URL in .env.local to your PHP endpoint.'
      );
      return;
    }

    setStatus('sending');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let json: {
        ok?: boolean;
        success?: boolean;
        error?: string;
        message?: string;
      } = {};
      try {
        json = text ? (JSON.parse(text) as typeof json) : {};
      } catch {
        /* non-JSON response */
      }

      const success =
        res.ok && json.ok !== false && json.success !== false;

      if (success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      setStatus('error');
      setErrorMessage(
        json.error ||
          json.message ||
          text ||
          `Request failed (${res.status})`
      );
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error. Check the API URL and CORS on your PHP server.'
      );
    }
  };

  return (
    <section id='contact' className='py-16 md:py-24 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background'></div>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl'></div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6'>
            <MessageCircle className='h-4 w-4' />
            Get In Touch
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-6 px-1'>
            Contact Our Experts
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-1'>
            Have questions about our products or need professional consultation?
            Our team of certified pharmacologists is here to help you achieve
            your goals safely.
          </p>
        </div>

        <div className='flex justify-center'>
          <div className='w-full max-w-2xl'>
            {/* Contact Form */}
            <Card className='bg-card/30 backdrop-blur-xl border border-border/30 shadow-lg'>
              <CardContent className='p-5 sm:p-8'>
                <h3 className='text-xl sm:text-2xl font-bold text-gold mb-6'>
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className='space-y-6'>
                  {!apiUrl && (
                    <p className='text-sm text-amber-600 dark:text-amber-500 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2'>
                      Set{' '}
                      <code className='text-xs'>
                        NEXT_PUBLIC_CONTACT_API_URL
                      </code>{' '}
                      in <code className='text-xs'>.env.local</code> (your PHP
                      contact endpoint).
                    </p>
                  )}
                  {status === 'success' && (
                    <p className='text-sm text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/30 rounded-md px-3 py-2'>
                      Message sent. We will get back to you soon.
                    </p>
                  )}
                  {status === 'error' && errorMessage && (
                    <p className='text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2'>
                      {errorMessage}
                    </p>
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-foreground mb-2'>
                        Full Name *
                      </label>
                      <Input
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Your full name'
                        className='w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground'
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-foreground mb-2'>
                        Email Address *
                      </label>
                      <Input
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='your.email@example.com'
                        className='w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground'
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Subject *
                    </label>
                    <Input
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder='What can we help you with?'
                      className='w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Message *
                    </label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder='Tell us about your goals, experience level, and any specific questions...'
                      rows={5}
                      className='w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground'
                      required
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={status === 'sending'}
                    className='w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background font-semibold py-3 disabled:opacity-60'
                  >
                    <Send className='h-4 w-4 mr-2' />
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
