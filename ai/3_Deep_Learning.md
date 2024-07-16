# Lesson: Deep Learning

---

## What this lesson covers:

- Intro
- Input Data
- Activation Functions
- Propegation
- Deep Learning Process
- CNNs & RNNs

---

## Intro

`Deep Learning` is a subfield of `ML` that utilizes multiple layers of neural networks to model and solve complex tasks. It's ability to self-learn allows it to become more efficient in various domains, such as image & speech recognition, `Natural Language Processing`, and game playing.

Let's consider Spam Filtering in emails.

- Without Deep Learning, the mechanics of it would look like simple `if / else` statements; the conditions used to filter out emails will come down to exact email addresses, certain words/phrases used in the subject line. If a `single feature` meets a certain condition, that's all it takes to label an email as "spam" and filter it out.
- With Deep Learning, the entire email will pass through the neural network and it can analyze `multiple features` at a time instead of just one. This will allow it to discern certain patterns it couldn't normally observe (ie. the email adresses a recent online purchase, but the address doesn't match any delivery service and the link leads to a suspicious looking URL).

AlphaGo (developed by DeepMind) is a famous example of Deep Learning applied to the game of Go. Deep neural networks were used to model and evaluate Go board positions. AlphaGo combined deep learning with `Reinforcement Learning` (training on un-labelled data) to improve its performance through self-play. It used `Convolutional Neural Networks (CNNs)` to analyze the board state, and `Recurrent Neural Networks (RNNs)` to handle sequences of moves. This means it uses `CNNs` to "view" the board and evaluate potential next moves, and then `RNNs` to self-play and understand possibilities multiple steps ahead. Deep learning allowed AlphaGo to learn complex strategies and become the first AI system to defeat a world champion Go player, illustrating the power of deep learning in mastering complex tasks.

## Input Data

Weighted inputs play a crucial role in determining the influence of each input feature on the model's output or prediction. Let's use the analogy of learning how to cook meals, in order to understand the importance of input data:

1. **Feature Relevance**: Not all ingredients in the recipe contribute equally to the meal's flavor. Some ingredients, like spices and seasonings, have a stronger impact on taste than others, like water or salt.

   > In a neural network, weighted inputs are like the recipe's measured ingredients, allowing the model to assign different levels of importance to each feature, just as you emphasize certain ingredients for their flavor.

2. **Model Flexibility**: Recipes can be flexible to accommodate personal preferences. You can adjust the quantity of ingredients to make the dish spicier, sweeter, or milder.

   > In a neural network, adjusting the weights during training allows the model to adapt and focus on the most important features to achieve the desired output, making it flexible and adaptable to different situations.

3. **Non-Linearity**: In cooking, you layer and mix ingredients to create complex flavors. For instance, marinating meat with spices and then grilling it results in a different taste than simply combining the ingredients.

   > Weighted inputs introduce non-linearity in a neural network by allowing the model to combine and transform features in a way that captures complex relationships and patterns, just as layering and mixing ingredients create unique flavors and textures.

4. **Bias Incorporation**: When you taste the dish during cooking, you might notice that it needs a bit more salt or sweetness to achieve the desired balance of flavors. Adding salt or sugar serves as a bias to adjust the taste.

   > In neural networks, bias terms are like adding the right amount of an ingredient to account for offsets or biases in the data, ensuring that the model's predictions are not solely determined by the input values.

5. **Interpretability**: As you cook, you taste the dish to evaluate its flavor and make adjustments. If you detect a particular ingredient is overpowering, you might reduce its quantity. This process allows you to understand the impact of each ingredient on the final dish.
   > Examining the learned weights in a neural network provides insights into the importance of different features in the dataset, helping you understand which factors the model considers most influential in making predictions.

In summary, weighted inputs are essential for neural networks to learn from data and make accurate predictions. They allow the model to assign importance to features, capture complex patterns, and adapt to different tasks, ultimately enhancing the model's ability to generalize and perform well on a wide range of tasks in deep learning.

## Activation Functions

`Activation Functions` are mathematical functions that determine whether or not (and to what extent) a neuron should fire (or be activated) based on the weighted sum of its inputs. It introduces non-linearity into the model, allowing neural networks to capture complex patterns and make nonlinear transformations of the data.

The most commonly used activation function in neural networks is the Rectified Linear Unit (ReLU). It can be represented mathematically as:

> f(x) = max(0,x)

In this equation, `x` represents the weighted sum of inputs to the neuron, and `f(x)` is the output. The ReLU function produces an output of 0 if `x <= 0`, and some sort of passing input if `x > 0`. Essentially this acts as a threshold that turns the neuron on when its input is positive.

Imagine a room with a light switch on the wall. The ReLU function is like this light switch.

- When the switch is turned down (input <= 0), the light switch is turned off and there is no light in the room (output is 0)
- When the switch is turned up (input > 0), the light switch is turned on and the room is fully illuminated

