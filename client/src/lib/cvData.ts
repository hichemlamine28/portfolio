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
  category: 'cloud' | 'devops' | 'monitoring' | 'security' | 'atlassian' | 'agile' | 'containers' | 'programming' | 'databases' | 'networking';
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
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
  title: "Architect & Lead DevSecOps Cloud • Coach Agile • Expert Technique Atlassian",
  email: "hichemlamine@gmail.com",
  phone: "+33 7 52 13 96 63",
  linkedin: "https://www.linkedin.com/in/hichem-elamine/",
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
          "Fix et correction des bugs et Support continu",
          "Mise en place et mise à jour des cluster Swift",
          "Mise en place et entretien de la plateforme gitlab, registry, dépôts stello sur kubernetes",
          "Mise en place et entretien de la supervision grafana, prometheus elk et victoria metrics",
          "Documentation de l'infrastructure, des méthodes de déploiement et des incidents",
          "Préparation des DI (demande d'intervention)",
          "Support utilisateurs et correction des incidents de la prod"
        ]
      }
    ],
    technologies: ["OpenStack", "Docker", "Kubernetes", "Ansible", "Kolla", "Kolla-ansible", "Vault", "PXE", "CentOS", "Debian", "Barbican", "Neutron", "Nova", "Swift", "Keepalive", "QEMU", "Libvirt", "GitLab", "Python", "Shell", "Grafana", "Prometheus", "Alert-manager", "ELK", "Victoria Metrics"]
  },
  {
    id: "thales-2021",
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
        name: "Projet Application Blanche Java",
        description: "Application prototype de base pour les Projets des équipes GRDF",
        achievements: [
          "Accompagnement aux Mises à jour de gitlab",
          "Accompagnement aux Mise à jour de Artifactory Jfrog",
          "Écriture des pipelines sur gitlab-ci pour déployer l'application",
          "Rédaction des needs/dependencies sur Gitlab-ci",
          "Modification des config gitlab-runner et adaptation sur docker-machine pour le lancement des jobs",
          "Administration de gitlab et Artifactory (comptes/users/accès/tokens/projets/...)",
          "Review du code et application des bons pratiques",
          "Ajout des différents outils de test/qualité du code (Sonar/tokens/...)"
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
          "Mise en place d'une plateforme de supervision grafana prometheus Elasticsearch Logstach Kibana"
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
          "Mise en place de la supervision via azure monitor, azure applications insights"
        ]
      },
      {
        name: "Autres Projets (BP-Profiling, Speach, Crips, BP-Erp, BP-Monitoring, Smartocr, Difference)",
        description: "Multiples projets internes et clients avec architectures cloud diverses",
        achievements: [
          "Conception d'architectures sur Azure, GCP et AWS",
          "Gestion des coûts et facturation cloud",
          "Mise en place de pipelines CI/CD sur Jenkins, Bitbucket, GitLab",
          "Déploiement Kubernetes (AKS, GKE, EKS)",
          "Intégration de tests automatisés (Cypress, Sonar, Sentry)",
          "Configuration de monitoring (Grafana, Prometheus, ELK)",
          "Gestion de bases de données (PostgreSQL, MongoDB, CosmosDB)",
          "Workshops hebdomadaires DevOps et cloud",
          "Animation de meetings de pilotage stratégique et technique"
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
    technologies: ["Terraform", "Ansible", "Shell/Bash", "CentOS", "Ubuntu", "Vagrant", "Git", "Docker", "Docker Machine", "Docker Swarm", "Kubernetes", "Lens", "GCP", "AWS", "Azure", "Grafana", "Prometheus", "Cadvisor", "Node-exporter", "HAProxy-exporter", "Blackbox-exporter", "ELK", "Nginx", "GKE", "AKS", "EKS", "GCR", "ACR", "ECR", "CloudWatch", "VPC", "VPN", "Azure DevOps", "Azure Deploy", "Amazon S3", "Amazon Glacier", "Azure Monitor", "Azure Blob Storage", "Azure CosmosDB", "Azure SQL Database", "Azure Key Vault", "Google Cloud Monitoring", "Google Cloud Logging"]
  },
  {
    id: "mayar-2017",
    company: "MAYAR-INFO",
    position: "Ingénieur DevOps / Java/JEE / Scrum Master",
    startDate: "Novembre 2017",
    endDate: "Août 2019",
    isCurrent: false,
    projects: [
      {
        name: "Digitalisation et transformation PREDATORS",
        description: "Service streaming et migration vers cloud aws/azure/digital Ocean/1and1 (ionos)",
        achievements: [
          "Digitalisation et transformation totale de l'application PREDATORS (SERVICE STREAMING)",
          "Migration vers cloud aws/azure/digital Ocean/1and1 (ionos) pour plusieurs Sociétés",
          "Étude et Création d'une application gigantesque SBM pour un grand magasin",
          "Réunions quotidiennes agiles Scrum pour fixer les tâches et évaluer l'avancement",
          "Découpage et estimation des tâches avec méthode agile Scrum et Git",
          "Livraison hebdomadaire des stories et mise à jour quotidienne de scrum-board",
          "Conception des diverses architectures cloud gcp/azure/aws",
          "Bug fixing, Développement de nouvelles fonctionnalités et tests",
          "Tests unitaires, fonctionnels, de régression et de performances",
          "Jenkins et intégration continue / déploiement continu (CI/CD)",
          "Customisation et collecte de la trace applicative dans un puit de logs ELK, cAdvisor, logstash",
          "Communication bidirectionnelle entre API et processus Data avec Kafka",
          "Containerisation des API avec Docker, docker-compose, docker swarm, ansible, vagrant",
          "Déploiement Canarie et Blue/Green (serveur de test/serveur de production)"
        ]
      }
    ],
    technologies: ["Java/JEE", "Shell", "Angular", "AngularJS", "Bootstrap", "SpringBoot", "Agile", "Scrum", "Kanban", "Git", "Maven", "Ansible", "Docker", "Grafana", "ELK", "TCP/IP", "SSH", "VPN", "VPC", "GKE", "EKS", "AKS", "EC2", "GCR", "ACR", "ECR", "Logstash", "cAdvisor", "SonarQube", "Kubernetes", "Cloud", "GCP", "AWS", "Azure", "Promtail", "Loki", "Nagios", "Zabbix", "pfSense", "Snort", "Asterisk", "IPS", "ICS", "FTP", "Libvirt", "VMware", "Vagrant", "VirtualBox", "Packer", "Docker Machine", "Docker Swarm", "Dockerfile", "Docker Compose", "DockerHub", "Prometheus", "Grafana", "Elasticsearch", "Kibana", "Jenkins", "SonarCube", "GitHub", "Cloud-init", "Cassandra", "PostgreSQL", "NoSQL", "CI/CD", "Jira", "Kafka"]
  },
  {
    id: "mayar-2015",
    company: "MAYAR-INFO / PREDAT-S",
    position: "Administrateur Système - DevOps / Développeur Java/JEE",
    startDate: "Février 2015",
    endDate: "Novembre 2017",
    isCurrent: false,
    projects: [
      {
        name: "Conception et administration serveurs PREDATORS",
        description: "Conception, création, mise en place et administration des serveurs sharing et/ou streaming pour différentes entreprises",
        achievements: [
          "Installation, configuration et administration des serveurs sharing et/ou streaming",
          "Importation quotidienne des clés et des Stream et veillance à la stabilité des serveurs",
          "Analyse du cahier des charges et conception de l'application pour chaque client",
          "Réalisation des interfaces graphiques et la connexion entre elles",
          "Développement des fonctionnalités demandées avec découpage et estimation des tâches",
          "Utilisation de la méthode agile Scrum et Git comme outil de versioning",
          "Rapports hebdomadaires des états de serveurs et quotidiens des réclamations clients",
          "Mise en place des plateformes de supervision et de notifications (supervision proactive)"
        ]
      }
    ],
    technologies: ["XML", "SQL", "XtreamCode", "CMS", "Windows", "Linux Ubuntu", "Agile", "Scrum", "Kanban", "Git", "Shell/Bash", "PowerShell", "Ansible", "Prometheus", "Grafana", "Elasticsearch", "Logstash", "Kibana", "VMware", "QEMU/Libvirt", "TCP/IP", "Snort", "Asterisk", "pfSense", "IDS/ICS"]
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
        name: "Développement applications de gestion",
        description: "Réalisation de plusieurs MVP et applications de gestion pour diverses entreprises",
        achievements: [
          "Réalisation de plusieurs MVP et refonte d'applications de gestion de fournisseurs",
          "Application pour la gestion de la configuration et de monitoring",
          "MPS : Application et point de vente monoprix market",
          "POSF : Application et point de vente Familia",
          "Conception et développement des applications de gestion des factures, commandes, fournisseurs et clients",
          "Développement des sites, des Applications web et des applications de vente et de gestion de stock",
          "Application pour l'audit de l'accessibilité numérique du contenu web",
          "Système de gestion des dossiers d'aides à l'innovation",
          "Site pour les demandes de financements des projets innovants",
          "Mise en place des bonnes pratiques de développement des services web REST",
          "Développement de services web REST (Java 8, Spring, Spring security, spring-boot, Hibernate)",
          "Réalisation des tests unitaires et des tests d'intégration (Junit, Spring-test)",
          "Réalisation d'un module de traitements par lots (batch) (Spring-batch, Spring-boot)",
          "Mise en place de Hibernate Envers pour reconstituer l'historique des dossiers techniques"
        ]
      }
    ],
    technologies: ["Windows", "Tomcat", "Jetty", "Spring-boot", "Spring-batch", "Java 8/11/12", "SoapUI", "Junit 5", "JPA", "Applet", "Bootstrap", "PHP", "JavaScript", "HTML5", "CSS3", "Hibernate 5.2", "Nexus", "ehcache", "Spring", "Spring Security", "REST", "JSON", "Maven", "Swagger", "JWT", "OIDC", "Keycloak", "Snort", "LDAP", "RabbitMQ", "TCP/IP", "SSH", "FTP", "VPN", "Git", "GitLab", "SonarQube", "Jenkins", "GitHub", "Cassandra", "PostgreSQL", "NoSQL", "CI/CD", "Angular", "Karma"]
  },
  {
    id: "education-2006",
    company: "MINISTÈRE DE L'ÉDUCATION ET DE L'ENSEIGNEMENT SUPÉRIEUR",
    position: "Enseignant d'informatique / Master Teacher / Formateur",
    startDate: "Septembre 2006",
    endDate: "Juin 2010",
    isCurrent: false,
    projects: [
      {
        name: "Enseignement et formation informatique",
        description: "Enseignant au Lycée Secondaire (titulaire/CAPES) et à l'université",
        achievements: [
          "Enseignant au Lycée Secondaire (titulaire/CAPES)",
          "Enseignant JAVA à l'université (Multimédia/Gestion)",
          "Encadrement des Étudiants en projets de fin d'études",
          "Formateur des enseignants pour les Technologies Intel (2CI)",
          "Réalisation d'un site web proposant un module d'apprentissage de création des sites web dynamiques en PHP, MYSQL et Apache",
          "Conception, création, mise en place et administration d'un logiciel de gestion de bibliothèque en JAVA",
          "Traitement et suivi des réclamations clients",
          "Diagnostic et correction des bugs avec forum dans le site",
          "Gestion des priorités des demandes en fonction de leur criticité",
          "Des exercices d'évaluation mis à jour de façon hebdomadaire avec score",
          "Formation des nouvelles recrues"
        ]
      }
    ],
    technologies: ["JAVA", ".NET", "JavaScript", "PHP", "Shell", "XML", "Dreamweaver", "FrontPage", "MySQL", "Windows", "Linux Ubuntu", "Mandriva", "VMware", "VirtualBox", "Easy PHP", "WAMP", "Apache", "CSS"]
  }
];

export const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: "OpenStack", level: 95, category: "cloud" },
  { name: "AWS", level: 90, category: "cloud" },
  { name: "GCP", level: 90, category: "cloud" },
  { name: "Azure", level: 90, category: "cloud" },
  { name: "NUBO (Cloud Privé)", level: 95, category: "cloud" },
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

export const stats = [
  { value: `${calculateYearsOfExperience()}+`, label: "Années d'Expérience" },
  { value: "50+", label: "Projets Réalisés" },
  { value: "100+", label: "Technologies Maîtrisées" },
  { value: "10+", label: "Secteurs d'Activité" }
];
