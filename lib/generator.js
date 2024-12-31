const fs = require("fs");
const path = require("path");

// Define base paths for different directories in the project
const BASE_PATH = path.join(process.cwd(), "src", "contexts");
const BASE_PATH_SHARED = path.join(process.cwd(), "src", "contexts", "shared");
const BASE_TEST_PATH = path.join(process.cwd(), "test");
const ROOT_PATH = process.cwd();
const STRUCTURE = {
  application: ["useCaseCreate", "useCaseFind"],
  domain: ["entities", "valueObjects", "repositories"],
  infrastructure: ["http", "persistence"],
  presentation: [],
  utils: []
};

/**
 * Creates a new project structure for a specified context.
 * This includes generating necessary directories and copying configuration files.
 * @param {string} contextName - The name of the context to be created.
 */
function createProject(contextName) {
  const contextPath = path.join(BASE_PATH, contextName);

  if (!contextName || typeof contextName !== "string") {
    console.error("Invalid context name provided.");
    return;
  }

  if (fs.existsSync(contextPath)) {
    console.log(`Project "${contextName}" already exists.`);
    return;
  }
  if (fs.existsSync(BASE_PATH_SHARED)) {
    console.log(`A project already exists, try creating a context`);
    return;
  }

  generateFolderContextStructure(contextName);
  copyFileConfiguration(contextName);
  generateFolderSharedStructure(contextName);
  generateFolderTestStructure(contextName);
}

/**
 * Generates the folder structure for a given context.
 * @param {string} contextName - The name of the context for which the folder structure is being created.
 */
function generateFolderContextStructure(contextName) {
  const contextPath = path.join(BASE_PATH, contextName);

  if (fs.existsSync(contextPath)) {
    console.log(
      `Folder structure already exists for context "${contextName}".`
    );
    return;
  }

  // Copy the template structure for the context
  const defaultContextPath = path.join(
    __dirname,
    "templates",
    "src",
    "contexts",
    "template"
  );
  if (fs.existsSync(defaultContextPath)) {
    copyAndModifyFiles(defaultContextPath, contextPath, contextName);
    console.log(`Project created for "${contextName}" context.`);
  }
}

/**
 * Copies essential configuration files into the project root.
 * Includes files like package.json, README.md, tsconfig.json, .env.
 * @param {string} contextName - The name of the context for which configuration files are being copied.
 */
function copyFileConfiguration(contextName) {
  const defaultContextPathOnlyConfigFile = path.join(
    __dirname,
    "templates",
    "src"
  );
  const configFiles = ["package.json", "README.md", "tsconfig.json", ".env"];
  const filesToCopy = ["main.ts", "ApplicationCore.ts", "ControllerDependencyInjector.ts"];
  const defaultDirInitialFile = path.join(
    __dirname,
    "templates",
    "src",
    "contexts"
  );

  // Copy the configuration files
  configFiles.forEach((file) => {
    const srcFile = path.join(defaultContextPathOnlyConfigFile, file);
    const destFile = path.join(ROOT_PATH, file);

    if (fs.existsSync(srcFile)) {
      if (!fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
      } else {
        console.log(`The file already exists at the destination: ${destFile}`);
      }
    } else {
      console.log(`The source file does not exist: ${srcFile}`);
    }
  });

  // Process and copy main files for the context
  processAndCopyMainFiles(
    defaultDirInitialFile,
    filesToCopy,
    BASE_PATH,
    contextName
  );
}

/**
 * Generates the folder structure for shared resources within a context.
 * @param {string} contextName - The name of the context for which the shared structure is to be created.
 */
function generateFolderSharedStructure(contextName) {
  const contextPath = path.join(BASE_PATH, "shared");

  if (fs.existsSync(contextPath)) {
    console.log(
      `Folder structure already exists for context "${contextName}".`
    );
    return;
  }

  // Copy the default shared folder structure from the templates
  const defaultContextPath = path.join(
    __dirname,
    "templates",
    "src",
    "contexts",
    "shared"
  );
  if (fs.existsSync(defaultContextPath)) {
    copyDirectory(defaultContextPath, contextPath);
  }
}

/**
 * Generates the test folder structure for the context.
 * It includes application, domain, and infrastructure layers.
 * @param {string} contextName - The name of the context for which the test structure is to be created.
 */
