import { ReactElement } from "react";
import SplitPane, { SplitPaneProps } from "react-split-pane";
import HeaderBodyLayout from "./HeaderBodyLayout";

// Just to fix the type error
const SplitPaneWithChildren = (
  props: SplitPaneProps & { children: React.ReactNode }
) => {
  return <SplitPane {...props} />;
};

interface ISplitPaneLayoutProps {
  header?: ReactElement;
  leftPane?: ReactElement;
  rightPane?: ReactElement;
}

export const SplitPaneLayout = (props: ISplitPaneLayoutProps) => {
  const { header, rightPane, leftPane } = props;

  if (!leftPane || !rightPane) {
    return <HeaderBodyLayout header={header} body={leftPane || rightPane} />;
  }

  return (
    <HeaderBodyLayout
      header={header}
      body={
        <div className="flex flex-col">
          <SplitPaneWithChildren
            split="vertical"
            minSize={130}
            defaultSize={210}
          >
            {leftPane}
            {rightPane}
          </SplitPaneWithChildren>
        </div>
      }
    />
  );
};
