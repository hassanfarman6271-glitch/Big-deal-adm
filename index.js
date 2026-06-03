require("dotenv").config();

const express = require("express");
const app = express();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

// ====================================
// EXPRESS SERVER
// ====================================

app.get("/", (req, res) => {
  res.send("BIG DEAL ADMIN ONLINE");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});

// ====================================
// CLIENT
// ====================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ====================================
// READY
// ====================================

client.once("ready", async () => {

  console.log(`✅ ${client.user.tag} Online`);

  // ==================================
  // COMMANDS
  // ==================================

  const commands = [

    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Ping command")

  ].map(cmd => cmd.toJSON());

  const rest = new REST({
    version: "10"
  }).setToken(process.env.TOKEN);

  try {

    console.log("🔄 Loading Commands");

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );

    console.log("✅ Commands Loaded");

  } catch (err) {
    console.log(err);
  }
});

// ====================================
// INTERACTION
// ====================================

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  // ==================================
  // PING
  // ==================================

  if (interaction.commandName === "ping") {

    await interaction.reply({
      content: "🏓 Pong!"
    });

  }
});

// ====================================
// LOGIN
// ====================================

client.login(process.env.TOKEN);