<!-- MUST RETURN TO BE MORE SPECIFIC: STEP FUNCTIONS, SIGMOID, ReLU, ETC -->

## Propegation

In AI, training a neural net involves giving it an input, observing an output, and making adjustments so that the input gets as close as possible to the expected output. Propegation can be described as the functionality that allows AI to predict what the input should be, and measure how far off it was from attaining the expected output. Here is an example:

Let's say we are teaching the AI to throw a ball into a goal. Here are the steps that should occur when it is being trained:

1. It _predicts_ how much power should be behind the next throw
2. It _throws_ the ball at the goal
3. It _measures_ how far off the ball is from the goal
4. It _learns_ from it's throw, and adapts the next prediction and input to get closer to the goal
5. It _predicts_ how much power should be behind the next throw

`Forward Propegation` in this case is the prediction that happens first.

```
     /---------\     <-- forward propegation, predict
ball/           \ goal <-- throw attempt
```

Next it will throw the ball into the goal. Here is what an ettempt looks like:

```
ball/           / goal
  \____________/     <-- back propegation 1, measure
```

The AI threw the ball too short, and made a measurement of how far off it is. This is called `Back Propegation`

```
ball/           / goal
| \____________/
|   <-- back propegation 2, learn
|  /-----------------\ <-- forward propegation, next prediction
ball/           goal  \ <-- throw attempt 2
|  \__________________/ <- back propegation: measure (again)
```

Here we see the AI made an adjustment, and threw the ball further. In between both attemps is part 2 of back propegation, which is learning. The AI understands it needs more force to throw the ball, and used so much that it missed the goal once more.

```
| /--------------\ <-- forward propegation (after learning)
ball/           go\al  <-- throw attempt, in the goal
  \_______________/ <-- back propegation, measures success
```

## Deep Learning Process

Now that we understand the different parts of Deep Learning, let's put it together to summarize the process. Let's say, for example, that you are taking an exam:

1. **Input Data (Knowledge)**: This represents the initial knowledge or information that you possess, which serves as the foundation for your performance on the exam. The more you study, the more likely you'll do well on the exam.

   > In the way that you need knowledge before taking an exam, an AI needs input in order to learn. The more data is fed to the AI, the more accurate it's model will be.

2. **Propagation (Answering Questions)**: Each question on the exam corresponds to a step in the propagation process. You will process each question based on your existing knowledge, and provides answers to the best of your ability.

   > If the AI is assigned a task to predict an outcome, it's prediction & confidence in such a prediction is based on the quality of the data, and will make more predictions to the best of it's ability.

3. **Activation Functions (Correctness Evaluation)**: The activation functions is like the mechanisms that evaluate whether your answer to each question is correct or not.

   > These functions determine whether the AI's inputs align with the expected or correct outputs.

4. **Model (Completed Exam with a Grade)**: The completed exam, along with the assigned grade, represents your output or performance after processing all the questions.
   > This reflects the AI's overall success or accuracy in completing a task based on its initial data and the correctness propegations.

Overall, this analogy effectively illustrates the key components of deep learning, emphasizing the flow of information, evaluation of correctness, and the resulting model performance.

## CNNs & RNNs

Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) are two essential types of neural networks in deep learning, each serving distinct roles:

Convolutional Neural Networks (CNNs):

- **Role**: CNNs are primarily used in tasks related to image and spatial data processing, such as image recognition, object detection, and segmentation.
- **Functionality**: CNNs excel at automatically learning hierarchical and spatial features from raw image data. They employ convolutional layers and pooling layers to capture local patterns, textures, and spatial relationships.
- **Architecture**: CNNs typically consist of multiple convolutional layers followed by fully connected layers for classification. They have been instrumental in achieving state-of-the-art results in computer vision tasks.
- **Applications**: CNNs are used in applications like facial recognition, autonomous vehicles, medical image analysis, and image-based content recommendation.
  Recurrent Neural Networks (RNNs):

- **Role**: RNNs are designed for tasks involving sequential or time-dependent data, such as natural language processing (NLP), speech recognition, and time series analysis.
- **Functionality**: RNNs are capable of capturing dependencies and relationships within sequential data by maintaining a hidden state that evolves over time. This makes them well-suited for tasks involving sequences, where the order of data matters.
- **Architecture**: RNNs have a recurrent loop that allows them to process sequential data one step at a time, updating the hidden state at each step. They can handle variable-length sequences.
- **Applications**: RNNs are used in applications like machine translation, sentiment analysis, speech synthesis, and predicting stock prices.

In summary, CNNs are specialized for spatial data and excel in tasks involving images and visual patterns, while RNNs are tailored for sequential data and are effective for tasks involving time-dependent or ordered information. Both types of neural networks have played pivotal roles in advancing deep learning and have opened the door to solving a wide range of complex problems in various domains.
