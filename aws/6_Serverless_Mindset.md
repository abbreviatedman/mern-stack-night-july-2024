# AWS: Serverless Mindset

---

## Objectives:

- A Familiar Architecture
- How can Serverless help?
- Managed Services Connected by Functions
- From Hours to Minutes with Parallelization
- More Environments, More Innovation

---

## A Familiar Architecture

In this course we’ll orient you to the key concepts of the AWS Serverless Platform and explain a little bit about the differences between traditional infrastructure designs and serverless architectures.

![simple](https://i.imgur.com/nVCu4U6.png)

Let’s start by taking a look at something familiar -

a really simple web service where clients are talking to your service over http.

![v1](https://i.imgur.com/kMNO5La.png)

If you were to start to build this, you might start with a really simple architecture where you just deploy a web application on top of a single server such as an Amazon EC2 instance.

You’d probably also setup a database of some sort to persist data, but overall this is a pretty basic deployment model to start with.

So now the application’s deployed, but what happens when you start to get more users and more traffic?

![scale](https://i.imgur.com/iyzaqB6.png)

You can scale vertically to some extent but eventually you’re going to outgrow the capacity of a single instance.

![horizontal](https://i.imgur.com/CXaxFAH.png)

So to address this, you can horizontally scale the application by putting a load balancer in front of multiple instances.

And this is great, now you can easily add more servers to handle as much load as you need, but now there’s the issue of cost management.

Most applications don’t have a perfectly constant load on them at all times.

You might get more traffic midday during the week than you do in the middle of the night on a weekend for instance, and with the current architecture you have to provision for your peak load and continue to pay for those servers even when they are idle.

![autoscaling](https://i.imgur.com/BpHAlFU.png)

But in a cloud environment, this problem is easy enough to solve. You can simply add an Auto Scaling group to automatically provision and terminate instances based on your application’s traffic patterns.

So now you can handle all the traffic when your service is under heavy load, but minimize your costs when it’s not getting as much traffic.

Now, in addition to elastically scaling your app, you probably also want to ensure it’s highly available and fault tolerant.

![high availability](https://i.imgur.com/MGeYaMh.png)

You want to make sure that you’re spreading your instances across multiple availability zones in order to ensure that, even if there's a failure of a single data center, your users will still be able to access your service.

This is also easy to implement. You just make sure the load balancer and auto scaling group are configured to spread your instances across availability zones.

So now you’ve got a highly available architecture that elastically scales to handle your peak traffic load while still saving costs during off-peak hours.

And this is a very, very common architecture that's been successfully deployed thousands of times by many different customers.

However, there are multiple things that you as an application architect or developer need to be concerned with when you build and operate a system like this.

![manage](https://i.imgur.com/3l3zZao.png)

First, you have your own code and all of the custom logic that’s unique to your business or product.

Then you've got a whole list of other considerations that deal with how to manage the infrastructure, how do you provision instances, how do you ensure the servers are healthy, what metric are you going to use to determine when it’s time to scale out and scale in?

What’s interesting about this list on the right is that the best practices for how to handle these are very, very similar across customers.

![heavy machinery](https://i.imgur.com/2wDgx2c.png)

There's very little that’s business specific about how you would approach most of these issues.

![app code](https://i.imgur.com/INjpJOB.png)

And this is exactly the kind of ‘undifferentiated lifting’ that can be offloaded to AWS allowing you to focus more on the things that are unique to your particular business.

And this is really the driving force behind the AWS serverless platform.

## How can Serverless help?

So let’s take a look at how this architecture changes in a serverless world.

![essentials](https://i.imgur.com/s9QqMTZ.png)

If you really boil it down to the simplest terms, the essential components of this system are: requests coming in from your clients; some sort of code running in the middle that implements your business logic; and then the backend services that code integrates with like a database or other APIs and downstream services.

![ess2](https://i.imgur.com/JPa4N5V.png)

So if you start to think through this in more abstract terms, HTTP requests can be considered events that have some meaning to our service.

In the middle you have code that handles these events or what we would call “the handler”.

And then you have some set of backend services that handler interacts with.

And this abstract view of our architecture is the exact same model that AWS Lambda uses.

![serverless](https://i.imgur.com/w13fm9Q.png)

You have event sources that might be anything from an http request, to a change being made to a security group, to a new object being created in S3, or an update being made to a DynamoDB table.

Then you have the Lambda function itself. This is the handler where you implement your business logic. You can write Lambda functions in a number of different languages including JavaScript, python, java, C#, or Go. And all of the other infrastructure concerns we talked about earlier are managed for you.

And finally, there’s the backend -- whether that’s a database, other AWS services or third party APIs. You can access any network endpoint from your code the same way you would in a traditional deployment model.

So let’s take a look at what it takes to build and deploy a Lambda function.

It’s really a pretty simple process.

![build](https://i.imgur.com/WUe10gG.png)

You write code the same way that you would for any other application. The only constraint is that you provide a handler method that serves as an entry-point to your code.

Then you package that code up into a zip archive. This is just a standard zip file that you can create on any computer.

And then you upload that zip to the Lambda service,

Then, based on how you’ve configured event sources for your function, your code will be run automatically in response to those events as they occur.

The Lambda service takes care of provisioning the underlying compute and runtime environments and making sure your code gets deployed as needed so you don’t have to worry about the typical deployment steps that are common in server-based architectures.

We’ve taken a look at the AWS Lambda service specifically and talked a little bit about some of the benefits of serverless architectures, but what does the term “serverless” really mean?

When we refer to something as servereless there are really 4 characteristics we’re talking about.

![no server management](https://i.imgur.com/Iv1dVE9.png)

First, it means you never have to deploy or manage hosts.

You don't have to deal with operating system, or runtime patching, or any of the other concerns that you would normally have to deal with if you had a fleet of servers that were under your control.

![flexible](https://i.imgur.com/GmcRFix.png)

Next is this concept of flexible scaling.

The services that are part of the AWS serverless platform either scale automatically in response to the load you're sending them, or they allow you to define capacity in terms of the unit of work in question.

So instead of having to scale in terms of number of cpu cores, or system memory, you get to define capacity in terms of the total amount of work being done; the amount of data sent to a stream, or reads and writes made to a database for instance.

In this way, serverless provides a much more natural way to define the scaling parameters of your application.

![automated](https://i.imgur.com/Aalvprg.png)

The next characteristic is automated high availability and fault tolerance.

As we looked at in that original architecture diagram in the more traditional set up, distributing your application deployment across multiple availability zones & removing single points of failures is a very important concept within cloud architecture.

One of the great things about the serverless platform is that all of that is taken care of for you automatically.

There's not even a check box to check to say “I want this service or this deployment to be highly available”. It just is by default. There's no way to turn it off.

![no idle](https://i.imgur.com/N24cGWP.png)

And the last piece is looking at Lambda specifically.

You never pay for idle capacity.

You‘re only charged for the total invocations of your function, and the amount of time that your function is actually running.

So if you handle a request and it takes you three hundred milliseconds to process, you're only going to get billed for that three hundred milliseconds.

Then, if you don't receive any more requests after that, there’s no ongoing cost for the function if it’s not being used.

This means that you no longer have to think about capacity management and elastic scaling of your application. Utilization and cost management at that level is now AWS’s problem.

This makes capacity planning a much easier exercise because you never have to worry about whether you are over or under provisioned, you only pay for the capacity you use.

![benefits](https://i.imgur.com/2n4glGv.png)

When you look at all of these characteristics, you can really think of serverless as amplifying the benefits of cloud computing.

Whatever reasons drove you to transition from an on-premises data center into a cloud computing environment, those same benefits get amplified when you move to serverless.

For instance, in a physical data center it could be potentially weeks or even months to get new capacity provisioned.

When you move to virtual servers in the cloud, that same task is on the order of minutes or seconds.

But when you go serverless, the process of provisioning servers goes away entirely.

Capacity is automatically provisioned without your having to think about it.

Same thing with high availability.

In the physical world you would have to literally build more data centers and think about flood plains and power grids to achieve a truly highly available setup.

When you’re in the cloud. It’s a simple configuration change that you can update to just deploy servers in multiple availability zones and the rest of those considerations, are taken care of for you.

And in the serverless world, high availability is a managed feature that’s part of the platform itself and you no longer have to invest any engineering thought whatsoever in order to take advantage of it.

And I think this is really important. I’m always surprised how many mission critical enterprise applications still have planned maintenance windows, or worse frequent unplanned outages. These days, high availability is table stakes for any application and the great thing about serverless is that you can now build on top of services that provide that for you out of the box without significant design effort on your part.

As we talk about the things that change in the transition from traditional to serverless architectures, one of the biggest benefits is lower overall costs. And these savings come across three different areas.

![infrastructure](https://i.imgur.com/nruF2he.png)

First are the infrastructure costs that we talked about a bit already -never paying for idle.

Because you never pay for idle compute capacity, you never have servers that are just sitting around waiting for work to do and that can significantly reduce the amount of spend that you have on the infrastructure itself.

When you really look at aggregate utilization of servers in an enterprise IT environment it’s typically very low, and all of those wasted CPU cycles represent potential cost savings if you were to move to a serverless architecture.

![operational](https://i.imgur.com/ZGoltGd.png)

There are also operational costs to consider -all of the stuff that's involved in managing and provisioning and securing servers; dealing with host configurations, creating machine images; and working out how to roll those out and deploy software onto individual servers.

Now instead of having engineering resources focused on routine infrastructure layer concerns, you can redeploy those engineering resources to work on differentiated business value instead.

This isn’t to say there are no longer operational concerns with serverless applications, but instead of monitoring and managing infrastructure, your operations team can now focus on actually monitoring the business value of the application itself.

You can get really deep insights into how the application is impacting your business as opposed to just trying to keep track of cpu utilization and patch levels on individual hosts.

In that sense there's a significant amount of potential savings from an engineering resource perspective that serverless unlocks.

![reduced time](https://i.imgur.com/BAG5GGT.png)

The last piece which I think is often times underestimated is the savings you can see in terms of reduced time to market.

When you move from a world where you have to provision servers up front, to a serverless world, it becomes trivial to deploy a highly scalable application in a very short amount of time.

So you can get a prototype of a simple web service that's capable of scaling up and handling thousands or more requests per second in a day or two in a lot of cases.

In fact, we’ve seen customers get their first exposure to serverless because someone decided to spend a weekend solving a problem they had been struggling with for months using their traditional stack.

While the direct infrastructure and operations savings we discussed are great we often hear from customers that this enhanced agility is the biggest win they see when they adopt serverless.

## Knowledge Check 1

**What types of potential cost savings should you evaluate when comparing serverless vs. server-based design? Select all that apply.**

1. Reduced cost of idle server capacity ✅
2. Benefit of shifting operational engineering focus to tasks that better differentiate the business ✅
3. Faster time to market ✅

## Managed Services Connected by Functions

Now I want to talk through a couple of other paradigm shifts that come along with migrating from a traditional application architecture into a serverless one.

One of the biggest keys to getting the most out of serverless architectures is figuring out how to leverage the right managed service for various pieces of your application.

![more than lambda](https://i.imgur.com/8Z7bVwH.png)

We’ve talked a lot about Lambda thus far, and of course that’s a core component of the serverless platform,

But there are a number of other services that are part of the broader serverless toolset that are critical to building effective architectures, and the key is to leverage as many of these services as you can to take care of the core primitive application layer concerns.

For example:

![amazon api gateway](https://i.imgur.com/bc2GwE6.png)

- Use Amazon API Gateway to manage your restful APIs. This service lets you offload a lot of the complexity of managing authentication and authorization as well as throttling and many other API considerations.

![dynamodb](https://i.imgur.com/psKHyjI.png)

![s3](https://i.imgur.com/0VjsPMw.png)

- persist data to a managed no sql database like amazon DynamoDB or an object store like S3 instead of managing your own database clusters.

![kinesis](https://i.imgur.com/4XRMDKg.png)

![sns sqs](https://i.imgur.com/OjCPkUt.png)

- use Kinesis Data Streams for streaming data from external systems or manage messaging flows using SNS and SQS.

Then use individual Lambda functions to connect all of those pieces together in order to build larger, more sophisticated applications.

![step](https://i.imgur.com/aH42n0V.png)

You can also use AWS Step Functions to combine multiple AWS Lambda functions into applications and microservices, without having to write code to manage parallel processes, error handling, timeouts or retries.

![dev tools](https://i.imgur.com/Wi6tObS.png)

And you can use AWS developer tools to streamline deployments and automate a continuous delivery pipeline.

All of these services help address a particular aspect of your application and provide you with tools that can be used without having to manage the underlying infrastructure.

![monolith](https://i.imgur.com/K3XoezQ.png)

If you look at a monolithic application or even one that has a more service-oriented architecture in a server-based environment, you’re responsible for all of these components - everything from the code that lives inside of this monolithic application layer, to managing and deploying the databases, as well as any other services and storage you're dealing with on the backend.

![serverless](https://i.imgur.com/uvN89zZ.png)

Moving to a serverless design is really about assigning all of these various concerns to managed services and then connecting them together with decoupled Lambda functions that implement your specific business logic.

To make this type of serverless architecture work effectively, you have to focus on building event-oriented services.

Instead of starting from ”what’s the data that I’m storing and what operations do I need to perform against that”, you focus on “what are the events that should trigger something in my system” .

![event](https://i.imgur.com/iKbdfUj.png)

And this opens up an interesting paradigm where not only are you handling inbound API requests as events, but as the data in your DynamoDB table changes, those state changes become events as well which allows you to build very loosely coupled systems that handle a very specific set of events and integrate that data with other systems.

![example](https://i.imgur.com/7oAXNj9.png)

Natively Lambda supports a wide variety of event sources.

Everything from Data stores like S3 and DynamoDB to Repositories like CloudFormation or CodeCommit as well as things like Alexa and the AWS IoT message broker can trigger Lambda functions.

Additionally, you can use the AWS SDK or CLI to trigger Lambda functions based on any event in your enterprise.

## Knowledge Check 2

**Which of these statements are true with respect to severless architectures? Select all that apply.**

1. You can use many AWS services as Lambda event sources, including Amazon API Gateway, Amazon S3, Amazon Alexa, and Amazon SQS. ✅
2. It is best practice to design independent, highly cohesive, and decoupled Lambda functions that connect other managed services together. ✅
3. Design for the data you need to store and the operations you need to perform against it.

`Rather than starting from the data you need to store and act on, start from looking at the events that should trigger something in your system. The AWS serverless platform includes a large number of other AWS services that can be used as event sources. This allows you to use Lambda functions to connect other AWS managed services into an easy to maintain application with lower operational overhead.`

### From Hours to Minutes with Parallelization

One of the other paradigm shifts that’s important to serverless adoption that’s often not obvious when people first get started is that the serverless platform allows you to scale your applications horizontally and parallelize work much more effectively than you’d be able to using server based approaches.

And that's primarily because of that “never pay for idle” characteristic.

With serverless, you don't have to worry about over provisioning.

You don’t have to provision thousands of servers to do a relatively short-lived task at a very high degree of parallelization.

You don’t have to worry about cleaning any of those servers up or paying for them when they're not doing work anymore.

Now that's all taken care of for you under the covers by Lambda.

![parallel](https://i.imgur.com/c4NAhb8.png)

What’s interesting is that many of the tasks that we do in computing can often be broken down into parallelizable subtasks.

What used to take an hour to complete could be broken down into 360 separate ten-second long tasks.

So now you're able to complete the same amount of work that used to take an hour in only ten seconds of wall clock time.

And because of the Lambda pricing model, the cost for doing that same amount of work in either of these two models ends up being roughly equivalent.

The overhead that you used to have for provisioning enough capacity in order to do extremely highly parallelized work is no longer present in the serverless model.

So now, tasks that previously you never would have even considered parallelizing start to make sense to do so.

There are a number of different kinds of examples of how you might employ this approach.

Let’s walk through an example from a serverless case study where a company leveraged Lambda and parallelization in an interesting way.

![video transcoding](https://i.imgur.com/o4dupqZ.png)

In this case, the application takes video source files from a number of different sources -

-everything from short video clips to very long high-resolution clips -

and then runs those clips through their transcoding service so that they can optimize clips for different output formats.

For example, creating formats for a super high resolution tv as well as for mobile devices that might be bandwidth constrained.

So source files are uploaded to their system and they transcode them into different formats and resolutions.

Typically, video transcoding is something that has been a very serial type of process where you take a single video file and process it on a single node in order to transform it into a different format.

![](https://i.imgur.com/DHbJbP3.png)

But this customer came up with a mechanism where they could transcode individual segments of a larger file in parallel and then of merge the pieces back together on the back end.

They use Amazon s3 as kind of a staging area where they can drop in source files, and then use “ranged gets” within s3 to pull specific sub segments of each individual video file.

So they can transcode a bunch of small timeslices of a single video in parallel.

They are able to then take these individual trans coded slices, put them into an intermediate bucket, and then have another Lambda function run to merge all of those pieces together.

![savings](https://i.imgur.com/oUCky7Q.png)

And by parallelizing that initial transcoding step, they were able to see significant savings both in terms of their overall compute costs, as well as the amount of time that it takes.

They were able to improve the average time it takes to transcode a video from between 4 and 6 hours down to ten minutes.

And they were able to reduce their overall infrastructure costs by a factor of ten, moving from sixty thousand to six thousand dollars a month.

This is just one kind of example of how you can really leverage some of the innate properties of serverless in order to both improve performance and simultaneously improve your overall cost model.

Another interesting example around parallelization is pywren .

pywren is an open source project that allows you to do extremely high throughput computing jobs using Lambda as the compute engine behind the scenes.

This gives you the ability to write a very simple python script that runs on your local machine that then delegates out to Lambda functions in order to massively scale out and parallelize the compute.

A lot of high-performance computing type jobs running mathematical models and simulations that can now be done in a fraction of the time that it used to take, without having to do any of the infrastructure management that you used to have to worry about.

![pywren open source](https://i.imgur.com/RmTtT1h.png)

The team that built pywren has run some benchmarks and was able to achieve 40 terraflops of compute and download data from S3 at an aggregate rate of 80 gigabytes per second. Historically you would have had to invest a lot of time and money in building a high-performance compute cluster to reach this level of performance, but now anyone with an AWS account can install pywren, write some Python code and have access to a massive quantity of compute capacity in a matter of minutes.

## Knowledge Check 3

\***\*\_\_\_\_** is an open-source project that allows you to do extremely high throughput computing jobs using AWS Lambda as the compute engine behind the scenes.\*\*

✅ **_pywren_** ✅

`pywren is an open source project that allows you to do extremely high throughput computing jobs using Lambda as the compute engine behind the scenes. This gives you the ability to write a very simple python script that runs on your local machine that then delegates out to Lambda functions in order to massively scale out and parallelize the jobs that you're doing. `

## More Environments, More Innovation

### Create More Environments

Another shift in your thinking for serverless, is in the way that you manage environments and deployments.

One of the really interesting things that we see as customers move to serverless is that they are able to provision more environments, which is an interesting benefit that’s often overlooked.

When you’re building custom software, you obviously have a production environment and then typically some sort of stage environment and maybe a QA or test environment, but that's usually it because every one of these environments entails provisioning and operational costs just to keep the servers running.

But much of the time, your non-prod environments are not getting a significant amount of steady traffic, and as a result, you end up paying a lot of money for not as much benefit.

![setup](https://i.imgur.com/l33yxN3.png)

But in a serverless architecture, you open up the ability now to give every single developer an environment that mimics production exactly.

![environment](https://i.imgur.com/9m5Qend.png)

Similarly, from a ci/cd perspective, now you can create independent demo environments for every single feature branch that you create for your application.

Now as your teams are working on various features and bug fixes, you can have an automatically deployed environment that's ready to go.

Any time a stakeholder wants to preview new functionality, or if a developer wants to get feedback on something that they're working on, that's available to them immediately without having to try and mock it out on their local machine or go and beg someone else to get off of the qa environment so they can deploy an update with the latest code from their branch.

All of that is taken care of with serverless and now feasible to do from a cost perspective because you're not having to pay for a bunch of idle servers to sit around.

If you deploy a few of these environments that never really get used, the cost is minimal.

![critical automation](https://i.imgur.com/1jNoUM8.png)

One corollary to that, though, is that automation becomes particularly critical.

I think automation is very important regardless of what kind of architectural patterns you're using.

And I think that more and more, we're learning that any time you're building software, automating the build and deployment process, and creating mechanisms by which you can repeatedly deploy your software across environments is an important practice that any development team should be using.

However, in serverless environments, this is particularly important, in order to really take advantage of the power fo the platform.

You’re able to give your developers this ability to easily deploy and test their code in production-like environments in a way that they haven’t been able to do in the past.

And so tools like AWS SAM, which we talk about in more depth in other courses, are really critical.

It’s also important to leverage the deployment and application management tools that exist within the community, both the ones provided by AWS directly, as well as a number of the open source and third party tools that exist out there.

## Knowledge Check 4

**Which of these reflect best practices for serverless development environments and deployment process? Select all that apply.**

1. Give each developer a sandbox environment where they can experiment. ✅
2. Create independent demo environments for feature branches. ✅
3. Automate your build and deploy process. ✅
4. Leverage deployment and application management tools within the community. ✅

`All of these are good serverless development practices. The ability to quickly spinup new environments that are the same as production, without ongoing costs of maintaining those environments is one of the key benefits for developers. This ability also makes automation even more critical for serverless environments. Tools like AWS SAM and other application management tools in the community are great resources to simplify your serverless development and deployment processes.`
