import inquirer, { QuestionCollection } from 'inquirer'
import fs from 'fs'
import process from 'process'
import { ChildProcess, spawn } from 'child_process'
import { exit } from 'process'

import { NUM_PADDING } from './config'

const log = console.log
const regex = `^\\d{${NUM_PADDING}}_`
const RegExObj = new RegExp(regex)

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((dir) => RegExObj.test(dir))
    .sort((a, b) => {
      const aNums = parseInt(a.slice(0, NUM_PADDING))
      const bNums = parseInt(b.slice(0, NUM_PADDING))

      if (aNums < bNums) return -1
      if (aNums === bNums) return 0
      return 1
    })

const askQuestions = (directories: string[]) => {
  const questions: QuestionCollection = [
    {
      type: 'list',
      name: 'DIRECTORY',
      message: 'Hey! Pick a Challenge 🕘',
      choices: directories,
    },
  ]

  return inquirer.prompt(questions)
}

// https://github.com/remy/nodemon/blob/HEAD/doc/events.md#Using_nodemon_as_child_process
function spawnNodemon(filePath: string, watchPath: string): ChildProcess {
  const cp = spawn('nodemon', [filePath, '--watch', watchPath], {
    // the important part is the 4th option 'ipc'
    // this way `process.send` will be available in the child process (nodemon)
    // so it can communicate back with parent process (through `.on()`, `.send()`)
    // https://nodejs.org/api/child_process.html#child_process_options_stdio
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  })

  return cp
}

const run = async () => {
  const directories = getDirectories(process.cwd() + '/src')
  if (!directories.length) {
    console.error('No directories found!')
    exit()
  }

  const { DIRECTORY } = await askQuestions(directories)

  const nodemonProcess = spawnNodemon(
    `./src/${DIRECTORY}/index.ts`,
    `./src/${DIRECTORY}/`
  )

  type NodemonMessage = {
    type: string
    data: {
      message?: string
      colour?: string
    }
  }

  // nodemonProcess.on('message', (event: NodemonMessage) => {
  //   switch (event.type) {
  //     case 'log':
  //       console.log(event.data.colour ?? event.data.message)
  //       break
  //     default:
  //       // console.log('unhandled message: ')
  //       // console.dir(event)
  //       break
  //   }
  // })

  nodemonProcess.stdout?.on('data', (data) => {
    console.log(data.toString(), '\n')
  })

  // force a restart
  //nodemonProcess.send('restart')

  process.on('SIGINT', () => {
    console.log('\nclosing time...')
    // force a quit
    nodemonProcess.send('quit')
    process.exit()
  })
}

run()
