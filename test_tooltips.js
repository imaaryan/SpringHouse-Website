import("dotenv").then(({ default: dotenv }) => {
  dotenv.config({ path: ".env.local" });
  import("./model/homepage.model.js").then(({ Homepage }) => {
    import("mongoose").then(({ default: mongoose }) => {
      async function check() {
        try {
          await mongoose.connect(process.env.MONGODB_URI);
          
          let hp = await Homepage.findOne({}).lean();
          console.log("DB Content:", hp?.networking?.tooltips);
        } catch (error) {
          console.error("Injection failed:", error);
        } finally {
          process.exit(0);
        }
      }
      check();
    });
  });
});
