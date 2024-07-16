import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function Cards({
  cardNum,
  numColor,
  text,
  cardType,
  gender,
  selectGender,
  age,
  selectAge,
  height,
  selectFt,
  selectIn,
}) {
  const typeOfCard = (type) => {
    if (type === "genderSelect") {
      return (
        <>
          <Button
            size="large"
            variant={gender.m ? "contained" : "outlined"}
            onClick={() => selectGender("m")}
          >
            <MaleIcon />
          </Button>
          <Button
            size="large"
            variant={gender.f ? "contained" : "outlined"}
            onClick={() => selectGender("f")}
          >
            <FemaleIcon />
          </Button>
        </>
      );
    } else if (type === "ageSelect") {
      return (
        <>
          <Box>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Slider
              sx={{ width: "80%" }}
              valueLabelDisplay="on"
              onChange={(e) => selectAge(e.target.value)}
              value={age.num}
              step={1}
              marks
              min={18}
              max={100}
            />
          </Box>
        </>
      );
    } else if (type === "heightSelect") {
      return (
        <>
          {/* https://mui.com/material-ui/react-select/ */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Ft</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={height.ft}
              label="Ft"
              onChange={(e) => selectFt(e.target.value)}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">In</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={height.in}
              label="In"
              onChange={(e) => selectIn(e.target.value)}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
        </>
      );
    }
  };

  // Error stylings
  const errorStyle = () => {
    if (numColor === "error") {
      return { border: "2px dotted red" };
    } else {
      return {};
    }
  };

  return (
    // colors: "primary", "secondary", "success", "error"
    <Badge badgeContent={cardNum} color={numColor} sx={errorStyle}>
      <Card variant="outlined">
        <Typography variant="h5">
          {text}
          <br />
          {typeOfCard(cardType)}
        </Typography>
      </Card>
    </Badge>
  );
}

export default Cards;
