import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({
  children,
  variant = 'default',
  className = '',
  padding = 'md',
}: CardProps) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

// Additional subcomponents for structured card layout
Card.Header = function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

Card.Title = function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
};

Card.Subtitle = function CardSubtitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h4 className={`text-gray-600 text-sm mt-1 ${className}`}>{children}</h4>;
};

Card.Body = function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
};

Card.Image = function CardImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default Card; 