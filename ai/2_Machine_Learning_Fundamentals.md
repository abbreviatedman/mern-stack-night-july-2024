# Lesson: Machine Learning Fundamentals

---

## What this lesson covers:

- Supervised Learning
- Unsupervised Learning
- Reinforcement Learning
- Training/testing process

---

## _Supervised Learning_

`Supervised Learning` is when a model is trained on a `labeled` dataset, which means each input data point is associated with an output. The goal is to learn a mapping from input data to the correct output, given the `labeled` examples during `training`. Once `trained`, the model can make predictions or classifications on new, unseen data.

Here are some examples:

- **Image Classification**: Cameras on autonomous vehicles (such as Tesla's) capture real-time images of the road and the surroundings of the car. Supervised Learning models can be trained to recognize objects, road signs, lane markings, pedestrians, and other vehicles in these images.
- **Spam Email Detection**: In email filtering, a supervised learning model can be trained on a labeled dataset of emails (spam or not spam) to automatically classify incoming emails as either spam or legitimate.

## _Unsupervised Learning_

`Unsupervised Learning` is when a model is given a dataset without `labels`. The goal is to uncover hidden patterns or structure within the data, often by grouping similar data together. Here are some examples:

- **Clustering**: Given a dataset of customer purchase history, unsupervised learning can be used to group customers into segments based on their buying behavior. This can be used to uncover unseen demographics that go beyond basic data such as gender, age range, and location. If a customer purchases a plastic lightsaber, Death Star lego set, and subscribes to Disney +, they might be clustered into a "Star Wars Fan" group. This information can be useful for targeting advertisements that are tailored to a customer's interests.
- **Principal Component Analysis (PCA)**: `PCA` is a technique used for dimensionality reduction, which summarizes a large dataset by distilling it down to it's most important `features`. Let's say you measure viewership on a Youtube channel down to details such as timestamps when viewers pause, timestamps when they click away from the video, etc. you can optimize for viewership retention by discovering the most un-interesting parts of your videos and adjusting to keep an audience interested. It can generally be used to understand what are the most important metrics of a large, unlabeled dataset.

## Reinforcement Learning

`Reinforcement Learning (RL)` is a branch of `ML` where an agent learns to make sequences of decisions in a particular environment, to maximize & optimize for a specified goal. Unlike Supervised Learning, `RL` doesn't rely on labeled data. Instead, the agent explors actions and learns from the consequences of those actions. It uses a trial & error approach, aiming to discover the best strategies or policies for specific tasks through interactions with the environment. `RL` is commonly used in applications like game-playing AI (AlphaGo), robotics, recommendation systems (used in targeted Ads), and autonomous control systems (Teslas, automated factories, automated farming, etc.)

## Training Process

The training process in `ML` is similar to teaching a machine to recognize patterns and make preditions based on data. With labeled data, it can learn patterns and adjust its internal parameters to make more accurate predictions. Using an analogy of teaching people how to cook, this is what that process looks like:

1. **Data Collection**: You gather a collection of recipes, each with a list of ingredients and step-by-step instructions.

   > These recipes represent your training dataset in `ML`, providing examples of how to prepare different meals.

2. **Feature Extraction**: You help your learner recognize the importance of each ingredient. For instance, they learn that spices, herbs, and specific ingredients contribute to the flavor of a dish.

   > These ingredients are like the `features` in `ML` that help distinguish one meal (or data point) from another.

3. **Training**: Your learner starts by following the recipes, cooking dishes according to the provided instructions. With each meal they prepare, they gain experience and learn cooking techniques.

   > This is how the `ML` model trains on a dataset, gradually capturing patterns and relationships.

4. **Adjustment & Feedback**: After cooking, your learner tastes the meal and evaluates its flavors. If it needs improvement or additional seasoning, they make adjustments (adding salt, spices, etc.).

   > This tasting & adjustment phase is similar to the feedback loop in `ML`, where the model's performance is evaluated and refined.

5. **Testing & Validation**: Your learner doesn't limit themselves to a single meal. They cook a variety of recipes, learning to prepare different cuisines & styles.

   > This broad exposure corresponds to the diverse training data used in `ML` to ensure the model can come to more accurate conclusions in various situations.

6. **Fine-Tuning**: As your learner gains confidence, they may experiment with variations of recipes, adding their own twists or creating new meals.
   > In `ML`, model experimentation and tuning involves adjusting parameters and exploring different approaches to improve performance.
