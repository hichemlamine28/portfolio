import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      const certificationDiv = document.querySelector('#certifications');
      const navHeight = 80;
      const scrollPosition = window.pageYOffset + navHeight;
      
      let current = '';
      
      // Check if we're in the certifications section specifically
      if (certificationDiv) {
        const certTop = certificationDiv.offsetTop;
        const certBottom = certTop + certificationDiv.offsetHeight;
        if (scrollPosition >= certTop && scrollPosition < certBottom) {
          current = 'certifications';
          setActiveSection(current);
          return;
        }
      }
      
      // Check other sections
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  return activeSection;
}
