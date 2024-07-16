# AWS: EKS Primer

---

## Objectives:

- How Amazon EKS manages the Kubernetes control plane and parts of the data plane
- How Amazon EKS integrates with other AWS services
- The cost considerations for Amazon EKS
- How to monitor applications running on Amazon EKS clusters

---

## Intro:

Kubernetes is a powerful container orchestration system that is the backbone of many microservices architectures, but it has a steep learning curve and is complex to manage. With Amazon Elastic Kubernetes Service (Amazon EKS), you can run Kubernetes on Amazon Web Services (AWS) without needing to install, operate, and maintain your own Kubernetes control plane.

### What is Amazon Elastic Kubernetes Service?

Amazon Elastic Kubernetes Service (Amazon EKS) is a managed container orchestration service that facilitates deploying, managing, and scaling Kubernetes applications in the AWS Cloud or on premises. Amazon EKS helps you provide highly available and secure clusters. Amazon EKS also helps you automate key tasks such as patching, node provisioning, and updates.

### The need for container orchestration

Containers provide a standard way to package your application's code, configurations, and dependencies into a single object. They are lightweight and provide a consistent, portable software environment for applications to run and scale anywhere. Some of the popular use cases for containers include building and deploying microservices, running batch jobs, supporting machine learning applications, and moving existing applications into the cloud. Applications running in containers require a container orchestration platform to manage and scale deployments.

