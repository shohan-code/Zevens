const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBgnfDo2qqgKND4QDX9IoxhmKB215UrgWM",
  authDomain: "zevens-7ade7.firebaseapp.com",
  projectId: "zevens-7ade7",
  storageBucket: "zevens-7ade7.firebasestorage.app",
  messagingSenderId: "776899157603",
  appId: "1:776899157603:web:6d9ecfa41dabd6c4d7e256"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  try {
    console.log("Initializing database...");

    // 1. Add Site Settings
    await setDoc(doc(db, "settings", "global"), {
      whatsapp: "01772024655",
      email: "ismailahmedshohan62@gmail.com",
      bkash: "01772024655",
      nagad: "01772024655",
      announcement: "ZEVENS PREMIUM FOOTWEAR - RELAUNCHING SOON!"
    });
    console.log("✅ Global settings added.");

    // 2. Add a sample product
    await addDoc(collection(db, "products"), {
      name: "ZEVENS AIR ALPHA",
      description: "Premium performance footwear for elite athletes.",
      price: 12500,
      category: "Running",
      status: "in-stock",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      preOrderAdvance: 0,
      createdAt: new Date().toISOString()
    });
    console.log("✅ Sample product added.");

    console.log("\n🚀 Database is now ONLINE and ready!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
