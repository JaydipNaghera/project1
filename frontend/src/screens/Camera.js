import React from "react";

function Component() {
    doSomething(e);
    {
      e.preventDefault();
      // Some more response to the event
    }
    return <button onEvent={doSomething}></button>;
  }