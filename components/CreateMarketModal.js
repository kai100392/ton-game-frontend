import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import TimestampForm from "./TimestampForm";

const colors = {
  primary: "#A45DBB",
  secondary: "#FF0000",
  background: "#151029",
  text: "#FFFFFF",
};

const CreateMarketModal = ({
  createModalopen,
  handleCreateModalClose,
  handleCreateMarket,
}) => {
  const [name, setName] = useState("");
  const [usdAmntLP, setUsdAmntLP] = useState(null);
  const [dtCallDeadline, setDtCallDeadline] = useState(null);
  const [dtResultVoteStart, setDtResultVoteStart] = useState(null);
  const [dtResultVoteEnd, setDtResultVoteEnd] = useState(null);
  const [resultLabels, setResultLabels] = useState([""]);
  const [resultDescrs, setResultDescrs] = useState([""]);
  const [resultNum, setResultNum] = useState(2);

  const handleResultLabels = (value, key) => {
    const newLabels = [...resultLabels];
    newLabels[key] = value;
    setResultLabels(newLabels);
  };

  const handleResultDescrs = (value, key) => {
    const newDescrs = [...resultDescrs];
    newDescrs[key] = value;
    setResultDescrs(newDescrs);
  };

  const handleAddResult = () => {
    const newNum = resultNum + 1;
    setResultNum(newNum);
  };

  const handleModalClose = () => {
    setResultNum(2);
    handleCreateModalClose();
  };

  const handleSubmit = async () => {
    const formData = {
      _name: name,
      _usdAmntLP: Number(usdAmntLP),
      _dtCallDeadline: dtCallDeadline,
      _dtResultVoteStart: dtResultVoteStart,
      _dtResultVoteEnd: dtResultVoteEnd,
      _resultLabels: resultLabels,
      _resultDescrs: resultDescrs,
    };

    handleCreateMarket(formData);
    console.log(formData);
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "& .MuiInputLabel-root": {
      color: colors.text,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "& .MuiInputBase-input": {
      color: colors.text,
      fontSize: '25px',
    },
  };

  return (
    <Modal
      sx={{ overflow: "auto" }}
      display="flex"
      open={createModalopen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >

      <Box
        className="glowBox" // Apply the glowBox class here
      >
        
        <div className="typography" variant="h4" component="h1" align="center">
          Create New Market
        </div>

        <TextField
       
          fullwidth="true"
          label="NAME"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={textFieldSx}
        />
        <TextField
          fullwidth="true"
          label="LP AMOUNT"
          variant="outlined"
          margin="normal"
          value={usdAmntLP}
          type="number"
          onChange={(e) => setUsdAmntLP(e.target.value)}
          sx={textFieldSx}
        />
        
        <TimestampForm
          label="DEADLINE"
          onSubmitValue={setDtCallDeadline}
          textColor={colors.text}
        />
        <TimestampForm
          label="START DATE"
          onSubmitValue={setDtResultVoteStart}
          textColor={colors.text}
        />
        <TimestampForm
          label="END DATE"
          onSubmitValue={setDtResultVoteEnd}
          textColor={colors.text}
        />
        
        {Array(resultNum)
          .fill("")
          .map((item, key) => (
            <Box
              m={(2, 0)}
              display="flex"
              justifyContent="space-between"
              flexDirection="row"
              key={key}
            >
              <TextField
                sx={{ ...textFieldSx, mr: 2 }}
                label={resultNum > 1 ? `OPTION(${key + 1})` : `OPTION`}
                variant="outlined"
                margin="normal"
                onChange={(e) => handleResultLabels(e.target.value, key)}
                placeholder="YES"
              />

              <TextField
                fullwidth="true"
                label={resultNum > 1 ? `DESCRIPTION(${key + 1})` : `DESCRIPTION`}
                variant="outlined"
                margin="normal"
                onChange={(e) => handleResultDescrs(e.target.value, key)}
                placeholder="YES means A win"
                sx={textFieldSx}
              />
            </Box>
          ))}

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button 
            className="button-add"
            variant="outlined" 
            onClick={handleAddResult} 
          >
            Add Outcome
          </Button>

          <Button 
            className="button-submit"
            variant="contained" 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
     
    </Modal>

  );
};

export default CreateMarketModal;
