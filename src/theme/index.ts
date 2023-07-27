import { extendTheme } from "@chakra-ui/theme-utils";
import { colors } from "./colors";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Menu } from "./components/menu";
import { Card } from "./components/card";
import { Form } from "./components/form";
import { Stat } from "./components/stat";
import { Tabs } from "./components/tabs";
import { Container } from "./components/container";
import { Modal } from "./components/modal";
import { Table } from "./components/table";
import { Accordion } from "./components/accordion";

const fonts = {
  heading: "Inter",
  body: "Inter",
};

export const theme = extendTheme({
  fonts,
  colors,
  components: {
    Button,
    Input,
    Menu,
    Card,
    Form,
    Stat,
    Tabs,
    Container,
    Modal,
    Table,
    Accordion,
  },
  styles: {
    global: {
      '.slick-arrow-btn': {
        display: 'none!important',
        transition:'all .3s ease'
      },
      
     ' .css-1tdvlph:hover .slick-arrow-btn' :{
        display: 'block!important',
        transition:'all .3s ease'
      },
      body: {
        color: colors.black,
        backgroundImage: 'url("/assets/images/bg.webp")',
        backgroundSize: "cover",
      },
      '.ErrorMessage':{
        color:'red.700',

      },
      h1: {
        fontSize: "56px",
      },
      ".datePicker": {
        backGround: "red",
        width: "100%",
        input: {
          width: "100%",
        },
      },
      ".DatePickerPopper": {
        borderRadius: "4px",
        border: "1px solid #e2e8f0",
        ".react-datepicker__header": {
          backgroundColor: "#F0F0F0",
        },
      },

      "i:before": {
        width: "auto!important",
        marginRight: "initial!important",
        marginLeft: "initial!important",
      },
    },
  },
});
