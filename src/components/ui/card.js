import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('glass-panel p-6', className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-2xl font-semibold font-display', className)} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted', className)} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('mt-6 text-sm text-muted', className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
