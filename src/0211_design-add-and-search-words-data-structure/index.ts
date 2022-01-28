/**
 * Title: Design Add and Search Words Data Structure
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/design-add-and-search-words-data-structure/
 * ID: 0211
 * Created: Thu Jan 27 2022
 */

/**
Example Cases: 

["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

class TrieNode {
  key?: string
  children: Map<string, TrieNode> = new Map()
  end = false

  constructor(key?: string) {
    this.key = key
  }
}

/**
Runtime: 345 ms, faster than 36.36% of TypeScript online submissions for Design Add and Search Words Data Structure.
Memory Usage: 91.5 MB, less than 6.06% of TypeScript online submissions for Design Add and Search Words Data Structure.
 */
class WordDictionary {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  addWord(word: string): void {
    let node = this.root
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char))
      }
      node = node.children!.get(char)!
    }
    node.end = true
  }

  search(word: string): boolean {
    function dfs(root: TrieNode, word: string): boolean {
      let node = root
      for (let i = 0; i < word.length; i++) {
        const char = word[i]
        if (char === '.') {
          for (const [_key, child] of node.children.entries()) {
            if (dfs(child, word.substring(i + 1))) return true
          }
          return false
        } else {
          if (!node.children.has(char)) return false
          node = node.children.get(char)!
        }
      }
      return node.end
    }
    return dfs(this.root, word)
  }
}
/**
https://en.wikipedia.org/wiki/Trie
This was suposed to be a sort of Trie tree
 */

/**
Runtime: 1087 ms, faster than 6.06% of TypeScript online submissions for Design Add and Search Words Data Structure.
Memory Usage: 70 MB, less than 30.30% of TypeScript online submissions for Design Add and Search Words Data Structure.
 */
/** Main Code Snippet */
class WordDictionaryCachedMap {
  words: Set<string>
  searched: Map<string, boolean>
  constructor() {
    this.words = new Set<string>()
    this.searched = new Map<string, boolean>()
  }

  addWord(word: string): void {
    // clear searched "cache"
    this.searched.clear()
    this.words.add(word)
  }

  search(word: string): boolean {
    if (this.searched.has(word)) {
      return this.searched.get(word)!
    }
    let hasWord = this.words.has(word)

    if (!hasWord) {
      // turn word into regex expression
      const regexWord = word.split('.').join('.{1}')
      for (const value of this.words.values()) {
        const regEx = new RegExp(`^${regexWord}$`)
        if (regEx.test(value)) {
          hasWord = true
          break
        }
      }
    }
    this.searched.set(word, hasWord)
    return hasWord
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

function wrapperFunc(example: [string[], [string][]]) {
  let wordDictionary: WordDictionary | undefined = undefined

  for (const [i, v] of example[0].entries()) {
    console.log(v, example[1][i])
    switch (v) {
      case 'WordDictionary':
        wordDictionary = new WordDictionary()
        break
      case 'addWord':
        wordDictionary?.addWord(example[1][i][0])
        break
      case 'search':
        console.log(wordDictionary?.search(example[1][i][0]))
        break
    }
  }

  return 'Finished'
}

const examples = [
  // [
  //   [
  //     'WordDictionary',
  //     'addWord',
  //     'addWord',
  //     'addWord',
  //     'search',
  //     'search',
  //     'search',
  //     'search',
  //   ],
  //   [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
  // ],
  [
    [
      'WordDictionary',
      'addWord',
      'addWord',
      'addWord',
      'addWord',
      'search',
      'search',
      'addWord',
      'search',
      'search',
      'search',
      'search',
      'search',
      'search',
    ],
    [
      [],
      ['at'],
      ['and'],
      ['an'],
      ['add'],
      ['a'],
      ['.at'],
      ['bat'],
      ['.at'],
      ['an.'],
      ['a.d.'],
      ['b.'],
      ['a.d'],
      ['.'],
    ],
  ],
]

run(examples, wrapperFunc)
