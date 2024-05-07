import { Box } from "@chakra-ui/react";
import React from "react";

const GradeWithSubject = ({
  params: { grade, subject },
}: {
  params: { grade: string; subject: string };
}) => {
  return (
    <Box>
      Grade {grade} ; {subject}
    </Box>
  );
};

export default GradeWithSubject;
