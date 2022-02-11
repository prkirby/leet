// export class Stack<T> {
//   private _stack: Array<T>

//   constructor(arr?: Array<T>) {
//     this._stack = arr || new Array<T>()
//   }

//   peek(): T | undefined {
//     return this._stack[this._stack.length - 1]
//   }

//   pop(): T | undefined {
//     return this._stack.pop()
//   }

//   push(val: T) {
//     this._stack.push(val)
//   }

//   empty(): boolean {
//     return this._stack.length <= 0
//   }

//   clear() {
//     this._stack = new Array<T>()
//   }

//   values(): Array<T> {
//     return this._stack
//   }

//   toString() {
//     return this._stack.toString()
//   }
// }

function peek<T>(s: Array<T>): T | undefined {
  return s[s.length - 1]
}

function pop<T>(s: Array<T>): [v: T, s: Array<T>] | undefined {
  if (!s.length) return undefined
  s = [...s]
  const v = s.pop()!
  return [v, s]
}

export const Stack = {
  peek,
  pop,
}
