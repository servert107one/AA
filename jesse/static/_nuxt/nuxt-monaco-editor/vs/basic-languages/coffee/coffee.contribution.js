/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 *-----------------------------------------------------------------------------*/


// src/basic-languages/coffee/coffee.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "coffeescript",
  extensions: [".coffee"],
  aliases: ["CoffeeScript", "coffeescript", "coffee"],
  mimetypes: ["text/x-coffeescript", "text/coffeescript"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/coffee/coffee"], resolve, reject);
      });
    } else {
      return import("./coffee.js");
    }
  }
});
