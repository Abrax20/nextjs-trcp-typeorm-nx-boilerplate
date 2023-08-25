# Sprindt 

<a alt="Nx logo" href="https://sprindt.com" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/f1ts0rw/Screenshot-2023-08-25-at-13-42-57.png" width="240"></a>

✨ **Sprindt is powered by [Nx](https://nx.dev), a smart, fast, and extensible build system.** ✨

Sprindt is an innovative platform designed to optimize e-commerce experiences using advanced A/B testing strategies. By leveraging the power of AI and sophisticated algorithms, Sprindt aims to enhance user engagement, conversion rates, and overall sales.

## Getting Started

### Start the app 

To start the development server run `nx serve app`. Open your browser and navigate to http://localhost:4200/. Happy coding!

### Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

### Running tasks

To execute tasks with Nx use the following syntax:

`nx <target> <project> <...options>`

You can also run multiple targets:

`nx run-many -t <target1> <target2>`

..or add `-p` to filter specific projects

`nx run-many -t <target1> <target2> -p <proj1> <proj2>`

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

### Editor Integration

For a better development experience, consider using the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ, and comes with an LSP for Vim users.

### Deployment

To build the application for deployment, run `nx build demoapp`. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

### CI Setup

Nx comes with local caching already built-in (check your `nx.json`). On CI, consider:

- [Setting up remote caching](https://nx.dev/core-features/share-your-cache)
- [Distributing task execution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more about CI setup](https://nx.dev/recipes/ci)

## Tech Stack & Deployment

Sprindt's architecture is built upon a diverse set of technologies, techniques, libraries, and frameworks. This section provides an overview of the software stack and deployment strategies, including CI/CD and our chosen IaaS platform.

### **Frontend**

Sprindt's frontend is where users directly interact. It's constructed using Next.js and React, focusing on user interface display and interaction capture.

- **[Next.js](https://nextjs.org/):** A leading React framework offering server-side rendering and static website generation for React-based web apps.
- **[React](https://reactjs.org/):** A renowned JavaScript library for crafting user interfaces, especially single-page applications.
- **[Mantine UI](https://mantine.dev/):** A comprehensive React component and hooks library, emphasizing usability and accessibility.

### **Backend**

The backend of Sprindt manages tasks like processing A/B test results, user data management, and GPT API interactions. It's crafted using TypeScript and TypeORM.

- **[TypeScript](https://www.typescriptlang.org/):** A statically typed JavaScript superset introducing optional types.
- **[TypeORM](https://typeorm.io/#/):** An ORM compatible with NodeJS, TypeScript, and JavaScript.
- **[BullMQ](https://github.com/taskforcesh/bullmq):** A Node.js library for job and message handling in priority queues, backed by Redis.

### **DevOps**

DevOps ensures seamless collaboration between development and operations, focusing on cloud infrastructure setup on AWS and CI/CD pipeline establishment.

- **[Docker](https://www.docker.com/):** A platform for automating deployment, scaling, and application management.
- **[AWS](https://aws.amazon.com/):** A leading cloud services platform offering a plethora of services to aid businesses in scaling and growth.

### **Authentication**

Sprindt uses Clerk for user identity verification, ensuring secure and scalable user authentication.

- **[Clerk](https://clerk.com/):** A comprehensive authentication and user management platform, supporting social logins for enhanced UX.

### **AI Integration**

Sprindt integrates AI capabilities, utilizing the GPT AI API to analyze product pages and suggest improvements.

- **[GPT API](https://openai.com/):** An AI API for product page analysis and improvement suggestion generation.

### **Live Chat**

Sprindt offers immediate customer support through live chat, utilizing Intercom for this purpose, which also features an AI Chatbot for automatic responses.

- **[Intercom](https://www.intercom.com/):** A platform for seamless live chat experiences, including an AI Chatbot feature for automated replies.

### **Deployment**

Sprindt's deployment is managed using Flightcontrol, ensuring reliable deployment, rollbacks, and canary releases in a Kubernetes environment.

- **[Flightcontrol](https://www.flightcontrol.dev/):** A Kubernetes deployment management tool.

This tech stack is chosen for its robustness, scalability, and the team's expertise. It facilitates the rapid construction of a high-quality MVP, allowing iterative development based on user feedback and business requirements.
