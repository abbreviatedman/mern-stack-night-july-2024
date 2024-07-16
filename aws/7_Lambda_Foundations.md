# AWS: Lambda Foundations

---

## Objectives:

- Introduction to Serverless
- How AWS Lambda Works
- AWS Lambda Function Permissions
- Authoring AWS Lambda Functions
- Deploying and Testing Serverless Applications
- Monitoring and Troubleshooting

By the end of this course, you should be able to do the following:

- Define Lambda and describe how it works
- Describe the benefits of using Lambda and identify use cases
- Examine Lambda function permissions and security
- Demonstrate best practices for writing Lambda functions
- Deploy and test your serverless applications
- Explore Lambda configuration considerations
- Monitor and troubleshoot Lambda functions

---

## Introduction to Serverless

One of the major benefits of cloud computing is its ability to abstract (hide) the infrastructure layer. This ability eliminates the need to manually manage the underlying physical hardware. In a serverless environment, this abstraction allows you to focus on the code for your applications without spending time building and maintaining the underlying infrastructure. With serverless applications, there are never instances, operating systems, or servers to manage. AWS handles everything required to run and scale your application. By building serverless applications, your developers can focus on the code that makes your business unique.

### Serverless operational tasks

The following chart compares the deployment and operational tasks in a traditional environment to those in a serverless environment. The serverless approach to development reduces overhead and lets you focus, experiment, and innovate faster.

