export default function run(examples: Array<any>, fn: Function) {
  console.log('=============\nSTART\n=============')
  for (const example of examples) {
    console.log('\n')
    console.log('Input: ')
    console.log(example.toString())
    console.log('Output: ')
    console.log(fn(example).toString())
    console.log('\n')
  }
  console.log('=============\nEND\n=============')
}
