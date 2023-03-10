import { ReactElement, useRef, useState } from "react";
import ArrowUpSvg from "../images/arrow-up";

const Accordion = (props: {
  header: ReactElement;
  suffix?: ReactElement;
  content: ReactElement;
}) => {
  const { header, content, suffix } = props;
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");
  const contentSpace = useRef(null);
  function toggleAccordion(e: React.MouseEvent<HTMLElement>) {
    let target = e.target as HTMLElement;
    let forValue = target.getAttribute("for");
    if (forValue !== "delete-modal") {
      setActive((prevState) => !prevState);
      // @ts-ignore
      setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
      setRotate(
        active
          ? "transform duration-600 ease "
          : "transform duration-600 ease rotate-180"
      );
    }
  }
  return (
    <div className="md:px-6 md:py-2 md:mb-4 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 block max-w-lg px-2 mx-auto mb-2 overflow-y-hidden bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col">
        <button
          className="md:py-2 focus:outline-none box-border flex items-center justify-between py-2 appearance-none cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="dark:text-white md:text-2xl font-bold tracking-tight text-gray-900">
            {header}
          </div>
          <div className="flex">
            {suffix}
            <div className={`${rotate} inline-block `}>
              <ArrowUpSvg />
            </div>
          </div>
        </button>

        <div
          ref={contentSpace}
          style={{ maxHeight: `${height}` }}
          className="transition-max-height overflow-auto overflow-y-hidden duration-700 ease-in-out"
        >
          <div className="pb-10">{content}</div>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
