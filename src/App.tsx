import { useState } from "react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string;
  description: string;
}

const initialRecipes: Recipe[] = [
  {
    id: 1,
    title: "Pasta Primavera",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    ingredients: "Pasta, Vegetables, Olive oil, Garlic",
    description: "A colorful mix of vegetables tossed with pasta in olive oil.",
  },
  {
    id: 2,
    title: "Avocado Toast",
    image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
    ingredients: "Bread, Avocado, Salt, Lemon",
    description:
      "Crispy toast topped with smashed avocado and a hint of lemon.",
  },
  {
    id: 3,
    title: "Berry Smoothie",
    image: "https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg",
    ingredients: "Berries, Yogurt, Honey",
    description: "A refreshing smoothie full of antioxidants.",
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    image: "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg",
    ingredients: "Paneer, Tomato, Butter, Cream",
    description: "A rich and creamy North Indian curry.",
  },
  {
    id: 5,
    title: "Caesar Salad",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    ingredients: "Lettuce, Croutons, Parmesan, Dressing",
    description:
      "Crisp romaine with creamy Caesar dressing and crunchy croutons.",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    image: "",
    ingredients: "",
    description: "",
  });
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const filteredRecipes = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.ingredients.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRecipe = () => {
    if (newRecipe.title && newRecipe.image) {
      const newId = recipes.length + 1;
      setRecipes([...recipes, { id: newId, ...newRecipe }]);
      setNewRecipe({ title: "", image: "", ingredients: "", description: "" });
    } else {
      alert("Please fill in all fields before adding your recipe!");
    }
  };

  const handleDelete = (id: number) => {
    const password = prompt("Enter admin password to delete:");
    if (password === "admin123") {
      setRecipes(recipes.filter((r) => r.id !== id));
      alert("Recipe deleted successfully ✅");
    } else {
      alert("Incorrect password ❌");
    }
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-black text-white shadow-lg py-4">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-extrabold text-yellow-400">
            🍴 Recipe Haven
          </h1>
          <ul className="flex gap-6 text-gray-300 font-medium">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">Add Recipe</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
          </ul>
        </nav>
      </header>

      {/* Food Thought */}
      <section className="bg-[#ffffff] text-center py-6 shadow-md border-b border-gray-200">
        <h2 className="text-xl italic text-gray-700">
          “Cooking is love made visible.” 🧡
        </h2>
      </section>

      {/* Search Bar */}
      <div className="text-center my-8">
        <input
          type="text"
          placeholder="Search by ingredient or recipe name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 md:w-1/2 px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative bg-white rounded-xl shadow hover:shadow-xl transition duration-200 p-4 border border-gray-100"
          >
            {/* 3-Dot Menu */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === recipe.id ? null : recipe.id)
                }
                className="text-gray-600 hover:text-black text-xl"
              >
                ⋮
              </button>
              {menuOpen === recipe.id && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>

            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-lg h-48 w-full object-cover"
            />
            <h3 className="text-lg font-bold mt-3 text-gray-900">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{recipe.ingredients}</p>
            <p className="mt-2 text-gray-700 text-sm">{recipe.description}</p>
          </div>
        ))}
      </div>

      {/* Add Recipe Section */}
      <section className="bg-[#fafafa] mt-12 p-6 shadow-inner rounded-lg mx-4 md:mx-20 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-black">
          Add Your Own Recipe 🍳
        </h2>
        <div className="flex flex-col gap-3 mt-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Recipe Title"
            value={newRecipe.title}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, title: e.target.value })
            }
            className="border border-gray-400 p-2 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newRecipe.image}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, image: e.target.value })
            }
            className="border border-gray-400 p-2 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, ingredients: e.target.value })
            }
            className="border border-gray-400 p-2 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            placeholder="Description"
            value={newRecipe.description}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, description: e.target.value })
            }
            className="border border-gray-400 p-2 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleAddRecipe}
            className="bg-black text-yellow-400 font-bold py-2 rounded-md hover:bg-yellow-500 hover:text-black transition"
          >
            Add Recipe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 text-center py-4 mt-10">
        <p>© 2025 Recipe Haven | Made with ❤️ for food lovers</p>
      </footer>
    </div>
  );
}
