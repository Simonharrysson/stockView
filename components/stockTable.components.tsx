import { TextField } from "@mui/material";
import styled from "styled-components";

export const initialFieldValues = {
  ticker: "",
  count: "",
  give: "",
};

export const TotalContainer = styled.div`
  height: 10%;
  width: 100%;
  min-height: 200px;
  background-color: #1c2541;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const ValueTotal = styled.span`
  font-size: 30px;
`;
export const DailyChangeTotal = styled.span`
  font-size: 15px;
`;

export const Container = styled.div`
  height: 100%;
  background-color: #0b132b;
`;

export const Content = styled.div`
  border-radius: 5px;
  border: 2px white dashed;
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 2rem;
  height: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
  height: 56px;

  @media (max-width: 900px) {
    width: 100%;
    height: 300px;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
