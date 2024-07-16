# Lesson: Intro to AI

---

## What this lesson covers:

- Intro to AI
- Machine Learning
- Deep Learning
- Natural Language Processing
- Computer Vision

---

## _History of AI_

![Timeline](./images/History.png)

Topics:

![AI Venn Diagram](./images/VennDiagram.png)

## _Machine Learning_

`Machine Learning (ML)` is a subset of AI that allows computers to learn from data and adjust it's behavior without being programmed by people. The process of 'learning' in this context means the machine is given a data set of inputs and outputs, and it has to write the function that turns the given inputs to the correct outputs. When it has correctly recognized a pattern, it's completed it's `training`, and has a `model` of this information that can be applied in other ways!

Imagine teaching a child how to differentiate between fruits. A simple way of doing so would be to show the child a fruit, and tell the child which fruit it is. Over time, the child will recognize what fruit is shown to them, even if they haven't seen that particular fruit before. For example, any time you show a child an apple, you would tell them that it's an apple. This is called `labelling` in the `ML` world. Once the child has seen various different fruit (so that it doesn't confuse all fruit as being an apple), and it sees a brand new apple, it will recognize it as an apple! Seeing various fruit (input) and associating it with a label (output) is called `training`. The ability to see a new fruit (input) and arrive at the correct label (output) is known as having a `trained model`. Once a child has learned a lot about classifying fruits correctly, it makes it easier to learn about new kinds of fruit they encounter in the future. The model encodes the knowledge or patterns it has learned from the training data, and it can be used for tasks like classifications, making predictions, or even generating insights from new & unseen data.

## _Deep Learning_

`Deep learning` is a subset of `ML` that focuses on the use of artificial neural networks, with many layers (hence "deep") to model and solve complex tasks. It is inspired by the structure and function of the human brain, with interconnected layers of artificial neurons that process and transform data. In the same way that some religions say that "we are created in God's image", one could say that we are creating machines "in our image". Deep learning is what allows machines to automatically discover & represent complex patterns, in order to do things such as `image & speech recognition`, `natural language processing`, and `autonomous driving`. The depth of these networks allows them to automatically learn hierarchical features from raw data, making them suitable for a wide range of real-world applications.

You can think of `DL` as a layered version of `ML`, where each layer completes a specific task. For example, `DL` models can accurately outline and identify tumors within X-Ray or MRI scans, which would be difficult with traditional image processing techniques. The first layer detects basic shapes, like edges and corners. The second layer combines these shapes to recognize simple objects like lines and curves. As you move deeper into the network, these layers become more specialized and capable of identifying complex images like eyes, hearts, other organs, and even build up these layers to recognize faces and people. Eventually, these layers build on a foundation of understanding to come up with a complex solution such as "this object in the human kidney is a tumor".

## _Natural Language Processing_

`Natural Language Processing (NLP)` is a subfield of AI that focuses on enabling computers to understand, interpret, and generate human language. `NLP` encompasses a range of tasks, including:

- Language understanding, used for things like text & sentiment analysis
- Language generation, used for chatbots such as GPT and voice assistants
- Language representation, used for things like automated language translation

Imagine you have a customer review for a newly released phone:

"The smartphone is fast, but the battery life is disappointing"

`NLP` can break down this sentence to understand its sentiment and key aspects. It would recognize that "fast" is a positive sentiment about speed, and "disappointing" is a negative sentiment about battery life. This understanding can help businesses analyze customer feedback at scale, and make improvements based on the sentiments of it's customers.

`NLP` basically helps process a large amount of data, and present it in a way that's helpful to human beings. By examining each word for positive / negative sentiment, important keywords, and the overall tone, it can put these pieces together to provide an insightful "report" about large language-based data. This way, `NLP` helps machines understand and work with human language effectively.

### _Computer Vision_

`Computer Vision` is a field of AI that focuses on allowing computers to interpret and understand visual information (ie. images & videos) in ways that humans do. Here are some practical applications:

- Image & Video recognition, ie. smartphones adjusting the lighting in outdoor photos
- Facial Recognition, for things like unlocking phones, or auto-tagging friends in photos
- Object Tracking, ie. taking a photo of sneakers you like to find the product online
- Autonomous navigation, implemented in Tesla & Truck Deliveries
- Medical Image Analysis, helping radiologists interpret X-rays, CT scans, MRI's and more.
