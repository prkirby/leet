export default function run(examples: Array<any>, fn: Function) {
  const out = `
  ##############################################################
  Running Examples...

  ${(() => {
    let examplesOut = ''
    for (const example of examples) {
      examplesOut += logFunctionCall(example, fn)
    }
    return examplesOut
  })()}

  ...Done
  ##############################################################

  `
  console.log(out)
}

function logFunctionCall(example: any | any[], fn: Function) {
  const args: any[] = fn.length > 1 ? example : [example]

  return `
    ========================================================
    Input:
    
    ${logArgs(args)}
        ----------------------------------------------------

        Output:
    
        ${fn(...args)}

  `
}

function logArgs(args: any[]) {
  let out = ``
  for (const arg of args) {
    out += `${arg}
    `
  }
  return out
}
