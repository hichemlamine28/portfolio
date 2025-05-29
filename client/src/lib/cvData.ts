export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  projects: Project[];
  technologies: string[];
  location?: string;
}

export interface Project {
  name: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'cloud' | 'devops' | 'monitoring' | 'security' | 'atlassian' | 'agile' | 'containers' | 'programming' | 'databases' | 'networking' | 'testing';
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  summary: string;
  yearsOfExperience: number;
}

// Calcul dynamique des années d'expérience depuis 2006
const calculateYearsOfExperience = (): number => {
  const startYear = 2006;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

export const personalInfo: PersonalInfo = {
  firstName: "Hichem",
  lastName: "ELAMINE",
  title: "Architecte & Lead DevSecOps Cloud • Scrum Master • Coach DevOps Agile • Expert Technique Atlassian",
  email: "hichemlamine@gmail.com",
  phone: "+33 7 52 13 96 63",
  linkedin: "https://www.linkedin.com/in/hichem-elamine/",
  github: "https://github.com/hichemlamine28",
  summary: `Fort de plus de 19 ans d'expérience depuis l'obtention de mon Master en Informatique, je suis Expert DevSecOps, Architecte Cloud et Coach Agile hautement qualifié. Spécialisé dans l'écosystème Atlassian (Jira, Confluence, Jira Service Management, eazybi, bitbucket ...), je maîtrise les méthodologies Agiles (Scrum, Kanban, SAFe, ...) et possède une expertise approfondie en leadership technique, coaching d'équipes, conception d'architectures cloud et mise en œuvre de pratiques DevSecOps sécurisées dans des environnements complexes et multi-sectoriels.`,
  yearsOfExperience: calculateYearsOfExperience()
};

export const experiences: Experience[] = [
  {
    id: "thales-2024",
    company: "THALES",
    position: "Expert DevSecOps, Architecte & Responsable infrastructure cloud",
    startDate: "Mars 2024",
    endDate: "Aujourd'hui",
    isCurrent: true,
    projects: [
      {
        name: "Projet NUBO : Cloud interministériel NUBO au sein de la DGFIP",
        description: "Gestion complète de l'infrastructure cloud interministérielle",
        achievements: [
          "Mise à jour des versions Openstack",
          "Build des images docker kolla & Kolla-Ansible pour déploiement des composantes openstack",
          "Build des images de boot Debian pour PXE",
          "Déploiement de Openstack via Kolla-ansible",
          "Fix et correction des bugs et Support continu"
        ]
      }
    ],
    technologies: ["OpenStack", "Docker", "Kubernetes", "Ansible", "Kolla"]
  },
  {
    id: "thales-2021-2024",
    company: "THALES",
    position: "Coach DevOps, Architecte Cloud, Expert Technique Atlassian",
    startDate: "Août 2021",
    endDate: "Mars 2024",
    isCurrent: false,
    projects: [
      {
        name: "Projet PSV: Portail Successions Vacantes",
        description: "Portail des successions vacantes pour les ministères finances/intérieur",
        achievements: [
          "Application des bonnes pratiques et stratégies DevOps",
          "Stratégies de branching/gitflow",
          "Stratégies du déploiement (blue-green/rolling update/canary)",
          "Stratégies de test",
          "Stratégies de Supervision, Notification et de gestion de logs",
          "CI/CD : automatisation du déploiement Jenkins",
          "Stratégies de sauvegarde & restauration",
          "Gestion des tenants outillage (Administration)",
          "Animation des workshops de travail et review du code",
          "Gestion de cloud privé NUBO basé sur Openstack",
          "Accompagnement des squad pour les MEP/MES",
          "Conception d'architecture et amélioration de l'existant"
        ]
      },
      {
        name: "Projet Jira/Confluence/Jira SM + EazyBi",
        description: "Mise en place et administration d'une plateforme Atlassian Jira/confluence/Jira SM/ Datacenter + EazyBi sur Cloud privé NUBO",
        achievements: [
          "Conception et mise en place de l'architecture du projet sur cloud privé Nubo en mode datacenter",
          "Rédaction et préparation du DAGD et du CAI du projet avec les équipes de sécurité",
          "Écriture des playbooks et des scripts Ansible/terraform pour provisionner et configurer l'infra",
          "Provisionnement de l'infra sur les divers tenants/environnements (terraform/openstack)",
          "Installation et configuration Jira/Confluence/Jira SM + EazyBi",
          "Gestion des tfstate terraform sur swift et/ou sur gitlab",
          "Mise en place des PIC hors-prod et prod pour outillage et administration",
          "Gestion de la supervision et des logs et des notifications via grafana, Prometheus, Loki",
          "Gestion des utilisateurs/projets/plugins et liens entre applications et SSO via LDAP",
          "Gestion des sauvegardes et restaurations restic/swift",
          "Automatisation des opérations des sauvegardes et restauration",
          "Gestion des licences et mises à jour software + plugins",
          "Gestion du PRA (Processus de Reprise d'activité)",
          "Automatisation des tâches jira avec groovy et python via les webhooks et les api"
        ]
      }
    ],
    technologies: ["Terraform", "Ansible", "OpenStack", "Barbican", "Nginx", "HAProxy", "TCP/IP", "Vault", "Restic/Swift", "Jira", "Confluence", "Jira SM", "EazyBi", "GitLab", "CentOS", "Rocky", "Ubuntu", "Python", "Groovy", "Jenkins", "Nexus", "Selenium", "SonarQube", "ZAP", "Grafana", "Prometheus", "Loki", "Promtail", "Alert-manager"]
  },
  {
    id: "grdf-2021",
    company: "GRDF",
    position: "Lead DevOps / Administrateur GitLab/Artifactory",
    startDate: "Janvier 2021",
    endDate: "Août 2021",
    isCurrent: false,
    projects: [
      {
        name: "Application Blanche Java",
        description: "Application prototype de base pour les Projets des équipes GRDF",
        achievements: [
          "Écriture des pipelines sur gitlab-ci pour déployer l'application",
          "Rédaction des needs/dependencies sur Gitlab-ci",
          "Modification des config gitlab-runner et adaptation sur docker-machine pour le lancement des jobs",
          "Review du code et application des bons pratiques",
          "Ajout des différents outils de test/qualité du code (Sonar/tokens/...)",
          "Développement et optimisation de l'application prototype"
        ]
      },
      {
        name: "Mise à jour et Administration GitLab et Artifactory JFrog",
        description: "Administration et maintenance des plateformes DevOps GRDF",
        achievements: [
          "Accompagnement aux mises à jour de GitLab",
          "Accompagnement aux mises à jour d'Artifactory JFrog",
          "Administration de GitLab (comptes/users/accès/tokens/projets/...)",
          "Administration d'Artifactory (dépôts/permissions/quotas/...)",
          "Gestion des configurations et optimisations de performance",
          "Support et formation des équipes sur les outils"
        ]
      }
    ],
    technologies: ["Terraform", "Ansible", "Shell/Bash", "Jira", "Confluence", "GitLab", "GitLab-CI", "CentOS", "Ubuntu", "Python", "Selenium", "SonarQube", "JFrog Artifactory", "Docker", "Docker-compose", "Docker Machine"]
  },
  {
    id: "breakpoint-2020",
    company: "BREAKPOINT TECHNOLOGY",
    position: "Tech-lead DevOps / Ingénieur Cloud / Scrum Master",
    startDate: "Janvier 2020",
    endDate: "Janvier 2021",
    isCurrent: false,
    projects: [
      {
        name: "Projet Linnkinnov",
        description: "Application gigantesque de réseau social professionnel (React/Java/Nest)",
        achievements: [
          "Participation à la conception, la mise à jour et l'amélioration de l'architecture Technique du projet",
          "Contrôle des coûts sur GCP via google cloud billing",
          "Déploiement des MCS backend (Java) sur les environnements dev et/ou prod",
          "Déploiement du code Front (React) Suite à une migration de svn vers git",
          "Création des pipelines et jobs nécessaires sur Jenkins",
          "Migration du code SVN vers Git Front et documentation nécessaire",
          "Migration du code des MCS backend de SVN vers Git en conservant les Historiques",
          "Préparation d'un plan et ajout des environnements (qualif, préprod) via Ansible et Terraform",
          "Gestion des cluster Kubernetes sur GCP (GKE)",
          "Configuration des cluster Kubernetes Engine (GKE) pour l'évolutivité et la disponibilité",
          "Gestion de Google Cloud Storage pour le stockage des données et des sauvegardes",
          "Gestion des identités et d'accès via Google Cloud IAM",
          "Utiliser les charts Helm pour déployer et configurer les BD (RethinkDB, Mariadb, postgres)",
          "Mise en place de la supervision via google cloud monitoring, google cloud logging",
          "Mise en place d'une plateforme de supervision grafana prometheus Elasticsearch Logstach Kibana",
          "Optimisation des performances des microservices et gestion de la scalabilité",
          "Mise en place des stratégies de déploiement Blue/Green et Canary",
          "Configuration des load balancers et reverse proxy pour la haute disponibilité",
          "Intégration des outils de sécurité et scan de vulnérabilités",
          "Formation des équipes de développement aux bonnes pratiques DevOps"
        ]
      },
      {
        name: "Projet Expand",
        description: "Projet d'évaluation de connaissance pour le recrutement incluant GitLab (React/Nest)",
        achievements: [
          "Mise en place de l'architecture du projet et des outils à utiliser tel que Azure virtual machine, azure app service, azure sql database",
          "Participer dans le calcul des coûts du projet (facturation) via azure cost management + billing",
          "Partager des connaissances techniques avec les membres de l'équipe (Docker/docker-compose ...)",
          "Créer les environnement dev/prod (staging/production) pour le déploiement",
          "Préparer les script pipelines bitbucket pour le CI/CD",
          "Intégrer les scripts de test nécessaire (Cypress, Sonar, Sentry)",
          "Créer les clusters Kubernetes AKS pour le déploiement",
          "Créer les bases de données nécessaires cosmosDB (puis mongodb via les charts Helm)",
          "Mise en place de la supervision via azure monitor, azure applications insights",
          "Configuration des alertes et notifications automatiques",
          "Optimisation des performances des requêtes et de la base de données",
          "Mise en place des stratégies de sauvegarde et de récupération",
          "Sécurisation des accès et des données sensibles",
          "Documentation technique complète et formation des utilisateurs"
        ]
      },
      {
        name: "BP-Profiling",
        description: "Plateforme de profilage et d'analyse comportementale pour RH",
        achievements: [
          "Conception et architecture cloud complète sur Azure avec AKS",
          "Mise en place du pipeline CI/CD avec Azure DevOps et intégration continue",
          "Configuration du monitoring avancé avec Azure Application Insights",
          "Implémentation de la base de données CosmosDB avec réplication multi-région",
          "Développement des APIs REST pour l'analyse comportementale",
          "Intégration des algorithmes de machine learning pour le profilage",
          "Mise en place des tableaux de bord analytics en temps réel",
          "Configuration de la sécurité et conformité RGPD",
          "Tests de charge et optimisation des performances",
          "Formation des équipes RH à l'utilisation de la plateforme"
        ]
      },
      {
        name: "Speach",
        description: "Application de reconnaissance vocale et traitement de la parole",
        achievements: [
          "Architecture et déploiement complet sur GCP avec Google Kubernetes Engine (GKE)",
          "Intégration des APIs Google Speech-to-Text et Text-to-Speech",
          "Mise en place du pipeline CI/CD avec Jenkins et automatisation des tests",
          "Configuration du monitoring avec Grafana et Prometheus",
          "Développement des microservices pour le traitement audio en temps réel",
          "Optimisation des performances pour le traitement de gros volumes audio",
          "Mise en place du stockage distribué pour les fichiers audio avec Google Cloud Storage",
          "Intégration des modèles de machine learning personnalisés",
          "Configuration de la sécurité et chiffrement des données audio",
          "Tests de performance et optimisation de la latence"
        ]
      },
      {
        name: "Crips",
        description: "Système de gestion de données critiques et sécurisées",
        achievements: [
          "Architecture sécurisée sur AWS avec Amazon EKS",
          "Mise en place de PostgreSQL en haute disponibilité avec réplication",
          "Intégration de HashiCorp Vault pour la gestion des secrets",
          "Développement de tests automatisés complets avec Cypress",
          "Configuration des politiques de sécurité et accès granulaires",
          "Mise en place du chiffrement end-to-end des données sensibles",
          "Implémentation des audits de sécurité automatisés",
          "Configuration des sauvegardes automatiques et plans de récupération",
          "Monitoring de sécurité avec SIEM et alertes en temps réel",
          "Documentation des procédures de sécurité et formation des équipes"
        ]
      },
      {
        name: "BP-Erp",
        description: "Solution ERP complète interne pour la gestion d'entreprise",
        achievements: [
          "Conception d'architecture multi-cloud hybride (Azure/AWS)",
          "Mise en place de l'intégration continue avec GitLab CI/CD",
          "Configuration du monitoring centralisé avec stack ELK",
          "Optimisation et contrôle des coûts cloud avec FinOps",
          "Développement des modules de gestion financière et RH",
          "Intégration des systèmes existants et migration des données",
          "Mise en place des workflows automatisés pour les processus métier",
          "Configuration des tableaux de bord executives et KPIs",
          "Tests de performance et optimisation de la scalabilité",
          "Formation des utilisateurs et support technique"
        ]
      },
      {
        name: "BP-Monitoring",
        description: "Plateforme centralisée de supervision et monitoring pour tous les projets",
        achievements: [
          "Déploiement de la stack complète Grafana/Prometheus/ELK",
          "Configuration d'alerting multi-canal (email, SMS, Slack, Teams)",
          "Création de dashboards personnalisés pour chaque client et projet",
          "Intégration avec tous les projets BREAKPOINT pour monitoring unifié",
          "Mise en place des métriques custom et business KPIs",
          "Configuration des SLA monitoring et alertes de violation",
          "Automatisation des rapports de performance et disponibilité",
          "Intégration avec les outils ITSM pour la gestion des incidents",
          "Optimisation des performances de la plateforme de monitoring",
          "Formation des équipes sur l'utilisation des outils de monitoring"
        ]
      },
      {
        name: "Smartocr",
        description: "Solution OCR intelligente pour reconnaissance automatique de documents",
        achievements: [
          "Architecture containerisée complète avec Docker et Kubernetes",
          "Développement d'APIs REST avec rate limiting et authentification",
          "Intégration de pipelines de machine learning pour l'OCR avancé",
          "Configuration du stockage objet sur cloud pour les documents",
          "Mise en place du traitement en batch pour gros volumes",
          "Intégration des modèles d'IA pour reconnaissance de formulaires complexes",
          "Configuration des workflows de validation et correction manuelle",
          "Optimisation des performances pour traitement temps réel",
          "Mise en place des métriques de qualité et précision de reconnaissance",
          "Interface web pour upload et visualisation des résultats"
        ]
      },
      {
        name: "Difference",
        description: "Outil avancé de comparaison et analyse de différences de code et documents",
        achievements: [
          "Conception d'architecture microservices avec communication asynchrone",
          "Mise en place du CI/CD automatisé avec tests unitaires et intégration",
          "Développement de tests de performance avec JMeter et gatling",
          "Documentation technique complète avec API documentation automatique",
          "Intégration avec les systèmes de contrôle de version (Git, SVN)",
          "Développement d'algorithmes optimisés pour comparaison de gros fichiers",
          "Interface utilisateur intuitive avec visualisation des différences",
          "Configuration des notifications automatiques pour changements critiques",
          "Intégration avec les outils de review de code",
          "Optimisation des performances pour traitement de fichiers volumineux"
        ]
      }
    ],
    technologies: ["GCP", "Azure", "AWS", "Kubernetes", "GKE", "AKS", "EKS", "Terraform", "Ansible", "Helm", "Jenkins", "Bitbucket", "React", "Angular", "Java", "Nest", "Docker", "Docker Swarm", "Python", "Grafana", "Prometheus", "ELK", "Azure Monitor", "Google Cloud Monitoring", "SVN", "Git", "SonarQube", "SonarCloud", "Cypress", "RabbitMQ", "LDAP", "Nexus", "MongoDB", "MariaDB", "RethinkDB", "PostgreSQL"]
  },
  {
    id: "m2i-2019",
    company: "M2I - FORMATION",
    position: "Formateur DevOps",
    startDate: "Août 2019",
    endDate: "Janvier 2020",
    isCurrent: false,
    projects: [
      {
        name: "Formations DevOps",
        description: "Animation de formations d'un mois pour des groupes de 10/15 ingénieurs",
        achievements: [
          "Docker pour linux, déploiement de conteneurs virtuels (vagrant, packer, Docker, docker-compose)",
          "Automatisation d'orchestration avec puppet, ansible, vagrant, swarm et kubernetes",
          "Universal control Plane (UCP) swarm et consultation des nœuds et des conteneurs sur web",
          "Ansible gestion de configuration et mise en place d'applications dans un PAAS",
          "Terraform IaC (Infrastructure as Code), les providers, le tfstate, import des ressources",
          "Jenkins, selenium, sonarqube + ELK, prometheus, grafana, cadvisor : CI/CD, monitoring et logs",
          "Connaissances du cloud (GCP, aws, azure) et Déploiement d'une infrastructure typique d'entreprise dans un cluster K8s",
          "Outils de supervision : Grafana, prometheus, exporters cadvisor, ELK"
        ]
      }
    ],
    technologies: ["GCP", "Azure", "AWS", "Kubernetes", "GKE", "AKS", "EKS", "Terraform", "Ansible", "Helm", "Jenkins", "Bitbucket", "React", "Angular", "Java", "Nest", "Docker", "Docker Swarm", "Python", "Grafana", "Prometheus", "ELK", "Azure Monitor", "Google Cloud Monitoring", "SVN", "Git", "SonarQube", "SonarCloud", "Cypress", "RabbitMQ", "LDAP", "Nexus", "MongoDB", "MariaDB", "RethinkDB", "PostgreSQL"]
  },
  {
    id: "mayar-2017",
    company: "MAYAR-INFO",
    position: "Ingénieur DevOps / Java-JEE / Scrum Master",
    startDate: "Novembre 2017",
    endDate: "Août 2019",
    isCurrent: false,
    projects: [
      {
        name: "PREDATORS - Digitalisation et transformation",
        description: "Service streaming et migration vers cloud aws/azure/digital Ocean/1and1 (ionos)",
        achievements: [
          "Digitalisation et transformation totale de l'application PREDATORS (SERVICE STREAMING)",
          "Migration vers cloud aws/azure/digital Ocean/1and1 (ionos) pour plusieurs Sociétés",
          "Conception des diverses architectures cloud gcp/azure/aws",
          "Bug fixing, Développement de nouvelles fonctionnalités et tests",
          "Tests unitaires, fonctionnels, de régression et de performances"
        ]
      },
      {
        name: "PREDATORS - DevOps et CI/CD",
        description: "Mise en place de l'infrastructure DevOps et des pipelines CI/CD",
        achievements: [
          "Jenkins et intégration continue / déploiement continu (CI/CD)",
          "Containerisation des API avec Docker, docker-compose, docker swarm, ansible, vagrant",
          "Déploiement Canarie et Blue/Green (serveur de test/serveur de production)",
          "Customisation et collecte de la trace applicative dans un puit de logs ELK, cAdvisor, logstash",
          "Communication bidirectionnelle entre API et processus Data avec Kafka"
        ]
      },
      {
        name: "Gestion Agile et Scrum Master",
        description: "Animation et gestion des équipes selon les méthodologies Agiles",
        achievements: [
          "Réunions quotidiennes agiles Scrum pour fixer les tâches et évaluer l'avancement",
          "Découpage et estimation des tâches avec méthode agile Scrum et Git",
          "Livraison hebdomadaire des stories et mise à jour quotidienne de scrum-board",
          "Animation des cérémonies Scrum (daily, sprint planning, retrospective)",
          "Coaching des équipes sur les pratiques Agiles"
        ]
      },
      {
        name: "Application SBM Grand Magasin",
        description: "Étude et Création d'une application gigantesque SBM pour un grand magasin",
        achievements: [
          "Analyse des besoins et conception de l'architecture applicative",
          "Développement d'une solution complète de gestion commerciale",
          "Intégration des systèmes de paiement et de gestion des stocks",
          "Mise en place des APIs REST pour l'interconnexion des systèmes",
          "Tests de charge et optimisation des performances",
          "Formation des utilisateurs finaux"
        ]
      }
    ],
    technologies: ["Java/JEE", "Shell", "Angular", "AngularJS", "Bootstrap", "SpringBoot", "Agile", "Scrum", "Kanban", "Git", "Maven", "Ansible", "Docker", "Grafana", "ELK", "TCP/IP", "SSH", "VPN", "VPC", "GKE", "EKS", "AKS", "EC2", "GCR", "ACR", "ECR", "Logstash", "cAdvisor", "SonarQube", "Kubernetes", "Cloud", "GCP", "AWS", "Azure", "Promtail", "Loki", "Nagios", "Zabbix", "pfSense", "Snort", "Asterisk", "IPS", "ICS", "FTP", "Libvirt", "VMware", "Vagrant", "VirtualBox", "Packer", "Docker Machine", "Docker Swarm", "Dockerfile", "Docker Compose", "DockerHub", "Prometheus", "Elasticsearch", "Kibana", "Jenkins", "SonarCube", "GitHub", "Cloud-init", "Cassandra", "PostgreSQL", "NoSQL", "CI/CD", "Jira", "Kafka"]
  }

  ,{
    id: "mayar-2015",
    company: "MAYAR-INFO",
    position: "Administrateur Système DevOps / Développeur Java-JEE",
    startDate: "Février 2015",
    endDate: "Novembre 2017",
    isCurrent: false,
    projects: [
      {
        name: "Serveurs sharing/streaming PREDATORS",
        description: "Conception et administration de serveurs de streaming pour entreprises",
        achievements: [
          "Installation, configuration et administration des serveurs sharing/streaming",
          "Importation quotidienne des clés et streams",
          "Veillance de la stabilité des serveurs et supervision",
          "Analyse du cahier des charges et conception des applications clients",
          "Développement des interfaces graphiques et des connexions",
          "Fonctionnalités avec découpage et estimation des tâches",
          "Méthode agile Scrum et versioning Git",
          "Rapports hebdomadaires des serveurs et quotidiens des réclamations",
          "Supervision proactive et notifications"
        ]
      },
      {
        name: "Migration cloud PREDATORS",
        description: "Migration de l'infrastructure vers des solutions cloud",
        achievements: [
          "Conception d'architectures cloud multi-provider",
          "Migration progressive des services vers le cloud",
          "Mise en place de solutions de haute disponibilité",
          "Optimisation des coûts cloud et monitoring des ressources",
          "Automatisation des déploiements avec Ansible",
          "Supervision avec Prometheus et Grafana"
        ]
      },
      {
        name: "Plateforme streaming avancée",
        description: "Évolution de la plateforme avec des fonctionnalités avancées",
        achievements: [
          "Développement de nouvelles API REST",
          "Architecture microservices",
          "Optimisation des performances de streaming",
          "Intégration de solutions CDN",
          "Interfaces d'administration avancées",
          "Tests de charge et optimisation de la scalabilité"
        ]
      }
    ],
    technologies: ["XML", "SQL", "XtreamCode", "CMS", "Windows", "Linux", "Agile", "Scrum", "Git", "Shell", "PowerShell", "Ansible", "Prometheus", "Grafana", "ELK", "VMware", "TCP/IP", "Snort", "Asterisk", "pfSense"]
  },
  {
    id: "mayar-2010",
    company: "MAYAR-INFO",
    position: "Développeur Web / Java-JEE",
    startDate: "Juin 2010",
    endDate: "Janvier 2015",
    isCurrent: false,
    projects: [
      {
        name: "Applications de gestion de fournisseurs",
        description: "MVP et refonte d'applications de gestion pour diverses entreprises",
        achievements: [
          "Réalisation de plusieurs MVP et refonte d'applications de gestion de fournisseurs",
          "Conception et développement des applications de gestion des factures, commandes, fournisseurs et clients",
          "Mise en place des bonnes pratiques de développement des services web REST",
          "Développement de services web REST (Java 8, Spring, Spring security, spring-boot, Hibernate)"
        ]
      },
      {
        name: "Application de gestion et monitoring",
        description: "Application pour la gestion de la configuration et de monitoring",
        achievements: [
          "Application pour la gestion de la configuration et de monitoring",
          "Réalisation des tests unitaires et des tests d'intégration (Junit, Spring-test)",
          "Réalisation d'un module de traitements par lots (batch) (Spring-batch, Spring-boot)",
          "Mise en place de Hibernate Envers pour reconstituer l'historique des dossiers techniques"
        ]
      },
      {
        name: "MPS - Application Monoprix Market",
        description: "Application et point de vente monoprix market",
        achievements: [
          "MPS : Application et point de vente monoprix market",
          "Développement des applications de vente et de gestion de stock",
          "Interface utilisateur optimisée pour les points de vente",
          "Intégration des systèmes de paiement et de caisse"
        ]
      },
      {
        name: "POSF - Application Familia",
        description: "Application et point de vente Familia",
        achievements: [
          "POSF : Application et point de vente Familia",
          "Développement des sites et des Applications web",
          "Gestion des stocks et des produits",
          "Interface de caisse et de gestion des ventes"
        ]
      },
      {
        name: "Application d'audit accessibilité web",
        description: "Application pour l'audit de l'accessibilité numérique du contenu web",
        achievements: [
          "Application pour l'audit de l'accessibilité numérique du contenu web",
          "Analyse automatisée de la conformité WCAG",
          "Génération de rapports d'audit détaillés",
          "Interface de suivi des corrections"
        ]
      },
      {
        name: "Système de gestion d'aides à l'innovation",
        description: "Système de gestion des dossiers d'aides à l'innovation",
        achievements: [
          "Système de gestion des dossiers d'aides à l'innovation",
          "Site pour les demandes de financements des projets innovants",
          "Workflow de validation des dossiers",
          "Suivi des projets et reporting"
        ]
      }
    ],
    technologies: ["Windows", "Tomcat", "Jetty", "Spring-boot", "Spring-batch", "Java 8/11/12", "SoapUI", "Junit 5", "JPA", "Applet", "Bootstrap", "PHP", "JavaScript", "HTML5", "CSS3", "Hibernate 5.2", "Nexus", "ehcache", "Spring", "Spring Security", "REST", "JSON", "Maven", "Swagger", "JWT", "OIDC", "Keycloak", "Snort", "LDAP", "RabbitMQ", "TCP/IP", "SSH", "FTP", "VPN", "Git", "GitLab", "SonarQube", "Jenkins", "GitHub", "Cassandra", "PostgreSQL", "NoSQL", "CI/CD", "Angular", "Karma"]
  },
  {
    id: "mayar-2006",
    company: "Ministère de l'Éducation Secondaire et Universitaire",
    position: "Enseignant en Informatique • Formateur Intel/Microsoft • Master Teacher",
    startDate: "Octobre 2006",
    endDate: "Mai 2010",
    isCurrent: false,
    projects: [
      {
        name: "Enseignement de l'informatique au secondaire et universitaire",
        description: "Formation complète des élèves et étudiants aux technologies de l'information et de la communication",
        achievements: [
          "Enseignement des concepts fondamentaux de l'informatique (algorithmes, structures de données, logique)",
          "Formation avancée à la programmation (Pascal, C, Turbo Pascal, Visual Basic)",
          "Cours sur les systèmes d'exploitation (Windows, Linux) et administration réseau",
          "Initiation aux bases de données et conception de systèmes d'information",
          "Formation aux outils bureautiques (Suite Microsoft Office, OpenOffice)",
          "Enseignement des technologies web (HTML, CSS, JavaScript)",
          "Encadrement de projets de fin d'études et mémoires en informatique",
          "Préparation des étudiants aux certifications professionnelles",
          "Évaluation et notation des travaux pratiques et examens théoriques"
        ]
      },
      {
        name: "Formateur agréé Intel/Microsoft - Master Teacher",
        description: "Certification et formation avancée dans les programmes officiels Intel et Microsoft",
        achievements: [
          "Certification Master Teacher Intel Teach Program pour l'intégration des TIC en éducation",
          "Formation officielle Microsoft Certified Trainer (MCT) sur les technologies Microsoft",
          "Animation de formations Intel Teach to the Future pour les enseignants",
          "Développement de contenus pédagogiques certifiés Intel/Microsoft",
          "Formation des formateurs sur les méthodologies d'enseignement avec les TIC",
          "Encadrement et mentorat de nouveaux enseignants en informatique",
          "Participation aux programmes de formation continue Intel/Microsoft",
          "Évaluation et certification d'autres enseignants dans les programmes Intel",
          "Création de modules de formation adaptés au contexte éducatif local"
        ]
      },
      {
        name: "Développement pédagogique et innovation éducative",
        description: "Amélioration des programmes et méthodes d'enseignement en informatique",
        achievements: [
          "Élaboration de curricula et programmes d'informatique conformes aux standards internationaux",
          "Création de supports de cours multimédia et ressources pédagogiques interactives",
          "Mise en place de laboratoires informatiques équipés et fonctionnels",
          "Organisation d'ateliers pratiques et de sessions de travaux dirigés",
          "Développement de projets pédagogiques innovants intégrant les nouvelles technologies",
          "Participation à l'amélioration des programmes d'études du ministère",
          "Formation continue et mise à jour des compétences pédagogiques",
          "Collaboration avec des experts internationaux en éducation technologique",
          "Évaluation et amélioration continue des méthodes d'enseignement"
        ]
      },
      {
        name: "Administration système et support technique éducatif",
        description: "Gestion complète de l'infrastructure informatique éducative",
        achievements: [
          "Administration et maintenance du parc informatique de l'établissement (50+ postes)",
          "Configuration et gestion du réseau informatique pédagogique LAN/WAN",
          "Installation, configuration et mise à jour des logiciels éducatifs et professionnels",
          "Gestion des serveurs pédagogiques et bases de données étudiantes",
          "Formation du personnel administratif et enseignant aux outils informatiques",
          "Support technique quotidien pour les activités pédagogiques",
          "Mise en place de solutions de sauvegarde et de sécurité des données",
          "Gestion des licences logicielles et respect des droits d'auteur",
          "Planification et exécution des mises à niveau technologiques"
        ]
      },
      {
        name: "Mémoire pédagogique pour titularisation - Site web dynamique d'apprentissage",
        description: "Création d'une plateforme complète d'apprentissage web avec module EasyPHP/MySQL/Apache pour la titularisation",
        achievements: [
          "Conception et développement d'un site web dynamique complet pour l'apprentissage des technologies web",
          "Création d'un module d'apprentissage interactif EasyPHP/MySQL/Apache avec progression pédagogique",
          "Développement d'une mémoire éducative en Flash pour la visualisation des concepts techniques",
          "Mise en place d'un forum interactif pour l'échange et l'entraide entre apprenants",
          "Création de QCM dynamiques avec système de scoring automatique et suivi des progrès",
          "Développement de l'architecture complète en PHP avec gestion des sessions utilisateurs",
          "Programmation JavaScript avancée pour l'interactivité et la validation côté client",
          "Design responsive avec CSS et HTML5 pour une expérience utilisateur optimale",
          "Intégration de contenus multimédias Flash pour l'animation des concepts complexes",
          "Base de données MySQL complète avec gestion des utilisateurs, scores et progressions",
          "Interface d'administration pour la gestion des contenus et des utilisateurs",
          "Système de notifications et de rappels pour motiver l'apprentissage",
          "Module de statistiques avancées pour le suivi pédagogique",
          "Documentation technique complète et guide utilisateur détaillé",
          "Présentation et validation du mémoire devant commission de titularisation"
        ]
      },
      {
        name: "Recherche et développement en éducation technologique",
        description: "Contribution à la recherche en pédagogie et nouvelles technologies",
        achievements: [
          "Recherche sur l'intégration des TIC dans l'enseignement supérieur",
          "Participation à des conférences et séminaires sur l'éducation technologique",
          "Publication d'articles sur les méthodes d'enseignement de l'informatique",
          "Collaboration avec des universités pour des projets de recherche pédagogique",
          "Évaluation de l'efficacité des nouvelles méthodes d'enseignement",
          "Développement d'outils d'évaluation des compétences informatiques",
          "Participation à des comités d'experts en éducation technologique",
          "Contribution à l'élaboration de standards nationaux en informatique",
          "Mentorat de jeunes enseignants-chercheurs en informatique"
        ]
      }
    ],
    technologies: ["Pascal", "C", "Turbo Pascal", "Visual Basic", "PHP", "EasyPHP", "Apache", "Windows Server", "Linux", "MS Office", "HTML", "CSS", "JavaScript", "Flash", "ActionScript", "SQL", "MySQL", "Access", "Réseaux TCP/IP", "Active Directory", "Pédagogie numérique", "Intel Teach Program", "Microsoft Learning", "Administration Système", "LMS", "E-learning", "Multimédia éducatif", "Forums Web", "QCM Dynamiques", "Sessions PHP"]
  },
  {
    id: "pfe-2006",
    company: "Faculté des sciences - Université",
    position: "Mémoire de fin d'études Master En Informatique",
    startDate: "Janvier 2006",
    endDate: "Juin 2006", 
    isCurrent: false,
    projects: [
      {
        name: "Application d'imagerie médicale DICOM Multiplateforme en Java",
        description: "Développement d'une application de traitement et visualisation d'images médicales au format DICOM dans le cadre du Master en Informatique",
        achievements: [
          "Analyse et conception d'une solution d'imagerie médicale complète",
          "Développement d'une application de visualisation et traitement d'images DICOM en Java",
          "Mise en place d'un package installable sur différentes plateformes (Windows, Linux et Mac)",
          "Implémentation d'algorithmes de traitement d'images médicales",
          "Interface utilisateur spécialisée pour le personnel médical développée avec JBuilder",
          "Intégration des standards DICOM pour l'interopérabilité",
          "Configuration multiplateforme pour assurer la compatibilité système",
          "Tests et validation avec des données médicales réelles sur tous les OS",
          "Documentation technique complète et mémoire de fin d'études",
          "Présentation et soutenance devant jury académique et professionnels de santé"
        ]
      }
    ],
    technologies: ["Java", "JBuilder", "DICOM", "Traitement d'images", "Interface graphique", "Base de données", "UML", "SQL", "Algorithmique", "Imagerie médicale", "Multiplateforme", "Windows", "Linux", "Mac"]
  },
  {
    id: "bibliotheque-2005",
    company: "Faculté des sciences - Université",
    position: "Projet de fin d'études",
    startDate: "septembre 2004",
    endDate: "Mai 2005",
    isCurrent: false,
    projects: [
      {
        name: "Application de gestion de bibliothèque de la faculté en Java",
        description: "Création d'une application complète de gestion de bibliothèque pour la faculté",
        achievements: [
          "Analyse des besoins et conception de l'architecture de l'application",
          "Développement d'une interface de gestion des livres et des emprunts",
          "Système de gestion des utilisateurs (étudiants, enseignants, personnel)",
          "Module de recherche avancée dans le catalogue",
          "Gestion des emprunts, retours et pénalités",
          "Génération de rapports statistiques sur l'utilisation de la bibliothèque",
          "Interface d'administration pour la gestion du fonds documentaire",
          "Tests et déploiement de l'application dans l'environnement de production"
        ]
      }
    ],
    technologies: ["Java", "SQL", "Base de données", "Interface graphique", "UML", "Conception", "Gestion de projet"]
  }
  // Autres missions commentées
  /*
  {
    id: "mayar-2010",
    company: "MAYAR-INFO",
    position: "Développeur Web / Java-JEE",
    startDate: "Juin 2010",
    endDate: "Janvier 2015",
    isCurrent: false,
    projects: [
      {
        name: "Applications de gestion de fournisseurs",
        description: "MVP et refonte d'applications de gestion pour diverses entreprises",
        achievements: [
          "Réalisation de plusieurs MVP et refonte d'applications de gestion de fournisseurs",
          "Conception et développement des applications de gestion des factures, commandes, fournisseurs et clients",
          "Mise en place des bonnes pratiques de développement des services web REST",
          "Développement de services web REST (Java 8, Spring, Spring security, spring-boot, Hibernate)"
        ]
      },
      {
        name: "Application de gestion et monitoring",
        description: "Application pour la gestion de la configuration et de monitoring",
        achievements: [
          "Application pour la gestion de la configuration et de monitoring",
          "Réalisation des tests unitaires et des tests d'intégration (Junit, Spring-test)",
          "Réalisation d'un module de traitements par lots (batch) (Spring-batch, Spring-boot)",
          "Mise en place de Hibernate Envers pour reconstituer l'historique des dossiers techniques"
        ]
      },
      {
        name: "MPS - Application Monoprix Market",
        description: "Application et point de vente monoprix market",
        achievements: [
          "MPS : Application et point de vente monoprix market",
          "Développement des applications de vente et de gestion de stock",
          "Interface utilisateur optimisée pour les points de vente",
          "Intégration des systèmes de paiement et de caisse"
        ]
      },
      {
        name: "POSF - Application Familia",
        description: "Application et point de vente Familia",
        achievements: [
          "POSF : Application et point de vente Familia",
          "Développement des sites et des Applications web",
          "Gestion des stocks et des produits",
          "Interface de caisse et de gestion des ventes"
        ]
      },
      {
        name: "Application d'audit accessibilité web",
        description: "Application pour l'audit de l'accessibilité numérique du contenu web",
        achievements: [
          "Application pour l'audit de l'accessibilité numérique du contenu web",
          "Analyse automatisée de la conformité WCAG",
          "Génération de rapports d'audit détaillés",
          "Interface de suivi des corrections"
        ]
      },
      {
        name: "Système de gestion d'aides à l'innovation",
        description: "Système de gestion des dossiers d'aides à l'innovation",
        achievements: [
          "Système de gestion des dossiers d'aides à l'innovation",
          "Site pour les demandes de financements des projets innovants",
          "Workflow de validation des dossiers",
          "Suivi des projets et reporting"
        ]
      }
    ],
    technologies: ["Windows", "Tomcat", "Jetty", "Spring-boot", "Spring-batch", "Java 8/11/12", "SoapUI", "Junit 5", "JPA", "Applet", "Bootstrap", "PHP", "JavaScript", "HTML5", "CSS3", "Hibernate 5.2", "Nexus", "ehcache", "Spring", "Spring Security", "REST", "JSON", "Maven", "Swagger", "JWT", "OIDC", "Keycloak", "Snort", "LDAP", "RabbitMQ", "TCP/IP", "SSH", "FTP", "VPN", "Git", "GitLab", "SonarQube", "Jenkins", "GitHub", "Cassandra", "PostgreSQL", "NoSQL", "CI/CD", "Angular", "Karma"]
  }
  */
];

export const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: "OpenStack", level: 95, category: "cloud" },
  { name: "AWS", level: 90, category: "cloud" },
  { name: "GCP", level: 90, category: "cloud" },
  { name: "Azure", level: 90, category: "cloud" },
  { name: "NUBO (Cloud Privé)", level: 95, category: "cloud" },
  { name: "OVH Cloud", level: 85, category: "cloud" },
  { name: "Hetzner Cloud", level: 85, category: "cloud" },
  { name: "DigitalOcean", level: 90, category: "cloud" },
  { name: "IONOS (1and1)", level: 85, category: "cloud" },
  { name: "Alibaba Cloud", level: 80, category: "cloud" },
  { name: "FinOps", level: 85, category: "cloud" },
  { name: "SysOps", level: 90, category: "cloud" },

  // DevOps & Automation
  { name: "Ansible", level: 95, category: "devops" },
  { name: "Terraform", level: 90, category: "devops" },
  { name: "Jenkins", level: 90, category: "devops" },
  { name: "GitLab CI/CD", level: 95, category: "devops" },
  { name: "Bitbucket Pipelines", level: 85, category: "devops" },
  { name: "Chef", level: 75, category: "devops" },
  { name: "Puppet", level: 70, category: "devops" },
  { name: "Vagrant", level: 85, category: "devops" },
  { name: "Packer", level: 80, category: "devops" },

  // Containers & Orchestration
  { name: "Docker", level: 95, category: "containers" },
  { name: "Docker Compose", level: 95, category: "containers" },
  { name: "Docker Swarm", level: 90, category: "containers" },
  { name: "Kubernetes", level: 95, category: "containers" },
  { name: "Podman", level: 85, category: "containers" },
  { name: "OpenShift", level: 80, category: "containers" },
  { name: "Helm", level: 90, category: "containers" },
  { name: "Lens", level: 85, category: "containers" },

  // Monitoring & Observability
  { name: "Prometheus", level: 95, category: "monitoring" },
  { name: "Grafana", level: 95, category: "monitoring" },
  { name: "ELK Stack", level: 90, category: "monitoring" },
  { name: "Loki", level: 85, category: "monitoring" },
  { name: "Promtail", level: 85, category: "monitoring" },
  { name: "Victoria Metrics", level: 80, category: "monitoring" },
  { name: "Nagios", level: 85, category: "monitoring" },
  { name: "Zabbix", level: 80, category: "monitoring" },
  { name: "cAdvisor", level: 85, category: "monitoring" },
  { name: "Node Exporter", level: 90, category: "monitoring" },
  { name: "Blackbox Exporter", level: 85, category: "monitoring" },
  { name: "HAProxy Exporter", level: 85, category: "monitoring" },

  // Security & DevSecOps
  { name: "Vault", level: 90, category: "security" },
  { name: "Barbican", level: 85, category: "security" },
  { name: "Trivy", level: 85, category: "security" },
  { name: "Snyk", level: 80, category: "security" },
  { name: "Checkov", level: 80, category: "security" },
  { name: "Semgrep", level: 75, category: "security" },
  { name: "SIFT", level: 75, category: "security" },
  { name: "Grype", level: 80, category: "security" },
  { name: "Nuclei", level: 75, category: "security" },
  { name: "Steampipe", level: 70, category: "security" },
  { name: "ZAP", level: 85, category: "security" },
  { name: "Snort", level: 85, category: "security" },
  { name: "pfSense", level: 85, category: "security" },
  { name: "Checkmarx", level: 75, category: "security" },

  // Atlassian Suite
  { name: "Jira", level: 95, category: "atlassian" },
  { name: "Confluence", level: 95, category: "atlassian" },
  { name: "Jira Service Management", level: 90, category: "atlassian" },
  { name: "Bitbucket", level: 90, category: "atlassian" },
  { name: "EazyBI", level: 85, category: "atlassian" },
  { name: "ScriptRunner", level: 90, category: "atlassian" },
  { name: "Bamboo", level: 80, category: "atlassian" },
  { name: "Crowd", level: 75, category: "atlassian" },
  { name: "Fisheye/Crucible", level: 75, category: "atlassian" },
  { name: "Atlassian Access", level: 80, category: "atlassian" },
  { name: "Statuspage", level: 75, category: "atlassian" },
  { name: "Opsgenie", level: 80, category: "atlassian" },

  // Agile & Project Management
  { name: "Scrum", level: 95, category: "agile" },
  { name: "Kanban", level: 90, category: "agile" },
  { name: "SAFe", level: 85, category: "agile" },
  { name: "Project Management", level: 90, category: "agile" },
  { name: "Coaching Agile", level: 90, category: "agile" },
  { name: "Leadership Technique", level: 95, category: "agile" },

  // Programming & Scripting
  { name: "Python", level: 90, category: "programming" },
  { name: "Shell/Bash", level: 95, category: "programming" },
  { name: "PowerShell", level: 85, category: "programming" },
  { name: "Groovy", level: 85, category: "programming" },
  { name: "YAML", level: 95, category: "programming" },
  { name: "Java/JEE", level: 85, category: "programming" },
  { name: "JavaScript", level: 80, category: "programming" },
  { name: "PHP", level: 75, category: "programming" },

  // Databases
  { name: "PostgreSQL", level: 85, category: "databases" },
  { name: "MongoDB", level: 80, category: "databases" },
  { name: "MariaDB", level: 80, category: "databases" },
  { name: "MySQL", level: 85, category: "databases" },
  { name: "Cassandra", level: 75, category: "databases" },
  { name: "RethinkDB", level: 70, category: "databases" },
  { name: "SQLite", level: 80, category: "databases" },
  { name: "CosmosDB", level: 75, category: "databases" },

  // Test & Automatisation
  { name: "JUnit", level: 90, category: "testing" },
  { name: "Karma", level: 85, category: "testing" },
  { name: "Selenium", level: 90, category: "testing" },
  { name: "SonarQube", level: 95, category: "testing" },
  { name: "SonarCloud", level: 90, category: "testing" },
  { name: "Cypress", level: 85, category: "testing" },
  { name: "Jest", level: 85, category: "testing" },
  { name: "Spring Test", level: 85, category: "testing" },
  { name: "Mockito", level: 80, category: "testing" },
  { name: "TestNG", level: 80, category: "testing" },
  { name: "Postman", level: 90, category: "testing" },
  { name: "SoapUI", level: 85, category: "testing" },
  { name: "JMeter", level: 85, category: "testing" },
  { name: "Gatling", level: 80, category: "testing" },
  { name: "Newman", level: 75, category: "testing" },
  { name: "Robot Framework", level: 75, category: "testing" },
  { name: "Cucumber", level: 80, category: "testing" },
  { name: "TestCafe", level: 75, category: "testing" },
  { name: "Playwright", level: 80, category: "testing" },
  { name: "WebdriverIO", level: 75, category: "testing" },
  { name: "Jasmine", level: 80, category: "testing" },
  { name: "Mocha", level: 80, category: "testing" },
  { name: "Chai", level: 75, category: "testing" },
  { name: "Protractor", level: 70, category: "testing" },
  { name: "Nightwatch", level: 70, category: "testing" },

  // Networking & Infrastructure
  { name: "TCP/IP", level: 90, category: "networking" },
  { name: "VPN", level: 85, category: "networking" },
  { name: "VPC", level: 85, category: "networking" },
  { name: "Load Balancing", level: 90, category: "networking" },
  { name: "Nginx", level: 90, category: "networking" },
  { name: "HAProxy", level: 90, category: "networking" },
  { name: "LDAP", level: 85, category: "networking" },
  { name: "SSH", level: 95, category: "networking" },
  { name: "FTP", level: 85, category: "networking" },
  { name: "DNS", level: 85, category: "networking" },
  { name: "Firewall", level: 85, category: "networking" },
  { name: "IDS/IPS", level: 80, category: "networking" }
];

