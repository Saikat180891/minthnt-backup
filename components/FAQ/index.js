import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Grid,
  GridItem,
  Image,
  Button,
  Text,
  HStack,
  Link,
  Input,
  Checkbox,
  CheckboxGroup,
  Badge,
} from "@chakra-ui/react";
import {
  CloseIcon,
  AddIcon,
  EditIcon,
  CheckCircleIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import React from "react";
import * as types from "../../store/types/types";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { updateFaq } from "../../store/actions/faq.actions";

const ReactQuill = dynamic(
  import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

const topics = ["ALL", "SETUP", "TROUBLESHOOTING", "PAYMENTS", "EARNINGS"];

const FAQ = ({
  faq = {},
  index,
  updateFaq = () => {},
  onSave = () => {},
  onDelete = () => {},
}) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [values, setValues] = React.useState(faq);
  const ref = React.useRef();
  const btnRef = React.useRef();

  React.useEffect(() => {
    if (!values.ques && !values.ans) {
      setIsEditable(true);
      if (ref?.current && btnRef?.current)
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      btnRef.current.dispatchEvent(clickEvent);
    }
  }, []);

  const handleEdit = (e, edit) => {
    e.preventDefault();
    setIsEditable(edit);
  };

  const handleSave = (e, save) => {
    e.preventDefault();
    setIsEditable(save);
    updateFaq(index, values);
    onSave();
  };

  return (
    <AccordionItem
      borderRadius="none"
      border="none"
      bg="whitesmoke"
      w="full"
      mb="4"
      ref={ref}
    >
      <AccordionButton
        p="0"
        borderRadius="none"
        shadow="sm"
        outline="none"
        bg="minthnt.gray3"
        outline="none"
        border="none"
        w="full"
        h="3rem"
        _hover={{ border: "none", outline: "none" }}
        _active={{ outline: "none", border: "none" }}
        _focus={{ outline: "none", border: "none" }}
        ref={btnRef}
      >
        <Grid templateColumns="repeat(12, 1fr)" w="full">
          <GridItem colSpan="10" px="4">
            {isEditable ? (
              <Input
                w="full"
                placeholder="Question"
                value={values?.ques}
                onClick={(e) => e.preventDefault()}
                onChange={(e) => setValues({ ...values, ques: e.target.value })}
              />
            ) : (
              <Text textAlign="left">{values?.ques}</Text>
            )}
          </GridItem>
          <GridItem colSpan="2" alignSelf="center" justifySelf="end" px="4">
            <Flex>
              <Box mr="2rem">
                {isEditable ? (
                  <CheckCircleIcon onClick={(e) => handleSave(e, false)} />
                ) : (
                  <EditIcon onClick={(e) => handleEdit(e, true)} />
                )}
              </Box>
              <Box>
                <DeleteIcon onClick={onDelete} />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </AccordionButton>
      <AccordionPanel borderRadius="0" bg="black" px="0" py="6" fontSize="12">
        <Box mb="4">
          {isEditable ? (
            <CheckboxGroup
              colorScheme="green"
              onChange={(e) => setValues({ ...values, type: e })}
              defaultValue={values?.type}
            >
              <HStack>
                {topics.map((topic, i) => (
                  <Checkbox
                    key={topic}
                    value={topic}
                    defaultIsChecked={values?.type?.indexOf(topic) > -1}
                  >
                    {console.log("values", values.type.includes(topic))}
                    {topic}
                  </Checkbox>
                ))}
              </HStack>
            </CheckboxGroup>
          ) : (
            <HStack>
              {values?.type?.map((t, i) => (
                <Badge colorScheme="green" key={i}>
                  {t}
                </Badge>
              ))}
            </HStack>
          )}
        </Box>
        {isEditable ? (
          <ReactQuill
            value={values?.ans}
            onChange={(e) => setValues({ ...values, ans: e })}
          />
        ) : (
          <Text
            fontSize="14px"
            dangerouslySetInnerHTML={{ __html: values?.ans }}
          ></Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default connect(null, { updateFaq })(FAQ);
