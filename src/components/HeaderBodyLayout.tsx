import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IHeaderBodyLayoutProps {
  header: ReactNode;
  body: ReactNode;
}

const HeaderBodyLayout = (props: IHeaderBodyLayoutProps) => {
  const { header, body } = props;
  return (
    <Box h="100vh" display="flex" flexDir="column" overflow="hidden">
      <Box>{header}</Box>
      <Box flex="1" position="relative" overflow="auto">
        {body}
      </Box>
    </Box>
  );
};

export default HeaderBodyLayout;
