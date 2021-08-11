import {
  Flex,
  Box,
  Grid,
  GridItem,
  Accordion,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Dashboard from "@/Dashboard";
import React from "react";
import tw from "twin.macro";
import FAQ from "@/FAQ";
import { connect } from "react-redux";
import { setFaq, addFaq, deleteFqa } from "../store/actions/faq.actions";

const Index = ({
  faqs = [],
  setFaq = () => {},
  addFaq = () => {},
  deleteFqa = () => {},
}) => {
  const [save, setSave] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => setFaq(data?.name));
  }, []);

  React.useEffect(() => {
    if (!save) return;
    fetch("/api/faq", {
      method: "POST",
      body: JSON.stringify({
        name: faqs,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFaq(data?.name);
        setSave(false);
      });
  }, [faqs]);

  const handleSave = React.useCallback(() => {
    setSave(true);
  }, [save]);

  return (
    <Dashboard>
      <Flex padding="2rem" direction="column" paddingBottom="50vh">
        <Accordion borderRadius="none" defaultIndex={[0]} allowMultiple>
          {faqs?.map((faq, i) => (
            <FAQ
              onSave={handleSave}
              onDelete={() => deleteFqa(i)}
              index={i}
              key={i}
              faq={faq}
            />
          ))}
        </Accordion>
        <Tooltip label="Add new faq">
          <Flex
            bg="minthnt.green2"
            w="3rem"
            h="3rem"
            rounded="full"
            position="fixed"
            bottom="2rem"
            right="2rem"
            zIndex="50"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={addFaq}
          >
            <AddIcon />
          </Flex>
        </Tooltip>
      </Flex>
    </Dashboard>
  );
};

const mapStateToProps = (state) => {
  return {
    faqs: state.faq.faqs,
  };
};

export default connect(mapStateToProps, { setFaq, addFaq, deleteFqa })(Index);

export async function getServerSideProps({ req, res }) {
  // let isLoggedIn = false;
  // const isCookieAvailable = req.cookies.token;
  // if (isCookieAvailable) {
  //   isLoggedIn = true;
  //   return {
  //     props: { isLoggedIn },
  //   };
  // }

  // res.statusCode = 302;
  // res.setHeader("Location", `/login`);

  return {
    props: {},
  };
}
