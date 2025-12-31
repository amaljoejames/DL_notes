import { db } from "./db";
import { units, topics, type Unit, type Topic, type UnitWithTopics } from "@shared/schema";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getAllUnits(): Promise<UnitWithTopics[]>;
  getUnit(id: number): Promise<UnitWithTopics | undefined>;
  getTopic(id: number): Promise<Topic | undefined>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllUnits(): Promise<UnitWithTopics[]> {
    const allUnits = await db.select().from(units).orderBy(asc(units.unitNumber));
    const result: UnitWithTopics[] = [];

    for (const unit of allUnits) {
      const unitTopics = await db
        .select()
        .from(topics)
        .where(eq(topics.unitId, unit.id))
        .orderBy(asc(topics.order));
      result.push({ ...unit, topics: unitTopics });
    }
    
    return result;
  }

  async getUnit(id: number): Promise<UnitWithTopics | undefined> {
    const [unit] = await db.select().from(units).where(eq(units.id, id));
    if (!unit) return undefined;

    const unitTopics = await db
      .select()
      .from(topics)
      .where(eq(topics.unitId, unit.id))
      .orderBy(asc(topics.order));

    return { ...unit, topics: unitTopics };
  }

  async getTopic(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic;
  }

  async seedData(): Promise<void> {
    const existing = await db.select().from(units);
    if (existing.length > 0) return;

    // Unit 1
    const [u1] = await db.insert(units).values({
      unitNumber: 1,
      title: "Introduction to Deep Learning",
      description: "History, McCulloch Pitts Neuron, MLPs, and Representation Power.",
    }).returning();

    await db.insert(topics).values([
      { unitId: u1.id, title: "History of Deep Learning", order: 1, content: `
# History of Deep Learning

## Definition
Deep Learning is a subset of Machine Learning that uses multi-layered artificial neural networks to deliver state-of-the-art accuracy in tasks such as object detection, speech recognition, and language translation.

## Features
- **Hierarchical Feature Learning**: Automatically learns features at multiple levels of abstraction.
- **Scalability**: Performance improves with more data.
- **End-to-End Learning**: Mappings from raw input to output without manual feature engineering.

## Working Principle
Deep learning algorithms run data through several layers of neural network algorithms, each of which passes a simplified representation of the data to the next layer.

## Advantages
- High accuracy on unstructured data (images, audio).
- Robustness to noise.
- Automatic feature extraction.

## Disadvantages
- Requires massive amounts of data.
- High computational cost (GPUs required).
- "Black Box" nature (hard to interpret).

## Conclusion
The history of deep learning tracks the evolution from simple perceptrons to complex architectures like Transformers, driving the current AI revolution.
      `},
      { unitId: u1.id, title: "McCulloch Pitts Neuron", order: 2, content: `
# McCulloch Pitts Neuron

## Definition
The McCulloch-Pitts (MP) neuron is an early mathematical model of a biological neuron, proposed in 1943. It is a binary threshold unit.

## Working Principle
1.  **Inputs**: Takes binary inputs (0 or 1).
2.  **Aggregation**: Sums the inputs ($g(x) = \\sum x_i$).
3.  **Thresholding**: If the sum exceeds a threshold $\\theta$, output is 1; otherwise 0.

## Diagram Description
Imagine inputs $x_1, x_2, ...$ entering a circle (soma) where they are summed. The sum goes to a step function block which outputs $y$.

## Advantages
- Simple model to understand basic neural computation.
- Can implement boolean logic functions (AND, OR, NOT).

## Disadvantages
- Only handles binary inputs.
- Cannot learn weights (weights are fixed).
- Cannot implement non-linearly separable functions like XOR.
      `},
       { unitId: u1.id, title: "Multilayer Perceptrons (MLPs)", order: 3, content: `
# Multilayer Perceptrons (MLPs)

## Definition
An MLP is a class of feedforward artificial neural network. It consists of at least three layers of nodes: an input layer, a hidden layer, and an output layer.

## Features
- **Fully Connected**: Each node in one layer connects to every node in the following layer.
- **Non-linear Activation**: Uses non-linear activation functions (Sigmoid, Tanh, ReLU).

## Working Principle
Information flows from input to output (feedforward). The network learns using Backpropagation, adjusting weights based on the error between predicted and actual output.

## Advantages
- Can learn non-linear relationships.
- Universal Function Approximator.

## Disadvantages
- Prone to overfitting.
- Difficult to train very deep networks (vanishing gradient).
      `},
    ]);

    // Unit 2
    const [u2] = await db.insert(units).values({
      unitNumber: 2,
      title: "Deep Feedforward Networks & Optimization",
      description: "Gradient Descent, Optimization Algorithms, and Auto-encoders.",
    }).returning();
    
    await db.insert(topics).values([
      { unitId: u2.id, title: "Gradient Descent (GD)", order: 1, content: `
# Gradient Descent (GD)

## Definition
Gradient Descent is an iterative optimization algorithm used to minimize a cost function by moving in the direction of the steepest descent (negative gradient).

## Working Principle
1. Initialize weights randomly.
2. Calculate the gradient of the loss function w.r.t weights.
3. Update weights: $w = w - \\eta \\cdot \\nabla L$.
4. Repeat until convergence.

## Variants
- **Batch GD**: Uses entire dataset for one update. Stable but slow.
- **Stochastic GD (SGD)**: Uses one sample. Fast but noisy.
- **Mini-Batch GD**: Uses a batch of samples. Good balance.

## Advantages
- Simple and effective for convex problems.

## Disadvantages
- Can get stuck in local minima.
- Sensitive to learning rate choice.
      `},
      { unitId: u2.id, title: "Auto-encoders", order: 2, content: `
# Auto-encoders

## Definition
An Auto-encoder is a type of neural network used to learn efficient data codings in an unsupervised manner. It learns to compress the input into a latent-space representation and then reconstruct the output from this representation.

## Architecture Description
- **Encoder**: Maps input $x$ to latent code $h$.
- **Decoder**: Maps code $h$ to reconstruction $r$.
- **Bottleneck**: The layer with reduced dimensions forcing the network to learn essential features.

## Applications
- Dimensionality Reduction (like PCA).
- Denoising images.
- Anomaly detection.

## Conclusion
Auto-encoders are fundamental for representation learning and generative tasks.
      `}
    ]);

    // Unit 3
    const [u3] = await db.insert(units).values({
      unitNumber: 3,
      title: "Convolutional Neural Networks (CNN)",
      description: "CNN Architectures, Pooling, Convolution, and Regularization.",
    }).returning();

     await db.insert(topics).values([
      { unitId: u3.id, title: "Introduction to CNN", order: 1, content: `
# Convolutional Neural Networks (CNN)

## Definition
A Deep Learning algorithm designed to process data with a grid-like topology, such as images.

## Key Components
- **Convolutional Layer**: Extracts features using kernels/filters.
- **Pooling Layer**: Reduces spatial dimensions (Downsampling).
- **Fully Connected Layer**: Classification based on extracted features.

## Working Principle
Filters slide (convolve) over the input image to create feature maps. These maps capture patterns like edges, textures, and shapes.

## Advantages
- Parameter Sharing: Same filter used across the image, reducing parameters.
- Translation Invariance: Can detect objects regardless of position.

## Disadvantages
- Computationally expensive training.
- Requires large labeled datasets.
      `},
      { unitId: u3.id, title: "CNN Architectures", order: 2, content: `
# CNN Architectures

## LeNet
- One of the first CNNs. Used for handwritten digit recognition (MNIST).

## AlexNet
- Deep CNN that won ImageNet 2012. Introduced ReLU and Dropout.

## VGGNet
- Very deep network using small (3x3) filters. Simple but heavy on parameters.

## ResNet (Residual Networks)
- Introduced "skip connections" to solve vanishing gradient in very deep networks. Allows training of 100+ layer networks.
      `}
    ]);

    // Unit 4
    const [u4] = await db.insert(units).values({
      unitNumber: 4,
      title: "Recurrent Neural Networks (RNN)",
      description: "BPTT, LSTM, GRU, and Attention Mechanisms.",
    }).returning();

    await db.insert(topics).values([
      { unitId: u4.id, title: "Recurrent Neural Networks", order: 1, content: `
# Recurrent Neural Networks (RNN)

## Definition
A class of neural networks where connections between nodes form a directed graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior.

## Working Principle
RNNs have an internal state (memory) that processes sequences of inputs. The output depends on the current input and the previous hidden state.

## Problem: Vanishing Gradient
In standard RNNs, gradients can become extremely small during backpropagation through time (BPTT), making it hard to learn long-term dependencies.

## Solution
- **LSTM (Long Short-Term Memory)**: Uses gates (input, forget, output) to control information flow.
- **GRU (Gated Recurrent Unit)**: Simplified version of LSTM.
      `},
      { unitId: u4.id, title: "Attention Mechanism", order: 2, content: `
# Attention Mechanism

## Definition
A technique that mimics cognitive attention. It enhances specific parts of the input data while fading out the rest.

## Working Principle
Instead of encoding the whole input sequence into a fixed-size vector, Attention allows the decoder to "look at" different parts of the input sentence at each step of output generation.

## Applications
- Machine Translation (Transformer models).
- Image Captioning.
      `}
    ]);

    // Unit 5
    const [u5] = await db.insert(units).values({
      unitNumber: 5,
      title: "Deep Generative Models",
      description: "RBMs, Deep Belief Networks, GANs, and Applications.",
    }).returning();

    await db.insert(topics).values([
      { unitId: u5.id, title: "Generative Adversarial Networks (GANs)", order: 1, content: `
# Generative Adversarial Networks (GANs)

## Definition
A class of machine learning frameworks designed by Ian Goodfellow. Two neural networks contest with each other in a game.

## Components
- **Generator**: Creates fake data to fool the discriminator.
- **Discriminator**: Tries to distinguish between real data and fake data.

## Working Principle
The Generator and Discriminator are trained simultaneously. The Generator gets better at faking, and the Discriminator gets better at detecting.

## Applications
- Image Generation (DeepFakes).
- Super-resolution.
- Art generation.

## Conclusion
GANs have revolutionized unsupervised learning and creative AI.
      `},
       { unitId: u5.id, title: "Restricted Boltzmann Machines (RBM)", order: 2, content: `
# Restricted Boltzmann Machines (RBM)

## Definition
A generative stochastic artificial neural network that can learn a probability distribution over its set of inputs.

## Structure
- **Visible Layer**: Input layer.
- **Hidden Layer**: Latent features.
- **Restricted**: No connections within the same layer.

## Training
- **Gibbs Sampling**: Used to approximate the distribution.
- **Contrastive Divergence**: The learning algorithm used to update weights.

## Conclusion
RBMs are the building blocks of Deep Belief Networks.
      `}
    ]);
  }
}

export const storage = new DatabaseStorage();
