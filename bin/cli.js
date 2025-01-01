#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const {
  createProject,
  createContext,
  createFile
} = require("../lib/generator");

// Define a file to track the project state
const stateFile = path.resolve(__dirname, "../state.json");

// Utility to read the state
const readState = () => {
  if (fs.existsSync(stateFile)) {
    const content = fs.readFileSync(stateFile, "utf-8");
    return JSON.parse(content);
  }
  return { projectCreated: false };
};

// Utility to update the state
const updateState = (newState) => {
  fs.writeFileSync(stateFile, JSON.stringify(newState, null, 2));
};

// Parse command-line arguments
const args = process.argv.slice(2);
const command = args[0];
const nameArg = args.find((arg) => arg.startsWith("--name="));
const contextArg = args.find((arg) => arg.startsWith("--context="));
const typeArg = args.find((arg) => arg.startsWith("--type="));

const name = nameArg ? nameArg.split("=")[1].toLowerCase() : null;
const context = contextArg ? contextArg.split("=")[1].toLowerCase() : null;
const type = typeArg ? typeArg.split("=")[1].toLowerCase() : null;

// Read current state
const state = readState();

switch (command) {
  case "--create-project":
    if (!name) {
      console.log("Must use: ddd-skeleton --create-project --name=<name>");
      break;
    }
    createProject(name);
    // Mark project as created
    updateState({ projectCreated: true });
    break;

  case "--create-context--notimplemented":
    if (!state.projectCreated) {
      console.log("Error: You must create a project first using --create-project.");
      break;
    }
    if (!name) {
      console.log("Must use: ddd-skeleton --create-context --name=<name>");
      break;
    }
    createContext(name);
    break;

  case "--create-file--notimplemented":
    if (!state.projectCreated) {
      console.log("Error: You must create a project first using --create-project.");
      break;
    }
    if (!name || !context || !type) {
      console.log(
        "Must use: ddd-skeleton --create-file --name=<name> --context=<context> --type=<type>"
      );
      break;
    }
    createFile(name, context, type);
    break;

  default:
    console.log("Available commands:");
    console.log("ddd-skeleton --create-project --name=<name>");
}
