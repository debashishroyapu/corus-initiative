// components/ui/button.tsx
import { cn } from '../../../app/lib/utils';
export function Button({ children, variant='default', ...props }: any) {
  const base = 'px-3 py-2 rounded text-sm font-medium';
  const styles = variant==='destructive'
    ? 'bg-red-600 text-white hover:bg-red-700'
    : 'bg-black text-white hover:bg-gray-800';
  return <button className={cn(base, styles)} {...props}>{children}</button>;
}
