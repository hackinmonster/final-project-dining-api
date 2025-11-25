import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
async function main() {
  console.log("Starting database seed...");

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@uncc.edu" }, 
    update: {},                         
    create: {
      email: "admin@uncc.edu",
      password: adminPassword,
      role: "ADMIN",
      notificationEnabled: true,
    },
  });
  console.log("→ Admin upserted:", admin.email);

  const studentPassword = await bcrypt.hash("Student123!", 10);
  const student = await prisma.user.upsert({
    where: { email: "student@uncc.edu" },
    update: {},
    create: {
      email: "student@uncc.edu",
      password: studentPassword,
      role: "USER",
      notificationEnabled: false,
      preferences: {
        mealType: "Lunch",
        dietaryRestrictions: ["Vegetarian"],
      },
    },
  });
  console.log("→ Student upserted:", student.email);

  const sovi = await prisma.diningLocation.create({
    data: {
      name: "South Village Dining (SoVi)",
      description: "Large buffet-style dining hall with stations",
    },
  });

  const unionMarket = await prisma.diningLocation.create({
    data: {
      name: "Student Union Market",
      description: "Grab-and-go items and snacks",
    },
  });

  const soviMenu = await prisma.menu.create({
    data: {
      name: "Sovi Daily Menu",
      mealType: "Lunch",
      diningLocationId: sovi.id,
    },
  });

  const unionMenu = await prisma.menu.create({
    data: {
      name: "Union Breakfast Menu",
      mealType: "Breakfast",
      diningLocationId: unionMarket.id,
    },
  });

  const pizza = await prisma.foodItem.create({
    data: {
      name: "Cheese Pizza",
      description: "Classic pizza with mozzarella and tomato sauce",
      portionSize: "2 slices",
      ingredients: ["Flour", "Cheese", "Tomato Sauce"],
      allergens: ["Dairy", "Gluten"],
      isVegetarian: true,
      isVegan: false,
      nutrition: { calories: 350, protein: 12, fat: 14 },
    },
  });

  const salad = await prisma.foodItem.create({
    data: {
      name: "Garden Salad",
      description: "Fresh veggies with Italian dressing",
      portionSize: "1 bowl",
      ingredients: ["Lettuce", "Tomato", "Cucumber"],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      nutrition: { calories: 150, protein: 3, fat: 5 },
    },
  });

  const studentWithFavorites = await prisma.user.findUnique({
    where: { email: "student@uncc.edu" },
    include: { favoriteFoods: true },
  });

  if (!studentWithFavorites.favoriteFoods || studentWithFavorites.favoriteFoods.length === 0) {
    await prisma.user.update({
      where: { email: "student@uncc.edu" },
      data: {
        favoriteFoods: {
          connect: [{ id: pizza.id }, { id: salad.id }],
        },
      },
    });
    console.log("→ Added favorites for student");
  } else {
    console.log("→ Student already has favorite foods, skipping connect");
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
