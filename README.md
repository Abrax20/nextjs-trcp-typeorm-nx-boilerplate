# Sprindt 

<a alt="Nx logo" href="https://sprindt.com" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/f1ts0rw/Screenshot-2023-08-25-at-13-42-57.png" width="240"></a>

✨ **Sprindt is powered by [Nx](https://nx.dev), a smart, fast, and extensible build system.** ✨

Sprindt is an innovative platform designed to optimize e-commerce experiences using advanced A/B testing strategies. By leveraging the power of AI and sophisticated algorithms, Sprindt aims to enhance user engagement, conversion rates, and overall sales.

## 3. Tech Stack & Deployment

Sprindt's architecture is built upon a diverse set of technologies, techniques, libraries, and frameworks. This section provides an overview of the software stack and deployment strategies, including CI/CD and our chosen IaaS platform.

### 3.1 **Frontend**

Sprindt's frontend is where users directly interact. It's constructed using Next.js and React, focusing on user interface display and interaction capture.

- **[Next.js](https://nextjs.org/):** A leading React framework offering server-side rendering and static website generation for React-based web apps.
- **[React](https://reactjs.org/):** A renowned JavaScript library for crafting user interfaces, especially single-page applications.
- **[Mantine UI](https://mantine.dev/):** A comprehensive React component and hooks library, emphasizing usability and accessibility.

### 3.2 **Backend**

The backend of Sprindt manages tasks like processing A/B test results, user data management, and GPT API interactions. It's crafted using TypeScript and TypeORM.

- **[TypeScript](https://www.typescriptlang.org/):** A statically typed JavaScript superset introducing optional types.
- **[TypeORM](https://typeorm.io/#/):** An ORM compatible with NodeJS, TypeScript, and JavaScript.
- **[BullMQ](https://github.com/taskforcesh/bullmq):** A Node.js library for job and message handling in priority queues, backed by Redis.

### 3.3 **DevOps**

DevOps ensures seamless collaboration between development and operations, focusing on cloud infrastructure setup on AWS and CI/CD pipeline establishment.

- **[Docker](https://www.docker.com/):** A platform for automating deployment, scaling, and application management.
- **[AWS](https://aws.amazon.com/):** A leading cloud services platform offering a plethora of services to aid businesses in scaling and growth.

### 3.4 **Authentication**

Sprindt uses Clerk for user identity verification, ensuring secure and scalable user authentication.

- **[Clerk](https://clerk.com/):** A comprehensive authentication and user management platform, supporting social logins for enhanced UX.

### 3.5 **AI Integration**

Sprindt integrates AI capabilities, utilizing the GPT AI API to analyze product pages and suggest improvements.

- **[GPT API](https://openai.com/):** An AI API for product page analysis and improvement suggestion generation.

### 3.6 **Live Chat**

Sprindt offers immediate customer support through live chat, utilizing Intercom for this purpose, which also features an AI Chatbot for automatic responses.

- **[Intercom](https://www.intercom.com/):** A platform for seamless live chat experiences, including an AI Chatbot feature for automated replies.

### 3.7 **Deployment**

Sprindt's deployment is managed using Flightcontrol, ensuring reliable deployment, rollbacks, and canary releases in a Kubernetes environment.

- **[Flightcontrol](https://www.flightcontrol.dev/):** A Kubernetes deployment management tool.

This tech stack is chosen for its robustness, scalability, and the team's expertise. It facilitates the rapid construction of a high-quality MVP, allowing iterative development based on user feedback and business requirements.
