/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      // This method builds a Map (a dictionary-like structure) where each word points to an array of words that can follow it.
      this.chains = new Map();
  
  
      for (let i = 0; i < this.words.length; i++) {
        const word = this.words[i];
        const nextWord = this.words[i + 1] || null;
  
        // If a word already exists in the chains, append the nextWord to its array. 
        // Otherwise, initialize it with a new array containing the nextWord.
        if (this.chains.has(word)) {
          this.chains.get(word).push(nextWord);
        } else {
          this.chains.set(word, [nextWord]);
        }
      }
    }
  
  
    /** Helper method: choose a random word from an array */
    static choice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      // Start with a random key from the chains.
      const keys = Array.from(this.chains.keys());
      let key = MarkovMachine.choice(keys);
      let output = [];
  
      // Generate the text by following the Markov chain, appending each word to the output until reaching the desired number 
      // of words or encountering null (indicating the end of the chain).
      while (output.length < numWords && key !== null) {
        output.push(key);
        key = MarkovMachine.choice(this.chains.get(key));
      }
  
      return output.join(" ");
    }
  }
  
  
  module.exports = { MarkovMachine };
  
//   To test code:

//   const { MarkovMachine } = require('./markov');
  
//   const mm = new MarkovMachine("the cat in the hat");
//   console.log(mm.makeText(10));
  