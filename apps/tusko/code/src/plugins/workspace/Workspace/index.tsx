import React from "react";
import styled from "@emotion/styled";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import Boards from "./Board/Boards";

const WorkspaceWrapper = styled.div`
  flex: 1;
`;

const Workspace = () => {
  return (
    <WorkspaceWrapper>
      <SplitView>
        <LeftPanel span={2}>
          <Boards />
        </LeftPanel>
        <RightPanel span={10}>
          New Board
        </RightPanel>
      </SplitView>
    </WorkspaceWrapper>
  );
}

export default Workspace;
