import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",

  initialState,

  reducers: {
    addWord: (state, action) => {
      const wordExists = state.words.some(
        (word) => word.word === action.payload.word
      );

      if (wordExists) {
        return;
      }

      const now = new Date().getTime();

      state.words.push({
        word: action.payload.word,
        phonetics: action.payload.phonetics,
        audio: action.payload.audio,
        meaning: action.payload.meaning,
        partOfSpeech: action.payload.partOfSpeech,

        dateForgets: now - INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: now,
        forgettingSpan: INITIAL_FORGETTING_SPAN,
        status: 0,
      });
    },

    updateWord: (state, action) => {
      const word = state.words.find(
        (word) => word.word === action.payload.word
      );

      if (word) {
        word.phonetics = action.payload.phonetics;
        word.audio = action.payload.audio;
        word.meaning = action.payload.meaning;
        word.partOfSpeech = action.payload.partOfSpeech;
      }
    },

    removeWord: (state, action) => {
      state.words = state.words.filter(
        (word) => word.word !== action.payload
      );
    },

    updateWordLearnInfo: (state, action) => {
      const word = state.words.find(
        (word) => word.word === action.payload
      );

      if (word) {
        const now = new Date().getTime();
        const oldForgettingSpan = word.forgettingSpan;

        word.dateForgets = now + oldForgettingSpan;
        word.dateTotallyForgets = now + oldForgettingSpan * 2;
        word.forgettingSpan = oldForgettingSpan * 2;
        word.status = 2;
      }
    },

    updateStatuses: (state) => {
      const now = new Date().getTime();

      state.words.forEach((word) => {
        if (now > word.dateTotallyForgets) {
          word.status = 0;
        } else if (now > word.dateForgets) {
          word.status = 1;
        } else {
          word.status = 2;
        }
      });
    },
  },
});

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;
