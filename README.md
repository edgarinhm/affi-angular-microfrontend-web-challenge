# Demo Microfront Angular 19 with Module Federate - Mono Repo approach (projects in one workspace)

This project uses Angular version 19.0.6 and NodeJS version 22.12.0.

We'll create the workspace.

```console
ng new affi-angular-challenge-workspace --create-application=false
```

Enter the workspace

```console
cd affi-angular-challenge-workspace
```

We will create the following projects:

## mfe-host

This project will be our microfrontend **container**.

```console
ng g application mfe-host --style=scss --routing=true
```

## mfe-auth

```console
ng g application mfe-auth --style=scss --routing=true
```

## Enabling module federation for Angular projects

The **@angular-architects/module-federation** package provides a custom generator. If you'd like to learn more about this library and Angular architecture, visit the following link:
<https://www.angulararchitects.io/en/aktuelles/the-microfrontend-revolution-module-federation-in-webpack-5/>

We add the library to each of the projects
Once the library is installed, we will add the use of Module Federation to our MF (microfrontends) and add some configurations:

```console
ng add @angular-architects/module-federation --project mfe-host --port 4200 --type host
ng add @angular-architects/module-federation --project mfe-auth --port 4201 --type remote
```

Commons lib (optional):

```console
ng g library commons-lib
```

We are require to modifiy commons lib path to add "projects" directory:

file **tsconfig.json**

```json
"paths": {
      "@commons-lib": ["./projects/commons-lib/src/public-api.ts"]
    },
```

We are require to create custom microfrontend declaration and add each remote module path name:
**projects\mfe-host\src\custom-mfe-decl.d.ts**

```javascript
declare module 'mfeAuth/*';
```

Okay, what this command will do is create some **webpack.config.js** files in each of our MFs to be able to use the module federation.

Then it's just a matter of configuring the **remote** and **host** MFs.

Example configuration for the auth MF:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe-auth',

  exposes: {
    './AuthLogin': './projects/mfe-auth/src/app/auth/components/login/login.component.ts',
    './AuthRegister': './projects/mfe-auth/src/app/auth/components/register/register.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings: ["@commons-lib"],

});
```

Example configuration for the host MF:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe-host',

  remotes: {
    mfeAuth: "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings: ["@commons-lib"],

});

```

## Azure CI/CD

This article is about using Azure Pipelines in a good way (in May 2025, because some changes can happened later) for automate the build/deploy process with the code (and some manual actions).

Here will be discussed the next topics:

- Azure App Service — host application as service on the Azure.
- Azure DevOps — some configuration stuff.
- Azure Pipelines — build and deployment configuration.

### 1. Azure App Service

#### 1.1 Azure Resource Group

To create the new resource need to go to the portal.azure.com, create the new Resource Group, create App Service Plan, App Service, all in this group. Copy the name or remember because it need to be used later in variables go specify where 

to deploy the application.

Suggestion here is to use strong naming convention for group and all resources. For some services like storage account it need to be without spaces and other special characters. So would be good to read documentation and articles on this topic.

![azure-resource-group](architecture/azure-resource-group.png)

### 2. Azure DevOps

This is the main service can be used for some of the projects to store the code and trash the work. Assumption is having the repository with the code (at least) for sample application.

#### 2.1 service connection

To use deployment functionality it need to configure the service connection to use to deploy to Azure in all the pipelines. Go to the “Project Settings” → “Service Connections”.

This is required thing that need to be done before creating the pipelines for deployment!

![azure-service-connection-1.png](architecture/azure-service-connection-1.png)

To add the new connection it need to have the Azure account, usually it Microsoft account for all services (DevOps, Azure, etc.).

To add the new need to select “New service connection” → “Azure Resource Manager”. Other ones also can be used but mostly for old and more custom things with manual configuration. Depending on the permissions you have and it may be vary configuration options.

![azure-service-connection-2.png](architecture/azure-service-connection-2.png)

### 3. Azure Pipeline

#### 3.1 Azure DevOps Environment

To deploy from Pipeline we need to configure list of environments to be used to do deployment jobs — special job type to handle environment configurations.

To create the new environment need to go to the “Project” → “Pipelines” → “Environments” and click “Create Environment” button.

![azure-environment](architecture/azure-environment.png)

The basic flow of working with pipelines:
![pipeline-workflow-diagram](architecture/pipeline-workflow-diagram.png)

There are 2 main stages:

1. Build — build the application, can run linting, tests, etc. Result here — artifacts with application to run or do deployment.
2. Deploy — place the application artifacts to hosted location.

There are different concepts inside but very short:

- pipeline can contain stages
- stages can be executed one by one
- stage can depends on previous stage(-s)
- each stage can contain jobs
- jobs can be executed in parallel
- each job can contain steps
- step is the basic operation to do (like install packages, build, publish, etc.)
- step is the task from the list of available tasks with parameters

![pipeline-components-diagram](architecture/pipeline-components-diagram.png)

To prepare pipeline need to do some steps:

1. Create the repository — in this point we already have the one.
2. Create the environments — prepare the configuration for environment definitions to deploy the application, configure them (like approvals, etc.)
3. Create the library with variable groups — to use variables in the pipeline and can be edit without code changes.
4. Create the pipeline — prepare files in the repo and select them for new pipeline.
5. Configure security — access to the library, pipeline permissions for environment to able to consume them.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
