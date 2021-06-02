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
} from "@chakra-ui/react";
import React from "react";
import tw from "twin.macro";
import PaginationNavigator from "../PaginationNavigator";
import DropdownMenu from "../DropdownMenu";
import AutoComplete from "../Autocomplete";
import { connect } from "react-redux";
import { addFilters, removeFilter } from "../../store/actions/leads.actions";
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
  onChange = () => {},
  filterOptions = [],
  addFilters = () => {},
  filters = {},
  removeFilter = () => {},
}) => {
  const [filter, setFilter] = React.useState();

  const handleFilterQuery = (value) => {
    addFilters({ [filter]: value });
  };

  return (
    <Flex direction="column" mb="4" bg="white" shadow="md">
      <HStack spacing={2} p={1} h="3rem">
        <DropdownMenu options={filterOptions} onChange={setFilter}>
          Filter
        </DropdownMenu>
        <AutoComplete onChange={handleFilterQuery} />
        <DropdownMenu w="5rem" options={pageSizes}>
          5
        </DropdownMenu>
        <PaginationNavigator onNext={onNext} onPrevious={onPrevious} />
      </HStack>
      <Divider />
      {Object.entries(filters)?.length > 0 && (
        <Wrap spacing={2} p="1">
          {Object.entries(filters).map((filter, i) => (
            <WrapItem key={i}>
              <Tooltip
                label={getLabelFromValue(filter[0], filterOptions)}
                fontSize="md"
              >
                <Tag size="md" variant="solid" colorScheme="gray">
                  <TagLabel>{filter[1]}</TagLabel>
                  <TagCloseButton onClick={() => removeFilter(filter[0])} />
                </Tag>
              </Tooltip>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.leads.others.filters,
  };
};

export default connect(mapStateToProps, { addFilters, removeFilter })(
  ActionBar
);
