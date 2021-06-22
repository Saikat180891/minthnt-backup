import { Grid, GridItem } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import React from "react";
import { sortBy } from "../../store/actions/leads.actions";
import { connect } from "react-redux";
import { sortkeys } from "./initialValues.model";

export const columns = [
  "Name",
  "City",
  "State",
  "Zip",
  "Referred By",
  "Status",
];

const TableHeader = ({ sortBy, sort }) => {
  return (
    <Grid
      w="full"
      templateColumns="repeat(6, 1fr)"
      h="3rem"
      alignContent="center"
      fontSize="12"
      gap={6}
    >
      {columns.map((colName, i) => (
        <GridItem
          key={colName}
          fontWeight="600"
          textTransform="uppercase"
          cursor={sortkeys[colName] && "pointer"}
          pb="2"
          color={sort === sortkeys[colName] && sort !== "" && "minthnt.green1"}
          onClick={() => sortkeys[colName] && sortBy(sortkeys[colName])}
        >
          {sortkeys[colName] && <ArrowUpDownIcon height={3} />} {colName}
        </GridItem>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    sort: state.leads.sort,
  };
};

export default connect(mapStateToProps, { sortBy })(TableHeader);
