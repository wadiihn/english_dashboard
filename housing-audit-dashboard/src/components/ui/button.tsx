import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      default: 'bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 focus-visible:ring-slate-950 focus-visible:ring-offset-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950',
      outline: 'border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-950 focus-visible:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
