import chalk from 'chalk'
import inquirer, { QuestionCollection } from 'inquirer'
import fs from 'fs'
import nodemon from 'nodemon'
import { spawn } from 'child_process'
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
      console.log('hit sort')
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

const run = async () => {
  log(chalk.green(''))

  const directories = getDirectories(process.cwd() + '/src')
  if (!directories.length) {
    console.error('No directories found!')
    exit()
  }

  const { DIRECTORY } = await askQuestions(directories)
  log(chalk.green(`Starting up nodemon for ${DIRECTORY}...`))

  const tsc = spawn('npx', [
    'tsc',
    '--watch',
    `src/${DIRECTORY}/index.ts`,
    '--esModuleInterop',
    'true',
    '--module',
    'ES2015',
    '--moduleResolution',
    'node',
    '--outDir',
    'dist',
  ])

  let startedNodemon = false

  tsc.stdout.on('data', (data: string) => {
    console.log(`TSC stdout: ${data}`)

    if (
      !startedNodemon &&
      /Found 0 errors\. Watching for file changes/.test(data)
    ) {
      nodemon(`dist/${DIRECTORY}/index.js`)
      startedNodemon = true
    }
  })

  tsc.on('close', (code) => {
    console.log(`tsc process close all stdio with code ${code}`)
  })

  tsc.on('exit', (code) => {
    console.log(`tsc process exited with code ${code}`)
  })

  nodemon
    .on('start', function () {
      log(chalk.green(`${DIRECTORY} has started`))
    })
    .on('quit', function () {
      log(chalk.red(`${DIRECTORY} has quit`))
      process.exit()
    })
    .on('restart', function (files) {
      log(`${DIRECTORY} restarted due to: `, files)
    })
}

run()
