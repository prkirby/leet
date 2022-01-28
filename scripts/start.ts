import inquirer from 'inquirer'
import autocomplete, {
  AutocompleteQuestionOptions,
} from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import fs from 'fs'
import process from 'process'
import { ChildProcess, spawn } from 'child_process'
import { exit } from 'process'

import { NUM_PADDING } from './config'
import nodemon from 'nodemon'

const regex = `^\\d{${NUM_PADDING}}_`
const RegExObj = new RegExp(regex)

inquirer.registerPrompt('autocomplete', autocomplete)

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
  const questions: Array<AutocompleteQuestionOptions> = [
    {
      type: 'autocomplete',
      name: 'DIRECTORY',
      message: 'Hey! Pick a Challenge 🕘',
      source: async (_answers, input) => {
        const fuzzied = fuzzy.filter(input || '', directories)
        return fuzzied.map((el) => el.string)
      },
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

  nodemonProcess.stdout?.setEncoding('utf8')
  nodemonProcess.stdout?.on('data', (data) => {
    console.log(data)
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
