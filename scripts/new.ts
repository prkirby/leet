import chalk from 'chalk'
import figlet from 'figlet'
import inquirer, { QuestionCollection } from 'inquirer'
import axios from 'axios'
import shell from 'shelljs'
import replace from 'replace-in-file'
import TurndownService from 'turndown'

const log = console.log

const turndownService = new TurndownService()

/**
 * 3D Diagonal
 * Contessa
 * Doh
 * Diet Cola
 * Graceful
 */

const init = () => {
  // log(figlet.fontsSync())
  log(
    chalk.green(
      figlet.textSync('Leet Workspace Generator', {
        font: 'Contessa',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  )
  log('\n')
}

const wrapUp = () => {
  log(chalk.bgWhite.green('All set!'))
}

const askQuestions = () => {
  const questions: QuestionCollection = [
    {
      name: 'CHALLENGE_URL',
      type: 'input',
      message: "What's the challenge's full url?",
    },
  ]
  return inquirer.prompt(questions)
}

const getData = async (slug: string) => {
  try {
    let query = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionFrontendId
          title  
          difficulty
          exampleTestcases
          categoryTitle
          content
          codeSnippets {
            langSlug
            code
          }
        }
      }
  `

    query = query.replace(/ +/g, ' ')

    const variables = {
      titleSlug: slug,
    }

    const URL = `https://leetcode.com/graphql?query=${encodeURIComponent(
      query
    )}&variables=${encodeURIComponent(JSON.stringify(variables))}`

    const { data } = await axios.get(URL)

    return data.data
  } catch (error) {
    console.error(error)
  }
}

type LeetChallengeData = {
  id: string
  url: string
  title: string
  category?: string
  difficulty?: string
  exampleTestcases?: string
  markdown?: string
  codeSnippet?: string
}

const replaceTemplateParts = (
  filesPattern: string,
  data: LeetChallengeData
) => {
  const replaceOptions = {
    files: filesPattern,
    from: [
      '${ID}',
      '${URL}',
      '${TITLE}',
      '${CATEGORY}',
      '${DIFFICULTY}',
      '${EXAMPLE_TEST_CASES}',
      '${MARKDOWN}',
      '//${CODE_SNIPPET}', // Replace comment delimiters as well
      '${DATE}',
    ],
    to: [...Object.values(data), new Date().toDateString()], // Follows Type order
  }

  replace.sync(replaceOptions)
}

const run = async () => {
  try {
    // https://leetcode.com/problems/container-with-most-water/

    init()

    const { CHALLENGE_URL } = await askQuestions()

    const url = new URL(CHALLENGE_URL)
    const pathParts = url.pathname.split('/').filter((e) => e !== '')
    const slug = pathParts[pathParts.length - 1]

    const { question } = await getData(slug)
    const {
      questionFrontendId: id,
      title,
      difficulty,
      exampleTestcases,
      categoryTitle: category,
      content,
      codeSnippets,
    } = question

    let codeSnippet: {
      langSlug?: string
      code?: string
    } = {}

    if (codeSnippets.length) {
      codeSnippet = (codeSnippets as Array<any>).find(
        (el) => el.langSlug === 'typescript'
      )
    }

    const markdown = turndownService.turndown(content)

    const templateData: LeetChallengeData = {
      id,
      url: CHALLENGE_URL,
      title,
      category,
      difficulty,
      exampleTestcases,
      markdown,
      codeSnippet: codeSnippet.code,
    }

    const templateDir = `${process.cwd()}/src/__template/*`
    const newDir = `${process.cwd()}/src/_${id}_${slug}`

    shell.mkdir(newDir)
    shell.cp('-R', templateDir, newDir)

    replaceTemplateParts(`${newDir}/*`, templateData)

    wrapUp()
  } catch (error) {
    console.error(error)
  }
}

run()
