import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { personalInfo, experiences, skills } from '@/lib/cvData';

interface SearchResult {
  type: 'experience' | 'skill' | 'certification';
  title: string;
  content: string;
  category?: string;
}

export default function SearchSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const results: SearchResult[] = [];
    const term = searchTerm.toLowerCase();

    // Recherche dans les expériences
    experiences.forEach(exp => {
      const searchableText = `${exp.position} ${exp.company} ${exp.projects.map(p => p.description).join(' ')} ${exp.technologies.join(' ')}`;
      if (searchableText.toLowerCase().includes(term)) {
        results.push({
          type: 'experience',
          title: `${exp.position} - ${exp.company}`,
          content: exp.projects[0]?.description.substring(0, 100) + '...' || '',
        });
      }
    });

    // Recherche dans les compétences
    skills.forEach(skill => {
      if (skill.name.toLowerCase().includes(term)) {
        results.push({
          type: 'skill',
          title: skill.name,
          content: `Compétence dans la catégorie ${skill.category}`,
          category: skill.category,
        });
      }
    });

    // Recherche dans les certifications (exemple statique)
    const certifications = [
      "AWS Certified Cloud Practitioner",
      "Azure Fundamentals (AZ-900)",
      "Google Cloud Digital Leader",
      "Certified Kubernetes Administrator (CKA)",
      "Professional Scrum Master I (PSM I)",
    ];

    certifications.forEach(cert => {
      if (cert.toLowerCase().includes(term)) {
        results.push({
          type: 'certification',
          title: cert,
          content: 'Certification professionnelle validée',
        });
      }
    });

    return results.slice(0, 10); // Limiter à 10 résultats
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'experience': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'skill': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'certification': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher compétences, expériences..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(searchTerm.length > 0)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-b-0 cursor-pointer"
                onClick={() => {
                  // Logique pour naviguer vers la section correspondante
                  if (result.type === 'experience') {
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (result.type === 'skill') {
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                      {result.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {result.content}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {result.type === 'experience' ? 'Exp' : result.type === 'skill' ? 'Comp' : 'Cert'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {isOpen && searchTerm && searchResults.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aucun résultat trouvé pour "{searchTerm}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}