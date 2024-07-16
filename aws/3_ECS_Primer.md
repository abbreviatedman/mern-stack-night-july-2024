# AWS: ECS Primer

---

## Objectives:

- Describe Amazon ECS
- Differentiate between the EC2 and Fargate launch types
- Discuss microservice architectures that integrate with other AWS services with ECS
- - Describe how to enforce security on ECS tasks

---

## Container Review:

![What is a container?](https://i.imgur.com/jtmH2Nm.png)

## Microservice Architecture Review:

![Microservice](https://i.imgur.com/KYigxav.png)

## Scalability and microarchitectures

![One host](https://i.imgur.com/g6POBnV.png)

![Multiple Hosts](https://i.imgur.com/1cPs4aP.png)

![hundreds](https://i.imgur.com/3bRphjA.png)

As you scale your cloud service, your containers will scale with them.

This is where container management platforms come in. They handle the scheduling & placement of containers, based on the underlying hardware infrastructure and the application needs. They provide integration with other services, such as networking, persistent storage, security, monitoring, etc.

Container management examples include Amazon ECS, native tools like Docker Swarm Mode, or open source platforms such as Kubernetes. The container management platform is arguable the most important choice you'll make when architecting a container based workload. Here we'll focus on Amazon ECS.

Amazon ECS is a highly scalable, high-performance service that supports docker containers. It integrates with third-party schedulers and other AWS services. You can use it to schedule placements across managed clusters.

First, container images are pulled from a registry. This can come from the Amazon Elastic Container Registry (ECR) or a third party. Next, you define your application, customizing your container images with the necessary code & resources, and then creating the appropriate configuration files to group and file your containers as either short-running tasks or long-running services within ECS. We'll use services within this example. When you're ready to bring your service online, you select 1 of 2 launch types. The Fargate launch type provides a near serverless experience, where the infrastructure supporting your containers is completely managed by AWS as a service. AWS manages the placement of your tasks on instances, and makes sure that each task has the appropriate CPU and memory.

`With Fargate, you can focus on the tasks themselves in the application architecture, without worrying about the infrastructure.`

The EC2 launch type is useful for when you want more control over the infrastructure supporting your tasks. When you're using the EC2 launch type, you're managing clusters of EC2 instances to support your containers. You define placement of containers across your clusters based on your resource needs, isolation policies, and availability requirements. This way you have more control over your environment without needing to operate your own cluster management & configuration management systems, or worry about scaling your management infrastructure. You can mix & match the 2 launch types as needed within your application. For example, you can launch services with more predictable resource requirements using EC2 and launch other services that are subject to larger swings in demand with Fargate.

## ECS components: Tasks and services

![Tasks and services](https://i.imgur.com/0DW9m2x.png)

Tasks are the atomic unit of deployment within ECS. Tasks are made up of one or more tightly coupled containers. A task can run stand-alone, or it can be a part of a service. The service is an abstraction on top of a task. A service runs a specified number of tasks and can include a load balancer, to distribute traffic across the tasks that are associated with the service. If any of your tasks should fail or stop, the service scheduler launches another instance of your task to replace it, and maintain the specified amount of tasks. So how do you decide whether to deploy tasks or services?

- Tasks are managed by the ECS **task** scheduler, and are ideal for on-demand workloads. You can run tasks once or at intervals, they're great for batch jobs, and you can use the Run Task API or even a custom `start task` command.
- For long-running applications, you want to use the ECS **service** scheduler. They automatically perform health management, scales out and scales in, is availability zone aware, and allows for groups of containers.

### Task definition

![Task Definition](https://i.imgur.com/1XV9zJ3.png)

Tasks (whether they're running as a stand-alone or as part of a service) are defined in a **task definition**. The task definition is a text file in JSON format, which describes one or more containers that together form an application. Task definitions could be thought of as a blueprint for your application. They specify a name and image used for the containers, CPU and memory requirements, container image repositories, networking ports, storage, and other meta data about the containers and the task itself. In this example, a request is made for 10 CPU units (1024 is one full vCPU), and 300 MB of memory for this container. It is exposing port 80 in the container, 80 on the host, and the container is flagged as essential for the task. Host paths are also mounted as volumes in the container itself.

![Task Definition 2 ](https://i.imgur.com/UmvKEnj.png)

Here is the second half of the task definition. This task has 2 containers running, here we identify the name, location, and required resources for the second container. Next, we mount the volume from the first container, run a shell script when launched, and mount a named volume from the host itself. Each task is an instance of a task definition, created at run time, and hosted by either an EC2 cluster or by AWS Fargate.

### Task Definition: Fargate

![Task Def Fargate](https://i.imgur.com/umkw0Gm.png)

Here's another example of a task definition, which is specifically designed to use the Fargate launch type. A couple of things are different in this task definition compared to the previous example; it specifies the Fargate launch type instead of EC2 (which would normally be the default), also CPU and memory are specified for the task as a whole instead of as resources for each individual container within the task. This makes it easier to control resource consumption at a task level. Task size fields are required for the Fargate launch type and can optionally be used for any non-windows containers using the EC2 launch type

### Task Hosting: EC2 Launch Type

![EC2 launch type](https://i.imgur.com/7hrlROQ.png)

Let's take a closer look at how tasks are hosted in ECS. When using the EC2 launch type, tasks are hosted by EC2 instances, whether they're stand-alone tasks or long-running services. EC2 instances are grouped at the clusters. Clusters are region-specific, but can span availability zones to increase resilience. Each EC2 instance in the cluster runs Docker to support the containers that make up your tasks, and also runs the ECS agent. The ECS agent is installed automatically, the agent starts & stops tasks based on requests from ECS and sends telemetry data about the instance's tasks and resource utilization to the Amazon ECS Backplane. The Backplane is the singular control plane for all of ECS. It is well scaled, robust, and fault-tolerant. An EC2 instance that's running the ECS agent, and has been registered into a cluster, is referred to as an ECS Container Instance. When you run tasks with Amazon ECS, your tasks using the EC2 launch type are placed on your active container instances. Proper placement strategies are key for maximizing efficiency and availability. This example is specific to the EC2 launch types.

`When using the Fargate launch type, it's not necessary to manage clusters of EC2 instances or task placement. Fargate manages the infrastructure for you as a service, allowing you to focus on your tasks and services.`

## Knowledge Check #1

**Which type of workload would be best to deploy as a service rather than a task?**

1. Batch Jobs
2. Long-running applications ✅
3. Lambda functions
4. None of the above

**In which task launch type is the infrastructure that supports your container completely managed by AWS as a service?**

1. Amazon ECS
2. Amazon EKS
3. Amazon EC2
4. Fargate ✅

## Task Placement Strategies

Let's talk about how ECS actually places the tasks on the container instances in the cluster when you're using the EC2 launch type.

![scenario](https://i.imgur.com/7SUvcdJ.png)

This scenario has 10 container instances. You're making a request to run some tasks or to create a service. As part of the request, you specify CPU, memory, and networking requirements. You also provide other constraints such as specific availability zone, AMI (Amazon Machine Image), or instance type. Lastly, you specify the strategy you prefer ECS to use when starting the tasks. For example, spreading across multiple instances to maximize availability, or consolidating across a smaller number of instances to improve utilization. At the end of that process, ECS identifies a set of instances that satisfies the requirements for the task you want to run, and will place those tasks across your cluster, based on the criteria specified.

![task placement](https://i.imgur.com/V6stfO1.png)

### Strategies & Constraints

Remember that each task is an instance of a task definition. The task definition specifies the resources required, in addition to the task placement information, such as placement strategies and placement constraints. Placement strategies are best effort. ECS attempts to place tasks even when the most optimal placement option isn't available. The supported **placement strategy** types are:

- **Random**: Places tasks randomly across container instances.
- **Binpack**: Places tasks based on the least available amount of CPU/memory. This minimizes the number of instances in use, and gets the most utilization out of every instance.
- **Spread**: Places tasks evenly based on a specified value, such as availability zone.

Service tasks are spreadbased on the tasks from that service. **Placement constraints** are binding, and they can prevent task placement. The supported constraints are:

- **distinctInstance**: Places each task on a different container instance.
- **memberOf**: Places tasks based on an expression, for example, group membership.

### Targeting instance type & zone

![instances](https://i.imgur.com/3pK7HA1.png)

Let's take a look at a few examples of task placement. In this first example, the task definition contains a placement constraint that targets specific instance types `t2.small` and `t2.medium`. It also excludes a specific availability zone, `us-east-1d`.

![binpack](https://i.imgur.com/NEiYgKS.png)

In this example, the task definition is using two placement strategies, spreading tasks across availability zones, and then Binpacking based on memory. The Binpack strategy gets its name from the classic bin packing problem in the physical world, where containers of different sizes must be packed into bins by using the smallest number of bins possible.

![Afinnity](https://i.imgur.com/0PuAeWm.png)

In this example, we have two task definitions, both of which are using placement constraints. The first definition requires that its tasks be placed on instances that are part of the web server group, which is a requirement for these applications to function properly. The second task definition uses a constraint to specify the opposite. It requires the scheduler to place its tasks anywhere except instances that are part of the web server group. Remember that constraints are binding. If there had been no instances in a web server group with sufficient resources available, then task placement for the first definition would have failed.

### Running a Service

![Service Definition](https://i.imgur.com/XPXtZxF.png)

Services can take advantage of the same placement strategies and constraints while maintaining the desired number of tasks. In this example service definition, the scheduler places tasks only on T2 instances, spreads those tasks across availability zones, and then Binpacks the tasks onto the fewest number of instances in each zone by memory.

### Multiple services on a cluster

![cluster](https://i.imgur.com/SzF7DtX.png)

Let's look at a couple of service examples. In this example, you have multiple services running on the same cluster. The first service is binpacking on memory, and the second service is spread across availability zones.

### Services: Distinct Instances

![distinctInstance](https://i.imgur.com/dufsZ7n.png)

Services can also use the distinct instance placement constraint to ensure landing on a specific instance type, such as GPU-accelerated instances, or instances with specific CPU and memory requirements.

## Knowledge Check #2

**Which ECS task placement strategy minimizes the number of instances in use?**

1. Binpack ✅
2. Random
3. Spread
4. Overload

**How do task placement strategies and task placement constraints effect how tasks are placed on instances?**

1. Strategies are best-effort; constraints are binding ✅
2. Strategies are binding; constraints are best-effort
3. Both are best-effort
4. Both are binding

## How does ECS integrate with other AWS services?

![Containers within AWS](https://i.imgur.com/t3cYPck.png)

One of the strengths of running container-based workloads with ECS is the tight integration with other AWS services. You can use:

- **Amazon Simple Notification** and **Simple Queue** services for decoupling
- **Classic Application** and **Network Load Balancers**
- **Route 53** for DNS and service discovery
- **IAM** (Identity and Access Management) for authentication and authorization
- **Secrets Manager** for managing encrypted passwords, credentials, tokens, and other secrets
- **API Gateway** to expose the services to the outside world
- AWS Developer Tools such as **CodePipeline** for continuous integration and continuous deployment
- **Amazon CloudWatch** for monitoring, logging, and alerting

### ECR: Elastic Container Registry

Let's take a look at some of the most common integration patterns in ECS. Earlier in the course, we briefly mentioned Amazon ECR, the Elastic Container Registry. Remember, after images are built, they are immutable. When launching a container, ECS pulls images from a public or private image registry. ECR is a fully managed, cloud-based Docker image registry that's fully integrated with Amazon ECS and the Docker CLI. ECR is scalable, highly available, and secure. Images are encrypted at rest with IAM-based access and authorization controls.

### Microservice Architecture

![Microservice Architecture](https://i.imgur.com/sZcPWXy.png)

Here's a basic microservice architecture that highlights ECS integration with other AWS services. Clients access the containerized application through DNS using Route 53, or by using API calls from a front-end application through the Amazon API gateway. A load balancer manages traffic to ECS clisters, and a database instance from Amazon RDS handles persistent data storage. Other AWS services that work here include ECR, managing the container images, IAM, handling authentication and authorization, and CloudWatch, collecting metrics.

### Service Discovery

![Service Discovery](https://i.imgur.com/Fpeqkt3.png)

ECS includes integrated service discovery. This makes it possible for an ECS service to automatically register itself with a predictable and friendly DNS name in Amazon Route 53. In this architecture, we have a number of container-powered microservices, all in their own autoscaling groups, to respond to changing loads. As services scale up or scale down in response to load or container health, ECS keeps the records in Route 53 up to date, allowing other services to look up where they need to make connections based on the state of each service.

### Continuous Deployment

![Continuous Deployment](https://i.imgur.com/SpvMMc1.png)

Here's one way of doing continuous deployment using the AWS CodeStar group of services:

1. In this environment, developers continually integrate their changes together into a main branch hosted in AWS CodeCommit.
2. AWS CodePipeline uses Cloudwatch events to detect changes in your CodeCommit source repository and triggers an execution of the CD pipeline when a new revision is found.
3. CodePipeline sends the new revisions to AWS CodeBuild, which builds a Docker container image from the source code.
4. CodeBuild then pushes the newly built Docker container image tagged with the build ID to an Amazon ECR repository.
5. CodePipeline then initiates an update of the AWS CloudFormation stack, which defines the Amazon ECS task definition and source.
6. CloudFormation creates a new task definition revision, referencing the newly built image, and updates ECS.
7. Finally, ECS fetches the new container from ECR and replaces the old task with a new one, which completes deployment.

### Blue-Green Deployment

![Blue-Green](https://i.imgur.com/VX2k9el.png)

Blue-green deployments are used to deploy software updates with less risk by creating two separate environments, blue and green. Blue is the current running version of your application, and green is the new version that you'll deploy. This type of deployment gives you an opportunity to test features in the green environment without impacting the current running version of your application. When you're satisfied that the green version is working properly, you can reroute traffic from the old blue environment to the new green environment. By following this method you can update and roll back features with near-zero downtime. Containers can ease the adoption of blue-green deployments because they're easily packaged and behave consistently as they're moved between environments. In this example, ECS will be used for blue-green deployments with AWS CodeDeploy handling the switchover.

First, you define your ECS service and specify blue-green deployment, powered by AWS CodeDeploy, as the deployment type. The service should include an application load balancer that's configured to listen on two ports. ECS creates an application and a deployment group in AWS CodeDeploy for your service, and when a task definition for one of the tasks in the service is updated, CodeDeploy deploys the new green copy of the service, and traffic for the green service is directed to the second port, in this example, port 8080. If there's any problems during deployment, you can stop and roll back to the blue service with no impact to users. Once deployment is complete, you can perform automated or manual testing on the green service. When the green service has been validated, the deployment is completed by swapping the listener rules on the application load balancer and sending user traffic to the green service.

### Service autoscaling: CloudWatch

![auto-scaling](https://i.imgur.com/Kamj6sO.png)

You can configure ECS to use service autoscaling to adjust its desired count up or down in response to CloudWatch alarms. ECS publishes CloudWatch metrics with your service's average CPU and memory usage. You can use these service utilization metrics to scale your service out to deal with high demand at peak times, and to scale your service in to reduce costs during periods of low utilization.

## Knowledge Check #3

**Which AWS service facilitates service discovery through DNS in a microservices architecture?**

1. SNS
2. API Gateway
3. CloudWatch
4. Route 53 ✅

## How is security enforced in ECS tasks?

### Access Management: IAM Roles

![IAM roles](https://i.imgur.com/8pCPR1V.png)

Each task can have its own IAM role, providing granular permissions for service access. In this example, Task A has been granted access to data in a DynamoDB table. A new task, Task B, needs to access data in an S3 bucket. To allow this, you create a policy in IAM that grants permission to retrieve objects from a specific S3 bucket, and then you create a role in IAM with this policy attached. The IAM role you created is added to the task definition for Task B, allowing any instance of that task to retrieve objects from the S3 bucket. Task B does not have permission to access data in Amazon DynamoDB, and Task A does not have permission to access the S3 bucket unless you specifically attach the appropriate policy to the role assigned to Task A.

### Managing Secrets

![Shhh](https://i.imgur.com/q1YMb3Q.png)

Tasks can also retrieve secrets from the Parameter Store, which is integrated with Secrets Manager. Secrets Manager helps you organize and manage important configuration data, such as credentials, passwords, and license keys. By using Parameter Store to reference Secrets Manager secrets, you create a consistent secure process for calling and using secrets and reference data in your code and configuration scripts. Parameter Store functions as a pass-through service for references to Secrets Manager secrets. No data or metadata about secrets is retained in the Parameter Store. The reference is stateless. Secrets Manager encrypts the protected text of the secret by using the AWS Key Management Service, or KMS, a key storage and encryption service that's used by many AWS services. This helps ensure that your secret is securely encrypted when it's at rest. You can attach IAM policies to a role that grants or denies access to specific secrets and restrict what can be done with those secrets. In this example, granting read-only permission to the one secret that Task B needs to run. Alternatively, you can attach a policy directly to the secret to grant permissions that specify who's allowed to read or modify the secret and its versions. There are many other uses for Secrets Manager in ECS. For example, accessing the secure credentials to a private registry that contains the container image that you want to pull.

### Daemon Scheduling Strategy

![Scheduling Strategy](https://i.imgur.com/tsorota.png)

All of the examples of scheduling services we've look at so far use the replica scheduling strategy. This strategy places and maintains the desired number of tasks across your cluster based on the task placement strategies and constraints that you specify. When using the EC2 launch type, you can also use the daemon scheduling strategy. Daemon scheduling deploys exactly one task on each active container instance that meets all of the task placement constraints specified in your cluster. This is useful to provide common supporting functionality, such as logging, monitoring, or backups for the tasks running your application code. This scheduling strategy automatically tracks the changes in the cluster and deploys the required daemon tasks when new instances join the cluster. This helps you optimize for the CPU and memory required by your applications, enabling you to deploy one daemon task to support all application tasks running on each instance.

## Knowledge Check 4

**How can access to a secret in Secrets Manager be controlled?**

1. Each task can have its own IAM role with a policy attached
2. A policy can be attached directly to a secret
3. 1 & 2 ✅
4. None of the above
