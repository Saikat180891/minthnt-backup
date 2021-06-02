export const filterOptions = [
  {
    label: "First Name",
    value: "first_name__istartswith",
  },
  {
    label: "Last Name",
    value: "last_name__istartswith",
  },
  {
    label: "Email",
    value: "email__istartswith",
  },
  {
    label: "Phone No",
    value: "phone_no__istartswith",
  },
  {
    label: "Referred By",
    value: "referred_by__istartswith",
  },
  {
    label: "State",
    value: "address__state__istartswith",
  },
  {
    label: "City",
    value: "address__city__startswith",
  },
  {
    label: "Zip Code",
    value: "address__zip_code",
  },
  {
    label: "Residence Type",
    value: "address__residence_type__istartswith",
  },
];

export function getLabelFromValue(value, options = []) {
  const selectedOption = options.find((option) => option?.value === value);
  return selectedOption?.label;
}
