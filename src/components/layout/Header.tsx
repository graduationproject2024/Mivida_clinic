'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/brand/Logo';
import { locales } from '@/lib/i18n';
import { Button, ButtonLink } from '@/components/ui/Button';

interface HeaderProps {
  locale: 'ar' | 'en';
}

const navigation = [
  { href: '/', labelKey: 'home', labelKeyAr: 'homeAr' },
  { href: '/services', labelKey: 'services', labelKeyAr: 'servicesAr' },
  { href: '/about', labelKey: 'about', labelKeyAr: 'aboutAr' },
  { href: '/before-after', labelKey: 'beforeAfter', labelKeyAr: 'beforeAfterAr' },
  { href: '/contact', labelKey: 'contact', labelKeyAr: 'contactAr' },
];

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLangChange = (newLocale: 'ar' | 'en') => {
    if (newLocale === locale) return;
    const path = pathname === `/${locale}`
      ? `/${newLocale}`
      : pathname.replace(`/${locale}/`, `/${newLocale}/`);
    window.location.href = path;
  };
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const getLabel = (item: typeof navigation[0]) => {
    return locale === 'ar' ? t(item.labelKeyAr) : t(item.labelKey);
  };
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border' : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label={locale === 'ar' ? 'عيادة Mivida - الرئيسية' : 'Mivida Clinic - Home'}
          >
            <Logo className="h-9 w-9 sm:h-10 sm:w-10" />
            <span className="text-xl font-bold text-primary" aria-hidden="true">Mivida</span>
            <span className="hidden sm:block text-sm font-medium text-primary">
              {locale === 'ar' ? 'عيادة' : 'Clinic'}
            </span>
          </Link>
          
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-text/80 hover:text-primary hover:bg-primary/5'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={closeMobileMenu}
              >
                {getLabel(item)}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex md:items-center md:gap-3">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-text/80 hover:text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                role="combobox"
                aria-label="Select language"
                aria-expanded={showLangDropdown}
                aria-controls="lang-menu"
                aria-haspopup="listbox"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{locale === 'ar' ? 'العربية' : 'English'}</span>
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showLangDropdown && 'rotate-180')} aria-hidden="true" />
              </button>
              {showLangDropdown && (
                <ul
                  id="lang-menu"
                  className="absolute right-0 mt-1.5 min-w-[120px] rounded-lg border border-border bg-white shadow-lg py-1 animate-slide-down"
                  role="listbox"
                  aria-label="Available languages"
                >
                  {locales.map((loc: 'ar' | 'en') => (
                    <li key={loc}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={loc === locale}
                        className={cn(
                          'w-full px-3 py-2 text-sm font-medium transition-colors',
                          loc === locale
                            ? 'text-primary bg-primary/5'
                            : 'text-text hover:bg-primary/5'
                        )}
                        onClick={() => handleLangChange(loc)}
                      >
                        {loc === 'ar' ? 'العربية' : 'English'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <ButtonLink
              href={`/${locale}/appointment`}
              variant="primary"
              size="md"
              className="whitespace-nowrap px-4 py-2 text-sm"
              onClick={closeMobileMenu}
            >
              {locale === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
            </ButtonLink>
          </div>
          
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-text hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={locale === 'ar' ? 'فتح القائمة' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 md:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'ar' ? 'القائمة الرئيسية' : 'Main menu'}
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl animate-slide-down flex flex-col" style={{ transformOrigin: locale === 'ar' ? 'right' : 'left' }}>
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <span className="text-lg font-semibold text-text">
                {locale === 'ar' ? 'القائمة' : 'Menu'}
              </span>
              <button
                type="button"
                className="p-2 rounded-lg text-text hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={closeMobileMenu}
                aria-label={locale === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-text hover:text-primary hover:bg-primary/5'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {getLabel(item)}
                </Link>
              ))}
              <hr className="my-4 border-border" />
              <div className="mx-4 mb-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => handleLangChange('ar')}
                  className={cn(
                    'flex-1 rounded-lg py-2.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    locale === 'ar'
                      ? 'bg-primary text-white'
                      : 'bg-cream text-text hover:bg-primary/10'
                  )}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange('en')}
                  className={cn(
                    'flex-1 rounded-lg py-2.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    locale === 'en'
                      ? 'bg-primary text-white'
                      : 'bg-cream text-text hover:bg-primary/10'
                  )}
                >
                  English
                </button>
              </div>
              <ButtonLink
                href={`/${locale}/appointment`}
                variant="primary"
                size="lg"
                className="mx-4 mt-4 w-[calc(100%-2rem)]"
                onClick={closeMobileMenu}
              >
                {locale === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
              </ButtonLink>
            </nav>
            <div className="p-4 border-t border-border">
              <p className="text-sm text-text-muted text-center">
                {locale === 'ar' ? 'Mivida Clinic - جميع الحقوق محفوظة' : 'Mivida Clinic - All rights reserved'}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