![Container](https://i.imgur.com/DVkMn3V.png)

A container is a lightweight, highly portable virtualization solution that bundles an application and its dependencies into a single unit of compute.

![Production](https://i.imgur.com/fJ991pB.png)

Because containers isolate software from the other layers, their code runs identically across different environments, from development and staging all the way to production. Containers are a popular choice to power modern microservice architectures.

It's important to consider scalability when you develop your environment. Running one or two containers on a single host is simple. What happens when you move into a full production environment with hundreds of hosts and maybe thousands of containers? Container orchestration tools, or container management platforms, are used to automate the management, deployment, and scaling of containers.

Different management platforms might manage different aspects of your container system. Here are some of the main categories many of these platforms manage:

- Scheduling and placement of your containers
- Automatically scaling in or out the number of containers as appropriate
- Self-healing your services by automatically removing unhealthy containers and deploying new ones in their place
- Integration with the cloud and other services, such as networking services and persistent storage
- Security, monitoring, and logging for your system

### Benefits of Amazon EKS

- **Managed Kubernetes Service**: Amazon EKS creates and manages the Kubernetes control infrastructure for you across multiple AWS Availability Zones to eliminate a single point of failure. In addition to managing the controle plane, Amazon EKS can manage elements of the data plane (worker nodes), if you choose.

- **Tightly integrated with AWS services**: Amazon EKS is tightly integrated with other AWS services and features, such as Elastic Load Balancing for load distribution, AWS Identity and Access Management (IAM) for role-based access control, and Amazon Virtual Private Cloud (Amazon VPC) for pod networking.

- **Built with the Community**: AWS actively works with the Kubernetes community, including making contributions to the Kubernetes code base that helps Amazon EKS users take advantage of AWS services and features.

- **Conformant and Compatible**: Amazon EKS runs native, upstream Kubernetes. It is certified to be Kubernetes-conformant, so you can use all the existing plugins and tooling from the Kubernetes community. Applications running on Amazon EKS are fully compatible with applications running on any standard Kubernetes environment. You can migrate any standard Kubernetes application to Amazon EKS without needing to refactor your code.

## Knowledge Check 1

**What form of Kubernetes does Amazon Elastic Kubernetes Service (Amazon EKS) support?**

1. A proprietary AWS version of Kubernetes
2. A Kubernetes fork
3. Native, upstream Kubernetes ✅
4. Any available Kubernetes distribution

## Kubernetes Review

### Kubernetes objects

![Cluster](https://i.imgur.com/n2CI9ss.png)

**Cluster**: A set of worker machines, called nodes, that run containerized applications. Every cluster has at least one worker node. A cluster also has a controle plane that runs services that manage the cluster.

![Node](https://i.imgur.com/aYLPVFE.png)

**Node**: Kubernetes runs your workload by grouping containers into pods and assigning those pods to run on nodes. A node can be a virtual or physical machine, depending on the cluster. Each node is managed by the control plane and contains the services necessary to run pods.

![Pod](https://i.imgur.com/XGo8pnP.png)

**Pod**: A group of one or more containers. Pods are defined by a PodSpec file, a specification for how to run the containers. Pods are the basic building block within Kubernetes for deployment, scaling, and replication.

![Volume](https://i.imgur.com/n0TmW31.png)

**Ephemeral Volume**: Applications in a pod have access to shared volumes to facilitate data sharing in the pod and persistence of data across container restarts. When a pod ceases to exist, Kubernetes destroys ephemeral volumes.

**Persistent volume**: A persistent volume functions similarly to an ephemeral volume but has a lifecycle independent of any individual pod that uses them. Persistent volumes are backed by storage subsystems independent of cluster nodes.

![Service](https://i.imgur.com/EDhyqmK.png)

**Service**: In Kubernetes, a service is a logical collection of pods and a means to access them. The service is continually updated with the set of pods available, eliminating the need for pods to track other pods.

![Namespace](https://i.imgur.com/dB0ZyNk.png)

**Namespace**: A virtual cluster that is backed by the same physical cluster. Physical clusters can have resources with the same name as long as they are in different namespaces. Namespaces are especially useful when you have multiple teams or projects using the same cluster.

![ReplicaSet](https://i.imgur.com/pKChxRM.png)

**ReplicaSet**: Ensures that a specific number of pod replicas are running at any given time.

![Deployment](https://i.imgur.com/W8clQWE.png)

**Deployment**: Owns and manages ReplicaSets or individual pods. You describe a desired state in the deployment. The deployment then changes the actual state of the cluster to the desired state at a controlled rate.

![ConfigMap](https://i.imgur.com/EAxTu0M.png)

**ConfigMap**: A ConfigMap is an API object that stores nonconfidential data as key-value pairs used by other Kubernetes objects, such as pods. Use ConfigMaps to follow the best practice of portability by separating your configuration data from your application code.

**Secrets**: All confidential data, such as AWS credentials, should be stored as Kubernetes secrets. Secrets restrict access to sensitive information. Optionally, encryption can be turned on to improve security.

### Pod Scheduling

![Scheduling](https://i.imgur.com/UsF0f9C.png)

**Pod scheduling**: You can schedule pods with the Kubernetes scheduler. The scheduler checks the resources required by your pods and uses that information to influence the scheduling decision. The scheduler runs a series of filters to exclude ineligible nodes for pod placement

### Control plane & Data plane

![planes](https://i.imgur.com/eQf0gRm.png)

**Control plane**: Control plane nodes manage the worker nodes and the pods in the cluster.

The Control plane determines when tasks are scheduled, and where they are routed to. The _Control Plane Nodes_ consists of the control manager, Cloud controller, Scheduler, and API server.

- **Controller Manager**: runs background threads called _controllers_ that detect and respond to cluster events.
- **Cloud Controller**: A specific controller that interacts with the underlying cloud provider.
- **Scheduler**: selects nodes for newly created containers to run on.
- **API Server**: exposes the Kubernetes API and is the front-end for the Kubernetes control plane. It handles all communication from the cluster to the controle plane; none of the other control plane components are designed to expose remote services. The Kubernetes API server is designed to scale horizontally, deploying more instances as necessary.
- **etcd**: This is the core persistence layer for Kuberbetes. It is a highly available distributed key value store. This is where critical cluster data and state are stored.

- **Control/data plane Communication**: Communication between the control plane and worker nodes is done through the API server to kubelet.

**Data plane**: In Kubernetes, the Data plane is where the tasks are run. _Worker nodes_ host the pods that are the components of the application workload:

- **kube-proxy**: This helps with networking. It maintains network rules on the host and performs any connection forwarding that may be necessary.
- **Container runtime**: Kubernetes supports several runtimes, with Docker being the most common.
- **kubelet**: This is the primary agent that runs on the worker nodes. Kubelet makes sure that the right containers are running in a pod and that they are healthy.
- **Pods**: A pod is a group of one or more containers. The containers in the pod are always colocated, scheduled together, and managed together; you cannot split a container in a pod across nodes. Applications in a pod can easily communicate with each other. Like individual application containers, pods are considered to be relatively ephemeral (rather than durable) entities. This means that pods can disappear if they become unhealthy, and new ones can take their place.

## Custom resources

In addition to the resources that Kubernetes defines (such as pods and deployments), you can also extend the Kubernetes API and create custom resources. A custom resource could be a new object, such as a service mesh object, or it can be a combination of native Kubernetes resources. Custom resources are created with a Custom Resource Definition (CRD).

Custom resources can be controlled with custom controllers. Custom controllers run in pods on the worker nodes of your cluster. When used to automate the management of custom resources in a cluster, custom controllers are referred to as operators. It is good practice to use operators instead of manually updating your native Kubernetes objects.

## kubectl

You can communicate with your control plane nodes using kubectl. kubectl is a command line interface (CLI) for communicating with the Kubernetes API server. It provides commands to create resources, view detailed information about the cluster and resources, and access troubleshooting tools. kubectl commands are used to roll out, scale, and automatically scale resources.

Syntax:

`kubectl [command] [TYPE] [NAME] [flags]`

- **Command**: Specifies the operation you are performing.
- **Type**: Specifies the resource type.
- **Name**: Specifies the name of the resource.
- **Flag\***: Specifies optional flags

## Knowledge Check 2

**What is the basic unit of deployment in Kubernetes?**

1. Containers
2. Pods ✅
3. Tasks
4. ReplicaSet

**What is a Kubernetes service?**

1. Logical collection of pods and a means to access them ✅
2. Logical collection of pods and a means to schedule them
3. Tooling that ensures that all (or some) nodes run a copy of a pod
4. Tooling that maintains a stable set of replica pods running at any given time

## Amazon EKS control plane

### Amazon EKS manages the Kubernetes control plane

![Amazon EKS taking over the Kubernetes control plane](https://i.imgur.com/ZLtIKHZ.png)

In a standard Kubernetes deployment, you are responsible for designing, implementing, and maintaining all components of the control plane and the worker nodes.

Amazon EKS provides a scalable, highly available control plane. Amazon EKS automatically manages the availability and scalability of the Kubernetes API servers and the etcd persistence layer for each cluster.

This gives you more time to focus on running your application workloads in Kubernetes.

### Amazon EKS availability and API

The Amazon EKS control plane consists of at least two API server nodes and three etcd nodes across three Availability Zones. Amazon EKS automatically detects and replaces unhealthy control plane nodes, which removes a significant operational burden for running Kubernetes. With this capability, you can focus on building your applications instead of managing AWS infrastructure.

To get started with Amazon EKS, you provision your cluster of worker nodes. Amazon EKS handles the provisioning, scaling, and management of the Kubernetes control plane in a highly available and secure configuration. You then connect to the Amazon EKS cluster using the graphical or command line interface. After you’ve connected to the Amazon EKS cluster, you’re ready to deploy your Kubernetes applications to your Amazon EKS cluster. You can do this the same way that you would with any other Kubernetes environment.

![](https://i.imgur.com/n0zQm3A.png)

Amazon EKS manages the Kubernetes control plane with the Amazon EKS API. You can use one of two CLIs to interact with the Amazon EKS API: Amazon EKS CLI or eksctl. With the eksctl command line utility, developed by Weaveworks, you can create and manage Kubernetes clusters on Amazon EKS. The eksctl utility uses AWS CloudFormation in the background to build clusters based on the options you specify. You will learn the details of how to provision a cluster later in this course.

### Review: Whose API am I using?

Working with two separate APIs and their respective tools adds complexity to managing your environment when getting started with Amazon EKS. Asking yourself the question, "Is this object directly controlled by Amazon EKS?" simplifies the next step to take. If the answer is yes, then use the Amazon EKS API to manage that object. For all other objects, use the Kubernetes API.

![Amazon EKS API](https://i.imgur.com/Y5TPgGL.png)

![Kubernetes API](https://i.imgur.com/I2QTBaD.png)

## Knowledge Check 3

**Which components are always managed by Amazon Elastic Kubernetes Service (Amazon EKS)?**

1. The Kubernetes control plane ✅
2. The Kubernetes data plane
3. Kubernetes containers
4. Auto Scaling Groups

## Amazon EKS data plane

Why have Amazon EKS manage your data plane?

Managing a complex infrastructure of many worker nodes and worrying about automatic scaling and updates is challenging. Additionally, you may have many different teams provisioning nodes in a cluster, and they might all be doing it differently. These differences make standardization difficult. By allowing Amazon EKS to manage some or all of your data plane, you can simplify your infrastructure and maintain standardization.

![something something worry less about the infrastructure](https://i.imgur.com/2lWEdNd.png)

### Self-Managed Nodes

Only the control plane is managed by Amazon EKS. You completely control and manage your data plane nodes (including provisioning, updating, monitoring, and other tasks).

### Managed Node Groups

Managed node groups use the Amazon EKS API to start and manage the Amazon Elastic Compute Cloud (Amazon EC2) instances that run containers for an Amazon EKS cluster. Although the managed node groups are started and managed for you, you can still see all the resources being used in your AWS account, such as EC2 instances and Auto Scaling groups. You still get all of the control, security, and visibility, with less work.

- **Provisioning** – With one command, deploy a managed node group. Amazon EKS then creates nodes using the latest Amazon EKS optimized Amazon Machine Images (AMIs). The AWS service deploys them into multiple Availability Zones and backs them with an Auto Scaling group. You can change the scaling parameters.
- **Managing** – Amazon EKS takes care of health monitoring of your managed node groups. Amazon EKS automatically informs you of issues, including required resources that are being deleted, are unreachable, or are unavailable. Amazon EKS also informs you of update issues, limits that are exceeded, and creation or deletion failures. You also can obtain logs from node-level Secure Shell (SSH) access, open source log routers, or Amazon CloudWatch. All managed node group events are also recorded in AWS CloudTrail.
- **Updating** – With one command, you can update a managed node group when needed. Amazon EKS then handles the termination of the nodes for rolling updates and automatically updates to the latest AMI version for your Kubernetes version.
- **Scaling** – Managed node groups take care of scaling your nodes for you. However, you still have control of the scaling parameters, such as Kubernetes labels, AWS tags, and the size of the node groups.
- **Tooling** – You can use eksctl to provision managed node groups.

### AWS Fargate

With managed node groups, you spend less time on infrastructure management. But maybe you want to focus on creating your applications and have Amazon EKS fully manage your data plane. You can do this by running your pods on Fargate.

Fargate manages the complete infrastructure of your Kubernetes data plane. You need to worry only about running your pods.

- **Native** – Fargate runs native Kubernetes pods. No need to change or configure anything for AWS.
- **Rightsized** – Fargate dynamically provisions the resources you need for your pods and resources; no more, no less.
- **Fast and simple** – Fargate quickly scales for you. No need to set up a cluster autoscaler.
- **Optimized** – You pay only for the pods when they run and you get pod-level billing visibility.

### Using Fargate

To use Fargate with Amazon EKS, you must create Fargate profiles.

![Fargate Profiles](https://i.imgur.com/3SKwQhv.png)

Fargate profiles specify which pods should be scheduled on Fargate. You can choose to run all your pods on Fargate or only some. Fargate profiles use selectors, which include a namespace and labels. Any pods that match the namespace and all the labels of a selector in the profile are scheduled with Fargate.

Fargate profiles also specify the (private) subnets the pods will be launched into and the podExecutionRole, the IAM role that determines the permission the pod has to make calls to AWS APIs. This IAM role is also added to Kubernetes role-based access control (RBAC) for authorization.

![Data plane options](https://i.imgur.com/Drm15gg.png)

## Knowledge Check 4: Which API should you use?

**Create a cluster**

1. Amazon EKS ✅
2. Kubernetes

**Delete a managed node group**

1. Amazon EKS ✅
2. Kubernetes

**Create a deployment**

1. Amazon EKS
2. Kubernetes ✅

**Get the Fargate profile**

1. Amazon EKS ✅
2. Kubernetes

**Get all the namespaces**

1. Amazon EKS
2. Kubernetes ✅

## Preparing your AWS environment

### Overview

There are three tasks to perform when building a cluster:

1. Secure your AWS environment.
2. Configure the virtual private cloud (VPC) networking for the cluster.
3. Create the Amazon EKS cluster.

### AWS shared responsibility model

AWS operates, manages, and controls the components from the host operating system and virtualization layer down to the physical security of the facilities in which the services operate. This means that AWS is responsible for protecting the global infrastructure that runs all the services offered in the AWS Cloud, including AWS Regions, Availability Zones, and edge locations. The AWS global infrastructure includes the facilities, network, hardware, and operational software [for example, host operating system (OS) and virtualization software] that support the provisioning and use of these resources.

Customers maintain complete control over their content and are responsible for managing critical-content security requirements including customer content stored in AWS, the country in which the content is stored, who has access, and so forth. The type of Amazon EKS shared responsibility model is contingent on a customer's choices for their cluster's data plane.

### Shared responsibility model with self-managed workers

![Self-managed workers](https://i.imgur.com/c5exjrw.png)

With Amazon EKS, AWS is responsible for managing the Amazon EKS managed Kubernetes control plane:

- Kuberneted control-plane nodes and services (for example, API server, scheduler, and so forth)
- The etcd datastore
- Other infrastructure necessary for AWS to deliver a secure and reliable service.

As a consumer of Amazon EKS, you are responsible for the data plane, including:

- IAM
- Pod security
- Runtime security
- Network security
- Security of the code in your container images

This Amazon EKS shared responsibility model covers the usage of self-managed cluster nodes.

### Shared responsibility model with managed node groups

![managed node groups](https://i.imgur.com/J6O7jBF.png)

Amazon EKS follows the shared responsibility model for common vulnerabilities and exposures (CVEs) and security patches on managed node groups. AWS is responsible for building patched versions of the Amazon EKS optimized AMI when bugs or issues are reported. You are responsible for deploying these patched AMI versions to your managed node groups.

When your managed nodes run a custom AMI, you are responsible for building and deploying patched versions of the AMI.

### Shared responsibility model with AWS Fargate

![Fargate](https://i.imgur.com/7SRX69v.png)

With Fargate, AWS is responsible for securing the underlying container runtime to run your pods. While AWS assumed more responsibility for data-plane components, you are still responsible for other aspects of running and maintaining your workloads:

- IAM
- Pod Security
- Network security
- Security of the code in your container images

### Amazon EKS: Authentication and Authorization

![who?](https://i.imgur.com/vby4Qn7.png)

**Authentication and authorization**

**Authentication**: When a service or user wants to access your Amazon EKS or Kubernetes resources, the first step is to confirm their identity. If the presented identity credential is not valid, then any further connection or communication is denied.

**Authorization**: After the identity is validated with authentication, determine if the system should allow the identity to perform the requested action. Grant different permissions depending on the service or user. Perhaps a user is allowed to view the current pods that are running, but they can't create a deployment. Different identities can have different permissions.

### How does authentication and authorization happen in Amazon EKS?

The process for authenticating identities and authorizing commands is different for AWS commands and Kubernetes commands.

#### Using the AWS API

For AWS commands, such as aws eks create-cluster, the AWS IAM service handles both authentication and authorization. In this respect, Amazon EKS behaves just like other AWS services.

#### Using the Kubernetes API

For Kubernetes commands, such as kubectl get nodes, Amazon EKS uses IAM user authentication to your Kubernetes cluster, but it relies on native Kubernetes RBAC for authorization. Using the IAM service for authentication simplifies cluster user management in two fundamental ways:

- Both IAM and Amazon EKS are integrated services managed by AWS.
- It addresses the issue of Kubernetes not providing end-user authentication.

All permissions for interacting with your Amazon EKS cluster’s Kubernetes API are managed through the native Kubernetes RBAC system.

### Example: Running a Kubernetes command with IAM and Kubernetes RBAC

![Visual Aid](https://i.imgur.com/SmWfS8L.png)

1. You run the `kubectl get pods` command, which sends an API request to the Kubernetes API server. Your IAM identity is passed along with the request.
2. Kubernetes verifies your identity with IAM. IAM sends a token verifying your identity back to the Kubernetes API server.
3. The Kubernetes API server checks its internal RBAC mapping for authorization. This determines if your `get pods` call is allowed or denied.
4. If approved, the Kubernetes API server processes the request and sends back the list of pods. If denied, then the client will receive a message stating as such.

### Configuring permissions

There are 3 types of permissions to configure when deploying a new Amazon EKS cluster.

1. **Cluster IAM role**: Amazon EKS requires permission to make calls to AWS APIs on your behalf to manage the cluster. For example, Amazon EKS needs permission to manage EC2 Auto Scaling for worker nodes. This permission is controlled by the IAM role assigned to your cluster. AWS provides an IAM policy with the recommended permissions for this role.

2. **Node IAM role**: The `kubelet` daemon on Amazon EKS worker nodes makes calls to AWS APIs on your behalf; for example, pulling container images from the Amazon Elastic Container Registry (Amazon ECR). Worker nodes receive permissions for these API calls through an IAM role assigned to the worker nodes.

3. **RBAC User**: The administrators who will manage your Kubernetes cluster need permission to make calls to the Kubernetes API. This is accomplished by mapping an IAM role to a Kubernetes RBAC user. The IAM role used to create the cluster will have full permission to manage the cluster, which is more permission than is usually required. For this reason, best practice is that you create a specific IAM role just for deploying clusters. Create additional principals in IAM that map to more restrictive roles in RBAC for routine operations, following the principle of least privilege.

### Configuring networking

Before creating an Amazon EKS cluster, you must decide whether you will use one of your existing Amazon VPCs or if you will create a new VPC for your Amazon EKS cluster. If you want to use an existing VPC, it must meet specific requirements for use with Amazon EKS.

VPCs for Amazon EKS clusters can use one of three common design patterns:

![Public](https://i.imgur.com/BgKSy3Q.png)

1. **Only public subnets**: This VPC has three public subnets at most that are deployed into different Availability Zones in the Region. All worker nodes are automatically assigned public IP addresses and can send and receive internet traffic through an internet gateway. A security group is deployed that denies all inbound traffic and allows all outbound traffic.

![Private](https://i.imgur.com/CSUpCV9.png)

2. **Only private subnets**: This VPC has three private subnets at most that are deployed into different Availability Zones in the Region. All nodes can optionally send and receive internet traffic through a network address translation (NAT) instance or NAT gateway. A security group is deployed that denies all inbound traffic and allows all outbound traffic.

The above diagram illustrates a basic configuration of worker nodes deployed to private subnets in two Availability Zones. The diagram includes an option of using NAT gateways to provide worker nodes external network access to other AWS services and the public internet. The NAT gateway in each Availability Zone deployment pattern is a recommended practice for meeting high availability requirements.
Public and private subnets

![Both](https://i.imgur.com/vkJOSC8.png)

3. **Public and Private Subnets**: This VPC has two public subnets and two private subnets. One public and one private subnet are deployed to the same Availability Zone. The other public and private subnets are deployed to a second Availability Zone in the same Region. We recommend this option for all production deployments. With this option, you can deploy your worker nodes to private subnets. Kubernetes can deploy load balancers to the public subnets. These load balancers can balance traffic to pods running on worker nodes in the private subnets.

Public IP addresses are automatically assigned to resources deployed to one of the public subnets. However, public IP addresses are not assigned to any resources deployed to the private subnets. The worker nodes in private subnets can communicate with the cluster and other AWS services. Pods can communicate outbound to the internet through a NAT gateway that is deployed in each Availability Zone. A security group is deployed that denies all inbound traffic and allows all outbound traffic. The subnets are tagged so that Kubernetes can deploy load balancers to them.

## Creating a cluster

Before you create your first cluster, make sure that you have installed all the required tools on the system you will be using to access the cluster:

- AWS Command Line Interface (AWS CLI)
- `kubectl`
- (Optional) `eksctl`

Note that creating a cluster refers to the process of deploying the Amazon EKS managed control plane. Adding worker nodes to your cluster is a separate step, which you will learn later in this course.

You have a choice of which interface to use to create your cluster:

1. **`eksctl` utility**: `eksctl` is a command line tool that simplifies cluster creation. Using this method, you can create a cluster with a single command.
2. **AWS Management Console**: The AWS Management Console provides a graphical interface that handles many of the complexities of cluster creation for you. However, you must perform some steps using the AWS CLI when using this method.
3. **AWS CLI**: The AWS CLI offers the most potential for customization. It also has the most complexity of the three methods.

### Example: Creating a cluster with eksctl

This example shows cluster creation using `eksctl`, a CLI tool for creating clusters on Amazon EKS using AWS CloudFormation. Weaveworks developed `eksctl` as a simple command line utility for creating and managing Kubernetes clusters on Amazon EKS.

### What does eksctl do (by default)?

`eksctl` automates many of the steps involved in cluster and worker node creation. Here is an overview of the tasks performed by eksctl when it is run with the default option:

1. Creates IAM roles for the cluster and worker nodes.
2. Creates a dedicated VPC with Classless Inter-Domain Routing (CIDR) 192.168.0.0/16.
3. Creates a cluster and a nodegroup.
4. Configures access to API endpoints.
5. Installs CoreDNS.
6. Writes a kubeconfig file for the cluster.

**Step 1: Install eksctl**

![install on linux](https://i.imgur.com/cNOYUlx.png)

This is an example of installing `eksctly` on a Linux host.

**Step 2: Create a cluster**

![create](https://i.imgur.com/0966zwm.png)

This example shows `eksctl` being run and the beginning of the output. As each step in the process is completed, output will be displayed showing success or failure. The process of creating a cluster takes about 8 minutes.

**Step 3: View your nodes**

![output](https://i.imgur.com/M26eXDk.png)

After the output from `eksctl` indicates success, use `kubectl` to check on the status of the nodes that were created to verify that they are in the `Ready` state.

### Declarative or imperative?

You can create a configuration file for use with eksctl (as the first example shows) or you can customize the command by adding arguments (as the second example shows).

![options](https://i.imgur.com/rQfMd9M.png)

### Customize eksctl with a configuration file

![custom](https://i.imgur.com/up2LgJj.png)

As reviewed earlier, you can create a cluster using a configuration file in YAML Ain't Markup Language (YAML) format instead of flags, which gives you more control over the options selected. Using a configuration file also makes the process of creating a cluster declarative instead of imperative. `eksctl` translates the instructions in your configuration file to equivalent CloudFormation templates. You can put your configuration files into source code control just as you do with other assets such as CloudFormation templates or Terraform automation files.

### Examine an Amazon EKS cluster in the AWS Management Console

In this example, you'll explore a newly-configured Amazon Elastic Kubernetes Service or Amazon EKS cluster in the AWS Management Console.

The following is a video transcript:

```
The cluster was built in the us-west-2 Region. Before inspecting the cluster, first ensure the correct Region is selected in the console. Oregon, also known as us-west-2, appears on the screen, so no change is necessary. Next, launch the Amazon EKS service. Search for the Amazon EKS service by typing, Kubernetes in the search bar. Finally, select the Elastic Kubernetes Service under the Services category.

The Amazon EKS homepage contains general information about the service, including product documentation and pricing. To launch the Clusters dashboard, select the Clusters link on the left side of the screen under the Amazon EKS heading. The next screen shows that only one Amazon EKS cluster exists. The status shows active and running Kubernetes v1.21, which is the latest available Kubernetes version as of this recording. Select the dev cluster to review the configuration.

This next screen presents details about the worker nodes. Select the Workloads tab to see which applications are running on the cluster. Options to filter by namespace is available in the list below. Other options to filter by some other value is available from the search bar. All Namespaces is already selected. The current list shows the details of all workloads running in the cluster, the type of cluster object -Deployment and DaemonSet in this case –the number of pods, and so forth.

Amazon EKS supports multiple kinds of workloads, including Deployment, StatefulSet, DaemonSet, and Job. An Amazon EKS cluster will always include these three workloads, CoreDNS, aws-node, and kube-proxy, which define basic Amazon EKS functionality.

For this demonstration, select the CoreDNS link to see how its configured in the Amazon EKS cluster. As its name suggests, CoreDNS provides name resolution and service discovery inside of Kubernetes. By default, CoreDNS runs as a deployment consisting of two replicas in the kube-system namespace. Additional metadata about the workload and details about the pods running in the workload can be accessed here.

For more information on the cluster configuration details, select dev from the breadcrumb list, then select the Configuration tab from this screen.

This screen highlights critical information about the cluster and the control plane, including the Amazon Resource Names (ARNs) and the OpenID Connect provider. If Secrets encryption has been activated, you will also find the corresponding AWS Key Management Service (AWS KMS) key beneath the Details card.

Next, select the Compute subtab.

On this screen, configuration details are available for the cluster’s Managed, Unmanaged, and Fargate node groups. For this demonstration, one node group called private-ng with a desired size of one has been configured already. Select the private-ng link to see more information about it. At the top of the screen is an overview of key information about the node group, including the AMI type, release version, instance type, and other details.

Further down the page is information on the Node Group ARN; the minimum, maximum, and desired number of nodes; and the configured subnets. The additional sub-tabs, nodes, health issues, Kubernetes labels, and so forth provide the status of the nodes and additional node configuration details within the EKS cluster.

To move on, select dev in the breadcrumbs at the top of the page to return to the previous screen.

Next, select the Networking subtab. This subtab shows you the VPC in which your cluster has been configured. The subtab also shows the subnets it runs in and the security groups controlling traffic to and from the cluster. By default, the Kubernetes API server endpoint is assigned a public IP address. Access to the Kubernetes API server is secured using a combination of AWS Identity and Access Management (IAM) and native Kubernetes role-based access control (RBAC). Restricting access to the Kubernetes API server to your VPC or a particular range of IP addresses is possible and requires additional configuration.

Next, select the Add-ons subtab. Add-ons are operational software that provide key functionality to support your Kubernetes applications. Because this is a new EKS cluster, the add-ons shown here, that is the kube-proxy, coredns, and vpc-cni are what were installed and configured at cluster creation. Adding, removing, and upgrading add-ons is also an option here.

Moving on, select the Authentication subtab to view how user access is managed. As you can see, the dev cluster can be configured to use OpenID Connect, commonly referred to as OIDC, as an existing identity provider. OIDC sits on top of OAuth 2.0 and provides login and profile information about a cluster’s users. With OIDC, you can manage access to your cluster using the same set of rules and procedures your organization already follows for creating, activating, and deactivating employee accounts. For more information about OIDC, select the Info button at the top of the card.

Lastly, select the Logging subtab to view the monitoring for the cluster. By default, control plane logging is deactivated. You could activate logging by selecting the Manage Logging button and then selecting the specific logs you want sent to Amazon CloudWatch.
```

## Knowledge Check 5: Creating a Cluster

\*\*How do you change the AWS Region a cluster is created in by using eksctl? (select TWO)

1. Edit the cluster properties after it is created.
2. Use the `--region` flag when running the command. ✅
3. Use a customized `cluster.yaml` file. ✅
4. Add a tag to the Region you want the cluster created in.
5. Add a Kubernetes label specifying the Region using `kubectl`

## Configuring horizontal and vertical scaling

### Horizontal scaling

![horizontal](https://i.imgur.com/xN3wcGC.png)

A horizontally scalable system is one that can increase or decrease capacity by adding or removing compute resources. In this example, more pods are deployed when demand spikes (scale out). Pods are removed when demand drops (scale in).

### Vertical scaling

![vertical](https://i.imgur.com/Y2nyxh2.png)

A vertically scalable system increases performance by adding more resources to the compute resource, such as faster (or more) central processing units (CPUs), memory, or storage.

In this example, the size of pods (CPU and memory resources assigned) is increased when demand spikes (scale up) and decreased when demand drops (scale down).

### ..

When it comes to traditional server infrastructure, scaling application workloads horizontally is difficult to manage compared to managing scaling vertically. This is less true when you consider cloud computing and Kubernetes. Kubernetes has mechanisms to scale application workloads both vertically and horizontally.

## Kubernetes automatic scaling

![Kubernetes](https://i.imgur.com/XGsH76u.png)

### Cluster Autoscaler

The Kubernetes Cluster Autoscaler automatically adjusts the number of nodes in your cluster when pods fail to launch. The failure to launch can result from a lack of resources or when nodes in the cluster are underutilized and their pods can be rescheduled onto other nodes in the cluster. In Amazon EKS, this is accomplished by adding your worker nodes to EC2 Auto Scaling groups. A simple way to configure this is to deploy a cluster with managed node groups using eksctl.

### Cluster Autoscaler example

![avg demand](https://i.imgur.com/wRoj7tF.png)

Amazon EC2 Auto Scaling automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. The dynamic scaling capabilities of EC2 Auto Scaling automatically increase or decrease capacity based on load or other metrics. This example shows an EC2 Auto Scaling group when it is first created.

![high demand](https://i.imgur.com/n3opJ4y.png)

When demand goes up, Amazon EC2 Auto Scaling scales out.

![low demand](https://i.imgur.com/ynoIiaf.png)

When demand goes down, Amazon EC2 Auto Scaling scales in. The number of instances will not go above the maximum or below the minimum.

### Karpenter: An alternative to Cluster Autoscaler

Karpenter is a node lifecycle management solution. It observes incoming pods and launches the right instances for the situation. Instance selection decisions are intent-based and driven by the specification of incoming pods, including resource requests and scheduling constraints.

When deployed, Karpenter will:

- Launch nodes for unscheduled pods.
- Replace existing nodes to improve resource utilization.
- Terminate nodes if outdated or no longer needed.
- Drain nodes gracefully before preemption.

```
Karpenter is currently in development and available for early adopters. It is not yet ready to be used in production and has not yet been rigorously tested for scale and performance. For more information, see the Karpenter repo on GitHub: https://github.com/awslabs/karpenter
```

### Horizontal Pod Autoscaler

The Horizontal Pod Autoscaler (HPA) is a Kubernetes component that automatically scales your service in or out based on CPU utilization or other metrics that you define through the Kubernetes metrics server.

![example](https://i.imgur.com/I1Dzyf4.png)

`kubectl autoscale deployment myapp --cpu-percent=50 --min=1 --max=10`

In this example, a CPU percentage of 50 percent was specified when the HPA resource was created. When CPU usage exceeds 50 percent of the allocated container resource, the HPA scales out from the minimum specified (1) to the configured maximum (10). It scales out until the CPU average is below the target (50 percent). When the load decreases, Amazon EKS slowly brings the number of instances back to the minimum number.

The Horizontal Pod Autoscaler uses CPU utilization by default but can be configured to use custom metrics, such as metrics from Amazon CloudWatch.

### Vertical Pod Autoscaler

The Kubernetes Vertical Pod Autoscaler (VPA) automatically adjusts the CPU and memory reservations for your pods to help rightsize your applications. This adjustment can improve cluster resource utilization and free up CPU and memory for other pods.

**1**

![](https://i.imgur.com/upOJg48.png)

A pod (`dbApp`) is waiting to be scheduled. It cannot run because there are not enough CPU resources on any nodes to accommodate it. However, although the `WebApp` pod has requested 600 m of CPU, it’s only using 200 m.

**2**

![](https://i.imgur.com/Pzrr9AB.png)

The Kubernetes Vertical Pod Autoscaler adjusts the resource reservation of the `WebApp` pod to align to its actual utilization.

**3**

![](https://i.imgur.com/oL4KX2J.png)

Adequate resources are now available for the scheduler to run the `dbApp` pod on node 1.

**4**

![](https://i.imgur.com/6C5I8zR.png)

The `dbApp` pod is now running on node 1.

## Managing communication in Amazon EKS

### Overview of Amazon EKS communication

To simplify inter-node communication, Amazon EKS integrates Amazon VPC networking into Kubernetes through the Amazon VPC Container Network Interface (CNI) plugin for Kubernetes. The Amazon VPC CNI plugin allows Kubernetes pods to have the same IP address inside the pod as they do on the Amazon VPC network.

### Review: VPC fundamentals

![](https://i.imgur.com/KPyMq4D.png)

Think of Amazon VPC as a virtual data center. It’s an isolated section of the AWS Cloud where you can launch AWS resources, such as Amazon EC2 instances, in a virtual network that you define.

An Amazon VPC is created in a single AWS Region, but it spans all of the Availability Zones within that Region. When you create a VPC, you must specify a range of IPv4 addresses for the VPC as a CIDR block (for example, 192.168.0.0/16). This is the primary CIDR block for your VPC.

After creating a VPC, you can add one or more subnets in each Availability Zone. When you create a subnet, you specify the CIDR block for the subnet, which is a subset of the VPC CIDR block. Each subnet must reside entirely in one Availability Zone and cannot span zones.

### Types of communication in Amazon EKS

![](https://i.imgur.com/M1Ti6bi.png)

There are multiple types of communication in Amazon EKS environments. Lines of communication include the following:

- Interpod communication between containers
- Communication between pods on the same node or pods on different nodes
- Ingress connections from outside the cluster

In some cases, the default Kubernetes methods are used. In other cases, specifically inter-node communication and ingress methods specific to Amazon EKS are used.

**Step 1: Intrapod communication**

![](https://i.imgur.com/mbtvDkS.png)

Containers in a pod share a Linux namespace and can communicate with each other using localhost. In Kubernetes networking, the IP address with which a container identifies is the same IP address for all entities in the network. All containers can communicate with all other containers in a pod without NAT.

**Step 2: Intrahost communication**

![](https://i.imgur.com/49TAxar.png)

In addition to each pod having a Linux namespace, the host node also has a Linux namespace. Each namespace has its own routing table. The pod namespace and host namespace are connected by a Linux virtual Ethernet (veth) device. A pair of veths creates a tunnel between the default host namespace and the pod namespace.

Pod-to-pod communication in the host happens through this veth tunnel. Each node is allocated a network range for containers and each pod gets an IP address in that range allowing containers on the same host to communicate.

**Step 3: Interhost communication**

![](https://i.imgur.com/DH2bC2l.png)

To simplify internode communication, Amazon EKS integrates Amazon VPC networking into Kubernetes through the Amazon VPC CNI plugin for Kubernetes. CNI allows Kubernetes pods to have the same IP address inside the pod as they do on the Amazon VPC network.

This CNI plugin is an open-source project maintained in the amazon-vpc-cni-k8s repository on GitHub (https://github.com/aws/amazon-vpc-cni-k8s). CNI uses the Amazon EC2 ability to provision multiple network interfaces to a host instance—each with multiple secondary IP addresses—to get multiple IP addresses assigned from the Amazon VPC pool. It then distributes these IP addresses to pods on the host and connects the network interface to the veth port created on the pod. The Linux kernel manages the rest. Therefore, every pod has a real, routable IP address from the Amazon VPC and can easily communicate with other pods, nodes, or AWS services.

At the host, CNI modifies both the default routing table and the network interface routing table. The default routing table is used to route traffic to pods. Each network interface has its own routing table that is used to route outgoing pod traffic. Each pod is assigned one of the network interface’s secondary IP addresses. For example, if a pod sends network traffic out of the instance, the VPC-CNI plugin ensures that the traffic routes through the correct network interface.

### Review: Kubernetes services

The native service objects in Kubernetes solve the issue of pods disappearing and new pods being created with different IP addresses. Instead of trying to communicate to the IP address of ephemeral pods, communicate to the IP address of the service. The service is continually updated with the pod statuses and directs to a healthy pod.

A service object provides a constant IP address and communication port as an entry point to a group of pods. Each service object has an IP address and port that does not change for as long as the service exists. Internal or external clients can reach your application running in a group of pods by connecting to the service IP address and port. Those connections are then routed to one of the pods backing that service.

### Ingress

With Kubernetes ingress objects, you can reduce the number of load balancers you use. An ingress object exposes HTTP and HTTPS routes from outside the cluster to your services and defines traffic rules.

![ingress](https://i.imgur.com/xU9BUKE.png)

### AWS Load Balancer Controller

The AWS Load Balancer Controller is a controller that manages Elastic Load Balancing (ELB) for a Kubernetes cluster. The load balancers can be Application Load Balancers when you create a Kubernetes Ingress or Network Load Balancers when you create a Kubernetes service of type LoadBalancer. An Application Load Balancer balances application traffic at Layer 7 (for example, HTTP or HTTPS) of the Open Systems Interconnection (OSI) model, while a Network Load Balancer balances network traffic at Layer 4 [for example, Transmission Control Protocol (TCP), User Datagram Protocol (UDP), and so forth]. Application Load Balancers can be used with pods that are deployed to nodes or to Fargate. Application Load Balancers can be deployed to public or private subnets. Network Load Balancers can load balance network traffic to pods deployed to Amazon EC2 IP and instance targets or to Fargate IP targets.

## Knowledge Check 6: Managing communication in Amazon EKS

✅

**Which service can be accessed from outside the cluster?**

1. ClusterIP
2. NodePort
3. LoadBalancer
4. Both NodePort and LoadBalancer ✅

`The NodePort service opens a port on each node, allowing access from outside the cluster. The LoadBalancer service extends the NodePort service by adding a load balancer in front of all nodes.`

**What is the Amazon VPC Container Network Interface (CNI) plugin?**

1. A logical networking component in a VPC that represents a virtual network card
2. A method for connecting instances in a private subnet to the internet
3. A Kubernetes object that exposes an application running on a set of pods
4. A plugin that allows Kubernetes pods to have the same IP address inside the pod as they do on the VPC network ✅

`Amazon EKS integrates VPC networking into Kubernetes using the CNI plugin for Kubernetes. The CNI plugin allows Kubernetes pods to have the same IP address inside the pods as they do on the VPC network.`

## Managing storage in Amazon EKS

### Overview

Running your workloads on an Amazon EKS cluster provides the benefit of using other AWS services including several storage services. In this lesson, you explore how to manage your application workload storage requirements with Amazon Elastic Block Store (Amazon EBS) and Amazon Elastic File System (Amazon EFS). While only two storage services are covered, additional AWS storage services are available for Amazon EKS.

### Kubernetes persistent storage

Application workloads requiring data persistence independent of the pod lifecycle require at least two Kubernetes objects, a persistent volume (PV) and a persistent volume claim (PVC). Recall that a PV is similar to ephemeral volumes but has a lifecycle independent of any individual pod. A PVC is a request for storage by a cluster user, which means the request includes details about how much storage, the kind of storage access, and storage performance.

Manual administration of persistent volumes poses a scalability challenge for cluster administrators. A third object, storage class, provides the benefit of automating persistent volume management within a Kubernetes cluster. Cluster administrators use storage classes to present persistent storage options to cluster users. Cluster users must specify their desired storage class within a PVC. An Amazon EKS cluster uses these three Kubernetes objects for persistent storage.

In addition to the three objects, a Container Storage Interface (CSI) driver is necessary for allowing a Kubernetes cluster access to a desired storage provider. The CSI is a standard for exposing arbitrary block and file storage systems to containerized workloads on container orchestration systems like Kubernetes. Both Amazon EBS and Amazon EFS have their respective CSI drivers, which run as containerized applications in your Amazon EKS cluster nodes. The CSI drivers make the necessary AWS API calls to their respective AWS storage service on behalf of a storage class object.

**Using Amazon E`B`S**

When a cluster user submits a PVC with the requisite parameters, the Amazon EBS storage class calls on the EBS CSI driver to allocate storage per the PVC request. The EBS CSI driver makes the necessary AWS API calls to create an EBS volume and attach the volume to the designated cluster node. When attached, the persistent volume is allocated to the PVC. The Amazon EBS CSI driver can be configured to use the various functionality of Amazon EBS including volume resizing, creating volume snapshots, and so forth.

The following diagram shows two examples of how an Amazon EBS volume associates with its PV. A good use case for using Amazon EBS volumes for PVs is when application workloads are deployed into a Kubernetes StatefulSet object.

![EBS](https://i.imgur.com/y9Ld2ZH.png)

**Using Amazon E`F`S**

A Kubernetes storage class backed by Amazon EFS will direct the Amazon EFS CSI driver to make calls to the appropriate AWS APIs to create an access point to a preexisting file system. When a PVC is created, a dynamically provisioned PV will use the access point for access to the Amazon EFS file system then bind to the PVC.

The following diagram illustrates how a single Amazon EFS file system can be accessed by two pod replicas running on separate cluster nodes. A good use case for Amazon EFS for persistent storage is when an application workload requires replicas to span across worker nodes and access the same application data.

![EFS](https://i.imgur.com/19VoIOg.png)

### Pods running on AWS Fargate

The previous section illustrates how both Amazon EBS and Amazon EFS provide storage to managed or self-managed worker nodes. Running pods on Fargate simplifies the requirement and management of persistent storage. Between the two storage providers, Amazon EFS is the only storage provider for pods running on Fargate, mainly because of its serverless aspect.

Additionally, a pod running on Fargate automatically mounts an Amazon EFS file system, without needing the CSI driver installation and configuration.

## Deploying applications to Amazon EKS

### Overview

Several methods exist for deploying applications to a Kubernetes cluster running on Amazon EKS. In a previous lesson, the Deploy an Application and Scale Worker Nodes demonstration used the `kubectl` utility to deploy an application to a cluster. Using the `kubectl` command to deploy applications to the cluster is suitable for testing and development purposes. However, using `kubectl` to deploy microservices is not ideal for production because of poor scalability and high administration overhead. In this section, you explore a preferred method of using AWS services for deploying and maintaining microservices workloads in a production Amazon EKS cluster environment.

### Microservices Software Development Lifecycle

![](https://i.imgur.com/O7LpbkI.png)

1. **Software developer teams**: In the microservices model, software developer teams are responsible for developing and maintaining each microservice that makes up part of the application.

2. **Interdependent services**: Software developers commit their coding for their service using continuous integration. Passing initial testing, the new versions of software are sent through to the respective delivery pipeline

3. **Delivery pipelines**: Delivery pipelines decouple your teams and efficiently release independently of other teams. Because tasks that build, test, and deploy applications are repetitive, automating these tasks is the preferred method.

### Application deployment to Amazon EKS

Continuous integration and continuous delivery (CI/CD) is a DevOps model of implementing a Microservices Software Development Lifecycle. With continuous integration, developers frequently commit to a shared repository using a version control system such as Git. A continuous integration service automatically builds and runs unit tests on the new code changes to immediately surface any errors. Continuous delivery expands on continuous integration by automating an end-to-end release through to production. This section provides examples of continuous delivery with Amazon EKS.

### Continuous delivery with AWS services

You can use Kubernetes and AWS together to create a fully managed, continuous delivery pipeline for container-based applications. This approach takes advantage of Kubernetes’ open-source system to manage your containerized applications and the AWS developer tools to manage your source code, builds, and pipelines.

![](https://i.imgur.com/zHlCEdv.png)

1. **Commit code**: Developers commit code to an AWS CodeCommit repository. The AWS CodePipeline automatically detects the changes to the repository and processes the code changes through the pipeline.

2. **AWS CodeBuild**: CodeBuild packages the code changes and any dependencies and builds a Docker image. As an option, another pipeline stage tests the code and the package by also using CodeBuild

3. **Amazon ECR**: The Docker image is pushed to Amazon ECR after a successful build stage, test stage, or both.

4. **AWS Lambda**: CodePipeline invokes a Lambda function to prepare the built and tested artifact for deployment to the Kubernetes cluster. Changes to running applications usually include a change in the image tag.

5. **Declare update to Kubernetes**: After the deployment manifest update is completed, Lambda invokes the Kubernetes API to deploy or update the application in the Kubernetes cluster.

6. **Deploy Application**: Kubernetes performs a rolling update of the pods in the application deployment to match the Docker image specified in Amazon ECR.

### Self-managed continuous delivery on AWS

Many CI/CD tools are available to use with an Amazon EKS cluster, so you can decide which tools fit your organization's requirements to manage the deployment of application workloads.

The example in this section illustrates a self-managed continuous delivery using open-source tools with an Amazon EKS cluster. The specific tools include the following:

- A GitHub repository
- Jenkins
- Harbor
- Spinnaker
- Helm

![](https://i.imgur.com/CxFx91H.png)

1. **Commit to GitHub repository**: Developers commit code to a GitHub repository, which starts the continuous integration process of the pipeline.

2. **Jenkins build**: A webhook in GitHub notifies Jenkins of a commit or change in code. Jenkins pulls the change and runs through automated testing including unit, integration, and smoke testing. If any of the tests fail, then Jenkins will notify the appropriate development team. If all tests pass, then Jenkins will build the container image with a new tag.

3. **Push container image**: Jenkins creates a container image with a new tag and pushes it to Harbor, which hosts all authorized container images. Harbor runs additional scans on incoming container images ensuring that vulnerabilities or other security issues are not present. Passing all Harbor checks, the new container image is ready for automated deployment to the production environment.

4. **Spinnaker pipeline process**: A Spinnaker pipeline activates when a new container image is ready for deployment. Spinnaker provides flexibility on how to deploy the new or updated application to the Amazon EKS cluster

5. **Helm artifacts**: Spinnaker uses stages to manage the deployment process. One stage includes using Helm to create the Kubernetes manifests that will be used to deploy to the Amazon EKS cluster.

6. **Deployment to Amazon EKS cluster**: Spinnaker provides the flexibility to deploy to different environments including Dev, Staging, and Production. For continuous delivery, Spinnaker is configured to test each deployment in each environment. If the tests pass, then the deployment will automatically continue to the next environment until reaching the production Amazon EKS cluster.

## Gaining obervability

### Overview

Observability is the ability to analyze and view data or processes. It is achieved only after monitoring data (such as metrics) has been compiled. Observability is a term often used interchangeably with monitoring, but they are two different concepts. In this lesson, you examine the challenges of observability in a microservices environment; review the components of monitoring: metrics, logging, and tracing; and explore examples of observability.

### Gaining insight is challenging

![tons of containers](https://i.imgur.com/oUdndT4.png)

Gaining insight is challenging in any environment. However, it’s more difficult in a microservices environment because there are many potential metrics that you can choose from. Selecting the right ones is not easy.

Containers, in particular, are difficult to monitor because they are generally more transient than your normal workloads. Processes must be in place to capture logs and other useful artifacts from running containers. You must then store these logs and artifacts in a durable, searchable location.

### The value of insight

With good insight of your applications running in your Amazon EKS cluster, you can answer important questions.

- **Customer experience**: Are your applications providing the best experience?
- **Performance and cost**: How are your changes affecting overall performance and cost?
- **Trends**: Do you need to scale?
- **Troubleshooting and remediation**: Where did the problem occur and how can it be resolves?
- **Learning and improvement**: How do you detect and prevent problems in the future?

### Three main sources of full observability

1. **Metrics**: Metrics collect and visualize data regarding the health and performance of resources, measured over intervals of time. The ability to configure alerts to warn you when key performance indicators run out of bounds is also desirable.
2. **Logs**: Logs collects and aggregates log files from resources and filter out actionable insights from background noise.
3. **Traces**: Traces follow the path of a request as it passes though different services. Tracing helps developers understand how your application and its underlying services are performing. This tracing helps to identify and troubleshoot the root cause of performance issues and errors.

### Examples of observability

Many tools exist to ingest data from the three main sources of observability. Often, using multiple tools are necessary for a full solution. In this section, two examples are provided to showcase how both AWS managed tools and open-source tools could work with your Amazon EKS cluster.

### Example: Amazon CloudWatch Container Insights

The following image is an example of how CloudWatch Container Insights can be configured to collect, aggregate, and visualize metrics and logs from Amazon EKS. CloudWatch Container Insights also provides diagnostic information, such as container restart failures, to help you isolate issues and resolve them quickly.

![CloudWatch](https://i.imgur.com/9sFxxNC.png)

1. **FluentBit agent**: A log collector with a CloudWatch plugin runs as a DaemonSet on every node. This example uses Fluentd, and open-source log collection and aggregation tool. Another option is Fluent Bit, which is a lightweight version of Fluentd.
2. **CloudWatch metrics**: The CloudWatch agent runs as a DaemonSet on each worker node. The agent collects and ships metrics data to CloudWatch for further processing.
3. **EKS control plane logs**: You can collect Amazon EKS control plane metrics by turning on control plane logging for an Amazon EKS cluster. CloudWatch collects metrics information from these logs that you can view using CloudWatch Log Insights.
4. **CloudWatch data access**: The metrics that Container Insights collect are available in CloudWatch automatic dashboards and also viewable in the Metrics section of the CloudWatch console. In addition to CPU, memory, disk, and network metrics, Container Isnights provides diagnostic information, such as container restart vailures to help with troubleshooting issues
5. **CloudWatch Log Insights**: CloudWatch Logs Insights helps you interactively search and analyze your log data in CloudWatch Logs. You can perform queries to help you more efficiently and effectively respond to operational issues.

### Example: Open-source tools for logs and metrics

The following image is an example of how various open-source tools can be configured to collect, aggregate, and visualize metrics and logs from Amazon EKS. Customers opting for open-source tools for collecting metrics and logs are free to self-manage those tools themselves or can use the AWS managed equivalents. In this case, AWS provides **Amazon Managed Service for Prometheus**, **Amazon Managed Grafana**, and **Amazon OpenSearch Service** as options.

![open-source](https://i.imgur.com/QujpelV.png)

1. **Prometheus agents**: Prometheus agents run in a DaemonSet, which means one agent per worker node. Agents collect and ship metric data to a Prometheus server.
2. **Prometheus server**: Prometheus is the name of an epon-source time series database used to collect and store metrics from many different sources including your application workloads if configured to do so. The Prometheus project is a graduated Cloud Native Computing Foundation (CNCF) project like Kubernetes and is a popular solution.
3. **Grafana**: Grafana provides dashboards to visualize and query your metrics collected by Prometheus.
4. **FluentBit agents**: Similar to the Prometheus agents, FluentBit agents run on each worker. The agents collect and ship logging data to the OpenSearch server.
5. **OpenSearch**: OpenSearch is a community-driven, open-source log analytics tool derived from Apache 2.0 licensed Elasticsearch 7.10.2. Logging data is ingested for log analytics.
6. **OpenSearch Dashboards**: Part of the OpenSearch suite, OpenSearch Dashboards provides dashboards to visualize and query log data. OpenSearch Dashboards is derived from Kibana 7.10.2.

## Deploying a service mesh with AWS App Mesh

### Overview

AWS App Mesh is a service mesh that provides application-level networking to help your services communicate with each other across multiple types of compute infrastructure. App Mesh gives end-to-end visibility and high availability for your applications. In this lesson, you investigate the advantages of running a service mesh in an Amazon EKS cluster along with examining a high-level example of App Mesh.

### The difficulty of managing microservices architectures

Containerized applications running in a microservices design pattern are difficult to manage at scale. With an increase of microservices or migrating a monolith into microservices, network communication between the services becomes a central challenge. In a microservices architecture, processing a request can span several services, which raises questions regarding how to manage the networking while simplifying service design. Two viable options include developers writing the communication logic into code, which means slower development cycles and making the microservices bigger. The second option is to add a networking boundary into the environment that address the scaling and management requirements.

- **Service-to-service communication**: Dynamically configuring how the services are connected.
- **Observability**: Monitoring your metrics at the application level to determine how your microservices are performing end to end. Find where potential bottlenecks in the system are and observe how your traffic is flowing through. Get detailed logs for debugging traffic patterns.
- **Security**: Securing the communication between services and only allowing least-privilege access based on what a service needs to do.
- **Traffic management**: Controlling how packets are routed through your network in terms of policies, prioritization, and resilience.

### Network solution: Service mesh

![mesh](https://i.imgur.com/9rghBvW.png)

### Service mesh diagram

A better way to address managing service communication at scale is with a service mesh. A service mesh is a dedicated infrastructure layer in which you can abstract away the service-to-service communication. The abstraction is done with an array of lightweight network proxies deployed alongside the application code.

Developers can use a service mesh to focus on the business application instead of focusing on configuring the intelligence of the network. By removing the logic from the application code, you keep the services smaller and the logic more consistent.

A service mesh monitors all service-to-service traffic and abstracts its configuration. The mesh tracks all data on the wire, which you can use.

### AWS App Mesh

App Mesh is a service mesh that streamlines monitoring and controlling services. App Mesh standardizes how your services communicate, giving you end-to-end visibility and helping to ensure high availability for your applications. App Mesh gives you consistent visibility and network traffic controls for every service in an application.

![App Mesh](https://i.imgur.com/JBNEN0q.png)

1. **App Mesh control plane**: The control plane is responsible for providing a secure, scalable, and reliable service mesh. For example, among its capabilities, the control plane creates communication paths between your microservices as shown in this diagram. Other capabilities include obervability, failure isolation, and routing.
2. **Pods in App Mesh**: Each pod consists of the main microservice application and App Mesh proxy deployed as a sidecar container. When Microservice A sends a request to Microservice B, the network traffic is routed through the App Mesh proxy (that is Service A proxy). To the application, the proxy process is transparent.
3. **Network traffic sent**: The proxy adds additional identifiers, metadata, and other network configuration to the original payload from Microservice A. In the diagram, the proxy rewrites the destination for the Service B proxy.
4. **Network traffic received**: The Service B proxy validates the network traffic from the Service A proxy and passes the original payload to Microservice B. Any response from Microservice B back to A would follow a similar network path.

## Knowledge Check 7

**What benefits does a service mesh provide? (Select THREE.)**

1. Connects microservices ✅
2. Secures network traffic between microservices using encryption and authentication controls ✅
3. Controls network flow both internally and externally of the microservices infrastructure
4. Provides end-to-end visibility in application performance ✅

## Maintaining add-ons

### Overview

Add-ons extend the operational capabilities of Amazon EKS clusters but are not specific to any one application. This includes software like observability agents or Kubernetes drivers that allow the cluster to interact with underlying AWS resources for networking, compute, and storage. Add-on software is typically built and maintained by the Kubernetes community, cloud providers like AWS, or third-party vendors. In this lesson, you explore the challenges of maintaining third-party apps and the complexity it adds to upgrade scenarios.

### Default Amazon EKS add-ons

Amazon EKS automatically installs on every cluster the following add-ons:

- Amazon VPC CNI
- kube-proxy
- CoreDNS

These add-ons provide core functionality to your cluster and run as pods in your cluster's data plane (pods running on cluster nodes or as Fargate pods).

The manner of maintaining these add-ons depends on how they were implemented in your cluster. For example, if you create a cluster using the AWS Management Console or with eksctl using a configuration file, then the managed Amazon EKS add-ons are installed. You can use the AWS Management Console, eksctl, or the AWS CLI utility to maintain and automatically upgrade them. However, if you create a cluster using eksctl without a config file or using any other tool, then the self-managed kube-proxy, Amazon VPC CNI, and CoreDNS add-ons are installed. You will use the kubectl command line tool to maintain and upgrade the add-ons directly in the cluster.

All Amazon EKS add-ons include the latest security patches and bug fixes, and are validated by AWS to work with Amazon EKS. With Amazon EKS add-ons, you can consistently ensure that your Amazon EKS clusters are secure and stable and reduce the amount of work that you need to do in order to install, configure, and update add-ons.

```
Self-managed Amazon EKS default add-ons will not appear in the AWS Management Console. You can convert self-managed add-ons to managed by manually reinstalling them using the methods previously mentioned.
```

### Third-party add-ons

Amazon EKS clusters often contain many outside products such as ingress controllers, continuous delivery systems, monitoring tools, and other workflows. These types of add-ons are installed and configured by you. When you are planning to upgrade the Kubernetes version of your cluster, you must identify all the agents, operators, and services that are compatible with the new cluster version. In some cases, you might need to also test new versions of the add-ons in the upgraded cluster to validate the add-on is ready for production usage. Ultimately, you need to determine the correct order to upgrade components during the cluster upgrade cycle.

Minor releases of Kubernetes often make changes to the built-in APIs, which means any third-party add-ons must be reviewed to ensure that they are not using deprecated APIs and configured for any new APIs.

### Summary of third-party add-on challenges

- Test and validate third-party add-on dependencies.
- Determine the correct order to upgrade components.
- Plan for API changes.

### Amazon EKS managed add-ons

![EKS managed](https://i.imgur.com/Y2Uc1Gg.png)

1. **List of managed add-ons**: To locate the Amazon EKS managed add-ons, choose the Configuration tab, then choose the Add-ons sub-tab.
2. **Add-ons**: The available managed add-ons are shown in separate cards. The Amazon EKS cluster shows three managed add-ons; coredns, kube-proxy, vpc-cni
3. **Add-on Management**: Amazon EKS cluster administrators have a choice to edit, remove, or add new add-ons to the cluster. Choosing the EDIT button will provide options to upgrade add-ons

## Knowledge Check 8

**Which of the following is an Amazon EKS default add-on? (SELECT TWO)**

1. Kubernetes API server
2. Amazon VPC Container Network Interface (CNI) ✅
3. kubelet
4. kube-proxy ✅

**When will Amazon Elastic Kubernetes Service (Amazon EKS) manage add-on updates? (Select TWO.)**

1. When the add-on was installed using the AWS Management Console ✅
2. When the add-on was installed using kubectl
3. When the add-on was installed using eksctl without a configuration file
4. When the add-on was installed using eksctl with a configuration file ✅

## Managing upgrades

### Overview

New Kubernetes versions can introduce significant changes. The impact of these changes can vary greatly, even among upgrades of the same type. In this section, you examine the Amazon EKS upgrade process along with various upgrade strategies for your Amazon EKS worker nodes.

### Upgrading an Amazon EKS cluster

Upgrading an Amazon EKS cluster is a nontrivial task and requires careful planning. When you run Kubernetes on Amazon EKS, you have the benefit of AWS managing the upgrade of your Kubernetes control plane when you are ready to proceed. The Amazon EKS platform defines which Kubernetes versions are supported in Amazon EKS.

When deciding whether to upgrade to a new Kubernetes version, consider the following:

- What is the benefit of upgrading to the next version of Kubernetes?
- Which team is responsible for completing the upgrade of a Kubernetes version?
- What downstream components such as nodes and add-ons will also need to be upgraded?
- In what order will the downstream dependencies need to get upgraded?
- What impact will there be to applications during the upgrade?
- Do any applications in the ecosystem use Kubernetes APIs? Consider doing an impact analysis to these applications as well.

### Amazon EKS upgrade process

Any upgrade plan must take into account how the Amazon EKS cluster upgrade occurs. The following is the sequence of events that occur during the cluster upgrade.

1. **API server nodes**: During an upgrade, Amazon EKS launches new API server nodes with the upgraded Kubernetes version to replace the existing ones. Amazon EKS performs standard infrastructure and readiness health checks for network traffic on these new nodes to verify they are working as expected.
2. **Automatic rollback**: If any of these checks fail, Amazon EKS reverts the infrastructure deployment and your cluster remains on the previous Kubernetes version. Running applications are not affected and your cluster is not left in an unrecoverable state. Amazon EKS regularly backs up all managed clusters and mechanisms exist to recover clusters if necessary.
3. **Possible minor service interruptions**: To upgrade the cluster, Amazon EKS requires two to three free IP addresses from the subnets provided when you created the cluster. If these subnets do not have available IP addresses, then the upgrade can fail. Additionally, if any of the subnets or security groups provided during cluster creation have been deleted, the cluster upgrade process can fail.
4. **Upgrade nodes and Kuberneted add-ons**: Amazon EKS does not modify any of your running applications, cluster worker nodes, Amazon EKS add-ons, or Kubernetes add-ons when you upgrade your cluster's control plane. You will need to perform the necessary tasks to complete the cluster upgrade process.

### Upgrading cluster worker nodes

- **Self-managed nodes**: Upgrade using AWS CloudFormation template, eksctl, and kubectl.
- **Managed group nodes**: Upgrade using the AWS Management Console or eksctl.
- **AWS Fargate**: No node upgrades are required. Underlying infrastructure is upgraded automatically.

### Selecting an upgrade strategy for worker nodes

The worker node upgrade process depends mainly on whether workers nodes are in a managed group or a self-managed group. The following sections provides high-level details for both types of groups.

### Managed worker nodes

If you are running managed node groups, Amazon EKS automatically updates your nodes for you when you initiate a managed node group update. When you upgrade a managed node group version, Amazon EKS does the following:

- Amazon EKS creates a new Amazon EC2 launch template version for the EC2 Auto Scaling group associated with your node group. The new template uses the target AMI for the upgrade.
- The EC2 Auto Scaling group is upgraded to use the latest launch template with the new AMI.
- The EC2 Auto Scaling group maximum size and desired size are incremented to ensure that new EC2 instances are created along with your existing EC2 instances.
- The EC2 Auto Scaling group launches a new instance with the new AMI to satisfy the increased size of the node group.
- Amazon EKS checks the nodes in the node group for the eks.amazonaws.com/nodegroup-image label. Amazon EKS cordons all nodes in the node group that are not labeled with the latest AMI ID. This prevents nodes that have already been upgraded from a previous failed upgrade from being cordoned.
- Amazon EKS randomly selects a node in your node group and sends a termination signal to the EC2 Auto Scaling group. Then Amazon EKS sends a signal to drain the pods from the node. After the node is drained, it is terminated. This step is repeated until all nodes are using the new AMI version.
- The EC2 Auto Scaling group maximum size and desired size are decremented by 1 to return to your pre-upgrade values.

There are two options for the update strategy:

1. **Rolling update** – This option respects PodDisruptionBudgets for your cluster. The update fails if Amazon EKS is unable to gracefully drain the pods that are running on this node group because of a PodDisruptionBudget issue.
2. **Force update** – This option does not respect PodDisruptionBudgets. It forces node restarts.

### Self-managed worker nodes

If you are upgrading self-managed node groups, then you have two strategies to consider:

- **Migrate to a new node group** – Create a new node group and migrate your pods to that group.
- **Update the existing self-managed node group** – Update the CloudFormation stack for an existing node group to use the new AMI.

Between these two methods, migrating to a new node group is the preferred upgrade strategy because it is more graceful than updating the AMI ID in an existing CloudFormation stack. The migration process drains the old nodes after a new stack is ready to accept the existing pod workload.

### Example: Migrating to new self-managed node group

![migrating](https://i.imgur.com/Qcwd4bA.png)

1. **Suspend Scheduling**: One of the first steps during an upgrade is to suspend scheduling on old node groups
2. **Start application migration**: Use tools such as Flagger for canary deployments with a fallback mechanism in place. You can greatly reduce risk by pushing one application at a time to new nodes to verify compatibility.
3. **Large node groups**: Be careful with using this method with large node groups that are already straining resource availability.

## Knowledge Check 9

**What is the recommended method to update self-managed Amazon Elastic Kubernetes Service (Amazon EKS) cluster nodes to a new version of Kubernetes?**

1. Replace the nodes with the new AMI and migrate your pods to the new group. ✅
2. Amazon EKS automatically updates your cluster nodes when you update the control plane.
3. Deploy Update pods as a DaemonSet to each node.
4. Update the AWS CloudFormation stack for the node group to use the new AMI.

**Which tools are used to upgrade a managed node group? (Select TWO.)**

1. AWS Management console ✅
2. kubectl
3. AWS CLI
4. eksctl ✅

## Primary cost drivers in EKS

### Overview

Part of the Six Pillars of the AWS the Well-Architected Framework is cost optimization, which is summarized as running systems to deliver business value at the lowest price point. This lesson describes the primary drivers of cost in Amazon EKS with a specific attention to compute cost options using the framework as the point of reference.

### Amazon EKS pricing model

The control plane of an Amazon EKS cluster makes up the smallest amount of cost as represented in the following graphic. Compute resources makes up the largest source of cost for the cluster.

![pricing](https://i.imgur.com/YpYAj6V.png)

1. **Compute resources**: Compute services (Amazon EC2 and AWS Fargate) are likely to make up the majority of the cost of the EKS cluster. The total cost of ownership differs depending on which compute resource is running in the cluster. The difference in overall cost between running your workloads on Fargate or with EC2 instances depends on the practice of rightsizing and reducing the waste of underutilized compute capacity.
2. **Networking services**: Amazon EKS clusters can use a variety of networking and content-delivery services, such as load balancers, that contribute to overall costs.
3. **Control Plane**: You incur a charge per cluster, but this cluster charge makes up a small part of the overall cost.

### What does an Amazon EKS cluster cost?

A review of a simplified Amazon EKS cluster diagram provides an initial step for calculating the cost of running an Amazon EKS cluster consisting of compute and networking resources. The following reference architecture shows an example of a viable Amazon EKS cluster. As the architecture is for reference, additional components (additional storage, networking, and so forth) are excluded.

The reference architecture of an Amazon EKS cluster shown consists of the following AWS objects that incur costs:

![reference](https://i.imgur.com/3PKcSoA.png)

The diagram shows that compute services such as Amazon EC2 instances have the largest impact on cost for an Amazon EKS cluster. The actual amount depends on the instance type.

![diagram](https://i.imgur.com/wvLShHq.png)

### Managing compute costs

AWS provides a variety of different purchasing options for compute resources that act as the worker nodes in your cluster.

![demand](https://i.imgur.com/VCjKaUl.png)

- **On-demand**: Pay for the compute resources your workloads actually consume as they consume those resources. This is a good choice for workloads with spikes in demand that are stateful or do not tolerate interruption well.

![savings](https://i.imgur.com/LTk41ZG.png)

- **Savings plan or reserved instances**: Savings Plans and Reserved Instances are good choices for steady-state workloads such as databases
- **Compute Savings Plans**: Savings Plans are a flexible pricing model that offer low prices on Amazon EC2 and Fargate usage in exchange for a commitment to a consistent amount of usage (measured in dollars per hour) for a 1- or 3-year term. When you sign up for a Savings Plan, you will be charged the discounted Savings Plans price for your usage up to your commitment.
- **Reserved Instances**: Commit to a certain amount of compute for 1 or 3 years at a discounted price. Amazon EC2 Reserved Instances provide a significant discount compared to On-Demand pricing and provide a capacity reservation when used in a specific Availability Zone or Region.

![spot](https://i.imgur.com/G1y7aj2.png)

- **Spot or Fargate Spot**: Take advantage of unused Amazon EC2 capacity in the AWS Cloud, paying much less than On-Demand Instances without the commitment of Reserved Instances. This is a good choice for stateless or other fault-tolerant workloads, even if they experience spikes in demand.

### How managed services reduce cost

Amazon EKS is itself a great example of a managed service that removes the undifferentiated heavy lifting of managing your cluster’s control plane. You can also make greater use of managed services within Amazon EKS by using managed node groups instead of manually managing your worker nodes.

Using managed services accomplishes the following:

- Reduces your total cost of ownership by saving on engineering hours
- Enhances productivity because people can focus on development
- Improves security, stability, and compliance

### To learn more

In this lesson, you learned about the Amazon EKS pricing model and the primary drivers of cost for an EKS cluster. You can calculate your Amazon EKS cluster architecture cost using the AWS Pricing Calculator (https://calculator.aws/#/).

## Knowledge Check 10

**Which of the following is the largest cost driver for Amazon Elastic Kubernetes Service (Amazon EKS)?**

1. Compute resources ✅
2. Networking resources
3. Amazon EKS instances
4. Amazon CloudWatch

**When are on-demand cluster nodes a good choice for workloads?**

1. When workloads have spikes in demand that are stateful or do not tolerate interruption well ✅
2. In stateless or other fault-tolerant workloads
3. In steady-state workloads such as databases
