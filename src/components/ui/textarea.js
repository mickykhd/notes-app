import * as React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'field-input min-h-[140px] w-full rounded-2xl px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
