/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 *-----------------------------------------------------------------------------*/


// src/basic-languages/wgsl/wgsl.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "wgsl",
  extensions: [".wgsl"],
  aliases: ["WebGPU Shading Language", "WGSL", "wgsl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/wgsl/wgsl"], resolve, reject);
      });
    } else {
      return import("./wgsl.js");
    }
  }
});
