const fs = require('fs')
const path = require('path')

function copyFile(source, destination) {
  let destinationPath = destination

  if (fs.existsSync(destination)) {
    if (fs.lstatSync(destination).isDirectory()) {
      destinationPath = path.join(destination, path.basename(source))
    }
  }

  const content = fs.readFileSync(source)
  fs.writeFileSync(destinationPath, content)
}

function copyDirectory(source, destination) {
  let destinationPath = destination

  if (path.basename(source) !== source) {
    destinationPath = path.join(destination, path.basename(source))
  }

  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath)
  }

  if (fs.lstatSync(source).isDirectory()) {
    const blobs = fs.readdirSync(source)

    for (let i = 0; i < blobs.length; i++) {
      const currentSource = path.join(source, blobs[i])

      if (fs.lstatSync(currentSource).isDirectory()) {
        copyDirectory(currentSource, destinationPath)
      } else {
        copyFile(currentSource, destinationPath)
      }
    }
  }
}

function cp(source, destination, options) {
  if (fs.lstatSync(source).isDirectory()) {
    if (!options.includes('-r')) {
      console.log(`cp: -r not specified; omitting directory '${source}'`)
      return
    }

    copyDirectory(source, destination)
  } else if (fs.lstatSync(source).isFile()) {
    copyFile(source, destination)
  }
}

// Entrypoint
const args = process.argv.slice(2)

const options = args.filter(
  (element) => element.startsWith('-'),
)

const [source, destination] = args.filter(
  (element) => !element.startsWith('-'),
)

cp(source, destination, options)
