import {
  Sparkles,
  Sparkle,
  Droplets,
  HeartPulse,
  Zap,
  Star,
  Droplet,
  CircleDot,
} from 'lucide-react';

export function getServiceIcon(serviceId: string) {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    filler: Sparkles,
    botox: Sparkle,
    plasma: Droplets,
    'skin-hair': HeartPulse,
    laser: Zap,
    'glow-injection': Star,
    mesotherapy: Droplet,
    'stem-cells': CircleDot,
  };
  
  return icons[serviceId] || Sparkles;
}

export function ServiceIcon({ serviceId, className = 'w-6 h-6' }: { serviceId: string; className?: string }) {
  const Icon = getServiceIcon(serviceId);
  return <Icon className={className} aria-hidden="true" />;
}
