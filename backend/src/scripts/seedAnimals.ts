import dotenv from "dotenv";
import { connectDB, disconnectDB } from "../config/database";
import { AnimalModel } from "../models/Animal";

// Load environment variables
dotenv.config();

const sampleAnimals = [
  {
    name: "Bella",
    description:
      "A sweet 3-year-old golden retriever who was found injured on the roadside. She needs surgery for her broken leg and ongoing medical care.",
    image:
      "https://images.unsplash.com/photo-1693615774176-a5560f55ac49?w=400&h=300&fit=crop",
    medicalNeeds: "Leg surgery, pain medication, physiotherapy",
    urgencyLevel: "high" as const,
    targetAmount: 25000,
    raisedAmount: 8500,
  },
  {
    name: "Max",
    description:
      "A playful 2-year-old labrador mix who needs treatment for heartworm. He's very friendly and loves to play fetch.",
    image:
      "https://images.unsplash.com/photo-1628234506867-b9b1af67bc06?w=400&h=300&fit=crop",
    medicalNeeds: "Heartworm treatment, vaccination updates",
    urgencyLevel: "medium" as const,
    targetAmount: 15000,
    raisedAmount: 3200,
  },
  {
    name: "Luna",
    description:
      "A gentle 5-year-old cat who was rescued from a hoarding situation. She needs dental surgery and nutritional support.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    medicalNeeds: "Dental surgery, nutritional rehabilitation",
    urgencyLevel: "medium" as const,
    targetAmount: 12000,
    raisedAmount: 5800,
  },
  {
    name: "Rocky",
    description:
      "An elderly 8-year-old german shepherd who needs treatment for hip dysplasia. He's been waiting for a home for months.",
    image:
      "https://images.unsplash.com/photo-1741792262397-f01c77a40a4f?w=400&h=300&fit=crop",
    medicalNeeds: "Hip surgery, pain management, mobility aids",
    urgencyLevel: "high" as const,
    targetAmount: 35000,
    raisedAmount: 12000,
  },
  {
    name: "Milo",
    description:
      "A curious 1-year-old kitten who was born with a cleft palate. He needs specialized feeding and potential surgery.",
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
    medicalNeeds: "Cleft palate repair, specialized nutrition",
    urgencyLevel: "high" as const,
    targetAmount: 20000,
    raisedAmount: 1500,
  },
  {
    name: "Daisy",
    description:
      "A loving 4-year-old pit bull mix who needs treatment for skin allergies and regular grooming care.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    medicalNeeds: "Allergy treatment, medicated baths, special diet",
    urgencyLevel: "low" as const,
    targetAmount: 8000,
    raisedAmount: 2100,
  },
];

const seedAnimals = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing existing animals...");
    await AnimalModel.deleteMany({});

    console.log("Seeding sample animals...");
    await AnimalModel.insertMany(sampleAnimals);

    console.log(`Successfully seeded ${sampleAnimals.length} animals!`);
    console.log("Sample animals added to the database.");
  } catch (error) {
    console.error("Error seeding animals:", error);
  } finally {
    await disconnectDB();
  }
};

// Run the seed function
seedAnimals();
