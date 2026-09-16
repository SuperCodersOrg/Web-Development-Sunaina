const fs = require("node:fs");
const path = require("path");

function collectFilesWithSameExtension(source, extension, destination) {
  let targetExtension = extension.startsWith(".")
    ? extension.toLowerCase()
    : `.${extension.toLowerCase()}`;

  fs.mkdirSync(destination, { recursive: true });
  let copiedCount = 0;

  function EnterDirectory(currentDirectory) {
    let files = fs.readdirSync(currentDirectory, { withFileTypes: true });

    for (const ele of files) {
      const fullPath = path.join(currentDirectory, ele.name);

      if (ele.isDirectory()) {
        EnterDirectory(fullPath);
      } else if (
        ele.isFile() &&
        path.extname(ele.name).toLowerCase() === targetExtension // Used fixed targetExtension variable
      ) {
        let destPath = path.join(destination, ele.name);

        fs.copyFileSync(fullPath, destPath);
        copiedCount++;
      }
    }
  }

  EnterDirectory(source);
  console.log(`Successfully copied ${copiedCount} files.`);
}

const sourceFolder = path.join(__dirname, "fs_folder");
const fileExtension = ".c";
const destinationFolder = path.join(__dirname, "fs_destination");

collectFilesWithSameExtension(sourceFolder, fileExtension, destinationFolder);

// res.setheadder("Access-Control-allow-origin","*")
// res.setheadder("Access-Control-allow-methods","GET,POST,OPTIONS")
// res.setheadder("Access-Control-allow-Headers","Content-type")
