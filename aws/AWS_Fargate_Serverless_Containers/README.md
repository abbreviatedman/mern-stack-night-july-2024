# AWS: Fargate Serverless Containers

---

## Objectives:

- Main drivers to build AWS Fargate
- Working with AWS Fargate

---

Our clients & the developer community in general love containers, they enable them to build sophisticated micro services & cloud-native applications. With many containers, it's more than just the basics. It's more than just making those containers, it's making them on an EC2 instance, and hoping for the best. It's about more. It's how many of them you've got running, where they are running? How much resources are they utilizing? How do you deploy and manage them? How do you scale them? When I say I want a minimum of 2 and a maximum of 20, how do you have something that keeps track on when you need 2 vs when you need 20? What if you're running out of resources, but you still need to add additional containers to meet the demand of the load? This is when people turn to things like orchestration tools because they are helping to manage all the processes that I just mentioned:

![Orchestration_tools](https://i.imgur.com/w7o1G7h.png)

That is the main reason AWS built elastic containers several years ago to help our customers to run containers at a large scale. Indeed, it became a real powerful tool to do that. With it's cluster manager tool maintains the desired state for the cluster

![ECS](https://i.imgur.com/gmZeobC.png)

Today, we are going to focus on AWS Fargate, and it's as close as you can get to containers on demand.

![Fargate](https://i.imgur.com/XSV5a8o.png)

With Fargate, you don't have to worry about the underlying infrastructure. Instead, you can focus on the application, and it's containers. It launches quickly, and scales smoothly.

![Sandwich](https://i.imgur.com/YukrajM.png)

![FargateConstructs](https://i.imgur.com/ZMEHy9d.png)

## Constructs When Using Fargate with Amazon ECS

This is what AWS learning services says about this:

```
You start with creating a blueprint, a recipe for your task. There, you specify the amount of resources that your task will be consuming, also other components like URLs for your images where a task should pull them from. Then, you have a cluster. Prior to AWS Fargate, a cluster was the actual cluster of capacity with the amount of hosts you need to run your containers on. Here with AWS Fargate, cluster plays a role of a logical boundary. Inside our cluster, we run our task. And a task is running an instantiation of a task definition. Each task will have 1, or up to 10 different containers. And when you have that amount, when you have something like 8 or 10, it's more like a monolith type of building an application. However if you have 1 or 2 containers and you have multiple tasks interconnected, that's where you would build solutions in sort of a 'microservices' approach. And of course, we have our service. That's what maintains the desired state of our application; adding additional containers when required, scaling out, and scaling back in when the load is low
```

![TaskDefinition](https://i.imgur.com/9IJRL4B.png)

A Task Definition is where we hold the recipe for our task. Every task definition version is an immutable document (cannot be mutated or changed). Any changes you make to a task definition will make a new version of it because the original cannot be changed, only copied. It has version control, just like Github. If you have 10 different containers in a task, each container will be running on the same host behind the scenes, meaning you can use Lubeck and the connectivity between them that is local.

## Compute

![CPU](https://i.imgur.com/a7cvF7d.png)

Let's dive deeper into the components of Compute parts of AWS Fargate. We start with specifying the compute resources within our task definition. That's the pool of resources that's going to be shared by your containers in a task. Then I slice & dice my pool across my containers, and here I have full controll of that process:

![CPU2](https://i.imgur.com/sFlZX8t.png)

If I know that my application and each of the containers need a particular amount of resources, I can do this here for my containers. In the image example, I define just 25% of compute resources to my front-end, because I know it doesn't do much computation. For the back-end, I give the rest.

![MemoryConfig](https://i.imgur.com/NlqK92K.png)

In Fargate, we have around 50 different combinations for resources. You should keep in mind that specifying those resources directly affects the cost of running a task, because the pricing concept of AWS works in 2 dimensions.

1. Amount of resources that you specify for your task
2. Amount of time that your task is running (1 second granularity, 1 minute of cost minimum)

## Networking

**VPC Integration**: Every task, when you place it in a subnet, gets it's own Elastic Network Interface (ENI). It moves the network mapping all the way down to a task, you can do everything you've been able to do with standard ENIs for EC2 instances. For example, connect through private networks to your resources in your AWS environment (connecting to a database, or pushing some data into a tree service through VPC endpoints).

![VPC](https://i.imgur.com/BmX6ayi.png)

If you feel that you need external connections to your task, you always have the option to assign public IPs to your task. You can also configure security groups to control inbound & outbound traffic.

![](https://i.imgur.com/cqQ64ie.png)

## Storage

Amazon EBS backed Ephemeral storage provided in the form of:

1. Writable Layer Storage
2. Volume Storage

Every container has it's own writeable layer on top. In order to provide that layer for each of our containers inside a task, we have a pool of 10GB and it will be shared across all containers.

![LayerStorage](https://i.imgur.com/3R2exE4.png)

The important thing is that the Writes are not visible across containers. If you feel you need to share some data across containers:

![VolumeStorage](https://i.imgur.com/FSZ8APh.png)

## IAM Permissions

![PermissionTiers](https://i.imgur.com/Az36rml.png)

**Housekeeping Permissions**:

- We need certain permissions in your account to bootstrap your task and keep it running.

- **Execution Role** gives us permissions for:
- > ECR Image Pull
- > Pushing CloudWatch Logs

- **ECS Service Linked Role** gives us permissions for:
- > ENI Management
- > ELB Target Registration/Deregistration

## Visibility & Monitoring

![CloudWatch Logs Config](https://i.imgur.com/B3W1A96.png)

Other Visibility Tools:

- CloudWatch Events on task state changes
- Service CPU/memory utilization metrics available in CloudWatch

## Task Metadata

- Query environmental data and statistics for running tasks from _within the Task_! Enables monitoring tools like Datadog, etc.

- Endpoints available:
- - Task level (for all containers)
- - > `169.254.170.2/v2/metadata` - Metadata JSON for Task
- - > `169.254.170.2/v2/stats` - Docker stats JSON for all containers in the Task

- - Container Level
- - > `169.254.170.2/v2/metadata/<container-id>`
- - > `169.254.170.2/v2/stats/<container-id>`

![Service Discovery](https://i.imgur.com/KoE5Awu.png)

![Route 53](https://i.imgur.com/LR9dOc6.png)

![ECS Schedules](https://i.imgur.com/ytjeLi7.png)

![ECS Updates](https://i.imgur.com/6MWETCK.png)

![Benefits](https://i.imgur.com/a893MaZ.png)

![Takeaways](https://i.imgur.com/5lVrqKR.png)

![Final Product](https://i.imgur.com/NNnpXc1.png)
