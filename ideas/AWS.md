# AWS notes

---

# Tech stack

1. AWS Amplify - Used to upload your front-end apps (similar to Render.com)
2. Elastic Beanstalk - Used to host an API (back-end server)
3. Route 53 - Used to register domain names
4. AWS Certificate Manager (ACM) - Used to manage SSL/TLS certificates

# 3rd party sites

- namecheap.com - Cheaper way to register domain names
- whois.com - Check information about a domain name and it's owner
- letsencrypt.com - 3rd part SSL/TLS Certificate manager

## How To

### Deploy the back-end server

Elastic Beanstalk requires an instance profile with specific permissions to manage resources for your environment. So before we create the application, we must create the environment. Before creating the environment, we need an instance profile.

1. Create an instance profile & role

- Navigate to IAM Console: Go to the AWS IAM Console.
- Create a Role:
- 1. In the left-hand navigation pane, click on "Roles".
- 2. Click the "Create role" button.
- 3. Select "AWS service" and then choose "Elastic Beanstalk".
- 4. Choose the "Elastic Beanstalk" use case and click "Next: Permissions".

2. Attach the following managed policies:

- AWSElasticBeanstalkWebTier
- AWSElasticBeanstalkWorkerTier
- AWSElasticBeanstalkMulticontainerDocker
- AmazonS3FullAccess
- AmazonEC2FullAccess
- AmazonRDSFullAccess
- AmazonDynamoDBFullAccess
- CloudWatchLogsFullAccess
- AWSElasticBeanstalkEhancedHealth
- AWSElasticBeanstalkService
- AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy

Create the instance profile: `aws iam create-instance-profile --instance-profile-name MasterBeanstalkInstanceProfile`
Add the "MasterBeanstalkRole" to the instance profile: `aws iam add-role-to-instance-profile --instance-profile-name MasterBeanstalkInstanceProfile --role-name MasterBeanstalkRole`
Associate the instance profile with the Elastic Beanstalk environment:
You can do this either when creating a new environment or by updating an existing one.
For example, to update an existing environment: `aws elasticbeanstalk update-environment --environment-name MCU-backend-env-test —service-role MasterBeanstalkInstanceProfile`

3. Under the Environment information, you can select a domain name and check it's availability (the URL will end in something like `us-east-2.elasticbeanstalk.com`. This URL will be used in the front-end for all database-related actions.
4. Under Platform, select `Node.js` as the platform. All other default settings are ok to keep, scroll to the bottom and select `Next`.
5. On the next page that says "Configure service access" we can skip these until we reach "Configure updates, monitoring, and logging"
6. On the "updates, monitoring, and logging" page, scroll to the bottom where you see Environment properties" and select "add environment property". Here we can add the MONGODB_URI and PORT values and select `Next`
7. On the review page, double check that you have your Environment properties set, and select `Submit`

Because our back-end is an API, it's considered a web service. We will be using Elastic Beanstalk. Find the welcome page for Elastic Beanstalk and click the orange `Create application` button.

1. Under the Environment tiers, select "Web server environment" since it is meant for API's.
2. You can give the application a name (and optionally, tags. As you being to have more and more AWS resources, the tags become better at searching and finding your resources)

### Deploy the front-end server

Use AWS Amplify as if it's render.com

### Set up an SSL/TLS certificate

Just in case AWS console gets any updates, please reference the documentation: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html

By default, any domain name you purchase will use HTTP (HyperText Transfer Protocol) instead of HTTPS (HyperText Transfer Protocol Secure).The difference between HTTP and HTTPS is that HTTPS encrypts the data exchanged between the user’s browser and the web server. This prevents eavesdropping and man-in-the-middle attacks, ensuring that sensitive information (such as passwords, credit card details, and personal data) cannot be intercepted by malicious actors. Let's say you wanted your website to use HTTPS instead of HTTP. Here is how you accomplish this:

1. In the AWS console, search for "AWS Certificate Manager (ACM)" and select it.
2. Click the orange `Request` button in the top right
3. Select "Request a public certificate" and click next
4. Type in the domain name you've purchased. Validation method should be DNS validation by default, it's recommended especially if you are hosting your website, managing the domain, AND the certificate all on AWS.
5. Once you click Request at the bottom, you will be issued a CNAME by AWS and the status of this request should be Pending.
6. On ACM, select the certificate you just requested.
7. Assuming all of these parts have been done through AWS, you should see a button that says "Create records in Route 53" then choose "Create records". The Certificate status page should open with a status banner reporting "Successfully created DN records". NOTE: YOUR NEW CERTIFICATE MIGHT CONTINUE TO DISPLAY A STATUS OF "Pending validation" FOR UP TO 30 MINUTES
8. Once the status changes to "Issued", open a new tab in the browser and test it by typing `https://YOUR_WEBSITE_NAME.com`
