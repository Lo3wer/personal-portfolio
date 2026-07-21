import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-6 mt-4">
      <a 
        href="https://linkedin.com/in/leohzhang" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-3xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
      >
        <FaLinkedin />
      </a>
      <a 
        href="https://github.com/lo3wer" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <FaGithub />
      </a>
      <a 
        href="https://instagram.com/leozhang226" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-3xl text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
      >
        <FaInstagram />
      </a>
      <a 
        href="mailto:leozhang226@gmail.com" 
        className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <FaEnvelope />
      </a>
    </div>
  );
};

export default SocialIcons; 