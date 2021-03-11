"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = async (ms) => {
    // eslint-disable-next-line promise/avoid-new
    await new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
