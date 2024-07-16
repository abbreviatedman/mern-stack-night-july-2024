# AWS: Containers

---

## Objectives:

- Describe the history, technology, and terminology behind containers
- Differentiate containers from bare-metal servers, and virtual machines
- Recognize the drivers for using container-based workloads today

---

## What is a Container?

A Container is a standardized unit of software, designed to run quickly & reliably, on any computing environment that is running the Containerization Platform. Containers are a form of virtualization that is implemented on the Operating System level. Containers are lightweight, stand-alone packages that include everything needed to run an application such as code, runtime, system tools, system libraries, and settings. A single server can host several containers that all share the underlying host system's OS kernel. These containers might be services that are a part of larger enterprise application, or they might be seperate applications that are running in their isolated environment.

---

## How do Containers differ from other forms of virtualization?

### Virtualization & abstraction

Technical maturity is often associated with increased levels of abstraction. With bare metal servers, the architectual layers (such as the infrastructure and application software layers) are built. For example, you install an operating system on top of your server hardware, install any shared libraries on top of that operating system, and then install the applications that use those libraries. This is how things have been running for a long time. Please see the following visual stack:

![Bare-metal-Servers](https://i.imgur.com/jvzI0rX.png)

The issue with this architecture is that it's massively inefficient. Your hardware costs are the same, whether you're running at 0% utilization or 100% utilization. All your applications are fighting for the same resources, and you have to keep the versions of libraries in sync with all of your applications. If one application needs an updated version of a library that is incompatible with other applications running in that host, then you run into problems. You can increase agility by putting a virtualization platform over the operating system:

![Virtual-machines](https://i.imgur.com/ICRrvBv.png)

Now you've isolated applications and their libraries with their own full operating system, into a virtual machine. This improves utilization, because you can add more VM's to run on top of the existing hardware, greatly reducing your physical footprint. The downside to VM's is that the virtualization layer is heavy. In the above example, you now have 4 Operating Systems on the host instead of 1. That means more patching, more updates, significantly more space being taken up on a physical host. There's also significant redundancy. You've installed (potentially) the same operating system 4 times, and (potentially) the same library 3 times. This is what Containers attempt to solve:

![Containers](https://i.imgur.com/DArsgB7.png)

The container run time shares the Operating System's kernel enabling you to create container images using file system layers. Containers are light-weight, efficient, and fast. They can be spun up & spun down faster than a virtual machine, allowing better utilization of the underlying hardware. You can share libraries when needed, but you can also have library isolation for your applications. Containers are also highly portable. Because containers isolate software from the other containers, their code runs identically in different environments.

### Docker as a virtualization platform

Docker:

- Released in March 2013
- lightweight container virtualization platform
- Provides tools to create, store, manage, and run containers
- Easily integrates with automated build, test, and deployment pipelines

Benefits:

- **Portable** runtime application environment
- Package application and dependencies in a **single, immutrable artifact**
- Ability to run different application versions with different dependencies **simultaneously**
- **Faster** development and deployment cycles
- Better **resource utilization and efficiency**

### Images: Templates for Containers

Much of the work behind containers comes from this concept of a "container image". An "Image" is a `Read-only` template for creating a container. A running container is an instance of that image. You can create an image from scratch, or you can use images that were created by others and published to a public or private registry. An image is usually based on another image, with some customization. For example, you can create an image based on the Ubuntu Linux image in a registry. However it installs a web server and your application, in addition to the essential configuration details, to make your application run.

![images](https://i.imgur.com/EijExwE.png)

### Examples: Dockerfiles

**Each line of the Dockerfile adds a layer to the image**

To build your own image, you create a Dockerfile using a simply syntax to define how to create the image and run it. Each instruction in a Dockerfile creates a `Read-only` layer in the image.

Let's look at a few examples:

![layer1](https://i.imgur.com/6eOPbVt.png)

In this first simple example, you start with the Ubuntu latest image already created for you, hosted on Dockerhub or some other site, and all you're doing is adding a command `echo "Hello world"` after the container is spun up.

Now here's a slightly more involved example where you want to run a Java application:

![layer2](https://i.imgur.com/GWL3zOw.png)

You start with the openjdk version 8 image, copy over the jar file that contains your code from your system to the container, and then call Java to run your code. So when this container is instantiated, it runs that Java application.

Here's a more real-world example of a Dockerfile:

![layer3](https://i.imgur.com/gl8eh7y.png)

You start with a cent OS 7 image, next update the OS and install apache, now expose port 80, finally copy over your shell scripts for your application and give it executable permissions. The command, when this container is instantiated, is to run that shell script.

And here's what that looks like in terms of layers:

![allLayers](https://i.imgur.com/5et6tux.png)

Each instruction in the Dockerfile creates a layer. We have the base layer of the software update & the apache installation, we have a layer that opens & exposes port 80, we have the layer of the shell script being copied over, and we have a layer of making that shell script executable. These layers are all `Read-only`, making the container image an immutable object. If you change the Dockerfile and rebuild the image (change port 80 to 8080 for example), only those layers that have changed are rebuilt (EXPOSE 8080). This is part of what makes container images so lightweight, small, and fast compared with other virtualization technologies.

### Docker Images vs Containers

Let's review our terminology:

![ContainerImage](https://i.imgur.com/EzhBX2I.png)

A **Container Image** is a `Read-only` immutable template that's highly portable. You can port it to any environment that supports Docker, and it can be stored in a registry for free-use.

![manyContainers](https://i.imgur.com/2EcoilV.png)

A **container** is an instance of that image. You can spin up one container, or several containers based on that image. Each container has a thin `Read/Write` layer on top of the existing image when it's instantiated. This is what makes the actual spinning-up of the containers fast. Most of the actual work is `Read-only` because of the file system layers. Valkyrie uses a copy-on-write system whereby changed files are written to the `Read/Write` layer of the container. The underlying image remains unchanged. This is why multiple containers can share access to the same underlying image, but still have their own data state. When a container is deleted, this writeable layer is also deleted. The `Read/Write` layer of the container allows your applications to function properly while they are running, but it is not designed for long-term data storage. Persistent data should be stored in a volume somewhere. Consider a container to be a discrete _compute_ unit, not a _storage_ unit.

### Knowledge check

What is the difference between containers and virtual machines?

A. Containers share the underlying host system's OS Kernel.
B. Every Container goes through a full OS boot-up cycle.
C. Containers can take a long time to start.
D. All of the above.

Which of the following is true about Docker?

A. Provides tools to build, manage, and deploy containers.
B. Leverages file system layers to be lightweight and fast.
C. Creates container images that can be modified by running containers.
D. Both A & B

## What are the advantages of a microservice environment?

Containers are often associated with microservice environments. In this topic, we'll review what a microservice architecture is, and why containers are so well-suited for it.

### Traditional vs. microservice architectures

One of the strongest factors driving the growth of containers is the rise of microservice architectures. **Microservices** are an architectural & organizational approach to software development designed to speed up deployment cycles. The approach fosters innovation & ownership while improving maintainability & scalability of software applications.

Consider this example of a traditional architecture:

![Traditional](https://i.imgur.com/3zRyFux.png)

All the processes for one of the applications are tightly coupled and run as a single service. This means that if one process of the application experiences a spike in demand, the entire architecture must be scaled. Adding or improving features becomes more complex as the code base grows, which limits experimentation and makes it difficult to implement new ideas. Monolithic architectures also add risk for application availability because many dependent & tightly-coupled processes increase the impact of a single process failure. And you can see there is a lot of redundancy of function across the applications.

Now consider the same 3 applications running in a microservice architecture:

![Microservice](https://i.imgur.com/SUqqClK.png)

Each application is built as an independent component that runs as a service and communicates by using lightweight API operations. Each service that performs a single function that can support multiple applications. Because they are independently run, services can be updated, deployed, and scaled, to meet demands from specific functions of an application. We also see a migration away from dedicated servers, to an abstracted hardware layer, where microservices can be intelligently placed based on needs, such as performance & resiliance.

All of this decomposition allows for much quicker iteration, automation, and overall agility:

![Microservice2](https://i.imgur.com/LVojMpc.png)

### Characteristics of microservices

![Characteristics](https://i.imgur.com/PjLExSP.png)

- Decentralized, evolutionary design
- Smart endpoints, dumb pipes
- Independent products, not projects
- Designed for failure
- Disposability
- Development and production parity

### Knowledge Check

Which of the following is NOT TRUE of microservices architectures?

A. Decompose monolithic applications into smaller pieces
B. Create faster development and test cycles
C. Work well within container-based workloads
D. Requite that all applications be developed in the same programming language

Which of the following can be public or private storage for Docker images?

A. Image holder
B. Binder
C. Registry
D. Container box
