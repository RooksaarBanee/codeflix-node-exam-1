const fs = require('fs')
const readline = require('readline')

function cat(args) {
  if (args.length <= 0) {
    const rl = readline.createInterface({
      input: process.stdin,
    })

    rl.on('line', (line) => console.log(line))
  } else {
    const file = args.find(
      (element) => !element.startsWith('-'),
    )

    const options = args.filter(
      (element) => element.startsWith('-'),
    )

    // Read File content
    let content = fs.readFileSync(file, 'utf-8')

    if (options.includes('-e')) {
      content = content.replace('\r\n', '$')
    }

    console.log(content)
  }
}

// Entrypoint
const args = process.argv.slice(2)
cat(args)