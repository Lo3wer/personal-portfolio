import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

type SocialIconsProps = {
  light?: boolean;
};

const SocialIcons = ({ light = false }: SocialIconsProps) => {
  const base = light
    ? "text-white hover:text-blue-500"
    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500";
  const github = light
    ? "text-white hover:text-gray-300"
    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
  const insta = light
    ? "text-white hover:text-pink-500"
    : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500";
  const email = light
    ? "text-white hover:text-gray-300"
    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";

  return (
    <div className="flex justify-center space-x-6 mt-4">
      <a href="https://linkedin.com/in/leohzhang" target="_blank" rel="noopener noreferrer" className={`text-3xl ${base} transition-colors`}>
        <FaLinkedin />
      </a>
      <a href="https://github.com/lo3wer" target="_blank" rel="noopener noreferrer" className={`text-3xl ${github} transition-colors`}>
        <FaGithub />
      </a>
      <a href="https://instagram.com/leozhang226" target="_blank" rel="noopener noreferrer" className={`text-3xl ${insta} transition-colors`}>
        <FaInstagram />
      </a>
      <a href="mailto:leozhang226@gmail.com" className={`text-3xl ${email} transition-colors`}>
        <FaEnvelope />
      </a>
    </div>
  );
};

export default SocialIcons; 