import chalk from 'chalk'
const log = console.log

export default function run(fn: Function) {
  log(chalk.green('=============\nSTART\n============='))
  fn()
  log(chalk.green('=============\nEND\n============='))
}
