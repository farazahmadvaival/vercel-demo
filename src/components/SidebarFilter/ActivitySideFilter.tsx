import { SidebarFilter } from ".";
import { ApiUrl } from "../../apis/apiUrl";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { useQuery } from "../../hooks/useQuery";

export const ActivitySideFilter = ({ onChange, type }: any) => {
  const { data: collections } = useQuery<any>({
    queryKey: [
      type === "user"
        ? QUERY_KEYS.GET_COLLECTIONS_NAME
        : QUERY_KEYS.GET_All_COLLECTIONS_NAME,
    ],
    url:
      type === "user"
        ? ApiUrl?.GET_COLLECTIONS_NAME
        : ApiUrl?.GET_All_COLLECTIONS_NAME,
    showToast: false,
    token: type === "user" ? true : false,
  });

  const filters = [
    {
      label: "Event Type",
      name: "event",
      hasFilters: true,
      border: true,
      filters: [
        { label: "Sales", name: "buy", type: "checkbox" },
        { label: "Listing", name: "list", type: "checkbox" },
        { label: "Transfer", name: "transfer", type: "checkbox" },
        { label: "Mint", name: "mint", type: "checkbox" },
      ],
    },

    {
      label: "Collections",
      name: "collections",
      hasFilters: true,
      border: false,
      showQuantity: false,
      filters:
        collections &&
        collections?.map((collection: any, index: number) => {
          return {
            label: collection?.name.substring(0, 16) + "...",
            name: collection?.id,
            type: "checkbox",
          };
        }),
    },

    // Add more filter groups here if needed
  ];
  return (
    <SidebarFilter
      filterGroups={filters}
      onFilterChange={(filters: any) => onChange(filters)}
    />
  );
};
