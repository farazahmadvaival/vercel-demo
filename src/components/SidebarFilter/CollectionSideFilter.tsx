import { SidebarFilter } from ".";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { useQuery } from "../../hooks/useQuery";
import { ApiUrl } from "../../apis/apiUrl";

export const CollectionSideFilter = ({ onChange, collectionId }: any) => {
  const { data: properties } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_COLLECTION_PROPERTIES, collectionId],
    url: `${ApiUrl?.GET_COLLECTION_PROPERTIES}/${collectionId}`,
    showToast: false,
    token: true,
    enabled: collectionId ? true : false,
  });
  const filters = [
    {
      label: "Status",
      name: "status",
      hasFilters: true,
      border: true,
      filters: [
        {
          name: "status",
          type: "radio",
          options: ["", "buyNow"],
          label: ["All", "Buy Now"],
        },
      ],
    },
    // {
    //   label: "Background",
    //   name: "background",
    //   hasFilters: true,
    //   border: false,
    //   showQuantity: true,
    //   filterType: "properties",
    //   filters: [
    //     {
    //       label: "Purple",
    //       name: "purple",
    //       type: "checkbox",
    //     },
    //     {
    //       label: "Black",
    //       name: "black",
    //       type: "checkbox",
    //     },
    //   ],
    // },
    // {
    //   label: "Clothes",
    //   name: "clothes",
    //   hasFilters: true,
    //   border: false,
    //   showQuantity: true,
    //   filterType: "properties",
    //   filters: [
    //     {
    //       label: "Purple",
    //       name: "purple",
    //       type: "checkbox",
    //     },
    //     {
    //       label: "Black",
    //       name: "black",
    //       type: "checkbox",
    //     },
    //   ],
    // },
  ];
  const propertyList =
    properties &&
    properties?.map((property: any, index: number) => {
      const propertyValues = property.propertyValues.map(
        (propertyValue: any, index: number) => {
          return {
            label: propertyValue?.value?.substring(0, 16) + "...",
            name: propertyValue?.value,
            type: "checkbox",
          };
        }
      );
      return {
        label: property?.name,
        name: property?.name?.toLowerCase(),
        hasFilters: true,
        border: false,
        showQuantity: true,
        filterType: "properties",
        filters: propertyValues,
      };
    });
  return (
    <SidebarFilter
      filterGroups={propertyList ? filters.concat(propertyList) : filters}
      onFilterChange={(filters: any) => onChange(filters)}
    />
  );
};