function generateFolderTestStructure(contextName) {
  try {
    const contextPath = path.join(BASE_TEST_PATH, contextName);

    if (fs.existsSync(contextPath)) {
      console.log(
        `Folder test structure already exists for context "${contextName}".`
      );
      return;
    }

    // Create directories for each layer in the test structure
    Object.keys(STRUCTURE).forEach((layer) => {
      const layerPath = path.join(contextPath, layer);
      fs.mkdirSync(layerPath, { recursive: true });
    });

    console.log(`Test structure initialized for context "${contextName}".`);
  } catch (error) {
    console.error(
      `Error generating folder test structure for "${contextName}": ${error.message}`
    );
  }
}

/**
 * Creates a new context structure for the project.
 * @param {string} contextName - The name of the context to be created.
 */
function createContext(contextName) {
  const contextPath = path.join(BASE_PATH, contextName);

  if (fs.existsSync(contextPath)) {
    console.log(`Context "${contextName}" already exists.`);
    return;
  }

  generateFolderContextStructure(contextName);
  generateFolderTestStructure(contextName);
}

/**
 * Creates a file for a specified context and type.
 * @param {string} name - The name of the file to be created.
 * @param {string} contextName - The context name where the file should be created.
 * @param {string} type - The type of file (e.g., entity, repository, etc.).
 */
function createFile(name, contextName, type) {
  console.log(`File created at ${name} ${contextName} ${type}`);
}

/**
 * Copies a directory recursively from the source to the destination.
 * @param {string} src - The source directory to copy from.
 * @param {string} dest - The destination directory to copy to.
 */
function copyDirectory(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const items = fs.readdirSync(src);
    items.forEach((item) => {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      if (fs.lstatSync(srcItem).isDirectory()) {
        copyDirectory(srcItem, destItem);
      } else {
        fs.copyFileSync(srcItem, destItem);
      }
    });
  } catch (error) {
    console.error(
      `Error copying directory from ${src} to ${dest}: ${error.message}`
    );
  }
}

/**
 * Copies and modifies files from the source directory to the destination.
 * It replaces placeholders with the context name (e.g., "Template" to the context name).
 * @param {string} srcDir - The source directory containing files to copy.
 * @param {string} destDir - The destination directory where files should be copied to.
 * @param {string} contextName - The context name to be inserted into the files.
 */
function copyAndModifyFiles(srcDir, destDir, contextName) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const contextCapitalized = capitalizeFirstLetter(contextName);

  // Read the files from the source directory
  const items = fs.readdirSync(srcDir);

  items.forEach((item) => {
    const srcItem = path.join(srcDir, item);
    const destItem = path.join(
      destDir,
      item.replace(/Template/g, contextCapitalized)
    );

    if (fs.lstatSync(srcItem).isDirectory()) {
      // Recursively copy directories
      copyAndModifyFiles(srcItem, destItem, contextName);
    } else {
      // Process the file by replacing the placeholder with the context name
      let fileContent = fs.readFileSync(srcItem, "utf8");
      fileContent = fileContent.replace(/Template/g, contextCapitalized);

      // Write the modified file to the destination directory
      fs.writeFileSync(destItem, fileContent);
    }
  });
}

/**
 * Processes and copies the main configuration files for the context.
 * It replaces placeholders in files like "template" with the actual context name,
 * and updates import paths accordingly.
 * @param {string} defaultMainConfigFile - The default configuration file directory.
 * @param {Array} files - The list of main configuration files to copy.
 * @param {string} BASE_PATH - The base path for the project.
 * @param {string} contextName - The name of the context being created.
 */
function processAndCopyMainFiles(
  defaultMainConfigFile,
  files,
  BASE_PATH,
  contextName
) {
  try {
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);
    const contextCapitalized = capitalizeFirstLetter(contextName);

    files.forEach((file) => {
      const srcFile = path.join(defaultMainConfigFile, file);
      const destFile = path.join(
        BASE_PATH,
        file.replace(/Template/g, contextCapitalized)
      );

      if (fs.existsSync(srcFile)) {
        let fileContent = fs.readFileSync(srcFile, "utf8");

        // Replace placeholders for the context name
        fileContent = fileContent.replace(/Template/g, contextCapitalized);

        // Replace import paths dynamically
        fileContent = fileContent.replace(
          /import\s+\{(.+?)\}\s+from\s+['"]\.\/template\/(.+?)['"]/g,
          (match, imports, relativePath) => {
            return `import {${imports.trim()}} from './${contextName}/${relativePath.trim()}'`;
          }
        );

        // Write the content to the destination
        fs.writeFileSync(destFile, fileContent);
      } else {
        console.log(`File not found: ${srcFile}`);
      }
    });
  } catch (error) {
    console.error(
      `Error processing and copying main files for "${contextName}": ${error.message}`
    );
  }
}

module.exports = {
  createProject,
  createContext,
  createFile
};
