import {
  Box,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Divider,
  Tooltip,
  Wrap,
  WrapItem,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import tw from "twin.macro";
import PaginationNavigator from "../PaginationNavigator";
import DropdownMenu from "../DropdownMenu";
import AutoComplete from "../Autocomplete";
import { connect } from "react-redux";
import {
  addFilters,
  removeFilter,
  nextPage,
  previousPage,
} from "../../store/actions/leads.actions";
import { getLabelFromValue } from "../Leads/initialValues.model";
import Button from "@/Button";

const pageSizes = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
];
const ActionBar = ({
  onNext = () => {},
  onPrevious = () => {},
  filterOptions = [],
  addFilters = () => {},
  filters = {},
  removeFilter = () => {},
  hideFilter = false,
  nextPage = () => {},
  previousPage = () => {},
}) => {
  const [filter, setFilter] = React.useState();

  const handleFilterQuery = (value) => {
    addFilters({ [filter]: value });
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap="3">
      <GridItem colSpan="2">
        {!hideFilter && (
          <DropdownMenu w="full" options={filterOptions} onChange={setFilter}>
            Filter
          </DropdownMenu>
        )}
      </GridItem>
      <GridItem colSpan="9">
        {!hideFilter && <AutoComplete onChange={handleFilterQuery} />}
      </GridItem>
      <GridItem colSpan="1">
        <HStack>
          <PaginationNavigator onNext={nextPage} onPrevious={previousPage} />
        </HStack>
      </GridItem>
      <GridItem colSpan="12">
        {Object.entries(filters)?.length > 0 && (
          <Wrap spacing={2} p="1">
            {Object.entries(filters).map((filter, i) => (
              <WrapItem key={i}>
                <Tooltip
                  label={getLabelFromValue(filter[0], filterOptions)}
                  fontSize="md"
                >
                  <Tag size="md" variant="solid" bg="green.500" color="white">
                    <TagLabel>{filter[1]}</TagLabel>
                    <TagCloseButton
                      color="white"
                      onClick={() => removeFilter(filter[0])}
                    />
                  </Tag>
                </Tooltip>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </GridItem>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.leads.others.filters,
  };
};

export default connect(mapStateToProps, {
  addFilters,
  removeFilter,
  nextPage,
  previousPage,
})(ActionBar);
