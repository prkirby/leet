export default function run(examples: Array<any>, fn: Function) {
  console.log('=============\nRunning Examples...\n=============')
  for (const example of examples) {
    logFunctionCall(example, fn)
  }
  console.log('=============\n...Done\n=============')
}

function logFunctionCall(example: any, fn: Function) {
  const args = fn.length > 1 ? example : [example]
  console.log('=======')
  console.log('Input: ')
  for (const arg of args) console.log(arg)
  console.log('Output: ')
  console.log(fn(...args))
  console.log('=======\n')
}
