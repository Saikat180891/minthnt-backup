import { Grid, GridItem } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import React from "react";
import { sortBy } from "../../store/actions/leads.actions";
import { connect } from "react-redux";

export const columns = [
  "Name",
  "City",
  "State",
  "Zip",
  "Referred By",
  "Status",
];

const TableHeader = ({ sortBy, sort }) => {
  const [selected, setSelected] = React.useState(0);

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
          cursor="pointer"
          pb="2"
          color={sort === colName.toUpperCase() && "minthnt.green1"}
          onClick={() => sortBy(colName.toUpperCase())}
        >
          <ArrowUpDownIcon height={3} /> {colName}
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
