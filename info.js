let info = {
  name: "Manuel Di Lullo",
  logo_name: "Manuel",
  flat_picture: new URL("./src/assets/pic.jpg", import.meta.url).href,
  config: {
    use_cookies: true,
    navbar: {
      blur: false
    }
  },
  description:
    `Data & Cloud Infrastructure Architect with a strong engineering background in Cloud environments and AI/ML solutions.
Proven track record in designing, securing, and optimizing enterprise hybrid and multicloud architectures.
Adept at leading cross-functional teams to bridge the gap between cloud governance, advanced data engineering (RAG, Cloudera), and strict compliance frameworks (GDPR, Zero Trust).
Recognized for technical innovation through multiple hackathon wins and a results-driven approach to complex infrastructure scalability.`,
  links: {
    linkedin: "https://www.linkedin.com/in/manuel-di-lullo-83ba23145/",
    github: "https://github.com/manueldilullo",
    email: "mailto:manuel.dilullo99@gmail.com",
    resume: "https://manueldilullo.github.io/resume/Resume.pdf",
    angellist: ""
  },
  education: [
    {
      name: "University of Rome La Sapienza",
      place: "Rome, Italy",
      date: "Apr, 2022 - Jan, 2026",
      degree: "M.S. in Computer Science — 108/110",
      description:
        `Thesis: Agentic AI for AI Act and GDPR Compliance.
Specialized in Cloud Computing, Data & Network Security, Natural Language Processing (NLP), and Biometric Computer Vision.`,
      skills: []
    },
    {
      name: "University of Rome Tor Vergata",
      place: "Rome, Italy",
      date: "Sep, 2018 - Feb, 2022",
      degree: "B.S. in Computer Science — 103/110",
      description:
        `Thesis: A framework for NLP: performance analysis for the resolution of task of Text Classification and Named Entity Recognition in distributed environment.
Advanced coursework in Software Design, Distributed Systems, Cybersecurity, and Machine Learning.`,
      skills: []
    }
  ],
  experience: [
    {
      name: "Terna SpA",
      place: "Rome, Italy",
      date: "Feb, 2026 - Present",
      position: "Cloud Infrastructure Specialist",
      description:
        `I design hybrid and multicloud architectures combining serverless and containerized services (K8S, OpenShift), and architect data platform integrations, ETL workflows and RAG pipelines for advanced data querying.
On the security side, I define Zero Trust multicloud strategies, strong authentication flows, On-Behalf-Of (OBO) patterns and RBAC models to keep environments compliant.
I also engineer end-to-end CI/CD pipelines in Azure DevOps to automate infrastructure provisioning, optimize cloud costs and manage vendor delivery.`,
      skills: [
        "Hybrid & Multicloud",
        "K8S / OpenShift",
        "Data Engineering / RAG",
        "Zero Trust / RBAC",
        "Azure DevOps CI/CD",
        "FinOps"
      ]
    },
    {
      name: "Storm Reply",
      place: "Rome, Italy",
      date: "Sep, 2022 - Jan, 2026",
      position: "Cloud Engineer",
      description:
        `I delivered AWS cloud solutions leveraging containers (Docker, K8S), SaaS integrations and CI/CD pipelines, building efficient and cost-effective ETL workflows with AWS Glue, Athena, SageMaker and Bedrock.
I designed networking and high-availability architectures secured through IAM, KMS encryption and strong authentication, automating infrastructure with Node.js, Python, Bash, AWS SDKs, Terraform and Terragrunt.
The role also required cloud strategy, cost optimization and stakeholder management.`,
      skills: [
        "Amazon Web Services",
        "AWS Serverless Development",
        "Cloud native AWS web application development",
        "DevOps, CI/CD automation",
        "IaC (Terraform, Terragrunt)",
        "Languages: Python, TypeScript, Bash, MySQL"
      ]
    }
  ],
  skills: [
    {
      title: "hybrid & multicloud",
      info: [
        "AWS",
        "Azure",
        "Kubernetes",
        "OpenShift",
        "Hybrid Connectivity (VPN / Direct Connect)"
      ],
      icon: "fas fa-cloud"
    },
    {
      title: "iac & devops",
      info: [
        "Terraform",
        "Terragrunt",
        "CloudFormation",
        "AWS CDK",
        "Azure DevOps",
        "GitHub Actions",
        "CI/CD Pipelines",
        "Bash"
      ],
      icon: "fas fa-tools"
    },
    {
      title: "data & ai engineering",
      info: [
        "Cloudera",
        "Spark",
        "Hadoop",
        "Python",
        "Pandas",
        "SQL (PostgreSQL, MySQL)",
        "NoSQL (MongoDB)",
        "RAG"
      ],
      icon: "fa fa-cubes"
    },
    {
      title: "security & governance",
      info: [
        "IAM",
        "Zero Trust Architecture",
        "RBAC",
        "Encryption",
        "Cloud Compliance (GDPR, ISO)",
        "FinOps & Cost Optimization"
      ],
      icon: "fas fa-shield-alt"
    },
    {
      title: "programming & automation",
      info: [
        "Node.js",
        "Python",
        "Bash",
        "AWS SDKs",
        "TypeScript",
        "MySQL"
      ],
      icon: "fa fa-code"
    },
    {
      title: "languages",
      info: [
        "Italian (Native)",
        "English (CAE Certified)"
      ],
      icon: "fa fa-globe"
    }
  ],
  portfolio: [
    {
      name: "Bachelor's degree Thesis",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/BachelorsThesis/apachespark.jpg", import.meta.url).href
        }
      ],
      technologies: ["Python", "Spark", "SparkNLP", "Hadoop", "LaTeX"],
      category: "bachelor's degree",
      github: "https://github.com/manueldilullo/BachelorsThesis",
      description:
        `Thesis for Bachelor's degree in Computer Science. Experimental analysis of Spark NLP in distributed environment.
Thesis written by Manuel Di Lullo for the bachelor's degree in Computer Science at the University of Rome Tor Vergata.
It describes an experimental evaluation of a solution for tasks of Named Entity Recognition and Text Classification using Spark NLP in a distributed environment alongside Apache Hadoop and Apache Spark. The contents are in Italian.`
    },
    {
      name: "Did you Play?",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/Dup/dup.png", import.meta.url).href
        }
      ],
      technologies: ["Java", "Android", "SQLite"],
      category: "Android App",
      github: "https://github.com/manueldilullo/Did-you-play",
      date: "July 2021",
      description:
        `School project for the Android development using Java course.
Have you played with all the games in your list? Are you waiting for a new videogame and you absolutely don't want to miss it on day one?
Did you play a game but you don't remember its name? Did you play? helps you solve all the classic problems that plague the average gamer!`
    },
    {
      name: "ElysiumDB",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/Elysium/elysium.jpg", import.meta.url).href
        }
      ],
      technologies: ["MySQL", "MongoDB"],
      category: "High School thesis",
      github: "https://github.com/manueldilullo/ElysiumDB",
      date: "July, 2020",
      description:
        `Project developed for Database and knowledge at University of Rome Tor Vergata in 2020.
The project involves the implementation of a database for the management of records of a generic MMORPG video game called Elysium.
Includes: description, requirements analysis, development with MySQL query examples, user management, store procedures, events, transactions, triggers.
Is also present the version in MongoDB with comparison between the two technologies. The content is in Italian.`
    },
    {
      name: "Albion Loot Splitter",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/AlbionLootSplitter/albiononline.jpg", import.meta.url).href
        }
      ],
      technologies: ["JavaScript", "CSS", "HTML", "PHP"],
      category: "Database design and implementation",
      github: "https://github.com/manueldilullo/AlbionLootSplitter",
      date: "Oct, 2019",
      description:
        `Playing Albion Online, often happens that multiple players complete a dungeon and gains various objects called 'Loot'.
This loot can be sold to various markets scattered throughout the game world and the profit can be divided among the raid participants.
This operation isn't trivial if it's done manually: here comes Albion Loot Splitter.
This application allows a player to select the objects obtained during a raid and the names of the raid's participants; with this informations, the backend will split the loot's profit among them in the most impartial way.`
    },
    {
      name: "Virus and Vaccines",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/VirusVaccines/virus_vaccines.jpg", import.meta.url).href
        }
      ],
      technologies: ["Java", "Android"],
      category: "1 Day hackathon project",
      github: "https://github.com/manueldilullo/Virus-and-Vaccines",
      date: "Oct, 2021",
      description:
        `Android application for SpaceApps 2021 Hackathon developed by Latitude team!
With V&V, you can build your character simply adding to it what you are taking with you to fight Covid-19: masks, sanitizer, vaccine.
When you put on a mask, annotate it in V&V, the app will track the period of validity of it.
When you put on the equipment, your player will gain boosts in his statistics, use them to bring your country on the top of the world!`
    },
    {
      name: "Image2Pdf",
      pictures: [
        {
          img: new URL("./src/assets/portfolio/Image2Pdf/img2pdf.png", import.meta.url).href
        }
      ],
      technologies: ["Python", "Pillow"],
      category: "Script",
      github: "https://github.com/manueldilullo/image_to_pdf",
      date: "Nov, 2020",
      description:
        `Simply converter from png to pdf and vice versa.
With this script you can choose if create a pdf using a set of images or to split a pdf in pages and save them as images.`
    }
  ]
};

export default info;
