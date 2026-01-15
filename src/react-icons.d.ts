declare module 'react-icons/fa' {
  import { ComponentType } from 'react';
  type IconProps = {
    className?: string;
    size?: string | number;
    color?: string;
    title?: string;
  };
  export const FaUser: ComponentType<IconProps>;
  export const FaGraduationCap: ComponentType<IconProps>;
  export const FaBriefcase: ComponentType<IconProps>;
  export const FaMapMarkerAlt: ComponentType<IconProps>;
  export const FaEnvelope: ComponentType<IconProps>;
  export const FaGithub: ComponentType<IconProps>;
  export const FaLinkedin: ComponentType<IconProps>;
  export const FaExclamationTriangle: ComponentType<IconProps>;
}