// Mapping des entreprises vers leurs secteurs d'activité
const companySectorMapping: { [key: string]: string } = {
  "THALES": "Défense & Sécurité",
  "GRDF": "Énergie & Services Publics", 
  "BREAKPOINT TECHNOLOGY": "Technologies & Innovation",
  "M2I - FORMATION": "Formation Professionnelle",
  "MAYAR-INFO": "Finance & Gestion",
  "Ministère de l'Éducation Secondaire et Universitaire": "Éducation Nationale",
  "Faculté des sciences - Université": "Enseignement Supérieur & Recherche"
};

// Calcul dynamique des statistiques
const calculateStats = () => {
  const totalProjects = experiences.reduce((total, exp) => total + exp.projects.length, 0);

  // Comptage dynamique des domaines de technologies basé sur les vraies catégories des compétences
  const uniqueCategories = new Set(skills.map(skill => skill.category));
  
  // Comptage dynamique des secteurs basé uniquement sur les expériences réelles
  const dynamicSectors = new Set(
    experiences.map(exp => companySectorMapping[exp.company] || "Autres Technologies")
  );

  return [
    { value: `${calculateYearsOfExperience()}+`, label: "Années d'Expérience" },
    { value: `${totalProjects}+`, label: "Projets Réalisés" },
    { value: `${uniqueCategories.size}+`, label: "Domaines de Technologies Maîtrisées" },
    { value: `${dynamicSectors.size}+`, label: "Secteurs d'Activité" }
  ];
};

export const stats = calculateStats();

// Export des statistiques du site pour HeroSection
export const siteStats = {
  totalVisitors: 0,
  currentConnected: 0,
  createdAt: new Date().toISOString()
};