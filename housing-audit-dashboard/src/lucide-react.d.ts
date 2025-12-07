declare module 'lucide-react' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const Users: React.ComponentType<IconProps>;
  export const Briefcase: React.ComponentType<IconProps>;
  export const Building2: React.ComponentType<IconProps>;
  export const Banknote: React.ComponentType<IconProps>;
  export const User: React.ComponentType<IconProps>;
  export const UserCheck: React.ComponentType<IconProps>;
  export const Baby: React.ComponentType<IconProps>;
  export const Wallet: React.ComponentType<IconProps>;
  export const TrendingDown: React.ComponentType<IconProps>;
  export const ArrowLeft: React.ComponentType<IconProps>;
}
