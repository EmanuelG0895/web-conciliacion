"use client";

import { PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { Button } from "../../user-interaction";
import { Profile } from "../../data-display";

function Navbar() {
  return (
    <div className="bg-gs-yellow dark:bg-gs-yellow-dark flex items-center justify-between px-3">
      <div className="flex items-center">
        <Button>
          <PinRightIcon /> : <PinLeftIcon />
        </Button>
        <h1 className="">GP</h1>
      </div>
      <div className="flex">
        boton de cambio de tema
        <Profile />
      </div>
    </div>
  );
}

export default Navbar;
