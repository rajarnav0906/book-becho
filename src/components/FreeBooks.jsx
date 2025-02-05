import React from "react";
import { LampDemo } from "./LampDemo";
import { CardStack } from "./CardStack";
import freeBookList from "../../public/list.json";

const filterData = freeBookList.filter((data) => data.category === "Free");

export default function Page() {
  return (
    <LampDemo>
      <div className="flex items-center justify-center h-full">
        <CardStack items={filterData} offset={20} scaleFactor={0.06} />
      </div>
    </LampDemo>
  );
}
