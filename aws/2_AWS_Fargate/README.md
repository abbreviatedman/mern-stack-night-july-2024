# AWS: Fargate

---

## Objectives:

- Intro to Fargate
- Examples
- Use cases

---

AWS is "the best place to run containers". AWS has more experience operating container management services, and innovating on new capabilities in order to help customers run Docker containers at scale, than other services. You don't have to install or operate your own container management software. However, you still had to manage your underlying EC2 instances within your clusters. This includes provisioning instances, setting scaling rules & policies, and patching the underlying infrastructure.

![intro](https://i.imgur.com/o37lBfU.png)

Fargate is a new technology for deploying and managing containers. You can launch tasks with Fargate without having to manage any of the underlying infrastructure. Fargate introduces a new compute primitive that enables you to operate at the task level, enabling you to focus on the differentiating things for your business, and not the undifferentiating things like provisioning & scaling server cluster OR patching & updating those servers.

There are a few ways Fargate makes it easier to run applications using containers. This includes that you only pay for the services you use.

So what does it mean when we say "you only worry about managing apps at the container level"? To better understand this, it may help to visualize the components of the Fargate & ECS stack architecture:

![fargate1](https://i.imgur.com/uRhfIjU.png)

With both ECS & Fargate, it starts with the task definition. The customer uses the task definition to define important details about how the container should run. Within AWS, a task represents a grouping of one or more containers that makes up a customer's application. To run a task, simply use the "Start Task" API to specify a launch type. Either EC2 to run on an instance you own, or Fargate to run that task in a managed environment. When running tasks on Fargate, You no longer need to think about the underlying infrastructure, because they're all owned, operated, and managed by ASW. With Fargate, you only need to think about the application and the API's we expose to help you run these on AWS.

Fargate is easy to use, and familiar to both existing users of ECS, AWS, and new users of AWS who are just learning the basics. To that end, you can use Fargate through the AWS console (AWS CLI and ECS CLI)

![fargate2](https://i.imgur.com/NnEA7KI.png)

As well as specify Fargate as an option in your task definitions. There are just a few new commands & functions to invoke Fargate as an option in those familiar tools. Let's take a look at some examples of how this may looks:

![taskDefinition](https://i.imgur.com/X8BLHY7.png)

On the left side, we have a portion of a sample task definition. Here you can see we are allocating memory, choosing our network mode using Amazon VPC, have a section for defining placement constraints, and more. This sample task definition will launch a container image for an engine X web services into my environment. On the right, is an example CLI command to run a task using the task definition on the left side. This is using the ECS CLI. Prior to this, since there was only one launch type (EC2), we could not specify any additional options. Today, launching this task onto Fargate is as easy as utilizing the launch type argument and specifying "Fargate". You don't need to learn a new CLI, task definition, your previous knowledge carries over. When using Fargate, a few things will be different than using EC2. First, lets start with reviewing how networking works in Fargate. The first detail is how Fargate integrates with virtual private cloud (VPC)

![fargate3](https://i.imgur.com/PyC67Uj.png)

All tasks launched using Fargate run inside your defined VPC. As the user, you define which VPC, subnets, and security groups apply to that task in the task definition or at run time. Fargate enforces the configuration specified when your tasks are started. Second, is load balancing support. Fargate supports both application load balanding (ALB) and netowkr load balancing (NLB). Elastic load balancing (ELB) is not supported today with Fargate. Lastly, Fargate supports advanced task level networking. This allows elastic network interfaces to be assigned directly to running Amazon ECS tasks from the VPC subnets designated by the user. This task level elastic network interface makes it possible to assign EC2 security groups, and use standard network monitoring tools at the container level. This simplifies network configuration management, allowing you to treat each container just like an EC2 instance, with full networking features in the VPC. With Fargate, you get a secure way to run containers. Here are some of the things that make that possible:

![cluster](https://i.imgur.com/gPOMGdy.png)

First, with Fargate, AWS manages the underlying platform security and post-patch management. This maintains the doppler runtime and associated OS packages. Second, we carefully protect how running tasks can be accessed by removing the ability for anyone to connect remotely into the task that they do not own. And like ECS today, we provide task and container isolation guarantees at the cluster level.

![useCases](https://i.imgur.com/x8MYYql.png)

From a use case standpoint, Fargate applies to the broad spectrum of container use cases such as long running services, highly available work loads, containerization of monolithic applications to enable portability, and microservices & batch jobs. The server scheduling capabilities of ECS enable you to run your applications using Fargate in a highly available, multi A-Z fashion. Let's dig a little deeper into these use cases.

For instance, say you have an application that you want to break into several different core functions so that you can manage, deploy, and scale these independently. Based on traffic of front-end UI, or API server with a back-end data store. These components can each be run at separate Fargate tasks, or as a service on Fargate, and as the developer you can focus entirely on building your application, and you don't have to think about the infrastructure. Fargate automatically handles stuff for you, while ensuring tasks are placed in a highly available manner.

Secondly, say you are migrating to AWS and want to quickly move your monolithic apps to the cloud. Containerization is a great and fast way to do this, but what about the design of the underlying infrastructure to support that app in the cloud? By containerizing the app, then launching with Fargate, you can worry less about the cluster and more about the app. There are some use cases where deploying your task using the Amazon EC2 launch type makes more sense than using Fargate today. First, if you are a heavy user of EC2 Spot, or you have paid for reserved instances, you may choose to use EC2 launch type for your ECS tasks. Since Fargate is managing all the infrastructure on your behalf, and charging by the CPU & memory (seconds consumed), there is not a way today to translate that to Spot or reserved instances. Second, if the services & apps you are deploying run on Microsft Windows base containers, the EC2 launch type is still the best option for deploying. This allows you to use Windows based AMI's, and configurations in your cluster, which is not currently supported by Fargate.

![AWSContainerServicesOverview](https://i.imgur.com/TmoC68j.png)

Containers are an increasing important way for developers to package & deploy their apps, because they are lightweight and provide a lightweight & consistent portable software environment for their applications can easily run & scale anywhere. Containers can be used to build & deploy microservices, run batch jobs, form machine learning applications, and to move existing applications to the cloud.

Amazon ECS enables customers to deploy, manage, and scale container workloads on AWS. With ECS, you don't have to install or operate your home container management software, and can take advantage of deep integrations with other AWS services. ECS provides provides a native AWS API experience similar to Amazon EC2. It is designed from the ground up to work with the rest of AWS platform, and be able to easily integrate with new AWS features & capabilities.

Amazon EKS is a management service that makes it easy for you to use Kubernetes on AWS. EKS is built from unmodified upstream Kubernetes, which allows you to use existing features, plugins, and tooling you built for your Kubernetes structures. At AWS, we don't think availability is negotiable, which is why we designed EKS to designed to manage your masters for you, in a highly available way, in multiple availability zones.

Amazon ECR is a fully managed Docker container registry that makes it easy for devs to store, manage, and deploy Docker container images. ECR is integrated with Amazon ECS and EKS, simplifying your development-to-production workflow. ECR eliminates the need to operate your own container repositories, or worry about the underlying infrastructure.
