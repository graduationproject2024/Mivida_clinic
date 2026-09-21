import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-xl bg-white border border-border/70 shadow-sm shrink-0',
        className
      )}
      aria-hidden="true"
    >
      <Image
        src="/logo.jpg"
        alt=""
        width={1369}
        height={1149}
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    </span>
  );
}