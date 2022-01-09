import chalk from 'chalk'
import inquirer, { QuestionCollection } from 'inquirer'
import fs from 'fs'

const log = console.log

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((dir) => !['__template', 'utils'].includes(dir))
    .sort((a, b) => {
      const aNums = parseInt(a.slice(0, 4))
      const bNums = parseInt(b.slice(0, 4))

      if (aNums < bNums) return -1
      if (aNums === bNums) return 0
      return 1
    })

const askQuestions = (directories: string[]) => {
  const questions: QuestionCollection = [
    {
      type: 'list',
      name: 'DIRECTORY',
      message: 'Pick a challenge to work on',
      choices: directories,
    },
  ]

  return inquirer.prompt(questions)
}

const run = async () => {
  log(chalk.green('Hey! Pick a file ~~~'))
  const directories = getDirectories(process.cwd() + '/src')
  const { DIRECTORY } = await askQuestions(directories)
  log(chalk.green(`Looks like you choose ${DIRECTORY}, is that right?`))
}

run()
