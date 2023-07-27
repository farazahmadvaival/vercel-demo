import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth, addDays } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { Box, Button, Select } from "@chakra-ui/react";

registerLocale("en-GB", enGB);

const DatePickerReact = ({ getDate }: any) => {
  const [startDate, setStartDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );

  const getYearsRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const years = getYearsRange(1990, getYear(new Date()));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const minDate = addDays(new Date(), 1);

  return (
    <DatePicker
      locale="en-GB"
      wrapperClassName="datePicker"
      popperClassName="DatePickerPopper"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Box m="10px" display="flex" justifyContent="center">
          <Button
            h="32px"
            bg="transparent!important"
            p="0"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {
              <>
                <Box>
                  {" "}
                  <i className="icon-arrow-left"></i>
                </Box>
              </>
            }
          </Button>
          <Select
            h="32px"
            borderRadius="4px"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Select
            h="32px"
            borderRadius="4px"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Button
            p="0"
            h="32px"
            bg="transparent!important"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {
              <>
                <Box>
                  {" "}
                  <i className="icon-arrow-right"></i>
                </Box>
              </>
            }
          </Button>
        </Box>
      )}
      selected={startDate}
      minDate={minDate}
      onChange={(date) => {
        setStartDate(date as Date);
        getDate && getDate(date);
      }}
    />
  );
};

export default DatePickerReact;