![chart](https://i.imgur.com/3xwFeJr.png)

### AWS serverless platform

The AWS serverless platform includes a number of fully managed services that are tightly integrated with AWS Lambda and well-suited for serverless applications. Developer tools, including the AWS Serverless Application Model (AWS SAM), help simplify deployment of your Lambda functions and serverless applications.

![](https://i.imgur.com/SBVwklQ.png)

### What is AWS Lambda?

AWS Lambda is a compute service. You can use it to run code without provisioning or managing servers. Lambda runs your code on a high-availability compute infrastructure. It operates and maintains all of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, code monitoring, and logging. With Lambda, you can run code for almost any type of application or backend service.

Some benefits of using Lambda include the following:

- You can run code without provisioning or maintaining servers.
- It initiates functions for you in response to events.
- It scales automatically.
- It provides built-in code monitoring and logging via Amazon CloudWatch.

### AWS Lambda features

1. **Bring your own code**: You can write the code for Lambda using languages you already know and are comfortable using. Development in Lambda is not tightly coupled to AWS, so you can easily port code in & out of AWS.

2. **Integrates with and extends other AWS services**: Within your Lambda function, you can do anything traditional applications can do, including call an AWS SDK or invoking a third-party API, whether on AWS, in your datacenter, or on the internet.

3. **Flexible resource & concurrency model**: Instead of scaling by adding servers, Lambda scales in response to events. You configure memory settings and AWS handles details such as CPU, network, and I/O throughput.

4. **Flexible permissions model**: The Lambda permissions model uses AWS Identity & Access Management (IAM) to securely grant access to the desired resource and provide fine-grained controls to invoke your functions.

5. **Availability and fault tolerance are built in**: Because Lambda is a fully manages service, high availability and fault tolerance are built into the service without needing you to perform any additional configuration.

6. **Pay for value**: Lambda functions only run when you initiate them. You can pay only for the compute time that you consume. When the code is invoked, you are billed in 1-millisecond (ms) increments.

### Event-driven architectures

An event-driven architecture uses events to initiate actions and communication between decoupled services. An event is a change in state, a user request, or an update, like an item being placed in a shopping cart in an e-commerce website. When an event occurs, the information is published for other services to consume it. In event-driven architectures, events are the primary mechanism for sharing information across services. These events are observable, such as a new message in a log file, rather than directed, such as a command to specifically do something.

### Producers, routers, consumers

AWS Lambda is an example of an event-driven architecture. Most AWS services generate events and act as an event source for Lambda. Lambda runs custom code (functions) in response to events. Lambda functions are designed to process these events and, once invoked, may initiate other actions or subsequent events.

![event driven](https://i.imgur.com/y8VxLbq.png)

1. **Event producers**: Producers create the events. Events contain all of the information required for the consumers to take action on the event. Producers are only aware of the event router. They do not know who the consumer is.

2. **Event router**: The router ingests, filters, and pushes events to the appropriate consumers. It uses a set of rules or another service such as Amazon Simple Notification Service (SNS) to send the messages.

3. **Event consumers**: Consumers either subscribe to receive notifications about events or they monitor an event stream and only act on events that pertain to them.

4. **Events**: An event is a change in state of whatever you are monitoring, for example an updated shopping cart, or an entry in a log file, or a new file uploaded to Amazon Simple Storage Service (Amazon S3).

5. **Amazon EventBridge**: EventBridge can ingest and filter events using rules to forward them only to the consumers who need to know.

6. **Events sent**: The events are sent only to the consumers who subscribed to them. For example, the warehouse would subscribe to Order, Inventory, and Question events. The warehouse needs to see complete orders and returns, and needs to answer customer questions about whether an item is out of stock. The financial system would subscribe to Order, and Inventory events so they could charge and refund credit cards. It doesn't need to answer customer questions, so it would not subscribe to Question events.

7. **Warehouse Management Database**: The Question, Order, and Return events prompts the warehouse to update inventory and item availability.

8. **Financial system**: The Order and Inventory events prompt the finance system to update based on the sale and return of items.

9. **Customer Service**: Customer service would subscribe to Order and Question events so the customer service team can respond. They wouldn't subscribe to the inventory events because inventory is not a function of their job.

### What is a Lambda function?

The code you run on AWS Lambda is called a Lambda function. Think of a function as a small, self-contained application. After you create your Lambda function, it is ready to run as soon as it is initiated. Each function includes your code as well as some associated configuration information, including the function name and resource requirements. Lambda functions are stateless, with no affinity to the underlying infrastructure. Lambda can rapidly launch as many copies of the function as needed to scale to the rate of incoming events.

After you upload your code to AWS Lambda, you can configure an event source, such as an Amazon Simple Storage Service (Amazon S3) event, Amazon DynamoDB stream, Amazon Kinesis stream, or Amazon Simple Notification Service (Amazon SNS) notification. When the resource changes and an event is initiated, Lambda will run your function and manage the compute resources as needed to keep up with incoming requests.

![function](https://i.imgur.com/xVijALD.png)

- **Access Permissions**: Define what services Lambda is permitted to interact with.
- **Triggering Events**: Specify which events or event sources can initiate the function.
- **Write your Function**: Provide the code and any dependencies or libraries necessary to run your code.
- **Configure Execution Parameters**: Define the execution parameters such as memory, timeout, and concurrency.

## Knowledge Check 1

**Which of the following are features of Lambda? (Select FOUR.)**

1. You can run code without privisioning or managing servers. ✅
2. It initates functions on your behalf in response to events. ✅
3. You don't need to configure memory or CPU.
4. It scales automatically. ✅
5. It provides built-in monitoring and logging. ✅
6. You can update the operating system dynamically.

`With AWS Lambda, you can run code without provisioning or managing servers. Lambda initiates events on your behalf, scales automatically, and provides built-in monitoring and logging. You can write code in your preferred language. You do configure the memory for your function, but not CPU. You don't work with the OS. AWS provides the operating environment at runtime.`

## How AWS Lambda Works

To understand event driven architectures like AWS Lambda, you need to understand the events themselves. This section dives in to how events initiate functions to invoke the code within.

### Invocation models for running Lambda functions

Event sources can invoke a Lambda function in three general patterns. These patterns are called invocation models. Each invocation model is unique and addresses a different application and developer needs. The invocation model you use for your Lambda function often depends on the event source you are using. It's important to understand how each invocation model initializes functions and handles errors and retries.

### Synchronous Invocation

- **Synchronous Invocation**: When you invoke a function synchronously, Lambda runs the function and waits for a response. When the function completes, Lambda returns the response from the function's code with additional data, such as the version of the function that was invoked. Synchronous events expect an immediate response from the function invocation.

With this model, there are no built-in retries. You must manage your retry strategy within your application code.

The following diagram shows clients invoking a Lambda function synchronously. Lambda sends the events directly to the function and sends the function response directly back to the invoker.

![sync](https://i.imgur.com/Yz07zLc.png)

- **Synchronous AWS Services**: The following AWS services invoke Lambda synchronously:

- - Amazon API Gateway
- - Amazon Cognito
- - AWS CloudFormation
- - Amazon Alexa
- - Amazon Lex
- - Amazon CloudFront

### Asynchronous invocation

- **Asynchronous invocation**: When you invoke a function asynchronously, events are queued and the requestor doesn't wait for the function to complete. This model is appropriate when the client doesn't need an immediate response.

With the asynchronous model, you can make use of destinations. Use destinations to send records of asynchronous invocations to other services. (Select the Destinations tab for more information.)

The following diagram shows clients invoking a Lambda function asynchronously. Lambda queues events before sending them to the function.

![async](https://i.imgur.com/YtlSILR.png)

- **Async with AWS Service integration**: The following AWS services invoke Lambda asynchronously:

- - Amazon SNS
- - Amazon S3
- - Amazon EventBridge

- **Destinations**: A destination can send records of asynchronous invocations to other services. You can configure separate destinations for events that fail processing and for events that process successfully. You can configure destinations on a function, a version, or an alias, similarly to how you can configure error handling settings. With destinations, you can address errors and successes without needing to write more code.

The following diagram shows a function that is processing asynchronous invocations. When the function returns a success response or exits without producing an error, Lambda sends a record of the invocation to an EventBridge event bus. When an event fails all processing attempts, Lambda sends an invocation record to an Amazon Simple Queue Service (Amazon SQS) queue.

![destination](https://i.imgur.com/TARoIJZ.png)

### Polling invocation

- **Polling**: This invocation model is designed to integrate with AWS streaming and queuing based services with no code or server management. Lambda will poll (or watch) these services, retrieve any matching events, and invoke your functions. This invocation model supports the following services:

- Amazon Kinesis
- Amazon SQS
- Amazon DynamoDB Streams

With this type of integration, AWS will manage the poller on your behalf and perform synchronous invocations of your function.

With this model, the retry behavior varies depending on the event source and its configuration.

- **Event Source Mapping**: The configuration of services as event triggers is known as event source mapping. This process occurs when you configure event sources to launch your Lambda functions and then grant theses sources IAM permissions to access the Lambda function.

Lambda reads events from the following services:

- - Amazon DynamoDB
- - Amazon Kinesis
- - Amazon MQ
- - Amazon Managed Streaming for Apache Kafka (MSK)
- - self-managed Apache Kafka
- - Amazon SQS

### Invocation model error behavior

When deciding how to build your functions, consider how each invocation method handles errors. The following chart provides a quick outline of the error handling behavior of each invocation model.

![chart](https://i.imgur.com/XttvYLQ.png)

## Knowledge Check 2

**Which statements about invocation models are correct? (Select THREE.)**

1. Amazon S3 triggers Lambda via an asynchronous push. ✅
2. Amazon API Gateway triggers Lambda synchronously. ✅
3. When Alexa is the event source, Lambda will make three attempts to invoke the function before putting the failed invocation into the dead letter queue (DLQ).
4. DynamoDB must have an execution role to invoke Lambda.
5. Amazon SQS triggers Lambda via the polling invocation model. ✅

`Alexa is a synchronous event source, so Lambda will not attempt to retry the invocation. `

### Lambda execution environment

Lambda invokes your function in an execution environment, which is a secure and isolated environment. The execution environment manages the resources required to run your function. The execution environment also provides lifecycle support for the function's runtime and any external extensions associated with your function.

### Execution environment lifecycle

![phases](https://i.imgur.com/KOSKduI.png)

When you create your Lambda function, you specify configuration information, such as the amount of available memory and the maximum invocation time allowed for your function. Lambda uses this information to set up the execution environment.

The function's runtime and each external extension are processes that run within the execution environment. Permissions, resources, credentials, and environment variables are shared between the function and the extensions.

1. **Init Phase**

![init](https://i.imgur.com/3Siq5M7.png)

In this phase, Lambda creates or unfreezes an execution environment with the configured resources, downloads the code for the function and all layers, initializes any extensions, initializes the runtime, and then runs the function’s initialization code (the code outside the main handler).

The Init phase happens either during the first invocation, or before function invocations if you have enabled provisioned concurrency.

The Init phase is split into three sub-phases:

- 1. Extension init - starts all extensions
- 2. Runtime init - bootstraps the runtime
- 3. Function init - runs the function's static code

These sub-phases ensure that all extensions and the runtime complete their setup tasks before the function code runs.

2. **Invoke Phase**

![invoke](https://i.imgur.com/ktimOS7.png)

In this phase, Lambda invokes the function handler. After the function runs to completion, Lambda prepares to handle another function invocation.

3. **Shutdown Phase**

If the Lambda function does not receive any invocations for a period of time, this phase initiates. In the Shutdown phase, Lambda shuts down the runtime, alerts the extensions to let them stop cleanly, and then removes the environment. Lambda sends a shutdown event to each extension, which tells the extension that the environment is about to be shut down.

### Performance optimization

Serverless applications can be extremely performant, thanks to the ease of parallelization and concurrency. While the Lambda service manages scaling automatically, you can optimize the individual Lambda functions used in your application to reduce latency and increase throughput.

### Cold and warm starts

A cold start occurs when a new execution environment is required to run a Lambda function. When the Lambda service receives a request to run a function, the service first prepares an execution environment. During this step, the service downloads the code for the function, then creates the execution environment with the specified memory, runtime, and configuration. Once complete, Lambda runs any initialization code outside of the event handler before finally running the handler code.

In a warm start, the Lambda service retains the environment instead of destroying it immediately. This allows the function to run again within the same execution environment. This saves time by not needing to initialize the environment.

![time](https://i.imgur.com/CYRphSD.png)

1. **Start container and download code**: When a function is invoked, AWS starts the runtime environment and downloads your code to that environment.
2. **Initialize the runtime**: Lambda initializes the environment for the selected runtime.
3. **Initialize packages & dependencies**: Lambda initializes your packages and dependencies.
4. **Invoke code**: The function code runs in the prepared environment.

- **Cold Start**: When an invokation is routed to a new execution environment, Lambda must initialize the environment, download the code, initialize the runtime, and initialize any packages or dependencies required by your function. This is the "cold start" latency.
- **Warm start**: When an invocation gets routed to an environment that is already available for the function, it gets a "warm start" and Lambda only needs to run the code.
- **AWS optimization**: AWS is responsible for optimizing the time it takes to start up the environment and initiate the runtime.
- **Your optimization**: You are responsible for optimizing the speed with which the packages and dependencies required for the function are initialized.
- **Billing begins here**: Pointing to AWS optimization, Billing starts after the runtime has been initialized.

### Best practice: Minimize cold start times

When you invoke a Lambda function, the invocation is routed to an execution environment to process the request. If the environment is not already initialized, the start-up time of the environment adds to latency. If a function has not been used for some time, if more concurrent invocations are required, or if you update a function, new environments are created. Creation of these environments can introduce latency for the invocations that are routed to a new environment. This latency is implied when using the term cold start. For most applications, this additional latency is not a problem. However, for some synchronous models, this latency can inhibit optimal performance. It is critical to understand latency requirements and try to optimize your function for peak performance.

After optimizing your function, another way to minimize cold starts is to use provisioned concurrency. `Provisioned concurrency` is a Lambda feature that prepares concurrent execution environments before invocations.

![](https://i.imgur.com/d6T8t0d.png)

If you need predictable function start times for your workload, provisioned concurrency ensures the lowest possible latency. This feature keeps your functions initialized and warm, and ready to respond in double-digit milliseconds at the scale you provision. Unlike with on-demand Lambda, this means that all setup activities happen before invocation, including running the initialization code.

### Best practice: Write functions to take advantage of warm starts

1. Store and reference dependencies locally.
2. Limit re-initialization of variables.
3. Add code to check for and reuse existing connections.
4. Use tmp space as transient cache.
5. Check that background processes have completed.

## Knowledge Check 3

**Match the Lambda lifecycle steps with the correct phase. (Drag the items in the left column to the correct items on the right column.)**

| Left                                                                                  | Right             |
| ------------------------------------------------------------------------------------- | ----------------- |
| 🔵 The event source initiates an invocation of a Lambda function                      | 🟢 Init phase     |
| 🟢 Lambda creates or unfreezes an execution environment with the configured resources | 🔵 Invoke phase   |
| 🔴 Lambda shuts down the runtime.                                                     | 🔴 Shutdown Phase |

## AWS Lambda Function Permissions

With Lambda functions, there are two sides that define the necessary scope of permissions – permission to invoke the function, and permission of the Lambda function itself to act upon other services. Because Lambda is fully integrated with AWS Identity and Access Management (IAM), you can control the exact actions of each side of the Lambda function.

![](https://i.imgur.com/CTyG8Hu.png)

Permissions to invoke the function are controlled using an IAM resource-based policy. An IAM execution role defines the permissions that control what the function is allowed to do when interacting with other AWS services. Look at the full interaction of these two permission types and then explore each one in further detail.

![policies](https://i.imgur.com/UMyBZZd.png)

### Execution role

The execution role gives your function permissions to interact with other services. You provide this role when you create a function, and Lambda assumes the role when your function is invoked. The policy for this role defines the actions the role is allowed to take — for example, writing to a DynamoDB table. The role must include a trust policy that allows Lambda to “AssumeRole” so that it can take that action for another service. You can write the role or use the managed roles (with predefined permissions) provided by Lambda to simplify the process of creating an execution role. You can add or remove permissions from a function's execution role at any time, or configure your function to use a different role.

![execution role](https://i.imgur.com/uZK4F3A.png)

Remember to use the principle of least privilege when creating IAM policies and roles. Always start with the most restrictive set of permissions and only grant further permissions as required for the function to run. Using the principle of least privilege ensures security in depth and eliminates the need to remember to 'go back and fix it' once the function is in production.

You can also use (opens in a new tab)IAM Access Analyzer to help identify the required permissions for the IAM execution role. IAM Access Analyzer reviews your AWS CloudTrail logs over the date range that you specify and generates a policy template with only the permissions that the function used during that time.

### Example: Execution role definitions

- **IAM policy**

![IAM policy](https://i.imgur.com/6xxq1mm.png)

This IAM policy allows the function to perform the "Action": "dynamodb:PutItem" action against a DynamoDB table called "test" in the us-west-2 region.

- **Trust policy**

![trust policy](https://i.imgur.com/ihClTn6.png)

A trust policy defines what actions your role can assume. The trust policy allows Lambda to use the role's permissions by giving the service principal lambda.amazonaws.com permission to call the AWS Security Token Service (AWS STS) AssumeRole action.

This example illustrates that the principal "Service":"lambda.amazonaws.com" can take the "Action":"sts:AssumeRole" allowing Lambda to assume the role and invoke the function on your behalf.

### Resource-based policy

A resource policy (also called a function policy) tells the Lambda service which principals have permission to invoke the Lambda function. An AWS principal may be a user, role, another AWS service, or another AWS account.

![resource policy](https://i.imgur.com/Q17lMXr.png)

Resource policies make it easy to grant access to the Lambda function across separate AWS accounts. For example, if you need an S3 bucket in the production account to invoke your Lambda function in the Prod-2 account, you can create a new IAM role in Prod-2 and allow production to assume that role. Alternatively, you can include a resource-based policy that allows production to invoke the function in Prod-2.

The resource-based policy is an easier option and you can see and modify it via the Lambda console. A consideration with cross-account permissions is that a resource policy does have a size limit. If you have many different accounts that need to invoke the function and you have to add permissions for each account via the resource policy, you might reach the policy size limit. In that case, you would need to use IAM roles instead of resource policies.

### Policy comparison

- **Resource-based policy**

Lambda resource-based (function) policy

- - Associated with a "push" event source such as Amazon API Gateway
- - Created when you add a trigger to a Lambda function
- - Allows the event source to take the lambda:InvokeFunction action

- **Execution role**

IAM execution role

- - Role selected or created when you create a Lambda function
- - IAM policy includes actions you can take with the resource
- - Trust policy that allows Lambda to AssumeRole
- - Creator must have permission for iam:PassRole

### Distinct permissions for distinct purposes

The following example provides a simple analogy to highlight how these two different components handle Lambda permissions.

![IAM resource](https://i.imgur.com/65PuQl2.png)

![lambda](https://i.imgur.com/I9kFVMc.png)

![execute](https://i.imgur.com/io9hmBV.png)

### Ease of management

For ease of policy management, you can use authoring tools such as the AWS Serverless Application Model (AWS SAM) to help manage your policies. For a Lambda function, AWS SAM scopes the permissions of your Lambda functions to the resources used by your application. You can add IAM policies as part of the AWS SAM template. The policies property can be the name of AWS managed policies, inline IAM policy documents, or AWS SAM policy templates. AWS SAM is discussed in more detail later in this course.

### Example resource policy

The following is a basic resource policy example.

- The policy has an Effect of "Allow". The Effect can be Deny or Allow.
- The Principal is the Amazon S3 "s3.amazonaws.com" service. This policy is allowing the Amazon S3 service to perform an Action.
- The Action that S3 is allowed to perform is the ability to invoke a Lambda function "lambda:InvokeFunction" called "my-s3-function".

![example](https://i.imgur.com/LcE5TxA.png)

### Resource policies and execution roles on the AWS Lambda console

![console](https://i.imgur.com/YN3JBVj.png)

- **Lambda permissions on the console**: From the Lambda console, choose the function you are working with, then choose the `Configuration` tab and `Permissions` to reveal the execution role and resource policy associated with the function.
- **Execution role details**: To show the details of the IAM policy for the execution role, choose `Edit`
- **Execution role**: The resource summary list s each resource that is part of the function's execution role. Select the `By action` or the `By resource` tab to see the actions the function is permitted to take with that resource.
- **Resource-based policy**: The resource-based policy (function policy) for a Lambda functions shows the permissions to invoke the function. Adding a trigger to your Lambda function from the console automatically generates the function policy.

### Accessing resources in a VPC

Enabling your Lambda function to access resources inside your virtual private cloud (VPC) requires additional VPC-specific configuration information, such as `VPC subnet IDs` and `security group IDs`. This functionality allows Lambda to access resources in the VPC. It does not change how the function is secured. You also need an execution role with permissions to create, describe, and delete elastic network interfaces. Lambda provides a permissions policy for this purpose named "AWSLambdaVPCAccessExecutionRole".

### Lambda and AWS PrivateLink

To establish a private connection between your VPC and Lambda, create an interface VPC endpoint. Interface endpoints are powered by AWS PrivateLink, which enables you to privately access Lambda APIs without an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.

Instances in your VPC don't need public IP addresses to communicate with Lambda APIs. Traffic between your VPC and Lambda does not leave the AWS network.

## Knowledge Check 4

**What IAM entities must be included in an execution role for a Lambda function to interact with other services, such as DynamoDB? (Select TWO.)**

1. IAM policy that defines the actions that can be taken within DynamoDB ✅
2. Trust policy that grants "AssumeRole" permission to Lambda to act on DynamoDB ✅
3. IAM group defining users of the Lambda function
4. IAM user with admin permissions to Lambda and DynamoDB

`You need both the IAM policy that defines the actions Lambda can take and a trust policy that grants Lambda the "AssumeRole" permission. You do not have to create any IAM users or groups to allow Lambda to take action.`

**Which of these statements describe a resource policy? (Select THREE.)**

1. Must be chosen or created when you create a Lambda function
2. Can give Amazon S3 permission to initiate a Lambda function ✅
3. Can give Lambda permission to write data to a DynamoDB table
4. Can grant access to the Lambda function across AWS accounts ✅
5. Determines who has access to invoke the function ✅
6. Determines what Lambda is allowed to do

```
A resource policy determines who is allowed in (who can initiate your function, such as Amazon S3), and it can be used to grant access across accounts.

An execution role must be created or selected when creating your function, and it controls what Lambda is allowed to do (such as writing to a DynamoDB table). It includes a trust policy with AssumeRole.
```

## Authoring AWS Lambda Functions

In this lesson, you will learn the best practices for writing Lambda function code. You will also explore building functions based on the nature of your application and your development tool set. Begin by looking at the programming model and how it applies across the available programming languages. With Lambda, you can use the programming language and integrated development environment (IDE) that you are most familiar with.

### AWS Lambda programming model: Use your own code

With Lambda, you can use your own code. You can use the programming language and IDE that you are most familiar with and use the code that you've already written. The code might need some minor adjustments to make it serverless. However, you do not need to redo the bulk of the work to fit Lambda's programming model. Lambda supports the following languages:

![supported](https://i.imgur.com/YzFPyoR.png)

AWS provides plugins for a number of popular IDEs, such as Visual Studio Code (VSCode), Eclipse, IntelliJ, and PyCharm. Lambda also supports custom runtimes(opens in a new tab).

### Start with the handler method

The Lambda function handler is the method in your function code that processes events. When your function is invoked, Lambda runs the handler method. When the handler exits or returns a response, it becomes available to handle another event. The handler method takes two objects – the event object and the context object.

- **Event object**

- - The event object is required.
- - When your Lambda function is invoked in one of the supported languages, one of the parameters provided to your handler function is an event object.
- - The event object differs in structure and contents, depending on which event source created it.
- - The contents of the event parameter include all of the data and metadata your Lambda function needs to drive its logic.
- - - For example, an event created by Amazon API Gateway will contain details related to the HTTPS request that was made by the API client (for example, path, query string, request body). An event created by Amazon S3 when a new object is created will include details about the bucket and the new object.

- **(Optional) Context Object**

- - The context object allows your function code to interact with the Lambda execution environment.
- - The contents and structure of the context object vary, based on the language runtime your Lambda function is using. At minimum it contains the elements:
- - - `AWS RequestID` – Used to track specific invocations.
- - - `Runtime` – The amount of time in milliseconds remaining before a function timeout.
- - - `Logging` – Information about which Amazon CloudWatch Logs stream your log statements will be sent.

### Design best practices

When designing and writing Lambda functions, regardless of the runtime you’re using, it is best practice to separate the business logic (the part of the code the defines the real-world business need) from the handler method. This makes your code more portable and you can target unit-tests at the code without worrying about the configuration of the function.

It is also a best practice to make your functions modular. For example, instead of having one function that does compression, thumb-nailing, and indexing, consider having three different functions that each serve a single purpose.

Because your functions only exist when there is work to be done, it is particularly important for serverless applications to treat each function as stateless. That is, no information about state should be saved within the context of the function itself.

**Separate Business Logic**

Separate your core business logic from the handler event.

![](https://i.imgur.com/sYhTqdo.png)

This makes your code more portable and you can target unit-tests on your code without worrying about the configuration of the function.

**Write modular functions**

![](https://i.imgur.com/LObnFnh.png)

Module functions will reduce the amount of time that it takes for your deployment package to be downloaded and unpacked before invocation. Instead of having one function that does compression, thumb-nailing, and indexing, consider having three different functions that each serve a single purpose.

Follow the same principles you would apply to developing microservices.

**Treat functions as stateless**

No information about state should be saved within the context of the function itself.

Because your functions only exist when there is work to be done, it is particularly important for serverless applications to treat each function as stateless. Consider one of the following options for storing state data:

- `Amazon DynamoDB` is serverless and scales horizontally to handle your Lambda invocations. It also has single-millisecond latency, which makes it a great choice for storing state information.
- `Amazon ElastiCache` may be less expensive than DynamoDB if you have to put your Lambda function in a VPC.
- `Amazon S3` can be used as an inexpensive way to store state data if throughput is not critical and the type of state data you are saving will not change rapidly.

**Only include what you need**

Minimize both your deployment package dependencies and its size.
This can have a significant impact on the startup time for your function. For example, only choose the modules that you need — do not include an entire AWS SDK.

When using TypeScript, you can consider bundling and tree shaking your dependencies.

In Java, opt for simpler dependency injection (inversion of control [IoC]) frameworks. For example, choose Dagger or Guice over more complex ones such as Spring Framework.

Reduce the time it takes Lambda to unpack deployment packages authored in Java.
Put your dependency .jar files in a separate /lib directory.

### Best practices for writing code

When it comes to writing code, there are a few practices that are important to follow.

**Include logging statements**

Lambda functions can and should include logging statements, which are written to CloudWatch.

Implement structured logging throughout your applications. Most runtimes provide libraries to help use structured logging.

Here's an example of logging using the logger function in Python.

![py log](https://i.imgur.com/HXSyYqa.png)

**Use return coding**

![return](https://i.imgur.com/xLdbl87.png)

Functions must give Lambda information about the results of their actions.

Use the return coding appropriate for your selected programming language to exit your code. For languages such as Node.js, Lambda provides additional methods on the context object for callbacks. You use these context-object methods to tell Lambda to terminate your function and optionally return values to the caller.

**Provide Environment Variables**

Take advantage of environment variables for operational parameters.

You can use these parameters to pass updated configuration settings without changes to the code itself. You create an environment variable on your function by defining a key and a value. Your function uses the name of the key to retrieve the value of environment variable.

You can also use environment variables to store sensitive information required by the function.

Lambda encrypts the environment variables with a key that it creates in your account (an AWS managed customer master key [CMK]). Use of this key is free. You can also choose to provide your own key for Lambda to use instead of the default key. Customer managed CMKs incur standard AWS Key Management Service (AWS KMS) charges.

**Add secret and reference data**

AWS Secrets Manager helps you organize and manage important configuration data such as credentials, passwords, and license keys.

Parameter Store, a capability of AWS Systems Manager, is integrated with Secrets Manager so you can retrieve Secrets Manager secrets when using AWS Lambda. By using Parameter Store to reference Secrets Manager secrets, you create a consistent and secure process for calling and using secrets and reference data in your code and configuration scripts. Parameter Store also integrates with AWS Identity and Access Management (IAM), giving you fine-grained access control to individual parameters or branches of a hierarchical tree.

Additionally, you can use AWS AppConfig to source, validate, deploy, and monitor configurations stored in Parameter Store, System Manager Document Store, Amazon S3, and more.

**Avoid recursive code**

Avoid a situation in which a function calls itself.

Recursive code could lead to uncontrolled scaling of invocations that would make you lose control of your concurrency.

`*IMPORTANT*` If you accidentally deploy recursive code, you can quickly set the concurrent execution limit to zero by using the console or command line to immediately throttle requests while you fix the code.

**Gather metrics with Amazon CloudWatch**

The CloudWatch embedded metric format (EMF) is a JSON specification used to instruct CloudWatch Logs to automatically extract metric values embedded in structured log events. You can use CloudWatch to graph and create alarms on the extracted metric values.

You can use EMF to ingest complex high-cardinality application data in the form of logs and easily generate actionable metrics from them. Traditionally, it has been hard to generate actionable custom metrics from your ephemeral resources such as Lambda functions and containers.

**Resuse the execution context**

Take advantage of an existing execution context when you get a warm start by doing the following:

1. Store dependencies locally.
2. Limit re-initialization of variables.
3. Reuse existing connections.
4. Use tmp space as transient cache.
5. Check that background processes have completed.

### Example: Lambda function

![](https://i.imgur.com/UFhdPIO.png)

## Knowledge Check 5

**Match the Lambda function terms to their definitions.**

| Left                                                                             | Right             |
| -------------------------------------------------------------------------------- | ----------------- |
| 🔵 This is generated by AWS and provides metadata about the action               | 🔴 Handler method |
| 🟢 An object with information about the event that initiated the Lambda function | 🔵 Context object |
| 🔴 An entry point that AWS Lambda calls to initate your Lambda function          | 🟢 Event object   |

`The handler method is the entry point to your Lambda function and the event object provides information about the event that initiated Lambda. The context object is generated by AWS and provides metadata about the execution, including the getRemainingTimeInMills property, which provides the remaining runtime until the function is terminated.`

### Building Lambda functions

There are three ways to build and deploy your Lambda functions – the Lambda console editor, deployment packages, and automation tools. Take a look at each of these methods in more detail.

### Lambda console editor

You can author functions within the Lambda console, with an IDE toolkit, using command line tools, or using the AWS SDKs. If you are new to Lamdba, building functions in the console is the best place to begin writing your functions. If your code does not require custom libraries (other than the AWS SDK), you can edit your code inline through the console. The Lambda console editor is based on the AWS Cloud9 IDE where you can author and test code directly. When working with Lambda via the console, note that when you save your Lambda function the Lambda service creates a deployment package that it can run. Once this deployment package is created, your function is deployed to the AWS Cloud. Because of this, you should build your functions using an account that is suitable for testing, and disable any selected triggers until your code testing is completed.

The following shows a screen capture of the Lambda console Create function window. From this window, you have four options for how to create your function. The choices are: Author from scratch, Use a blueprint, Container image, or Browse serverless app repository.

![](https://i.imgur.com/uhIHeFg.png)

### Deployment packages

Your Lambda function's code consists of scripts or compiled programs and their dependencies. As developers increase their skills and advance beyond using the AWS Lambda console, they start using deployment packages to deploy the function code. Lambda supports two types of deployment packages – container images and .zip file archives. You can create and upload a .zip file to S3 or use a container image and push to Amazon Elastic Container Registry (Amazon ECR).

### Automate using tools

Serverless applications built using Lambda are a combination of Lambda functions, event sources, and other resources defined using the AWS Serverless Application Model (AWS SAM). You can automate the deployment process of your applications by using AWS SAM and other AWS services, such as AWS CodeBuild, AWS CodeDeploy, and AWS CodePipeline.

## Knowledge Check 6

**What is the best purpose for authoring using the AWS Management Console?**

1. Small standalone applications less than 10 MB package
2. Simple one-function applications with no custom libraries and experimentation ✅
3. Packages greater than 10 MB or part of continuous integration and continuous delivery (CI/CD) managed applications

`The Lambda management console is best for simple functions with no custom libraries and is a great way to start experimenting with Lambda.`

### What is AWS SAM?

AWS SAM is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines per resource, you can define the application you want and model it using YAML. You provide AWS SAM with simplified instructions for your environment and during deployment AWS SAM transforms and expands the AWS SAM syntax into AWS CloudFormation syntax (a fully detailed CloudFormation template). All CloudFormation options are still available within AWS SAM. AWS SAM just makes it easier to set up the resources commonly needed for serverless applications.

A variety of serverless frameworks are available. Find a framework that works with your developer tool chain and minimizes the work of your execution environment. This course uses AWS SAM for serverless examples.

![SAM](https://i.imgur.com/C3fT7NI.png)

1. **AWS SAM**: AWS SAM is an application framework that simplifies creation and deployment of your serverless applications. It's actually an extension of AWS CloudFormation. You can build CloudFormation templates using a streamlined set of commands and a less verbose format.
2. **AWS SAM template is transformed**: You provide AWS SAM with simplified instructions for your environment. AWS SAM transforms that information into the fully detailed AWS CloudFormation template that you can use to build your stack into any account.
3. **AWS SAM is an extension of CloudFormation**: All AWS CloudFormation options are still available within AWS SAM. AWS SAM just makes it easier to set up the resources that are commonly needed for serverless applications.
4. **Builds the stack**: CloudFormation uses the transformed template to build your stack.

### AWS SAM prebuilt policies

AWS SAM provides a number of predefined, commonly used templates that you can use to build for least privilege security access. The list of policy templates scope the permissions of your Lambda functions to only the resources used by your application. These policies require minimal input to run and can save time on developing and deploying.

### Example: AWS SAM template

![](https://i.imgur.com/aa5GHFw.png)

![](https://i.imgur.com/v9tRPwx.png)

![](https://i.imgur.com/iUdspUL.png)

![](https://i.imgur.com/ZmI6Lc7.png)

![](https://i.imgur.com/VCv5BuK.png)

### AWS SAM CLI helps you test and deploy

AWS SAM CLI launches a Docker container that you can interact with to test and debug your Lambda functions. Note that even with a tool like AWS SAM CLI, local testing will only cover a subset of what must be tested before code should go into your production application.

![cli](https://i.imgur.com/eVh42Rd.png)

### AWS SAM CLI for testing

With AWS SAM CLI for testing, you can do the following:

- Invoke functions and run automated tests locally.
- Generate sample event source payloads.
- Run API Gateway locally.
- Debug code.
- Review Lambda function logs.
- Validate AWS SAM templates.

### AWS SAM CLI

You can install the AWS SAM CLI locally to help test your serverless applications, validate your AWS SAM templates, and streamline your deployments.

- `init`: Initializes a serverless application.
- `local`: Runs your application locally.
- `validate`: Validates an AWS SAM template.
- `deploy`: Deploys an AWS SAM application.

This command comes with a guided interactive mode, which you can enable by specifying the `--guided` parameter. The interactive mode walks you through the parameters required for deployment, provides default options, and saves these options in a configuration file in your project folder. You can initiate subsequent deployments of your application using the sam deploy command. The required parameters will be retrieved from the AWS SAM CLI configuration file.

Deploying Lambda functions through AWS CloudFormation requires an Amazon S3 bucket for the Lambda deployment package. The SAM CLI creates and manages this Amazon S3 bucket for you.

- `build`: Builds a serverless application and prepares it for subsequent steps in your workflow.

The `sam build` command processes your AWS SAM template file, application code, and any applicable language-specific files and dependencies. This command also copies build artifacts in the format and location expected for subsequent steps in your workflow.

### Serverless CI/CD pipeline

![ci/cd](https://i.imgur.com/bQimJkz.png)

You can incorporate additional tools to create an automated CI/CD pipeline for your serverless applications that integrate with AWS SAM.

- **CodeBuild** – Automate the process of packaging code and running tests before the code is deployed.
- **CodeDeploy** – Use version management options to ensure safe deployments to production.

## Knowledge Check 7

**Match the items to their appropriate description.**

| Left                       | Right                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| 🔵 CloudFormation template | 🔵 Like a house blueprint - you can treat infrastructure as code   |
| 🟢 Deploy                  | 🔴 Streamlined CloudFormation Template for serverless applications |
| 🔴 AWS SAM Template        | 🟠 Tool for local testing and debugging of serverless applications |
| 🟠 AWS SAM CLI             | 🟢 AWS SAM CLI command for deploying AWS SAM template              |

## Configuring Your Lambda Functions

When building and testing a function, you must specify three primary configuration settings: memory, timeout, and concurrency. These settings are important in defining how each function performs. Deciding how to configure memory, timeout, and concurrency comes down to testing your function in real-world scenarios and against peak volume. As you monitor your functions, you must adjust the settings to optimize costs and ensure the desired customer experience with your application.

![performance](https://i.imgur.com/cRIR0eF.png)

First, you'll review the importance of configuring your memory and timeout values. Then you'll review the billing considerations for memory and timeout values before you examine concurrency and how to optimize for it.

### Memory

![mem](https://i.imgur.com/s9hf0sY.png)

You can allocate up to 10 GB of memory to a Lambda function. Lambda allocates CPU and other resources linearly in proportion to the amount of memory configured. Any increase in memory size triggers an equivalent increase in CPU available to your function. To find the right memory configuration for your functions, use the AWS Lambda Power Tuning tool(opens in a new tab).

Because Lambda charges are proportional to the memory configured and function duration (GB-seconds), the additional costs for using more memory may be offset by lower duration.

### Timeout

![time](https://i.imgur.com/Tx8YLKR.png)

The AWS Lambda timeout value dictates how long a function can run before Lambda terminates the Lambda function. At the time of this publication, the maximum timeout for a Lambda function is 900 seconds. This limit means that a single invocation of a Lambda function cannot run longer than 900 seconds (which is 15 minutes).

Set the timeout for a Lambda function to the maximum only after you test your function. There are many cases when an application should fail fast and not wait for the full timeout value.

It is important to analyze how long your function runs. When you analyze the duration, you can better determine any problems that might increase the invocation of the function beyond your expected length. Load testing your Lambda function is the best way to determine the optimum timeout value.

Your Lambda function is billed based on runtime in 1-ms increments. Avoiding lengthy timeouts for functions can prevent you from being billed while a function is simply waiting to time out.

### Lambda billing costs

With AWS Lambda, you pay only for what you use. You are charged based on the number of requests for your functions and the duration, the time it takes for your code to run. Lambda counts a request each time it starts running in response to an event notification or an invoke call, including test invokes from the console.

Duration is calculated from the time your code begins running until it returns or otherwise terminates, rounded up to the nearest 1 ms. Price depends on the amount of memory you **_allocate_** to your function, not the amount of memory your function uses. If you allocate 10 GB to a function and the function only uses 2 GB, you are charged for the 10 GB. This is another reason to test your functions using different memory allocations to determine which is the most beneficial for the function and your budget.

In the AWS Lambda resource model, you can choose the amount of memory you want for your function and are allocated proportional CPU power and other resources. An increase in memory triggers an equivalent increase in CPU available to your function. The AWS Lambda Free Tier includes 1 million free requests per month and 400,000 GB-seconds of compute time per month.

### The balance between power and duration

Depending on the function, you might find that the higher memory level might actually cost less because the function can complete much more quickly than at a lower memory configuration.

You can use an open-source tool called Lambda Power Tuning to find the best configuration for a function. The tool helps you to visualize and fine-tune the memory and power configurations of Lambda functions. The tool runs in your own AWS account—powered by AWS Step Functions—and supports three optimization strategies: cost, speed, and balanced. It's language-agnostic so that you can optimize any Lambda functions in any of your languages.

![time v cost](https://i.imgur.com/e8vTJFn.png)

## Knowledge Check 8

**A developer has been asked to troubleshoot a Lambda function that is in production. They've been told that it runs for 5 minutes and has been asked to reduce its duration to save on billable costs. Which actions should the developer take? (Select THREE.)**

1. Test the function from the console once to confirm that it is taking 5 minutes.
2. Confirm whether 5 minutes is the typical duration through production monitoring. ✅
3. Decrease the timeout to 4 minutes.
4. Test at higher memory configurations and compare the duration and cost at each configuration. ✅
5. Check whether any unecessary SDK components are in the deployment package. ✅

```
A developer must make sure that a 5-minute duration isn't reflective of a single invocation. Instead of running it once from the console, they need to examine how it actually runs in production.



Decreasing the timeout would save costs, but it would probably mean that the function would frequently fail to complete. A best practice is to experiment with different memory configurations and estimate whether a higher memory configuration would actually be less expensive. They can also determine whether there are unnecessary components in the function itself that could be removed to speed up its initialization.
```

### Concurrency and scaling

![](https://i.imgur.com/funQkEp.png)

Concurrency is the third major configuration that affects your function's performance and its ability to scale on demand. Concurrency is the number of invocations your function runs at any given moment. When your function is invoked, Lambda launches an instance of the function to process the event. When the function code finishes running, it can handle another request. If the function is invoked again while the first request is still being processed, another instance is allocated. Having more than one invocation running at the same time is the function's concurrency.

### Concurrent invocations

As an analogy, you can think of concurrency as the total capacity of a restaurant for serving a certain number of diners at one time. If you have seats in the restaurant for 100 diners, only 100 people can sit at the same time. Anyone who comes while the restaurant is full must wait for a current diner to leave before a seat is available. If you use a reservation system, and a dinner party has called to reserve 20 seats, only 80 of those 100 seats are available for people without a reservation. Lambda functions also have a concurrency limit and a reservation system that can be used to set aside runtime for specific instances.

![](https://i.imgur.com/mP5cL7V.png)

### Concurrency Types

- **Unreserved Concurrency**: The amount of concurrency that is not allocated to any specific set of functions. The minimum is 100 unreserved concurrency. This allows functions that do not have any provisioned concurrency to still be able to run. If you provision all your concurrency to one or two functions, no concurrency is left for any other function. Having at least 100 available allows all your functions to run when they are invoked.
- **Reserved Concurrency**: Guarantees the maximum number of concurrent instances for the function. When a function has reserved concurrency, no other function can use that concurrency. No charge is incurred for configuring reserved concurrency for a function.
- **Provisioned Concurrency**: Initializes a requested number of runtime environments so that they are prepared to respond immediately to your function's invocations. This option is used when you need high performance and low latency.

You pay for the amount of provisioned concurrency that you configure and for the period of time that you have it configured.

For example, you might want to increase provisioned concurrency when you are expecting a significant increase in traffic. To avoid paying for unnecessary warm environments, you scale back down when the event is over.

### Concurrency examples and limits

![](https://i.imgur.com/RTeZeRY.png)

![](https://i.imgur.com/glNQnVF.png)

![](https://i.imgur.com/sggSsmK.png)

![](https://i.imgur.com/0FtBaaD.png)

### Reasons for setting concurrency limits

**Limit Concurrency**

Limit a function’s concurrency to achieve the following:

- Limit costs
- Regulate how long it takes you to process a batch of events
- Match it with a downstream resource that cannot scale as quickly as Lambda

**Reserve Concurrency**

Reserve function concurrency to achieve the following:

- Ensure that you can handle peak expected volume for a critical function
- Address invocation errors

### How concurrency bursts are managed

A burst is when there is a sudden increase in the number of instances needed to fulfill the requested number of running functions. An example is an increase in orders on a website during a limited time sale. The burst concurrency quota is not per function. It applies to all of your functions in the Region.

The burst quotas differ by region:

- 3000 – US West (Oregon), US East (N. Virginia), Europe (Ireland)
- 1000 – Asia Pacific (Tokyo), Europe (Frankfurt), US East (Ohio)
- 500 – Other Regions

After the initial burst, your functions' concurrency can scale by an additional 500 instances each minute. This continues until there are enough instances to serve all requests, or until a concurrency limit is reached.

The following set of images explains how bursting works with Lambda functions.

![](https://i.imgur.com/dQcivAy.png)

![](https://i.imgur.com/rSmb155.png)

![](https://i.imgur.com/BYLfsjW.png)

![](https://i.imgur.com/68oGz0b.png)

![](https://i.imgur.com/Hp4Voiy.png)

### CloudWatch metrics for concurrency

When your function finishes processing an event, Lambda sends metrics about the invocation to Amazon CloudWatch. You can build graphs and dashboards with these metrics in the CloudWatch console. You can also set alarms to respond to changes in use, performance, or error rates.

CloudWatch includes two built-in metrics that help determine concurrency: ConcurrentExecutions and UnreservedConcurrentExecutions.

- `ConcurrentExecutions`
  Shows the sum of concurrent invocations for a given function at a given point in time. Provides historical data on how functions are performing.

You can view all functions in the account or only the functions that have a custom concurrency limit specified.

- `UnreservedConcurrentExecutions`
  Shows the sum of the concurrency for the functions that do not have a custom concurrency limit specified.

### Testing concurrency

The most important factor for your concurrency, memory, and timeout settings is to verify application testing against real-world conditions. To do this, follow these suggestions:

- Run performance tests that simulate peak levels of invocations.
- - View the metrics for the amount of throttling that occurs during performance peaks.
- Determine whether the existing backend can handle the speed of requests sent to it.
- - Don't test in isolation. If you’re connecting to Amazon Relational Database Service (Amazon RDS), ensure that you test that the concurrency levels for your function can be processed by the database.
- Does your error handling work as expected?
- - Tests should include pushing the application beyond the concurrency settings to verify correct error handling.

## Knowledge Check 9

**What are some reasons a developer would set a concurrency limit (or reserve) on a function? (Select THREE.)**

1. Manage costs ✅
2. Regulate how long it takes to process a batch of events ✅
3. Match the limit with a downstream resource ✅
4. Help CloudWatch track logging events
5. Ensure that Amazon Simple Queue Service (Amazon SQS) queues are cleared efficiently
6. Limit the memory that is used

## Deploying and Testing Serverless Applications

This lesson explores the differences between server-based and serverless deployments and environments. This lesson also introduces how an application framework, such as the AWS Serverless Application Model (AWS SAM), can simplify your deployment practices. AWS SAM can make the move to serverless more efficient.

Using a real-world analogy of buying a new house, you can compare server-based deployments with serverless deployment. When you decide to buy a new house, you can buy a prebuilt house that is already standing and ready to move into or design and build a new house.

![house](https://i.imgur.com/bMAhi8I.png)

**The server-based model is the existing house that you can move into.**

Before you move in, you understand the layout and the rooms and how your family will fit into the house. You don’t need to know how the wood holds the house together or the types of nails used. You work with what’s physically already there. For example, the house has three bedrooms, two bathrooms, and a kitchen.

After you've decided to buy the prebuilt house, you pack your possessions into boxes. The moving company arrives and picks them up to bring (deploy) them to the new house. As a developer, the packing of your boxes and handing them to the movers compares with checking in your code. Then DevOps (the movers) are responsible for taking and deploying the code to the correct environment. The movers know the location of the house and which boxes go into which rooms.

### How a serverless deployment differs from a server-based deployment

![serverless](https://i.imgur.com/sDvVixg.png)

**A serverless deployment is like designing and building a house using detailed specifications.**

When you design and build a house, you must tell the builders every detail of the house:

- Number of rooms to build
- Room size
- Number of windows, doors, and light sockets
- Where to put the light sockets

These details are conveyed to the building contractors through the blueprints. A blueprint is a template of how to build every component of the house. With this blueprint, you can visualize what the house looks like, and you can use that same blueprint to build many identical houses. With serverless, everything that your Lambda function needs is included in the blueprint, called the CloudFormation Template.

![cloudformation](https://i.imgur.com/3pDmyiz.png)

**The AWS CloudFormation template is considered the blueprint for the Lambda function.**

The CloudFormation template specifies every detail of the Lambda function and the environment required for the Lambda function to run. CloudFormation provides a common language and format that all parts of AWS can read and understand.

![](https://i.imgur.com/ANuganT.png)

**CloudFormation is infrastructure as code.**

The entire infrastructure needed for your Lambda function is written to a text file. This file (template) then deploys your desired stack. A stack is a collection of AWS resources that you can manage as a single unit. The template becomes the single source of truth for deploying identical stacks into any AWS account. Each time the Lambda function is invoked, it runs by using information provided in the CloudFormation template.

### Server-based development environments

In general, a developer workflow includes the following basic steps:

1. Author code
2. Test and debug changes in isolation
3. Merge your code into the larger application code and perform application testing

In a server-based deployment, this workflow is achieved by doing the following:

1. Pulling down a local copy of the application
2. Working locally through your IDE to code
3. Testing and debugging your code
4. Checking your changes into source control

The updated code is then picked up by a build-and-deploy process. For many developers, this is when they pass the code to a DevOps team member. DevOps validates the build and deploys the updated application to designated instances. As a developer, you then have access to a particular set of development and test instances. These are the environments where you perform additional application and integration testing and debugging.

After testing is successful, DevOps follows a similar deployment process to update production instances with the tested application components. The build scripts and the environments that your code is deployed into are already established and waiting for your application code. This process is like the prebuilt house that is ready and waiting for you to move in.

To view each of the build stages for server-based application deployment, select each number in the following graphic.

![build stages](https://i.imgur.com/LxImAFo.png)

1. **Write and Edit code**: Code is written locally in the integrated development environment (IDE).
2. **Local test and debugging**: The code is tested and debugged locally until the developer feels confident in the code.
3. **Code Check-in**: The code is checked into a source control repository where it can be versioned and the DevOps team can access it.
4. **Build and Deploy**: A DevOps team member validates the build and deploys the updated application to designated test or development instances.
5. **Developer testing environments**: Developers have access to defined test instances to perform application/integration testing and debugging.
6. **Test & debug**: After the application is deployed in the development environment, the developer must test and debug the application code.

### Serverless development environments

In a serverless deployment, you provide all the components necessary to deploy your function:

- Code, bundled with any necessary dependencies
- CloudFormation template, which is the blueprint for building the serverless environment

Like a blueprint for a house, the CloudFormation template can quickly become lengthy and difficult to manage. For example, if you have an application with a single API endpoint, the CloudFormation template must include mappings for IAM roles, API Gateway endpoints, and connections to the Amazon DynamoDB table. Including these details can result in up to 100 lines of code in a simple template.

![](https://i.imgur.com/KwUYYnE.png)

**A key difference in the developer workflow is how the code and the application are tested.**

Because serverless is hosted in the cloud, no option is available to check out a local copy of the application to do localized testing. You cannot recreate the environment specified in your CloudFormation template locally. Instead, you must have access to designated AWS accounts for testing. You can then perform realistic testing of your application in the cloud. With the appropriate access permissions, you can deploy and test your stack to any development, testing, staging, or production account in your organization.

![](https://i.imgur.com/GIAusvR.png)

**AWS SAM makes serverless development easier.**

Earlier in the course, you learned that AWS SAM uses a set of CloudFormation commands. When you provide AWS SAM with simplified instructions for your environment, it transforms that information into the fully detailed CloudFormation template that you can use to build your stack. All CloudFormation options are still available within AWS SAM. The service streamlines the configuration of commonly used serverless application resources.

![](https://i.imgur.com/5V0hRKN.png)

**Ensures environmental parity**

AWS SAM streamlines the tasks for creating a stack and deploying the same stack to each account.

**Simplifies experimentation**

Without the overhead of maintaining instances, you can use AWS SAM to quickly start stacks for different feature branches. You can experiment without incurring costs outside of the actual invocations that run on that environment.

### Reduce risk using versions and aliases

One potential challenge to serverless deployments is that when the function is deployed, it becomes live immediately. This means that a function can potentially go live without testing it, which puts your working applications at risk. This risk is especially true if you move toward an automated CI/CD pipeline and need to easily promote new code or roll back if there's a problem. To mitigate this risk, you can version your Lambda functions and add aliases to ensure safe deployments.

**Versioning**:

![versioning](https://i.imgur.com/S6coXSd.png)

You can use versions to manage the deployment of your functions. For example, you can publish a new version of a function for beta testing without affecting users of the stable production version. Lambda creates a new version of your function each time that you publish the function. The new version is a copy of the unpublished version of the function.

When you create a Lambda function, only one version exists, which is identified by `$LATEST` at the end of the Amazon Resource Name (ARN).

**Publish**:

![](https://i.imgur.com/2t2F9ZC.png)

Publish makes a snapshot copy of $LATEST.

Enable versioning to create immutable snapshots of your function every time you publish it.

- Publish as many versions as you need.
- Each version results in a new sequential version number.
- Add the version number to the function ARN to reference it.
- The snapshot becomes the new version and is immutable.

**Aliases**:

![](https://i.imgur.com/i8q6y6O.png)

A Lambda alias is like a pointer to a specific function version. You can access the function version using the alias ARN. Each alias has a unique ARN. An alias can point only to a function version, not to another alias. You can update an alias to point to a new version of the function.

### Test using alias routing

You can also use routing configuration on an alias to send a portion of traffic to a second function version. For example, you can reduce the risk of deploying a new version by configuring the alias to send most of the traffic to the existing version and only a small percentage of traffic to the new version.

You can point an alias to a maximum of two Lambda function versions. The versions must meet the following criteria:

- Both versions must have the same runtime role.

- Both versions must have the same dead-letter queue configuration, or no dead-letter queue configuration.

- Both versions must be published. The alias cannot point to $LATEST.

![](https://i.imgur.com/sZUuyal.png)

![](https://i.imgur.com/abPms29.png)

### Integrate with AWS CodeDeploy

Lambda is integrated with AWS CodeDeploy for automated rollout with traffic shifting. CodeDeploy supports multiple traffic shifting methods, in addition to alarms and hooks. CodeDeploy supports the following traffic-shifting patterns:

- **Canary** – Traffic is shifted in two increments. If the first increment is successful, the second is completed based on the time specified in the deployment.
- **Linear** – With linear traffic shifting, traffic is slowly shifted in a predetermined percentage every X minutes based on how you have it configured.
- **All-at-once** – Shifts all traffic from the original Lambda function to the updated Lambda function version at once.

Additionally, it supports the following testing options:

- **Alarms** – These instruct CloudWatch to monitor the deployment and trigger an alarm if any errors occurred during rollout. Any alarms would automatically roll back your deployment.
- **Hooks** – Give you the option to run pre-traffic and post-traffic test functions that run sanity checks before traffic-shifting starts to the new version and after traffic-shifting completes.

**Note**: When the alarms or hooks trigger a rollback, everything in the CloudFormation template being deployed is rolled back. Best practice is to keep your AWS SAM templates and CloudFormation templates as concise in scope as possible. As a guideline, examine no fewer than one template per service that you are deploying.

### Shift traffic for Lambda using AWS CodeDeploy

![](https://i.imgur.com/9X88npz.png)

![](https://i.imgur.com/gYf6Tf2.png)

![](https://i.imgur.com/mxrPXx0.png)

![](https://i.imgur.com/6D20vmW.png)

## Knowledge Check

**Which statements are true? (Select THREE.)**

1. When you create a Lambda function, only one version exists: the $LATEST version. ✅
2. Versioning is a requirement for your Lambda functions.
3. You can specify a versioning number scheme that Lambda will use.
4. You can reference any version with an alias. ✅
5. You can reference a version or an alias in the Amazon Resource Name (ARN). ✅

`You can reference any version with an alias, you can reference a version or an alias in the Amazon Resource Name (ARN), and when you create a Lambda function, only the $Latest version exists.`

## Monitoring & Troubleshooting

AWS Lambda integrates with other AWS services to help you monitor and troubleshoot your Lambda functions. This lesson describes how to use these AWS services to monitor, trace, debug, and troubleshoot your Lambda functions and applications.

### Types of monitoring graphs

AWS Lambda automatically monitors Lambda functions on your behalf and reports metrics through Amazon CloudWatch. To help you monitor your code when it runs, Lambda automatically tracks the following:

- Number of requests
- Invocation duration per request
- Number of requests that result in an error

**Invocations**:

The number of times your function code is run, including successful runs and runs that result in a function error. If the invocation request is throttled or otherwise resulted in an invocation error, invocations aren't recorded.

**Duration**:

The amount of time that your function code spends processing an event. The billed duration for an invocation is the value of Duration rounded up to the nearest millisecond.

**Errors**:

The number of invocations that result in a function error. Function errors include exceptions thrown by your code and exceptions thrown by the Lambda runtime. The runtime returns errors for issues such as timeouts and configuration errors.

**Throttles**:

The number of times that a process failed because of concurrency limits. When all function instances are processing requests and no concurrency is available to scale up, Lambda rejects additional requests.

**IteratorAge**:

Pertains to event source mappings that read from streams. The age of the last record in the event. The age is the amount of time between when the stream receives the record and when the event source mapping sends the event to the function.
