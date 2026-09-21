'use client';

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md',
  secondary:
    'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  locale?: 'ar' | 'en';
  rtl?: boolean;
  withArrow?: boolean;
  loading?: boolean;
}

type ButtonAsButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
type ButtonAsLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & { href: string };

function Arrow({ locale, rtl, reverse }: { locale?: 'ar' | 'en'; rtl?: boolean; reverse?: boolean }) {
  const Right = locale === 'ar' ? ArrowLeft : ArrowRight;
  return <Right className={cn('w-4 h-4 shrink-0 transition-transform duration-200', reverse && 'rotate-180', rtl && 'rotate-180')} aria-hidden="true" />;
}

const Icon = ({ loading, arrow, locale, rtl }: { loading?: boolean; arrow?: boolean; locale?: 'ar' | 'en'; rtl?: boolean }) => {
  if (loading) return <Loader2 className="w-4 h-4 shrink-0 animate-spin" aria-hidden="true" />;
  if (arrow) return <Arrow locale={locale} rtl={rtl} />;
  return null;
};

export const Button = forwardRef<HTMLButtonElement, ButtonAsButtonProps>(function Button(
  { variant = 'primary', size = 'md', locale, rtl, withArrow, loading, className, children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {withArrow && <Icon loading={loading} arrow locale={locale} rtl={rtl} />}
    </button>
  );
});

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonAsLinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', locale, rtl, withArrow, className, children, href, ...props },
  ref
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {withArrow && <Arrow locale={locale} rtl={rtl} />}
    </Link>
  );
});
