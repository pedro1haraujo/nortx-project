import { Navbar } from "../Navbar";
import * as Styles from "./styles";
import { useState } from "react";

export const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Styles.Container className={expanded ? "expanded" : ""}>
      <Navbar
        expanded={expanded}
        updateExpanded={setExpanded}
      />
      <Styles.Main>
        <Styles.MainContent id="main-content">
          {children}
        </Styles.MainContent>
      </Styles.Main>
    </Styles.Container>
  );
}
