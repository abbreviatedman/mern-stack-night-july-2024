# AWS: Serverless Development

---

## Objectives:

- Getting started with serverless
- Writing Lambda functions
- Managing Serverless Applications
- Testing and Debugging Serverless Applications

---

## In this Course

In this course, we’ll focus on how the developer’s role changes when writing serverless applications, and we’ll look at that from two primary perspectives:

1. **Writing Code**

   - System architecture
   - Design patterns
   - Frameworks and libraries

2. **Managing Code**
   - Tools (IDEs, SCM, debuggers, etc.)
   - Developer workflow
   - Test/deployment automation
   - Environment management

## Intro

This is the Introduction to Serverless Development course. Today we'll talk about how to build applications for the AWS serverless platform. This course focuses specifically on the tools and practices relevant to coders, and we'll teach you about professional serverless development.

In today's course will discuss several topics about how to get started developing applications for the AWS serverless platform and how your life as a developer changes when you move from a traditional application development environment to a serverless one.

![benefits](https://i.imgur.com/5cx8lAU.png)

There are a number of benefits that our customers realize when moving to a serverless architecture, including an improved cost model for their infrastructure and the ability to scale their costs along with the usage of their application.

It also reduces the engineering effort necessary in order to build scalable and highly available applications. One of the biggest benefits that our customers realize is an improved speed of innovation and the ability to move from idea to deployed application very, very quickly.

![services](https://i.imgur.com/bxnK3Hr.png)

The AWS serverless platform is comprised of a number of different services that take care of everything from compute to api management, data persistence and messaging. In this course will be focused on the AWS Lambda service, which is a serverless compute platform that allows you to bring your own code.

![lambda](https://i.imgur.com/X1Cv8IC.png)

Now this course assumes that you're already familiar with the basics of the AWS Lambda service. But to review, AWS Lambda allows you to bring your own code and have it run in response to events. So, when an event source triggers your function, your code is run and it can interact with other downstream services such as databases and message streams.

![IAM](https://i.imgur.com/loKla9Q.png)

Now it's important to understand that the permission model for Lambda has two different components. On the front end the event sources that are allowed to trigger your Lambda function are controlled by an IAM resource policy and the resources that your function is allowed to interact with are controlled by the execution role.

So, if you were to have an Amazon S3 bucket triggering a Lambda function, which then put some data into a DynamoDB table for instance, the Amazon S3 permissions to invoke the function would be managed by the resource policy, while the DynamoDB access for your code itself would be managed by the execution role.

![consider this](https://i.imgur.com/cWOL1ki.png)

In this course we're going to cover two different primary topics. First of all, we're going to talk about how you write code for a serverless application, as well as how managing that code and the overall developer workflow changes when you move from a traditional application environment into the serverless platform.

## Writing Lambda Functions

### Writing Code for Lambda Functions

![best practices](https://i.imgur.com/RhMtkxt.png)

So, let's get started by taking a look at some of the best practices for writing code for Lambda functions. Oftentimes when developers get started with AWS Lambda, they use the AWS Management Console to write their first functions. However, when you start developing production applications, it's important to move away from that initial experimental kind of phase and start using standard application development tools and practices that you're used to.

One of the most important lessons to take away from this is that all of the best practices that you've learned about software development still apply when it comes to developing serverless applications. You should still be writing good quality, object-oriented code and build and deploy your applications using standard industry practices.

![handler](https://i.imgur.com/Tuvk0x9.png)

So, let's talk a little bit about how you might organize the code within your Lambda function. Every Lambda function has a handler method. You can think of a handler method, like a main method in a JAVA application. And remember that when you're building Lambda functions, just like it doesn't make sense to include all of the business logic and all of the code for your application into a single main method, you should also be splitting up the functionality of your Lambda functions into multiple classes and functions that are called from that primary entry point.

![handler2](https://i.imgur.com/1KZUpal.png)

A typical layout for a Lambda function might look something like this, where we divide the functionality into multiple layers. It starts with the handler function that we just talked about where you would set up your function configuration. Any of the Lambda specific code needed to integrate with the Lambda runtime should go here, but you shouldn't include any of the actual business logic for the function in the entry point itself.

![controller](https://i.imgur.com/Tn8It5n.png)

Instead, you would put that business logic into a controller class that's responsible for handling the actual event itself and doing all of the business specific functionality for that particular method.

![services](https://i.imgur.com/mjzaNoX.png)

Finally, service classes can be used to abstract away any external services that your function needs to interface with and provide business interfaces into those external services.

### Using Libraries and Frameworks

![recommendations](https://i.imgur.com/4VrblmL.png)

In addition to building your own code and writing custom functions within Lambda, it's oftentimes a good idea to include third party libraries and frameworks. When you start including external libraries and frameworks into your function, it's important to understand how that impacts the cold starts for your Lambda functions. So, this is something that's a little bit different than what you might encounter in a traditional application development environment where cold starts aren't as much of an issue.

Remember that when a Lambda function runs, each time a new execution context is created, there's a bootstrap component to that start up time for that function where the runtime itself needs to be bootstrapped, and all of the dependencies for that function have to be loaded from S3 and initialized. In order to optimize the cold starts for your function, you should consider reducing the overall size of your libraries.

So that means removing any unnecessary dependencies in your dependency graph, as well as being conscious of the overall start up time for the libraries you're using. Certain libraries like Spring within the Java context take a long time to initialize, and that time is going to impact the cold start times for your function. Also, if you're using any compiled libraries within your function, consider statically linking them instead of using dynamic link libraries.

![familiar](https://i.imgur.com/tYrZh1o.png)

It's also important to note that there are number of frameworks and libraries that you can continue to use that you might be used to using already in your traditional application and development environments. For instance, if you're already developing applications using Jersey or Spring Boot, you can use the AWS Serverless Java Container in order to migrate that code into a serverless context without having to make significant changes to your application.

Similarly, for Node.js and Python, if you're using frameworks like Express or Django, the AWS Serverless Express Framework and Zappa, respectively, can allow you to use those frameworks within a Lambda context as well.

## Knowledge Check 1

**Which of these are recommendations for structuring your Lambda functions? Select all that apply.**

1. Separate business logic from the handler method. ✅
2. Minimize the dependencies ✅
3. Don't try to continue using existing code and familiar frameworks

## Managing Serverless Applications

### Managing the developer workflow

So now that we've taken a look at some of the best practices for writing code for your Lambda function, let's talk a little bit about the overall development work flow that's necessary when you move from a traditional application environment into a serverless model.

![dev tool chain](https://i.imgur.com/0EY6K2Z.png)

Just like we talked about, the best practices for writing code when it comes to using Lambda don't really change from a traditional application development world. Also, the tool chain that you're using shouldn't have to change much, either. You should still be using standard source control, IDEs. build and deployment tools when you're building functions in Lambda as you would when you're building traditional applications.

![app framework](https://i.imgur.com/CagdXDs.png)

The one addition to that is using a serverless application framework to help manage all of the components of the application. In a traditional application, you would typically use a build tool like Maven or Gradle to create a compiled application binary that then goes and gets deployed onto a cluster of servers. In the serverless world, there's an additional step where you need to package and deploy your code out to the Lambda service, and you're probably going to be breaking your code up across multiple different Lambda functions and resources. And this is where an application framework really becomes valuable.

![fullstack](https://i.imgur.com/SNlCmzL.png)

Typically, when you're deploying a serverless application, there are a number of different steps required in order to actually move from development into a running application. This includes building the code, zipping it up, sending it to Amazon S3, managing all of the different execution roles, and IAM policies, creating the function API and other resources that are integrated to your application, and then finally updating those integrations and creating any other components that are necessary.

![template](https://i.imgur.com/KPqZEWn.png)

Now, typically, when we think about a complex process like this, we would use a tool like AWS CloudFormation to script out and declare all of the different resources that need to be created, and to help with the orchestration there.

However, with a serverless application, there are a lot of different resources that need to be created. So even to create a relatively simple API for instance, that has a single method with one function backing it and maybe a simple DynamoDB table, there are a number of different resources and configuration components that you would need to define inside of a CloudFormation template in order to get that application launched.

One of the main benefits of using an application framework such as the AWS Serverless Application Model (SAM) is that the code required to define all of those application components is dramatically simplified.

![SAM](https://i.imgur.com/1U8SYDd.png)

So now we can take a look at an example SAM template here, where we're defining a function as well as the events sources and API structure, all in a few lines of code. So, compared to the previous CloudFormation template that would've taken potentially hundreds of lines to define our application, we can now do the same thing in much, much less code. It makes it more maintainable and easier to develop and scale overall as you build larger and larger applications.

![AWS SAM CLI](https://i.imgur.com/DTZ8xEQ.png)

So, let's talk a little bit more about AWS SAM, which is an example of one of these application frameworks. AWS SAM provides a CLI that allows you to easily package and deploy your applications. The first step in packaging a new application is to run the SAM package command. That command is going to take all of the function code or compiled binaries within your application, create a zip archive that's ready to be deployed to Lambda, and upload that to Amazon S3.

It's then going to modify the template definition that you have to update the code uri from a local system path to the S3 path that's been created by the tool in the previous step. So now, instead of you being responsible for zipping and packaging this application, the tool itself is automating all of that process for you.

![deployment AWS SAM](https://i.imgur.com/R3DQuxj.png)

Once you've created a package template using the SAM CLI, it can then be deployed using the AWS CloudFormation service. So, this allows us to simplify the overall deployment process we looked at previously to two simple CLI commands. And now we can manage our application deployment across multiple accounts and environments easily and repeatably in order to provide an automated deployment mechanism.

![other options](https://i.imgur.com/um7r5d1.png)

Now, we've talked specifically about the AWS Serverless Application Model, which is one example of these application frameworks. However, you should be aware that there are a number of other framework options out there in the community. We've listed a few here, but there are new ones coming out every day, and you should definitely take a look at your specific application needs and which one fits best for you.

## Knowledge Check 2

**Which of these are recommendations for managing serverless applications? Select all that apply.**

1. Using a serverless framework. ✅
2. Switch your development tool chain to use source control and IDE tools developed specifically for serverless applications.
3. Use a SAM template to deploy your serverless application rather than creating a template in AWS CloudFormation. ✅

### Organize your code repository

![functions per repo](https://i.imgur.com/JepTuNT.png)

So now that we have a good mechanism for packaging and deploying applications, let's talk about how you should be organizing your application code into a source code repository. Oftentimes customers struggle to decide how many functions should live within a single repository. On the one hand, you could put a single function inside of an individual repository and create a new repository for every single individual Lambda function that you create. Or you could put all of the functions that you build into a single source code repository. However, both of these options have drawbacks and really require a different mindset when you're thinking about how to organize the repositories.

![focus on services](https://i.imgur.com/41hCTie.png)

Instead of being focused on individual functions, think about how your application is divided into services. A service should be comprised of one or more functions, along with all of the other AWS services, and resources necessary for that particular piece of functionality to work.

![focus](https://i.imgur.com/Mz3tsrg.png)

Each of those services can then be defined in an individual template and stored in a single repository. This way you have a separate repository for every service but still have multiple Lambda functions in each one of your repositories.

Every codebase is unique, but you will probably have multiple Lambda functions as well as other AWS resources per service. Give each service its own template, and use one repository per service and template.

## Knowledge Check 3

**Which of these are recommendations for organizing your code repository for serverless applications? Select all that apply.**

1. Put each function into it's own repository
2. Store all of your Lambda functions into a repository that is only used for Lambda functions
3. Organize your functions into services, and give each service one deployment template and one code repository ✅

`Although you may have multiple functions per service, a good organizational rule of thumb is to have one template per service and one code repository per template.`

### Setting up your Development Environment

Now let's talk about managing environments within the development life cycle. So as a developer, your environment is comprised of a couple of different components.

![serverless dev environment](https://i.imgur.com/X2XZknF.png)

First of all, you have a local IDE where your writing and editing code, along with the source control repository that you use to collaborate with your teammates.

Additionally, you need a deployment environment where you can run your application on the real AWS services that are going to be used in production in order to test and verify that the code that you're writing locally works the way that you expected.

![options](https://i.imgur.com/NwRzZYQ.png)

There are a couple of different ways you can approach providing developers with a dedicated sandbox environment. On the one hand, you can create separate accounts for each developer. This is typically the most flexible and provides the best isolation between developers. However, there is some overhead that you need to be aware of in terms of your ability to secure and monitor all of these different accounts. Assuming your organization already has the infrastructure in place to create and manage multiple AWS accounts effectively, this is probably the best way to go.

On the other hand, you can use a single shared development account that all developers use to deploy multiple stacks into. The nice thing about using a framework like we discussed in the previous section, is that each developer can deploy the same code multiple times, using something like AWS SAM and simply create multiple stacks within the same environment and test different versions of the code side by side.

![ci/cd](https://i.imgur.com/bU3b2TF.png)

In addition to a manual testing environment where developers can deploy and interact with their code directly, you'll also want to set up a CI/CD process to automatically build, deploy and test your code across multiple environments.

So, we recommend that you separate out your production environment from your non-prod accounts using separate AWS accounts. Now, here we have pictured a single test account, but you may have additional environments as well.

One of the really cool things about using serverless architectures is that stacks are essentially free to create because you only pay for what you use when you're running code and Lambda. It doesn't cost you anything to create a new environment and run a stack and have that available for your team to test and demo with. So, you can create as many of these different environments as you want, without impacting costs the way that you would if you were using a traditional server-based deployment model.

## Knowledge Check 4

**Which of these are recommendations for structuring your development environment for serverless?**

1. Create separate AWS accounts for each developer if you have management processes in place to handle it. ✅
2. Separate your production and non-production environments into different accounts. ✅
3. Keep costs low by minimizing how many stacks are created in your test environments.

`It is a good idea to give each developer their own AWS sandbox account if you have the infrastructure to manage those. Alternatively you could give all developers access to a single sandbox account, but use a serverless framework to simplify management of stacks and versions. With serverless it is actually a good idea to allow developers to experiment by spinning up a new stack, because there is little or no cost to that stack when it's not in use, but you do want to keep production and non-production accounts separate.`

## Testing and Debugging Serverless Applications

### Testing Serverless Applications

So now let's talk about some of the strategies you can use for testing your serverless applications. Any time that we talk about testing software systems, it's important to think about the hierarchy of different types of tests that are required.

![test hierarchy](https://i.imgur.com/mStQu81.png)

First of all, you're going to want the ability to run tests locally within your own development environment. You also want to have remote integration tests that can be run against that sandbox account that we talked about previously. And then finally having an automated pipeline that's running integration and acceptance tests against these other various environments that provide a gate for doing production deployments.

![unit testing](https://i.imgur.com/rvgJt67.png)

So, let's first talk about local testing strategies. One of the core components of a good local testing strategy is having automated unit tests. Now, if we go back to the original diagram that we talked about when discussing how to write code for Lambda, we talked about making sure that you isolate the business logic of your application from the rest of the components that are interacting with the external environment. This makes it really easy to write unit tests that don't require all of the additional infrastructure that Lambda provides. So, if you separate out your business logic into separate controller classes, you can now write automated tests against that interface without needing to bootstrap the entire Lambda run time.

Now, any time we talk about unit testing, you're going to need a strategy for how to mock out the external services that your function is talking to in order to isolate it and be able to run a local version of that test effectively. Now there are a couple of options when it comes to how you can mock within a serverless environment.

![options](https://i.imgur.com/2fYZQ2e.png)

First of all, there are projects such as DynamoDB local and LocalStack that you can use to emulate these types of external services and other AWS APIs locally on your own box without needing any internet connectivity.

Additionally, you can build out custom mocks, and we have several customers that do this. This is a fairly expensive route to go and requires a lot of development effort on your part in order to build these custom mocking solutions. But it does allow you to effectively test Lambda functions chained together through multiple services.

So, if you have one Lambda function that creates an object on S3, for example, and that object creation then triggers another function downstream, testing that interaction between those two functions can be a little bit challenging when trying to do that locally. Creating a custom mocking framework allows you to stitch those different functions together and see how your system behaves in its entirety.

The last option is don't mock. When developing applications in a cloud environment, it's okay if you require an internet connection for developers to do their work. Typically speaking, developers are not going to be terribly effective if they don't have access to all of the other resources available on the internet anyway. So oftentimes customers find that it's very effective to write automated tests against a real version of DynamoDB or other AWS services and just have their local versions of the functions that are running in their development environments hit the cloud resource as they normally would in production.

## Knowledge Check 5

**Which of these is an appropriate reason to use custom mocks?**

1. You want to lower the cost of mocking your application.
2. You are trying to test an application that relies on multiple services interacting with each other. ✅

`Custom mocks are generally more expensive to implement, but may be valuable if you meed to do testing that involves multiple services and Lambda functions connecting them.`

### Debugging Serverless Applications

So, one of the other key concepts that goes hand in hand with testing, is how do you debug your code?

![traditional](https://i.imgur.com/IvT2wL7.png)

In a traditional application environment, you've got this really nice ability to connect your IDE over a remote debugging port to an instance of your application that's running either locally or in a remote environment.

![lambda](https://i.imgur.com/ETtxB4u.png)

Unfortunately, with AWS Lambda, that's not possible anymore, because inbound connections are not allowed on arbitrary ports. Even if you could launch the application with debugging enabled and open up that port on the local Lambda instance, the service itself would block your ability to connect to it. So, running an interactive debugger where you can single step through your code against a remote Lambda process is simply not possible.

In order to enable this type of interactive debugging session, we can again turn back to the application frameworks we talked about previously. AWS SAM gives you the ability to launch a local version of your Lambda function that runs in a Docker container on your own work station. This gives you the ability to connect to it and debug in an interactive session through your IDE the same way that you would with any kind of other traditional application.

![local1](https://i.imgur.com/J5UOCxj.png)

So, when we start taking a look at what a debugging session would look like, typically what happens is you've got your IDE open with all of your code. You can make edits and changes to that code. Any of those changes that you make locally, you're going to get automatically updated and reflected in the version that’s running within SAM CLI.

![local2](https://i.imgur.com/3ESFP22.png)

And then you can make requests via something like a front end that's running in a browser or other automated unit tests against that instance of your application running locally, and connect your IDE debugger using all of the standard protocols and ports that you would normally in order to gain access to that remote debugging functionality that you need.

## Knowledge Check 6

**Which of these is an option for debugging your serverless applications?**

1. Connect to Lambda remotely via an open port and debug your code via your IDE debugger
2. Use your IDE debugger on the Docker container provided by SAM CLI ✅
